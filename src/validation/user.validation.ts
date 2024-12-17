import { Joi } from 'express-validation';

const userIdInParams = {
	params: Joi.object({
		userId: Joi.string().uuid().required(),
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
