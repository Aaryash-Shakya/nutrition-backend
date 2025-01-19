import { literal, Op } from 'sequelize';
import db from '../../config/sequelize';
import { TFood, TFoodMinimal } from '../types/food';
import { TPaginationParams, TPaginationResponse } from '../types/searchParams';

const DB: any = db;
const { Food } = DB;

function findFoodById(foodId: string | number): Promise<TFood> {
	return Food.findByPk(foodId);
}

function searchFoodByName(foodName: string): Promise<TFoodMinimal[]> {
	foodName = foodName.replace(/\s/g, ' & ');
	// vector query cannot contain space instead use | or & for OR and AND
	return Food.findAll({
		attributes: [
			'id',
			'name',
			'serving_size',
			'calories',
			'carbohydrate',
			'total_fat',
			'cholesterol',
			'protein',
			'fiber',
			'sugars',
			'sodium',
			'vitamin_d',
			'calcium',
			'iron',
			'caffeine',
		],
		where: literal(
			`to_tsvector("name") @@ to_tsquery(${db.sequelize.escape(foodName)})`
		),
		limit: 10,
	});
}

async function listFoods(paginationParams: TPaginationParams): Promise<{
	pagination: TPaginationResponse;
	rows: TFoodMinimal[];
}> {
	const records: {
		count: number;
		rows: TFoodMinimal[];
	} = await Food.findAndCountAll({
		attributes: [
			'id',
			'name',
			'serving_size',
			'calories',
			'carbohydrate',
			'total_fat',
			'cholesterol',
			'protein',
			'fiber',
			'sugars',
			'sodium',
			'vitamin_d',
			'calcium',
			'iron',
			'caffeine',
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
function listFoodsByFoodIds(foodIds: number[]): Promise<TFoodMinimal[]> {
	return Food.findAll({
		attributes: [
			'id',
			'name',
			'serving_size',
			'calories',
			'carbohydrate',
			'total_fat',
			'cholesterol',
			'protein',
			'fiber',
			'sugars',
			'sodium',
			'vitamin_d',
			'calcium',
			'iron',
			'caffeine',
		],
		where: {
			id: {
				[Op.in]: foodIds,
			},
		},
	});
}

export default {
	findFoodById,
	searchFoodByName,
	listFoods,
	listFoodsByFoodIds,
};
