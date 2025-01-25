import { col, fn, Op } from 'sequelize';
import db from '../../config/sequelize';
import {
	TUserFoodIntake,
	TUserFoodIntakeWithFood,
	TUserFoodIntakeWithFoodId,
} from '../types/userFoodIntake';

const DB: any = db;
const { UserFoodIntake, Food } = DB;

function createIntake(data: {
	userId: string;
	foodId: string;
	quantity: number;
	mealType: string;
	date: Date;
}): Promise<TUserFoodIntake> {
	return UserFoodIntake.create(data);
}

function getDailyIntake(date: string): Promise<TUserFoodIntakeWithFood[]> {
	const startDate = new Date(date);
	const endDate = new Date(startDate);
	endDate.setDate(startDate.getDate() + 1);
	return UserFoodIntake.findAll({
		where: {
			date: {
				[Op.gte]: startDate,
				[Op.lt]: endDate,
			},
		},
		include: [
			{
				model: Food,
				attributes: [
					'id',
					'name',
					'serving_size',
					'calories',
					'carbohydrate',
					'total_fat',
					'cholesterol',
					'protein',
					'fiber',
					'sugars',
					'sodium',
					'vitamin_d',
					'calcium',
					'iron',
					'caffeine',
				],
			},
		],
		order: [['date', 'ASC']],
	});
}

function getMonthlyIntakeOfUser(
	userId: string
): Promise<TUserFoodIntakeWithFoodId[]> {
	const oneMonthAgo = new Date();
	oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

	return UserFoodIntake.findAll({
		where: {
			userId: userId,
			date: {
				[Op.gte]: oneMonthAgo,
			},
		},
		include: {
			model: Food,
			attributes: ['id'],
		},
	});
}

function getMonthlyIntakes(): Promise<TUserFoodIntake[]> {
	const oneMonthAgo = new Date();
	oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

	return UserFoodIntake.findAll({
		where: {
			date: {
				[Op.gte]: oneMonthAgo,
			},
		},
		order: [['date', 'ASC']],
	});
}

function getWeeklyIntakesByUserIds(
	userIds: string[]
): Promise<TUserFoodIntake[]> {
	const oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

	return UserFoodIntake.findAll({
		where: {
			userId: {
				[Op.in]: userIds,
			},
			date: {
				[Op.gte]: oneWeekAgo,
			},
		},
		order: [['date', 'ASC']],
	});
}

function deleteIntake(id: string): Promise<number> {
	return UserFoodIntake.destroy({
		where: {
			id,
		},
	});
}

function getMonthlyIntakesByUserIds(
	userTds: string[]
): Promise<TUserFoodIntakeWithFood[]> {
	const oneMonthAgo = new Date();
	oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
	return UserFoodIntake.findAll({
		where: {
			userId: {
				[Op.in]: userTds,
			},
			date: {
				[Op.gte]: oneMonthAgo,
			},
		},
		include: {
			model: Food,
			attributes: [
				'id',
				'name',
				'serving_size',
				'calories',
				'carbohydrate',
				'total_fat',
				'cholesterol',
				'protein',
				'fiber',
				'sugars',
				'sodium',
				'vitamin_d',
				'calcium',
				'iron',
				'caffeine',
			],
		},
	});
}

function countIntakes(): Promise<number> {
	return UserFoodIntake.count();
}

export default {
	createIntake,
	getDailyIntake,
	getMonthlyIntakeOfUser,
	getMonthlyIntakes,
	deleteIntake,
	getMonthlyIntakesByUserIds,
	countIntakes,
	getWeeklyIntakesByUserIds,
};
