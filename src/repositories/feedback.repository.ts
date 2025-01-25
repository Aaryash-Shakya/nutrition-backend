import db from '../../config/sequelize';
import { TFeedback } from '../types/feedback';
import { TPaginationParams } from '../types/searchParams';

const DB: any = db;
const { Feedback, User } = DB;

function createFeedback(data: { userId: string; comment: string }) {
	return Feedback.create(data);
}

async function listFeedbacksWithUser(paginationParams: TPaginationParams) {
	const records: {
		count: number;
		rows: TFeedback[];
	} = await Feedback.findAndCountAll({
		include: [
			{
				model: User,
				attributes: ['id', 'name', 'email'],
			},
		],
		offset: (paginationParams.page - 1) * paginationParams.limit,
		limit: paginationParams.limit,
		order: [[paginationParams.sort_by, paginationParams.sort_order]],
	});
	const pagination = {
		currentPage: paginationParams.page,
		pageSize: paginationParams.limit,
		totalPages: Math.ceil(records.count / 100),
		totalRecords: records.count,
	};
	return {
		pagination,
		rows: records.rows,
	};
}

export default {
	createFeedback,
	listFeedbacksWithUser,
};
