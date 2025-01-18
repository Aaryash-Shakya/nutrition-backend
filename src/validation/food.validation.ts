import { Joi } from 'express-validation';

const foodIdInParams = {
	params: Joi.object({
		foodId: Joi.string().required(),
	}),
};

const searchFoodByName = {
	query: Joi.object({
		name: Joi.string().required(),
	}),
};

export default {
	foodIdInParams,
	searchFoodByName,
};

