/* eslint-disable no-undef */
'use strict';

const Chance = require('chance');
const chance = new Chance();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const password =
			'$2b$12$DOP7eot4fEpzZ5TPczFy6eEXfrQ1XY.dzub4Emv5GWgYLu.UyZd5a';

		function generateRandomUser(count) {
			return Array.from({ length: count }, () => ({
				id: chance.guid(),
				name: chance.name(),
				email: chance.email(),
				password: password,
				role: 'USER',
				isActive: true,
				gender: chance.pickone(['MALE', 'FEMALE', 'OTHER']),
				age: chance.age({ min: 18, max: 80 }),
				weight: chance.integer({ min: 50, max: 100 }),
				height: chance.integer({ min: 150, max: 200 }),
				activityLevel: chance.pickone([
					'SEDENTARY',
					'LIGHTLY_ACTIVE',
					'MODERATELY_ACTIVE',
					'VERY_ACTIVE',
					'SUPER_ACTIVE',
				]),
				calorieGoal: chance.integer({ min: 1500, max: 3000 }),
				createdAt: chance.date({ year: 2022 }),
				updatedAt: chance.date({ year: 2023 }),
			}));
		}

		// password: 'Password@123'
		await queryInterface.bulkInsert('User', [
			{
				id: '4e6aabbf-fa10-49d0-8b7b-fe15dca0dc41',
				name: 'Admin Shakya',
				email: 'admin.shakya@gmail.com',
				password:
					'$2b$12$DOP7eot4fEpzZ5TPczFy6eEXfrQ1XY.dzub4Emv5GWgYLu.UyZd5a',
				role: 'USER',
				isActive: true,
				gender: 'MALE',
				age: 21,
				weight: 60,
				height: 180,
				activityLevel: 'MODERATELY_ACTIVE',
				calorieGoal: 2000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 'b4aaeff2-5f56-4eb1-90e9-772b408afe3e',
				name: 'Aaryash Shakya',
				email: 'aaryashshakya31@gmail.com',
				password:
					'$2b$12$DOP7eot4fEpzZ5TPczFy6eEXfrQ1XY.dzub4Emv5GWgYLu.UyZd5a',
				role: 'USER',
				isActive: true,
				gender: 'MALE',
				age: 21,
				weight: 60,
				height: 180,
				activityLevel: 'MODERATELY_ACTIVE',
				calorieGoal: 2200,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 'dcc122a1-011d-4af0-9aea-c0b71ca351d1',
				name: 'Kaushal Kishor Mishra',
				email: 'km645195@gmail.com',
				password:
					'$2b$12$DOP7eot4fEpzZ5TPczFy6eEXfrQ1XY.dzub4Emv5GWgYLu.UyZd5a',
				role: 'USER',
				isActive: true,
				gender: 'MALE',
				age: 24,
				weight: 55,
				height: 182,
				activityLevel: 'LIGHTLY_ACTIVE',
				calorieGoal: 2000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		await queryInterface.bulkInsert('User', generateRandomUser(100));
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('User', null, {});
	},
};

