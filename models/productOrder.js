module.exports = function(sequelize, DataTypes) {
	const ProductOrder = sequelize.define('productOrder', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		storeUuId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		studentOrderId: {
			type: DataTypes.INTEGER,
      allowNull: false,
		},
		orderNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		total: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
      allowNull: false
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		imageUrl: {
			type: DataTypes.STRING,
      allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
      allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
      allowNull: false,
		}
	}, {
		tableName: 'product_order',
		timestamps: true,
		underscored: false,
		freezeTableName: true
  });

  ProductOrder.associate = models => {
    ProductOrder.belongsTo(models.studentOrder, { foreignKey: 'studentOrderId' });
  };

  return ProductOrder;
};