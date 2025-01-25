import express from 'express';
import feedbackController from '../controller/feedback.controller';
import userController from '../controller/user.controller';
import foodController from '../controller/food.controller';
import userFoodIntakeController from '../controller/userFoodIntake.controller';

const router = express.Router();

router.route('/users').get(userController.listUsers);

router.route('/foods').get(foodController.listFoods);

router.route('/feedbacks').get(feedbackController.listFeedbacks);

// for graphs

// overview
router.route('/overview').get(userController.overview);

// activity
router.route('/activity').get(userFoodIntakeController.monthlyRecords);

// gender
router
	.route('/monthly-intake/gender')
	.get(userController.getMonthlyIntakeByGender);
router.route('/analytics/gender/count').get(userController.countUsersByGender);

export default router;
