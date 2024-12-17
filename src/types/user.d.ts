import { TEducation, TExperience } from './model';
import { TActivityLevels } from './nutrition';

export type TGender = 'MALE' | 'FEMALE' | 'OTHER';
export type TUserRole = 'USER' | 'ADMIN';

export type TUser = {
	id: string;
	name: string;
	email: string;
	password: string;
	role: TUserRole;
	isActive: boolean;
	gender: TGender;
	age: number;
	weight: number;
	height: number;
	activityLevel: TActivityLevels;
	createdAt: Date;
	updatedAt: Date;
};

export type TUserWithStats = {
	id: string;
	name: string;
	email: string;
	password: string;
	role: TUserRole;
	isActive: boolean;
	gender: TGender;
	age: number;
	weight: number;
	height: number;
	activityLevel: TActivityLevels;
	calorie: number;
	bmi: number;
	createdAt: Date;
	updatedAt: Date;
};
