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

function getMonthlyNutrientSumsByUserIds(userTds: string[]): Promise<any> {
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
				[fn('SUM', col('Food.calories')), 'total_calories'],
				[fn('SUM', col('Food.carbohydrate')), 'total_carbohydrate'],
				[fn('SUM', col('Food.total_fat')), 'total_fat'],
				[fn('SUM', col('Food.cholesterol')), 'total_cholesterol'],
				[fn('SUM', col('Food.protein')), 'total_protein'],
				[fn('SUM', col('Food.fiber')), 'total_fiber'],
				[fn('SUM', col('Food.sugars')), 'total_sugars'],
				[fn('SUM', col('Food.sodium')), 'total_sodium'],
				[fn('SUM', col('Food.vitamin_d')), 'total_vitamin_d'],
				[fn('SUM', col('Food.calcium')), 'total_calcium'],
				[fn('SUM', col('Food.iron')), 'total_iron'],
				[fn('SUM', col('Food.caffeine')), 'total_caffeine'],
			],
		},
		group: ['UserFoodIntake.userId'], // Group by user to get totals per user
	});
}

export default {
	createIntake,
	getDailyIntake,
	getMonthlyIntakeOfUser,
	deleteIntake,
	getMonthlyIntakesByUserIds,
	getMonthlyNutrientSumsByUserIds,
};
