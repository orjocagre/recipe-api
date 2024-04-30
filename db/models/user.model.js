const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    field: 'user_name',
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    field: 'is_admin',
    defaultValue: false,
  },
};

class User extends Model {
  static associate(models) {
    this.hasMany(models.Recipe, {
      as: 'recipes',
      foreignKey: 'userId',
    });
    this.hasMany(models.Ingredient, {
      as: 'ingredients',
      foreignKey: 'userId',
    });
    this.belongsToMany(models.Ingredient, {
      as: 'regularIngredients',
      through: models.RegularIngredient,
      foreignKey: 'userId',
      otherKey: 'ingredientId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
