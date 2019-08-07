module.exports = function(sequelize, DataTypes) {
	const SchoolStoreProduct = sequelize.define('schoolStoreProduct', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		storeId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		type: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sellOut: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		sale: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		imageUrl: {
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
		tableName: 'school_store_product',
		timestamps: true,
		underscored: false,
		freezeTableName: true
	});

  SchoolStoreProduct.associate = models => {
    SchoolStoreProduct.belongsTo(models.schoolStore, { foreignKey: 'storeId' });
  };

	return SchoolStoreProduct;
};