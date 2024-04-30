const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const RECIPE_TABLE = 'recipes';

const RecipeSchema = {
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
  procedure: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  servings: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
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
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    field: 'is_public',
    allowNull: false,
    defaultValue: false,
  },
};

class Recipe extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
    this.belongsToMany(models.Ingredient, {
      as: 'ingredients',
      through: models.RecipeIngredient,
      foreignKey: 'recipeId',
      otherKey: 'ingredientId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: RECIPE_TABLE,
      modelName: 'Recipe',
      timestamps: false,
    };
  }
}

module.exports = { RECIPE_TABLE, RecipeSchema, Recipe };
