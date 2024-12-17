import { TOfferStages } from './offer';

export type TCoreCompetencyModel = {
	id: string;
	name: string;
	description: string;
	status: string;
	businessId: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type TLevel = {
	id: string;
	name: string;
	weight: number;
	coreCompetencyModelId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TRubric = {
	id: string;
	description: string;
	sampleEvidenceText: string;
	sampleEvidenceFilePath: string;
	coreCompetencyModelId: string;
	levelId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TRole = {
	id: string;
	name: string;
	description: string | null;
	status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
	businessId: string;
	type: 'ROLE' | 'PROGRAM';
	createdAt: Date;
	updatedAt: Date;
};

export type TRoleCcm = {
	id: string;
	coreCompetencyModelId: string;
	roleId: string;
	levelId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TUserRoleCcm = {
	id: string;
	roleCcmId: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TSubmission = {
	id: string;
	text: string;
	filePath: string;
	score: number | null;
	userId: string;
	levelId: string;
	roleCcmId: string;
	invitationCode: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TGrade = {
	id: string;
	score: number;
	explanation: string;
	userId: string;
	submissionId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TInvitation = {
	id: string;
	userEmail: string;
	roleId: string;
	invitationCode: string;
	isProcessed: boolean;
	deadline: Date;
	createdAt: Date;
	updatedAt: Date;
};

export type TOffer = {
	id: string;
	userId: string;
	roleId: string;
	invitationId: string;
	stage: TOfferStages;
	isLatest: boolean;
	remarks?: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TEducation = {
	id: string;
	userId: string;
	school: string;
	degree: string;
	fieldOfStudy: string;
	grade: string;
	description: string;
	startDate: Date;
	endDate: Date;
	createdAt: Date;
	updatedAt: Date;
};

export type TExperience = {
	id: string;
	userId: string;
	title: string;
	description: string;
	employmentType: string;
	companyName: string;
	location: string;
	locationType: string;
	startDate: Date;
	endDate: Date;
	createdAt: Date;
	updatedAt: Date;
};

export type TExternalInvitation = {
	id: string;
	userEmail: string;
	roleId: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
};
