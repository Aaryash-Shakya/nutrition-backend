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

export default {
	createIntake,
};
