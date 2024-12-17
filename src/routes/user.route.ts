import express from 'express';
import { validate } from 'express-validation';
import userValidation from '../validation/user.validation';
import userController from '../controller/user.controller';

const router = express.Router();

router
	.route('/profile/:userId')
	.get(
		validate(userValidation.userIdInParams),
		userController.findUserProfileById
	);

router
	.route('/update/:userId')
	.put(
		validate(userValidation.updateUserProfile),
		userController.updateUserProfile
	);

export default router;
