/* eslint-disable no-undef */
'use strict';

const uuid = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const getBreakfast = (dietDate, userIdDemo) => {
			const breakfast1 = [
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Milk
					foodId: 915,
					quantity: 0.5,
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
			const breakfast3 = [];
			const random = Math.random();
			if (random < 0.45) return breakfast1;
			else if (random < 0.9) return breakfast2;
			return breakfast3;
		};
		const getLunch = (dietDate, userIdDemo) => {
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
					quantity: 1,
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
		const getSnack = (dietDate, userIdDemo) => {
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
					quantity: 0.8,
					mealType: 'SNACK',
					date: dietDate,
					createdAt: dietDate,
					updatedAt: dietDate,
				},
			];
			const snack3 = [];
			const random = Math.random();
			if (random < 0.4) return snack1;
			else if (random < 0.8) return snack2;
			return snack3;
		};
		const getDinner = (dietDate, userIdDemo) => {
			const dinner1 = [
				{
					id: uuid.v4(),
					userId: userIdDemo,
					// Rice
					foodId: 2969,
					quantity: 1,
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
					quantity: 1,
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
					quantity: 1,
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
					quantity: 0.5,
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

		const getMonthlyDiet = (userId) => {
			const monthlyDiet = [];
			const today = new Date();
			// for past 30 days
			for (let i = 1; i < 30; i++) {
				// set dietDate = today - i days
				const dietDate = new Date(today);
				dietDate.setDate(today.getDate() - i);

				const breakfast = getBreakfast(dietDate, userId);
				const lunch = getLunch(dietDate, userId);
				const snack = getSnack(dietDate, userId);
				const dinner = getDinner(dietDate, userId);
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
		await new Promise((resolve) => setTimeout(resolve, 10));
		// male
		await queryInterface.bulkInsert(
			'UserFoodIntake',
			getMonthlyDiet('b4aaeff2-5f56-4eb1-90e9-772b408afe3e')
		);
		// female
		await queryInterface.bulkInsert(
			'UserFoodIntake',
			getMonthlyDiet('dcc122a1-011d-4af0-9aea-c0b71ca351d1')
		);
		// other
		await queryInterface.bulkInsert(
			'UserFoodIntake',
			getMonthlyDiet('b2bc8718-3c50-496f-9792-520fe1feaa2d')
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('UserFoodIntake', null, {});
	},
};
