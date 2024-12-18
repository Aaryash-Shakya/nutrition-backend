import apiResponse from '../helpers/api-response';
import logger from '../logger';
import userFoodIntakeRepository from '../repositories/userFoodIntake.repository';

async function addFoodIntake(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside userFoodIntake controller to add food intake',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/track',
		method: 'POST',
	});

	try {
		const foodIntake = await userFoodIntakeRepository.createIntake(
			req.body
		);
		const successResp = await apiResponse.appResponse(res, foodIntake);
		logger.log.info({
			message: 'Successfully added food intake',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default {
	addFoodIntake,
};
