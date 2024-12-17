import db from '../../config/sequelize';
import { TFood } from '../types/food';
import { TPaginationParams, TPaginationResponse } from '../types/searchParams';

const DB: any = db;
const { Food } = DB;

function findFoodById(foodId: string): Promise<TFood> {
	return Food.findByPk(foodId);
}

async function listFoods(paginationParams: TPaginationParams): Promise<{
	pagination: TPaginationResponse;
	rows: TFood[];
}> {
	const records: {
		count: number;
		rows: TFood[];
	} = await Food.findAndCountAll({
		offset: (paginationParams.page - 1) * paginationParams.limit,
		limit: paginationParams.limit,
		order: [[paginationParams.sort_by, paginationParams.sort_order]],
	});
	const pagination = {
		currentPage: paginationParams.page,
		pageSize: paginationParams.limit,
		totalPages: Math.ceil(records.count / paginationParams.limit),
		totalRecords: records.count,
	};
	return {
		pagination,
		rows: records.rows,
	};
}

export default {
	findFoodById,
	listFoods,
};
