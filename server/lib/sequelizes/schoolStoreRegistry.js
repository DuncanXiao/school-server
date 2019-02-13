module.exports = function(sequelize, DataTypes) {
	const SchoolStoreRegistry = sequelize.define('school_store_registry', {
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
		password: {
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
		timestamps: true,
		underscored: false,
		freezeTableName: true
	});

  SchoolStoreRegistry.associate = models => {
    SchoolStoreRegistry.belongsTo(models.school, { foreignKey: 'schoolId' });
  };

	return SchoolStoreRegistry;
};