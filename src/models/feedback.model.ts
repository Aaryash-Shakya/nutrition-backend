import { Model } from 'sequelize';

interface FeedbackAttributes {
	id: string;
	userId: string;
	comment: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class Feedback
		extends Model<FeedbackAttributes>
		implements FeedbackAttributes
	{
		id!: string;
		userId!: string;
		comment!: string;

		static associate(models: any) {
			Feedback.belongsTo(models.User, {
				foreignKey: 'userId',
			});
		}
	}

	Feedback.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: 'User',
					key: 'id',
				},
			},
			comment: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'Feedback',
		}
	);

	return Feedback;
};
