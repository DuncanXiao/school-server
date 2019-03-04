module.exports = function(sequelize, DataTypes) {
	const School = sequelize.define('school', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false,
		underscored: false,
		freezeTableName: true
	});

	return School;
};