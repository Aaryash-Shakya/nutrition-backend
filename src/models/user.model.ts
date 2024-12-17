import { Model } from 'sequelize';
import pwdHashService from '../service/pwd-hash.service';

interface UserAttributes {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phone: string;
	bio?: string;
	role: string;
	isActive: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class User extends Model<UserAttributes> implements UserAttributes {
		id!: string;
		firstName!: string;
		lastName!: string;
		email!: string;
		password!: string;
		phone!: string;
		bio?: string;
		role!: string;
		isActive!: boolean;

		static associate(models: any) {
			User.hasMany(models.Token, {
				foreignKey: 'userId',
			});
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			bio: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			role: {
				type: DataTypes.ENUM('USER', 'SUPERADMIN'),
				defaultValue: 'USER',
				allowNull: false,
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	);

	User.beforeCreate(async (user, options) => {
		const hashedPassword = await pwdHashService.generateHash(user.password);
		user.password = hashedPassword;
	});

	return User;
};
