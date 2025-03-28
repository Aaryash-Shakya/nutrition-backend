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

const updateUserProfile = {
	body: Joi.object({
		name: Joi.string().optional(),
		age: Joi.number().optional(),
		gender: Joi.string().optional(),
		weight: Joi.number().optional(),
		height: Joi.number().optional(),
		activityLevel: Joi.string().optional(),
		calorieGoal: Joi.number().optional(),
	}).or(
		'name',
		'age',
		'gender',
		'weight',
		'height',
		'activityLevel',
		'calorieGoal'
	),
};

const getDailyIntake = {
	params: Joi.object({
		date: Joi.string().required(),
	}),
};

const getRecommendation = {
	query: Joi.object({
		date: Joi.string().required(),
	}),
};

const createFeedback = {
	body: Joi.object({
		comment: Joi.string().required(),
	}),
};

export default {
	userIdInParams,
	findUserByEmail,
	updateUserProfile,
	getDailyIntake,
	getRecommendation,
	createFeedback,
};
