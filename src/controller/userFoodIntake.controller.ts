import { parse, stringify } from 'flatted';
import apiResponse from '../helpers/api-response';
import logger from '../logger';
import userFoodIntakeRepository from '../repositories/userFoodIntake.repository';
import { TFoodRecommendationNutrients } from '../types/food';
import {
	TUserFoodIntake,
	TUserFoodIntakeWithFood,
} from '../types/userFoodIntake';
import nutritionService from '../service/nutrition.service';
import userRepository from '../repositories/user.repository';
import { Op } from 'sequelize';

async function addFoodIntake(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside userFoodIntake controller to add food intake',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/track',
		method: 'POST',
	});

	try {
		const userId = req.userId;
		const { foodId, quantity, date, mealType } = req.body;
		const foodIntake = await userFoodIntakeRepository.createIntake({
			userId,
			foodId,
			quantity, // convert to 100g
			mealType,
			date,
		});
		const successResp = await apiResponse.appResponse(res, foodIntake);
		logger.log.info({
			message: 'Successfully added food intake',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function getDailyIntake(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside userFoodIntake controller to get daily intake',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/track/daily-intake/:date',
		method: 'GET',
	});

	try {
		const userId = req.userId;
		const userObj = await userRepository.findUserById(userId);
		// before "2024-12-18T04:17:21.903Z"
		// after "2024-12-18"
		const dateString = req.params.date.slice(0, 10);
		const dailyIntakeObj =
			await userFoodIntakeRepository.getDailyIntake(dateString, userId);

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

		const successResp = await apiResponse.appResponse(res, {
			dailyIntakeObj,
			totalIntake,
			recommendedIntake,
		});
		logger.log.info({
			message: 'Successfully fetched daily intake',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function deleteFoodIntake(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside userFoodIntake controller to delete food intake',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/track/daily-intake/:intakeId',
		method: 'DELETE',
	});

	try {
		const intakeId = req.params.intakeId;
		const response = await userFoodIntakeRepository.deleteIntake(intakeId);
		const successResp = await apiResponse.appResponse(res, response);
		logger.log.info({
			message: 'Successfully deleted food intake',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function monthlyRecords(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside userFoodIntake controller to get monthly records',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/admin/activity',
		method: 'GET',
	});

	try {
		const monthlyIntake =
			await userFoodIntakeRepository.getMonthlyIntakes();
		const flattedMonthlyIntake: TUserFoodIntakeWithFood[] = parse(
			stringify(monthlyIntake)
		);
		const intakesPerDay = new Map<string, number>();
		flattedMonthlyIntake.forEach((intake) => {
			const date = intake.date.slice(0, 10);

			// If the date is already present in the map, increment the count
			if (intakesPerDay.has(date)) {
				const count = intakesPerDay.get(date);

				// Ensure count is a number and increment
				intakesPerDay.set(date, (count ?? 0) + 1);
			} else {
				// If the date is not in the map, initialize a count with 1
				intakesPerDay.set(date, 1);
			}
		});

		const successResp = await apiResponse.appResponse(
			res,
			Object.fromEntries(intakesPerDay)
		);
		logger.log.info({
			message: 'Successfully fetched monthly records',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function weeklyRecordsByGender(req: any, res: any, next: any) {
	logger.log.info({
		message:
			'Inside userFoodIntake controller to get monthly records by gender',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/admin/activity/gender',
		method: 'GET',
	});

	try {
		const maleIds = await userRepository.getUserIds({
			gender: 'MALE',
		});
		const femaleIds = await userRepository.getUserIds({
			gender: 'FEMALE',
		});
		const otherIds = await userRepository.getUserIds({
			gender: 'OTHER',
		});

		const maleIntake =
			await userFoodIntakeRepository.getWeeklyIntakesByUserIds(maleIds);
		const flattedMaleIntake: TUserFoodIntake[] = parse(
			stringify(maleIntake)
		);
		const maleIntakesPerDay = new Map<string, number>();
		flattedMaleIntake.forEach((intake) => {
			const date = intake.date.slice(0, 10);
			if (maleIntakesPerDay.has(date)) {
				const count = maleIntakesPerDay.get(date);
				maleIntakesPerDay.set(date, (count ?? 0) + 1);
			} else {
				maleIntakesPerDay.set(date, 1);
			}
		});

		const femaleIntake =
			await userFoodIntakeRepository.getWeeklyIntakesByUserIds(femaleIds);
		const flattedFemaleIntake: TUserFoodIntake[] = parse(
			stringify(femaleIntake)
		);
		const femaleIntakesPerDay = new Map<string, number>();
		flattedFemaleIntake.forEach((intake) => {
			const date = intake.date.slice(0, 10);
			if (femaleIntakesPerDay.has(date)) {
				const count = femaleIntakesPerDay.get(date);
				femaleIntakesPerDay.set(date, (count ?? 0) + 1);
			} else {
				femaleIntakesPerDay.set(date, 1);
			}
		});

		const otherIntake =
			await userFoodIntakeRepository.getWeeklyIntakesByUserIds(otherIds);
		const flattedOtherIntake: TUserFoodIntake[] = parse(
			stringify(otherIntake)
		);
		const otherIntakesPerDay = new Map<string, number>();
		flattedOtherIntake.forEach((intake) => {
			const date = intake.date.slice(0, 10);
			if (otherIntakesPerDay.has(date)) {
				const count = otherIntakesPerDay.get(date);
				otherIntakesPerDay.set(date, (count ?? 0) + 1);
			} else {
				otherIntakesPerDay.set(date, 1);
			}
		});

		const successResp = await apiResponse.appResponse(res, {
			male: Object.fromEntries(maleIntakesPerDay),
			female: Object.fromEntries(femaleIntakesPerDay),
			other: Object.fromEntries(otherIntakesPerDay),
		});
		logger.log.info({
			message: 'Successfully fetched monthly records by gender',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function weeklyRecordsByAge(req: any, res: any, next: any) {
	logger.log.info({
		message:
			'Inside userFoodIntake controller to get monthly records by age',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/admin/activity/age',
		method: 'GET',
	});

	try {
		const youngIds = await userRepository.getUserIds({
			age: {
				[Op.between]: [18, 25],
			},
		});
		const middleIds = await userRepository.getUserIds({
			age: {
				[Op.between]: [26, 40],
			},
		});
		const adultIds = await userRepository.getUserIds({
			age: {
				[Op.between]: [41, 55],
			},
		});
		const oldIds = await userRepository.getUserIds({
			age: {
				[Op.gt]: 55,
			},
		});

		const youngIntake =
			await userFoodIntakeRepository.getWeeklyIntakesByUserIds(youngIds);
		const flattedYoungIntake: TUserFoodIntake[] = parse(
			stringify(youngIntake)
		);
		const youngIntakesPerDay = new Map<string, number>();
		flattedYoungIntake.forEach((intake) => {
			const date = intake.date.slice(0, 10);
			if (youngIntakesPerDay.has(date)) {
				const count = youngIntakesPerDay.get(date);
				youngIntakesPerDay.set(date, (count ?? 0) + 1);
			} else {
				youngIntakesPerDay.set(date, 1);
			}
		});

		const middleIntake =
			await userFoodIntakeRepository.getWeeklyIntakesByUserIds(middleIds);
		const flattedMiddleIntake: TUserFoodIntake[] = parse(
			stringify(middleIntake)
		);
		const middleIntakesPerDay = new Map<string, number>();
		flattedMiddleIntake.forEach((intake) => {
			const date = intake.date.slice(0, 10);
			if (middleIntakesPerDay.has(date)) {
				const count = middleIntakesPerDay.get(date);
				middleIntakesPerDay.set(date, (count ?? 0) + 1);
			} else {
				middleIntakesPerDay.set(date, 1);
			}
		});

		const adultIntake =
			await userFoodIntakeRepository.getWeeklyIntakesByUserIds(adultIds);
		const flattedadultIntake: TUserFoodIntake[] = parse(
			stringify(adultIntake)
		);
		const adultIntakesPerDay = new Map<string, number>();
		flattedadultIntake.forEach((intake) => {
			const date = intake.date.slice(0, 10);
			if (adultIntakesPerDay.has(date)) {
				const count = adultIntakesPerDay.get(date);
				adultIntakesPerDay.set(date, (count ?? 0) + 1);
			} else {
				adultIntakesPerDay.set(date, 1);
			}
		});

		const oldIntake =
			await userFoodIntakeRepository.getWeeklyIntakesByUserIds(oldIds);
		const flattedOldIntake: TUserFoodIntake[] = parse(stringify(oldIntake));
		const oldIntakesPerDay = new Map<string, number>();
		flattedOldIntake.forEach((intake) => {
			const date = intake.date.slice(0, 10);
			if (oldIntakesPerDay.has(date)) {
				const count = oldIntakesPerDay.get(date);
				oldIntakesPerDay.set(date, (count ?? 0) + 1);
			} else {
				oldIntakesPerDay.set(date, 1);
			}
		});

		const successResp = await apiResponse.appResponse(res, {
			young: Object.fromEntries(youngIntakesPerDay),
			middle: Object.fromEntries(middleIntakesPerDay),
			adult: Object.fromEntries(adultIntakesPerDay),
			old: Object.fromEntries(oldIntakesPerDay),
		});
		logger.log.info({
			message: 'Successfully fetched monthly records by age',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default {
	addFoodIntake,
	getDailyIntake,
	deleteFoodIntake,
	monthlyRecords,
	weeklyRecordsByGender,
	weeklyRecordsByAge,
};
