module.exports = function(sequelize, DataTypes) {
	const Registry = sequelize.define('registry', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		account: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}
	}, {
		timestamps: true,
		underscored: false,
		freezeTableName: true
	});

	return Registry;
};