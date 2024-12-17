import db from '../../config/sequelize';
import { TPaginationParams, TPaginationResponse } from '../types/searchParams';
import { TUser } from '../types/user';

const DB: any = db;
const { User } = DB;

function createNewUser(data: any) {
	return User.create(data);
}

function activateAccount(userId: string) {
	return User.update(
		{ isActive: true },
		{
			where: {
				id: userId,
			},
		}
	);
}

// security risk if this api is exposed to public
function findUserByEmail(email: string) {
	return User.findOne({
		attributes: [
			'id',
			'firstName',
			'lastName',
			'email',
			'phone',
			'role',
			'password',
			'isActive',
		],
		where: {
			email,
		},
	});
}

function findActiveUserByEmail(email: string) {
	return User.findOne({
		attributes: [
			'id',
			'firstName',
			'lastName',
			'email',
			'phone',
			'role',
			'password',
			'isActive',
		],
		where: {
			email,
			isActive: true,
		},
	});
}

function findUserById(userId: string): Promise<TUser> {
	return User.findOne({
		where: {
			id: userId,
		},
	});
}

// security risk if this api is exposed to public
function findUserPasswordByEmail(email: string) {
	return User.findOne({
		attributes: ['id', 'password'],
		where: {
			email,
			isActive: true,
		},
	});
}

async function listAllUsers(paginationParams: TPaginationParams): Promise<{
	pagination: TPaginationResponse;
	rows: TUser[];
}> {
	const records: {
		count: number;
		rows: TUser[];
	} = await User.findAndCountAll({
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

async function updateUserPassword(userId: string, password: string) {
	const user = await User.findOne({
		where: {
			id: userId,
		},
	});
	if (user) {
		user.password = password;
		await user.save();
	}
	return user;
}

export default {
	listAllUsers,
	activateAccount,
	createNewUser,
	findUserByEmail,
	findActiveUserByEmail,
	findUserById,
	findUserPasswordByEmail,
	updateUserPassword,
};
