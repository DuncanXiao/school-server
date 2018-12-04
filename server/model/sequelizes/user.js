module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.CHAR(40),
			allowNull: false
		},
		name: {
			type: DataTypes.CHAR(40),
			allowNull: false
		}
	}, {
		timestamps: true,
		underscored: false,
		freezeTableName: true
	});
};