import express from 'express';
import { validate } from 'express-validation';
import userValidation from '../validation/user.validation';
import userController from '../controller/user.controller';
import userFoodIntakeController from '../controller/userFoodIntake.controller';

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

// Track food Intake
router
	.route('/track')
	.post(
		validate(userValidation.addFoodIntake),
		userFoodIntakeController.addFoodIntake
	);

router
	.route('/track/daily-intake/:date')
	.get(
		validate(userValidation.getDailyIntake),
		userFoodIntakeController.getDailyIntake
	);

export default router;
