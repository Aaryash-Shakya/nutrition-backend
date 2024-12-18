import { Op } from 'sequelize';
import db from '../../config/sequelize';
import { TUserFoodIntake } from '../types/userFoodIntake';

const DB: any = db;
const { UserFoodIntake } = DB;

function createIntake(data: {
	userId: string;
	foodId: string;
	quantity: number;
	date: Date;
}): Promise<TUserFoodIntake> {
	return UserFoodIntake.create(data);
}

function getDailyIntake(date: string): Promise<TUserFoodIntake[]> {
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
	});
}

export default {
	createIntake,
	getDailyIntake,
};
