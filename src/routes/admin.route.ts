import express from 'express';
import feedbackController from '../controller/feedback.controller';
import userController from '../controller/user.controller';
import foodController from '../controller/food.controller';
import userFoodIntakeController from '../controller/userFoodIntake.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router
	.route('/users')
	.get(
		authMiddleware.checkAuthHeader,
		authMiddleware.isUserSuperAdmin,
		userController.listUsers
	);

router
	.route('/foods')
	.get(
		authMiddleware.checkAuthHeader,
		authMiddleware.isUserSuperAdmin,
		foodController.listFoods
	);

router
	.route('/feedbacks')
	.get(
		authMiddleware.checkAuthHeader,
		authMiddleware.isUserSuperAdmin,
		feedbackController.listFeedbacks
	);

// for graphs

// overview
router
	.route('/overview')
	.get(
		authMiddleware.checkAuthHeader,
		authMiddleware.isUserSuperAdmin,
		userController.overview
	);

// activity
router
	.route('/activity')
	.get(
		authMiddleware.checkAuthHeader,
		authMiddleware.isUserSuperAdmin,
		userFoodIntakeController.monthlyRecords
	);

// gender
router
	.route('/monthly-intake/gender')
	.get(
		authMiddleware.checkAuthHeader,
		authMiddleware.isUserSuperAdmin,
		userController.getMonthlyIntakeByGender
	);
router
	.route('/analytics/gender/count')
	.get(
		authMiddleware.checkAuthHeader,
		authMiddleware.isUserSuperAdmin,
		userController.countUsersByGender
	);
router
	.route('/activity/gender')
	.get(
		authMiddleware.checkAuthHeader,
		authMiddleware.isUserSuperAdmin,
		userFoodIntakeController.weeklyRecordsByGender
	);

// age
router
	.route('/monthly-intake/age')
	.get(
		authMiddleware.checkAuthHeader,
		authMiddleware.isUserSuperAdmin,
		userController.getMonthlyIntakeByAge
	);
router
	.route('/analytics/age/count')
	.get(
		authMiddleware.checkAuthHeader,
		authMiddleware.isUserSuperAdmin,
		userController.countUsersByAge
	);
router
	.route('/activity/age')
	.get(
		authMiddleware.checkAuthHeader,
		authMiddleware.isUserSuperAdmin,
		userFoodIntakeController.weeklyRecordsByAge
	);

export default router;
