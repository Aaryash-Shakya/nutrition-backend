import { Joi } from 'express-validation';

const registerUser = {
	body: Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		phone: Joi.string().required(),
	}),
};

const verifyEmail = {
	body: Joi.object({
		email: Joi.string().email().required(),
		emailVerificationToken: Joi.string().required(),
	}),
};

const resendVerificationEmail = {
	params: Joi.object({
		email: Joi.string().email().required(),
	}),
};

const login = {
	body: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
};

const forgotPassword = {
	body: Joi.object({
		email: Joi.string().email().required(),
	}),
};

const resetPassword = {
	body: Joi.object({
		email: Joi.string().email().required(),
		passwordResetToken: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

// Business
const businessLogin = {
	body: Joi.object({
		businessId: Joi.string().uuid().required(),
	}),
};

export default {
	// User
	registerUser,
	verifyEmail,
	resendVerificationEmail,
	login,
	forgotPassword,
	resetPassword,
	// Business
	businessLogin,
};
