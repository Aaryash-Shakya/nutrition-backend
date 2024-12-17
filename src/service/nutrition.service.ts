import { TActivityLevels } from '../types/nutrition';

function calculateCalorieNeeds(
	weightKg: number,
	heightCm: number,
	age: number,
	gender: 'MALE' | 'FEMALE' | 'OTHER',
	activityLevel: TActivityLevels
): number {
	// Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
	let bmr;
	if (gender === 'MALE') {
		bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
	} else if (gender === 'FEMALE') {
		bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
	} else if (gender === 'OTHER') {
		const maleBmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
		const femaleBmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
		bmr = (maleBmr + femaleBmr) / 2;
	} else {
		throw new Error('Invalid gender specified.');
	}

	// Not Fixed: This is generally suggested by the WHO
	const activityMultipliers = {
		sedentary: 1.2, // Little or no exercise
		light: 1.375, // Light exercise/sports 1-3 days/week
		moderate: 1.55, // Moderate exercise/sports 3-5 days/week
		active: 1.725, // Hard exercise/sports 6-7 days a week
		veryActive: 1.9, // Very hard exercise/physical job & exercise
	};

	// Get the activity multiplier; default to sedentary if not found
	const activityMultiplier =
		activityMultipliers[activityLevel] || activityMultipliers['sedentary'];

	// Calculate Total Daily Energy Expenditure (TDEE)
	const tdee = bmr * activityMultiplier;

	return tdee;
}

// Belgian mathematician and statistician Adolphe Quetelet
function calculateBMI(weightKg: number, heightCm: number): string {
	// Convert height from centimeters to meters
	const heightM = heightCm / 100;
	// Calculate BMI
	const bmi = weightKg / (heightM * heightM);
	return bmi.toFixed(2); // Returns BMI rounded to two decimal places
}

// WHO
function getBMICategory(bmi: number): string {
	if (bmi < 16) {
		return 'Severe Thinness';
	} else if (bmi >= 16 && bmi < 17) {
		return 'Moderate Thinness';
	} else if (bmi >= 17 && bmi < 18.5) {
		return 'Mild Thinness';
	} else if (bmi >= 18.5 && bmi < 25) {
		return 'Normal';
	} else if (bmi >= 25 && bmi < 30) {
		return 'Overweight';
	} else if (bmi >= 30 && bmi < 35) {
		return 'Obese Class I';
	} else if (bmi >= 35 && bmi < 40) {
		return 'Obese Class II';
	} else {
		return 'Obese Class III';
	}
}

export default { calculateCalorieNeeds, calculateBMI, getBMICategory };

