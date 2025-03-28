import { parse, stringify } from 'flatted';
import logger from '../logger';
import userRepository from '../repositories/user.repository';
import userFoodIntakeRepository from '../repositories/userFoodIntake.repository';
import { TFoodMinimal, TFoodRecommendationNutrients } from '../types/food';
import { TUserFoodIntakeWithFood } from '../types/userFoodIntake';
import nutritionService from '../service/nutrition.service';
import { queryVectors } from '../service/pinecone.service';
import foodRepository from '../repositories/food.repository';
import apiResponse from '../helpers/api-response';
import aprioriService from '../service/apriori.service';

async function recommendationByDeficiency(req: any, res: any, next: any) {
	logger.log.info({
		message:
			'Inside recommendation controller to get recommendation by deficiency',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/recommend/nutrition',
		method: 'GET',
	});

	try {
		const userId = req.userId;
		const userObj = await userRepository.findUserById(userId);
		// before "2024-12-18T04:17:21.903Z"
		// after "2024-12-18"
		const dateString = req.query.date.slice(0, 10);
		const dailyIntakeObj = await userFoodIntakeRepository.getDailyIntake(
			dateString,
			userId
		);

		// calculate the total intake for the day
		const totalIntake: TFoodRecommendationNutrients = {
			calories: 0,
			carbohydrate: 0,
			total_fat: 0,
			cholesterol: 0,
			protein: 0,
			fiber: 0,
			sodium: 0,
			calcium: 0,
		};
		const flattedDailyIntakeObj: TUserFoodIntakeWithFood[] = parse(
			stringify(dailyIntakeObj)
		);
		flattedDailyIntakeObj.forEach((intake) => {
			totalIntake.calories +=
				parseFloat(intake.Food.calories) * intake.quantity;
			totalIntake.carbohydrate +=
				parseFloat(intake.Food.carbohydrate) * intake.quantity;
			totalIntake.total_fat +=
				parseFloat(intake.Food.total_fat) * intake.quantity;
			totalIntake.cholesterol +=
				parseFloat(intake.Food.cholesterol) * intake.quantity;
			totalIntake.protein +=
				parseFloat(intake.Food.protein) * intake.quantity;
			totalIntake.fiber +=
				parseFloat(intake.Food.fiber) * intake.quantity;
			totalIntake.sodium +=
				parseFloat(intake.Food.sodium) * intake.quantity;
			totalIntake.calcium +=
				parseFloat(intake.Food.calcium) * intake.quantity;
		});

		const recommendedIntake =
			nutritionService.calculateRecommendedNutrients(userObj.calorieGoal);

		// calculate the difference in intake
		const differenceInIntake: TFoodRecommendationNutrients = {
			calories: recommendedIntake.calories - totalIntake.calories,
			carbohydrate:
				recommendedIntake.carbohydrate - totalIntake.carbohydrate,
			total_fat: recommendedIntake.total_fat - totalIntake.total_fat,
			cholesterol:
				recommendedIntake.cholesterol - totalIntake.cholesterol,
			protein: recommendedIntake.protein - totalIntake.protein,
			fiber: recommendedIntake.fiber - totalIntake.fiber,
			sodium: recommendedIntake.sodium - totalIntake.sodium,
			calcium: recommendedIntake.calcium - totalIntake.calcium,
		};

		const vectorEmbeddings: number[] = [];
		Object.keys(differenceInIntake).forEach((key) => {
			const current =
				totalIntake[key as keyof TFoodRecommendationNutrients];
			const target =
				recommendedIntake[key as keyof TFoodRecommendationNutrients];
			const embedding = nutritionService.calculateEmbeddings(
				current,
				target
			);
			vectorEmbeddings.push(embedding);
		});

		logger.log.info({
			message: `Vector Embeddings: ${vectorEmbeddings.join(', ')}`,
			reqId: req.id,
		});

		// query and get food
		const queryResponse = await queryVectors(vectorEmbeddings);
		// console.log(queryResponse);
		const responseData: {
			food: TFoodMinimal;
			score: number | undefined;
		}[] = [];

		const tasks = queryResponse.matches.slice(0, 10).map(async (match) => {
			const foodId = parseInt(match.id);
			const food = await foodRepository.findMinimalFoodById(foodId);
			responseData.push({ food, score: match.score });
		});
		await Promise.all(tasks);

		const successResp = await apiResponse.appResponse(res, {
			dailyIntakeObj,
			recommendation: responseData,
		});
		logger.log.info({
			message: 'Successfully fetched recommendation by deficiency',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function recommendationByHistory(req: any, res: any, next: any) {
	logger.log.info({
		message:
			'Inside recommendation controller to get recommendation by history',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/recommend/history',
		method: 'GET',
	});
	try {
		const userId = req.userId;

		// here we get a single array of all foods consumed by user in last 30 days
		const monthlyIntakeObj =
			await userFoodIntakeRepository.getMonthlyIntakeOfUser(userId);
		const flattedMonthlyIntakeObj: TUserFoodIntakeWithFood[] = parse(
			stringify(monthlyIntakeObj)
		);

		// console.log(flattedMonthlyIntakeObj);

		// create array of array of food ids based on the day
		// [[foods of day 1], [foods of day 2]]

		// similar to hash table use the date as key and array of food ids as value
		// when taking date as key remove the date part and keep only the date
		const dateToFoodIds = new Map<string, number[]>();
		flattedMonthlyIntakeObj.forEach((intake) => {
			const date = intake.date.slice(0, 10);

			// If the date is already present in the map, then push the food ID
			if (dateToFoodIds.has(date)) {
				// Get the foodIds array for the given date
				const foodIds = dateToFoodIds.get(date);

				// Ensure the food ID is not already in the array
				if (foodIds && !foodIds.includes(parseInt(intake.foodId))) {
					foodIds.push(parseInt(intake.foodId));
				}
			} else {
				// If the date is not in the map, initialize a new array with the food ID
				dateToFoodIds.set(date, [parseInt(intake.foodId)]);
			}
		});

		// console.log(dateToFoodIds);

		// get todays foods
		const today = new Date();
		const todayDate = today.toISOString().slice(0, 10);
		const todaysIntake = dateToFoodIds.get(todayDate);
		if (!todaysIntake || todaysIntake.length == 0) {
			return res.status(400).json(
				await apiResponse.errorResponse(req, res, {
					message: 'No food intake yet',
				})
			);
		}
		const aprioriResponse = aprioriService.aprioriAlgorithm(
			dateToFoodIds,
			todaysIntake
		);

		const foodObjs = await foodRepository.listFoodsByFoodIds(
			aprioriResponse.recommendations
		);
		const successResp = await apiResponse.appResponse(res, {
			// associationRules: aprioriResponse.associationRules,
			matchedRules: aprioriResponse.matchedRules,
			recommendations: aprioriResponse.recommendations,
			recommendation: foodObjs,
		});
		logger.log.info({
			message: 'Successfully fetched recommendation by history',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default {
	recommendationByDeficiency,
	recommendationByHistory,
};

