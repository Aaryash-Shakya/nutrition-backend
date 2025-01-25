import { TFoodRecommendationNutrients } from '../types/food';
import { TUserFoodIntakeWithFood } from '../types/userFoodIntake';

const calculateTotalNutrients = (
	flattedIntakes: TUserFoodIntakeWithFood[]
): TFoodRecommendationNutrients => {
	const totalIntakes: TFoodRecommendationNutrients = {
		calories: 0,
		carbohydrate: 0,
		total_fat: 0,
		cholesterol: 0,
		protein: 0,
		fiber: 0,
		sodium: 0,
		calcium: 0,
	};

	flattedIntakes.forEach((intake) => {
		totalIntakes.calories +=
			parseFloat(intake.Food.calories) * intake.quantity;
		totalIntakes.carbohydrate +=
			parseFloat(intake.Food.carbohydrate) * intake.quantity;
		totalIntakes.total_fat +=
			parseFloat(intake.Food.total_fat) * intake.quantity;
		totalIntakes.cholesterol +=
			parseFloat(intake.Food.cholesterol) * intake.quantity;
		totalIntakes.protein +=
			parseFloat(intake.Food.protein) * intake.quantity;
		totalIntakes.fiber += parseFloat(intake.Food.fiber) * intake.quantity;
		totalIntakes.sodium += parseFloat(intake.Food.sodium) * intake.quantity;
		totalIntakes.calcium +=
			parseFloat(intake.Food.calcium) * intake.quantity;
	});

	return totalIntakes;
};

const calculateAverageNutrients = (
	flattedIntakes: TUserFoodIntakeWithFood[],
	userCount: number
): TFoodRecommendationNutrients => {
	const totalIntakes: TFoodRecommendationNutrients = {
		calories: 0,
		carbohydrate: 0,
		total_fat: 0,
		cholesterol: 0,
		protein: 0,
		fiber: 0,
		sodium: 0,
		calcium: 0,
	};

	flattedIntakes.forEach((intake) => {
		totalIntakes.calories +=
			parseFloat(intake.Food.calories) * intake.quantity;
		totalIntakes.carbohydrate +=
			parseFloat(intake.Food.carbohydrate) * intake.quantity;
		totalIntakes.total_fat +=
			parseFloat(intake.Food.total_fat) * intake.quantity;
		totalIntakes.cholesterol +=
			parseFloat(intake.Food.cholesterol) * intake.quantity;
		totalIntakes.protein +=
			parseFloat(intake.Food.protein) * intake.quantity;
		totalIntakes.fiber += parseFloat(intake.Food.fiber) * intake.quantity;
		totalIntakes.sodium += parseFloat(intake.Food.sodium) * intake.quantity;
		totalIntakes.calcium +=
			parseFloat(intake.Food.calcium) * intake.quantity;
	});


	totalIntakes.calories /= userCount;
	totalIntakes.carbohydrate /= userCount;
	totalIntakes.total_fat /= userCount;
	totalIntakes.cholesterol /= userCount;
	totalIntakes.protein /= userCount;
	totalIntakes.fiber /= userCount;
	totalIntakes.sodium /= userCount;
	totalIntakes.calcium /= userCount;

	return totalIntakes;
};

export default {
	calculateTotalNutrients,
	calculateAverageNutrients,
};

