import apiResponse from '../helpers/api-response';
import searchParams from '../helpers/search-params';
import logger from '../logger';
import feedbackRepository from '../repositories/feedback.repository';

async function createFeedback(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside feedback controller to create feedback',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/feedback',
		method: 'POST',
	});

	try {
		const userId = req.userId;
		const { comment } = req.body;
		const foodIntake = await feedbackRepository.createFeedback({
			userId,
			comment,
		});
		const successResp = await apiResponse.appResponse(res, foodIntake);
		logger.log.info({
			message: 'Successfully created feedback',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function listFeedbacks(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside feedback controller to list feedbacks',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/admin/feedbacks',
		method: 'GET',
	});

	try {
		const paginationParams = searchParams.getPaginationParams(req.query);
		const feedbacks =
			await feedbackRepository.listFeedbacks(paginationParams);
		const successResp = await apiResponse.appResponse(res, feedbacks);
		logger.log.info({
			message: 'Successfully listed feedbacks',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default {
	createFeedback,
	listFeedbacks,
};

