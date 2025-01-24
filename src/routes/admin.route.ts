import express from 'express';
import feedbackController from '../controller/feedback.controller';

const router = express.Router();

router.route('/feedbacks').get(feedbackController.listFeedbacks);

export default router;
