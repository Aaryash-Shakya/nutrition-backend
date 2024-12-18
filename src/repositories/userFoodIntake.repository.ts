import { Op } from 'sequelize';
import db from '../../config/sequelize';

const DB: any = db;
const { UserFoodIntake } = DB;

function createIntake(data: {
	userId: string;
	foodId: string;
	quantity: number;
	date: Date;
}) {
	return UserFoodIntake.create(data);
}

function getDailyIntake(date: string) {
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
