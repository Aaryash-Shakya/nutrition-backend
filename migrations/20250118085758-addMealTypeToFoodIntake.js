'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('UserFoodIntake', 'mealType', {
			type: Sequelize.ENUM('BREAKFAST', 'LUNCH', 'SNACK', 'DINNER'),
			allowNull: false,
			defaultValue: 'SNACK',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('UserFoodIntake', 'mealType');
	},
};
