module.exports = function(sequelize, DataTypes) {
	const Student = sequelize.define('student', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		schoolId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		uuid: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		registryId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sex: {
			type: DataTypes.STRING,
			allowNull: false
		},
		receiveName1: {
			type: DataTypes.STRING,
			allowNull: false
		},
		receiveName2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		receiveName3: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address1: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address3: {
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
		cornetPhone1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		cornetPhone2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		cornetPhone3: {
			type: DataTypes.STRING,
			allowNull: true
		},
		headPhotoUrl: {
			type: DataTypes.TEXT,
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
  
  Student.associate = models => {
    Student.belongsTo(models.school, { foreignKey: 'schoolId' });
    Student.belongsTo(models.registry, { foreignKey: 'registryId' });
  };

  return Student;
};