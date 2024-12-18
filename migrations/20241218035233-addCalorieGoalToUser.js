'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('User', 'calorieGoal', {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 2000,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('User', 'calorieGoal');
	},
};
