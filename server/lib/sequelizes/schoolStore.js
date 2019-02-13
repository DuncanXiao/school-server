module.exports = function(sequelize, DataTypes) {
	const SchoolStore = sequelize.define('school_store', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		schoolId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		registryId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		type: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		phone1: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		phone3: {
			type: DataTypes.STRING,
			allowNull: true
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

  SchoolStore.associate = models => {
    SchoolStore.belongsTo(models.school, { foreignKey: 'schoolId' });
    SchoolStore.belongsTo(models.schoolStoreRegistry, { foreignKey: 'registryId' });
  };

	return SchoolStore;
};