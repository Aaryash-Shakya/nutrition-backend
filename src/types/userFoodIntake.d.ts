import { TFoodMinimal } from './food';

export type TUserFoodIntake = {
	id: string;
	userId: string;
	foodId: string;
	quantity: number;
	mealType: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER';
	date: Date;
	createdAt: Date;
	updatedAt: Date;
};

export type TUserFoodIntakeWithFood = TUserFoodIntake & {
	Food: TFoodMinimal;
};

