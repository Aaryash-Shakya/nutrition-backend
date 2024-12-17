'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(`
			DO $$ BEGIN
				CREATE TYPE "enum_User_role" AS ENUM ('USER', 'SUPERADMIN');
			EXCEPTION
				WHEN duplicate_object THEN null;
			END $$;
		`);

		await queryInterface.createTable('User', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			role: {
				type: Sequelize.ENUM('USER', 'SUPERADMIN'),
				defaultValue: 'USER',
				allowNull: false,
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('User');
	},
};
