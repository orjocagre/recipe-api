const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const INGREDIENT_TABLE = 'ingredients';

const IngredientSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Ingredient extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
    this.belongsToMany(models.Recipe, {
      as: 'recipes',
      through: models.RecipeIngredient,
      foreignKey: 'ingredientId',
      otherKey: 'recipeId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: INGREDIENT_TABLE,
      modelName: 'Ingredient',
      timestamps: false,
    };
  }
}

module.exports = { INGREDIENT_TABLE, IngredientSchema, Ingredient };
