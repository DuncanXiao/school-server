module.exports = function(sequelize, DataTypes) {
	const Registry = sequelize.define('studentRegistry', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		account: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		passwordHash: {
			type: DataTypes.STRING,
			allowNull: false
		},
		salt: {
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
		tableName: 'student_registry',
		timestamps: true,
		underscored: false,
		freezeTableName: true
	});

	return Registry;
};