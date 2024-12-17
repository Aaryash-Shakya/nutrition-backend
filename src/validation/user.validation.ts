import { Joi } from 'express-validation';

const userIdInParams = {
	params: Joi.object({
		userId: Joi.string().required(),
	}),
};

const findUserByEmail = {
	body: Joi.object({
		email: Joi.string().email().required(),
	}),
};

export default {
	userIdInParams,
	findUserByEmail,
};
