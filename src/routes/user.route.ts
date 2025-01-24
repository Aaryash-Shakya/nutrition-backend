import express from 'express';
import { validate } from 'express-validation';
import userValidation from '../validation/user.validation';
import userController from '../controller/user.controller';
import userFoodIntakeController from '../controller/userFoodIntake.controller';
import userFoodIntakeValidation from '../validation/userFoodIntake.validation';
import recommendationController from '../controller/recommendation.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router
	.route('/profile')
	.get(authMiddleware.checkAuthHeader, userController.findUserProfileById);

router
	.route('/update')
	.put(
		authMiddleware.checkAuthHeader,
		validate(userValidation.updateUserProfile),
		userController.updateUserProfile
	);

// Track food Intake
router
	.route('/track')
	.post(
		authMiddleware.checkAuthHeader,
		validate(userFoodIntakeValidation.createUserFoodIntake),
		userFoodIntakeController.addFoodIntake
	);

router
	.route('/track/daily-intake/:date')
	.get(
		authMiddleware.checkAuthHeader,
		validate(userValidation.getDailyIntake),
		userFoodIntakeController.getDailyIntake
	);

router
	.route('/track/daily-intake/:intakeId')
	.delete(
		validate(userFoodIntakeValidation.userFoodIntakeIdInParams),
		userFoodIntakeController.deleteFoodIntake
	);

// Recommendations
router
	.route('/recommend/nutrition')
	.get(
		authMiddleware.checkAuthHeader,
		validate(userValidation.getRecommendation),
		recommendationController.recommendationByDeficiency
	);

router
	.route('/recommend/history')
	.get(
		authMiddleware.checkAuthHeader,
		recommendationController.recommendationByHistory
	);

export default router;
