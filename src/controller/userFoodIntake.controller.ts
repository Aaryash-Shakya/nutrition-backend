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

async function getDailyIntake(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside userFoodIntake controller to get daily intake',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/track/daily-intake/:date',
		method: 'GET',
	});

	try {
		// before "2024-12-18T04:17:21.903Z"
		// after "2024-12-18"
		const dateString = req.params.date.slice(0, 10);
		const dailyIntake =
			await userFoodIntakeRepository.getDailyIntake(dateString);
		const successResp = await apiResponse.appResponse(res, dailyIntake);
		logger.log.info({
			message: 'Successfully fetched daily intake',
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
	getDailyIntake,
};
