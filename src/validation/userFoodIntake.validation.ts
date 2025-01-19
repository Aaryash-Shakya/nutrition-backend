import { Joi } from 'express-validation';

const userFoodIntakeIdInParams = {
	params: Joi.object({
		intakeId: Joi.string().uuid().required(),
	}),
};

const createUserFoodIntake = {
	body: Joi.object({
		foodId: Joi.string().required(),
		quantity: Joi.number().required(),
		date: Joi.date().required(),
		mealType: Joi.string()
			.valid('BREAKFAST', 'LUNCH', 'SNACK', 'DINNER')
			.required(),
	}),
};

export default {
	userFoodIntakeIdInParams,
	createUserFoodIntake,
};

