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
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			role: {
				type: Sequelize.ENUM('ADMIN', 'USER'),
				defaultValue: 'USER',
				allowNull: false,
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
				allowNull: false,
			},
			gender: {
				type: Sequelize.ENUM('MALE', 'FEMALE', 'OTHER'),
				defaultValue: 'MALE',
				allowNull: false,
			},
			age: {
				type: Sequelize.INTEGER,
				defaultValue: 21,
				allowNull: false,
			},
			weight: {
				type: Sequelize.FLOAT,
				defaultValue: 60,
				allowNull: false,
			},
			height: {
				type: Sequelize.FLOAT,
				defaultValue: 180,
				allowNull: false,
			},
			activityLevel: {
				type: Sequelize.ENUM(
					'SEDENTARY',
					'LIGHTLY_ACTIVE',
					'MODERATELY_ACTIVE',
					'VERY_ACTIVE',
					'SUPER_ACTIVE'
				),
				defaultValue: 'LIGHTLY_ACTIVE',
				allowNull: false,
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
