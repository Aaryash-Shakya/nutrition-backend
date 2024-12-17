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

const addUserToBusiness = {
	body: Joi.object({
		userId: Joi.string().uuid().required(),
	}),
};

// Submission Validation
const createSubmission = {
	body: Joi.object({
		text: Joi.string().required(),
		// multer-s3 puts uploaded response array in req.files, can be accessed by req.files[0].key
		// filePath: Joi.array().items(Joi.string()).required(),
		roleCcmId: Joi.string().uuid().required(),
		levelId: Joi.string().uuid().required(),
		invitationCode: Joi.string().uuid().required(),
	}),
};

const findSubmissionById = {
	params: Joi.object({
		submissionId: Joi.string().uuid().required(),
	}),
};

const downloadResource = {
	body: Joi.object({
		fileName: Joi.string().required(),
	}),
};

// Grade Submission Validation
const gradeSubmission = {
	body: Joi.object({
		score: Joi.number().min(0).max(4).required(),
		explanation: Joi.string().required(),
		submissionId: Joi.string().uuid().required(),
	}),
};

const viewGradesBySubmission = {
	params: Joi.object({
		submissionId: Joi.string().uuid().required(),
	}),
};

const viewGradesByRoleCcm = {
	body: Joi.object({
		userId: Joi.string().uuid().required(),
		roleCcmId: Joi.string().uuid().required(),
	}),
};

// Invitation Validation
const verifyInvitation = {
	params: Joi.object({
		invitationCode: Joi.string().uuid().required(),
	}),
};

const getInvitationAndSubmissionsByRole = {
	body: Joi.object({
		roleId: Joi.string().uuid().required(),
	}),
};

const requestInvitation = {
	body: Joi.object({
		roleId: Joi.string().uuid().required(),
	}),
};

export default {
	userIdInParams,
	findUserByEmail,
	addUserToBusiness,
	// Submission Validation
	createSubmission,
	findSubmissionById,
	downloadResource,
	// Grade Submission Validation
	gradeSubmission,
	viewGradesBySubmission,
	viewGradesByRoleCcm,
	// Invitation Validation
	verifyInvitation,
	getInvitationAndSubmissionsByRole,
	requestInvitation,
};
