const { Model, DataTypes, Sequelize } = require('sequelize');
const { RECIPE_TABLE } = require('./recipe.model');
const { INGREDIENT_TABLE } = require('./ingredient.model');
const RECIPE_INGREDIENT_TABLE = 'recipe_ingredient';

const RecipeIngredientSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  recipeId: {
    type: DataTypes.INTEGER,
    field: 'recipe_id',
    references: {
      model: RECIPE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  ingredientId: {
    type: DataTypes.INTEGER,
    field: 'ingredient_id',
    references: {
      model: INGREDIENT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  amount: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  }
};

class RecipeIngredient extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: RECIPE_INGREDIENT_TABLE,
      modelName: 'RecipeIngredient',
      timestamps: false,
    };
  }
}

module.exports = {
  RECIPE_INGREDIENT_TABLE,
  RecipeIngredientSchema,
  RecipeIngredient,
};
