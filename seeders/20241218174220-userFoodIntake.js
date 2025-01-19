'use strict';

const uuid = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const userIdDemo = 'b4aaeff2-5f56-4eb1-90e9-772b408afe3e';

		const getBreakfast = (dietDate) => {
			const breakfast1 = [
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Milk
					foodId: 915,
					quantity: 1,
					mealType: 'BREAKFAST',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Bread Toast
					foodId: 63,
					quantity: 0.5,
					mealType: 'BREAKFAST',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Boiled Egg
					foodId: 1813,
					quantity: 1,
					mealType: 'BREAKFAST',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
			];
			const breakfast2 = [
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Coffee
					foodId: 2896,
					quantity: 0.15,
					mealType: 'BREAKFAST',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Crackers
					foodId: 91,
					quantity: 1,
					mealType: 'BREAKFAST',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Boiled Egg
					foodId: 1813,
					quantity: 1,
					mealType: 'BREAKFAST',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
			];
			const random = Math.random();
			if (random < 0.5) {
				return breakfast1;
			}
			return breakfast2;
		};
		const getLunch = (dietDate) => {
			const lunch1 = [
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Rice
					foodId: 2969,
					quantity: 2,
					mealType: 'LUNCH',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Dal
					foodId: 3462,
					quantity: 2,
					mealType: 'LUNCH',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Chicken
					foodId: 2750,
					quantity: 1.5,
					mealType: 'LUNCH',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
			];
			const lunch2 = [
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Noodles
					foodId: 690,
					quantity: 1,
					mealType: 'LUNCH',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Shrimp
					foodId: 2725,
					quantity: 0.5,
					mealType: 'LUNCH',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
			];
			const random = Math.random();
			if (random < 0.7) {
				return lunch1;
			}
			return lunch2;
		};
		const getSnack = (dietDate) => {
			const snack1 = [
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Hamburger
					foodId: 1356,
					quantity: 1,
					mealType: 'SNACK',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// French Fries
					foodId: 1075,
					quantity: 0.5,
					mealType: 'SNACK',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Milk Shake
					foodId: 856,
					quantity: 0.5,
					mealType: 'SNACK',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
			];
			const snack2 = [
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Chicken Nugget
					foodId: 1158,
					quantity: 1,
					mealType: 'SNACK',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Fruit Juice
					foodId: 3408,
					quantity: 1,
					mealType: 'SNACK',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
			];
			const random = Math.random();
			if (random < 0.5) {
				return snack1;
			}
			return snack2;
		};
		const getDinner = (dietDate) => {
			const dinner1 = [
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Rice
					foodId: 2969,
					quantity: 2,
					mealType: 'DINNER',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Dal
					foodId: 3462,
					quantity: 2,
					mealType: 'DINNER',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Chicken
					foodId: 2750,
					quantity: 1.5,
					mealType: 'DINNER',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
			];
			const dinner2 = [
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Roti
					foodId: 4170,
					quantity: 2,
					mealType: 'DINNER',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Baked Potato
					foodId: 1584,
					quantity: 0.5,
					mealType: 'DINNER',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Tofu
					foodId: 622,
					quantity: 1,
					mealType: 'DINNER',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
			];
			const random = Math.random();
			if (random < 0.7) {
				return dinner1;
			}
			return dinner2;
		};

		const getMonthlyDiet = () => {
			const monthlyDiet = [];
			const today = new Date();
			for (let i = 0; i < 1; i++) {
				// set dietDate = today - i days
				const dietDate = new Date(today);
				dietDate.setDate(today.getDate() - i);

				const breakfast = getBreakfast(dietDate);
				const lunch = getLunch(dietDate);
				const snack = getSnack(dietDate);
				const dinner = getDinner(dietDate);
				// console.log(breakfast);
				// console.log(lunch);
				// console.log(snack);
				// console.log(dinner);
				monthlyDiet.push(
					...[...breakfast, ...lunch, ...snack, ...dinner]
				);
			}
			return monthlyDiet;
		};
		// console.log(getMonthlyDiet());

		await queryInterface.bulkInsert('UserFoodIntake', getMonthlyDiet());
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('UserFoodIntake', null, {});
	},
};
