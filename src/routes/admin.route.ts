import express from 'express';
import feedbackController from '../controller/feedback.controller';
import userController from '../controller/user.controller';
import foodController from '../controller/food.controller';

const router = express.Router();

router.route('/users').get(userController.listUsers);

router.route('/foods').get(foodController.listFoods);

router.route('/feedbacks').get(feedbackController.listFeedbacks);

// for graphs
// gender
router
	.route('/monthly-intake/gender')
	.get(userController.getMonthlyIntakeByGender);
router.route('/analytics/gender/count').get(userController.countUsersByGender);

export default router;
