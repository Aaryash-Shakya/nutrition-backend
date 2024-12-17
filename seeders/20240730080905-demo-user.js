'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// password: 'Password@123'
		await queryInterface.bulkInsert('User', [
			{
				id: '4e6aabbf-fa10-49d0-8b7b-fe15dca0dc41',
				firstName: 'Admin',
				lastName: 'Shakya',
				email: 'admin.shakya@gmail.com',
				password:
					'$2b$12$DOP7eot4fEpzZ5TPczFy6eEXfrQ1XY.dzub4Emv5GWgYLu.UyZd5a',
				phone: '9861123123',
				bio: 'Experienced in JavaScript, React, and Node.js. I build scalable web applications with a focus on performance and user experience.',
				role: 'SUPERADMIN',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 'dcc122a1-011d-4af0-9aea-c0b71ca351d1',
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@gmail.com',
				password:
					'$2b$12$DOP7eot4fEpzZ5TPczFy6eEXfrQ1XY.dzub4Emv5GWgYLu.UyZd5a',
				phone: '9841123456',
				bio: 'Certified project manager with expertise in Agile. I lead teams to deliver projects on time and within budget.',
				role: 'USER',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: '76e95420-086f-4d85-8ff4-9022a6450513',
				firstName: 'Elon',
				lastName: 'Musk',
				email: 'elon.musk@gmail.com',
				password:
					'$2b$12$DOP7eot4fEpzZ5TPczFy6eEXfrQ1XY.dzub4Emv5GWgYLu.UyZd5a',
				phone: '9808124511',
				bio: 'Specializing in SEO, content marketing, and social media strategies to help brands grow and connect with their audiences.',
				role: 'USER',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 'b4aaeff2-5f56-4eb1-90e9-772b408afe3e',
				firstName: 'Bill',
				lastName: 'Gates',
				email: 'bill.gates@gmail.com',
				password:
					'$2b$12$DOP7eot4fEpzZ5TPczFy6eEXfrQ1XY.dzub4Emv5GWgYLu.UyZd5a',
				phone: '9808124521',
				bio: 'Focused on creating intuitive and visually appealing user experiences, blending aesthetics with functionality.',
				role: 'USER',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('User', null, {});
	},
};
