module.exports = function(sequelize, DataTypes) {
	const SchoolStoreRegistry = sequelize.define('schoolStoreRegistry', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		schoolId: {
			type: DataTypes.INTEGER,
			allowNull: false
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
		identityCard: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
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
		tableName: 'school_store_registry',
		timestamps: true,
		underscored: false,
		freezeTableName: true
	});

  SchoolStoreRegistry.associate = models => {
    SchoolStoreRegistry.belongsTo(models.school, { foreignKey: 'schoolId' });
  };

	return SchoolStoreRegistry;
};