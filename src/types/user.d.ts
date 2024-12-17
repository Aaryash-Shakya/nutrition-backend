import { TEducation, TExperience } from './model';

export type TBasicUserDetails = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
};

export type TUserListDetails = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
};

export type TUserListDetailsForAdmin = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	isActive: boolean;
};

export type TUserPublicDetails = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	bio: string;
	createdAt: Date;
};

export type TUserPublicDetailsWithExperienceAndExperience = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	bio: string;
	createdAt: Date;
	Educations: TEducation[];
	Experiences: TExperience[];
};
