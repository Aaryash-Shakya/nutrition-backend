import { parse, stringify } from 'flatted';
import apiResponse from '../helpers/api-response';
import searchParams from '../helpers/search-params';
import logger from '../logger';
import userRepository from '../repositories/user.repository';
import userFoodIntakeRepository from '../repositories/userFoodIntake.repository';
import nutritionService from '../service/nutrition.service';
import { TUserWithStats } from '../types/user';
import { TUserFoodIntakeWithFood } from '../types/userFoodIntake';
import nutrientCalculatorService from '../service/nutrient-calculator.service';
import feedbackRepository from '../repositories/feedback.repository';
import foodRepository from '../repositories/food.repository';
import { Op } from 'sequelize';

async function findUserProfileById(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside user controller to find user profile by id',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/profile',
		method: 'GET',
	});

	try {
		const userId = req.userId;
		const userObj = await userRepository.findUserById(userId);
		if (!userObj) {
			res.statusCode = 404;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'User not found',
				})
			);
		}
		const calorie = nutritionService.calculateCalorieNeeds(
			userObj.weight,
			userObj.height,
			userObj.age,
			userObj.gender,
			userObj.activityLevel
		);
		const bmi = nutritionService.calculateBMI(
			userObj.weight,
			userObj.height
		);
		const response: TUserWithStats = (userObj as any).dataValues;
		response.calorie = calorie;
		response.bmi = bmi;
		const successResp = await apiResponse.appResponse(res, response);
		logger.log.info({
			message: 'Successfully fetched food by id',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function updateUserProfile(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside user controller to update user profile',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/update',
		method: 'PUT',
	});

	try {
		const userId = req.userId;
		const userObj = await userRepository.findUserById(userId);
		if (!userObj) {
			res.statusCode = 404;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'User not found',
				})
			);
		}
		await userRepository.updateUserProfile(userId, req.body);

		const updatedUserObj = await userRepository.findUserById(userId);
		const calorie = nutritionService.calculateCalorieNeeds(
			updatedUserObj.weight,
			updatedUserObj.height,
			updatedUserObj.age,
			updatedUserObj.gender,
			updatedUserObj.activityLevel
		);
		const updatedCalorie = await userRepository.updateUserProfile(userId, {
			calorieGoal: calorie,
		});
		const successResp = await apiResponse.appResponse(res, updatedCalorie);
		logger.log.info({
			message: 'Successfully updated user profile',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function listUsers(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside user controller to list users',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/admin/users',
		method: 'GET',
	});

	try {
		const paginationParams = searchParams.getPaginationParams(req.query);
		const users = await userRepository.listAllUsers(paginationParams);
		const successResp = await apiResponse.appResponse(res, users);
		logger.log.info({
			message: 'Successfully fetched users',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function getMonthlyIntakeByGender(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside user controller to get monthly intake',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/admin/monthly-intake/gender',
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

		const maleIntakes =
			await userFoodIntakeRepository.getMonthlyIntakesByUserIds(maleIds);
		const flattedMaleIntakes: TUserFoodIntakeWithFood[] = parse(
			stringify(maleIntakes)
		);

		const femaleIntakes =
			await userFoodIntakeRepository.getMonthlyIntakesByUserIds(
				femaleIds
			);
		const flattedFemaleIntakes: TUserFoodIntakeWithFood[] = parse(
			stringify(femaleIntakes)
		);

		const otherIntakes =
			await userFoodIntakeRepository.getMonthlyIntakesByUserIds(otherIds);
		const flattedOtherIntakes: TUserFoodIntakeWithFood[] = parse(
			stringify(otherIntakes)
		);

		// divide by 2 coz only half of userIds have records in intake
		// ! can me fixed by making another query to find distinct userId in userFoodIntake but the computation is already slow so using a hack
		const successResp = await apiResponse.appResponse(res, {
			maleNutrients: nutrientCalculatorService.calculateAverageNutrients(
				flattedMaleIntakes,
				(maleIds.length * 30) / 2
			),
			femaleNutrients:
				nutrientCalculatorService.calculateAverageNutrients(
					flattedFemaleIntakes,
					(femaleIds.length * 30) / 2
				),
			otherNutrients: nutrientCalculatorService.calculateAverageNutrients(
				flattedOtherIntakes,
				(otherIds.length * 30) / 2
			),
		});
		logger.log.info({
			message: 'Successfully fetched monthly intake',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function getMonthlyIntakeByAge(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside user controller to get monthly intake',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/admin/monthly-intake/age',
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

		const youngIntakes =
			await userFoodIntakeRepository.getMonthlyIntakesByUserIds(youngIds);
		const flattedYoungIntakes: TUserFoodIntakeWithFood[] = parse(
			stringify(youngIntakes)
		);

		const middleIntakes =
			await userFoodIntakeRepository.getMonthlyIntakesByUserIds(
				middleIds
			);
		const flattedMiddleIntakes: TUserFoodIntakeWithFood[] = parse(
			stringify(middleIntakes)
		);

		const adultIntakes =
			await userFoodIntakeRepository.getMonthlyIntakesByUserIds(adultIds);
		const flattedAdultIntakes: TUserFoodIntakeWithFood[] = parse(
			stringify(adultIntakes)
		);

		const oldIntakes =
			await userFoodIntakeRepository.getMonthlyIntakesByUserIds(oldIds);
		const flattedOldIntakes: TUserFoodIntakeWithFood[] = parse(
			stringify(oldIntakes)
		);

		// divide by 2 coz only half of userIds have records in intake
		// ! can me fixed by making another query to find distinct userId in userFoodIntake but the computation is already slow so using a hack
		const successResp = await apiResponse.appResponse(res, {
			youngNutrients: nutrientCalculatorService.calculateAverageNutrients(
				flattedYoungIntakes,
				(youngIds.length * 30) / 2
			),
			middleNutrients:
				nutrientCalculatorService.calculateAverageNutrients(
					flattedMiddleIntakes,
					(middleIds.length * 30) / 2
				),
			adultNutrients: nutrientCalculatorService.calculateAverageNutrients(
				flattedAdultIntakes,
				(adultIds.length * 30) / 2
			),
			oldNutrients: nutrientCalculatorService.calculateAverageNutrients(
				flattedOldIntakes,
				(oldIds.length * 30) / 2
			),
		});
		logger.log.info({
			message: 'Successfully fetched monthly intake',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function countUsersByGender(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside user controller to count users by gender',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/admin/analytics/gender/count',
		method: 'GET',
	});

	try {
		const count: [
			{
				gender: 'MALE';
				genderCount: string;
			},
			{
				gender: 'FEMALE';
				genderCount: string;
			},
			{
				gender: 'OTHER';
				genderCount: string;
			},
		] = await userRepository.countUsersByGender();

		const successResp = await apiResponse.appResponse(res, {
			maleCount: count.find((c) => c.gender === 'MALE')?.genderCount,
			femaleCount: count.find((c) => c.gender === 'FEMALE')?.genderCount,
			otherCount: count.find((c) => c.gender === 'OTHER')?.genderCount,
		});
		logger.log.info({
			message: 'Successfully counted users by gender',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function countUsersByAge(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside user controller to count users by age',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/admin/analytics/age/count',
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

		const successResp = await apiResponse.appResponse(res, {
			youngCount: youngIds.length,
			middleCount: middleIds.length,
			adultCount: adultIds.length,
			oldCount: oldIds.length,
		});
		logger.log.info({
			message: 'Successfully counted users by age',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function overview(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside user controller to get overview',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/admin/overview',
		method: 'GET',
	});
	try {
		const userCount = await userRepository.countUsers();
		const foodCount = await foodRepository.countFoods();
		const intakeCount = await userFoodIntakeRepository.countIntakes();
		const feedbackCount = await feedbackRepository.countFeedbacks();

		const successResp = await apiResponse.appResponse(res, {
			userCount,
			foodCount,
			intakeCount,
			feedbackCount,
		});
		logger.log.info({
			message: 'Successfully fetched overview',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default {
	findUserProfileById,
	updateUserProfile,
	listUsers,
	getMonthlyIntakeByGender,
	getMonthlyIntakeByAge,
	countUsersByGender,
	countUsersByAge,
	overview,
};
