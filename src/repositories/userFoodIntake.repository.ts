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
	console.log('startDate', startDate);
	endDate.setDate(startDate.getDate() + 1);
	console.log('endDate', endDate);
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
