module.exports = function(sequelize, DataTypes) {
	const StudentOrder = sequelize.define('studentOrder', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		storeId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		studentId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		orderNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		discount: {
			type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
		},
		redPacket: {
			type: DataTypes.INTEGER,
			allowNull: false,
      defaultValue: 0
		},
		packagingFee: {
			type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
		},
		expressFee: {
			type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
		},
		note: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
		},
		type: {
			type: DataTypes.INTEGER,
      allowNull: false
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
		timestamps: true,
		underscored: false,
		freezeTableName: true
  });
  
  StudentOrder.associate = models => {
    StudentOrder.belongsTo(models.schoolStore, { foreignKey: 'storeId' });
    StudentOrder.belongsTo(models.student, { foreignKey: 'studentId' });
  };

  return StudentOrder;
};