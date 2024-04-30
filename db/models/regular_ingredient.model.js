const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { INGREDIENT_TABLE } = require('./ingredient.model');
const REGULAR_INGREDIENT_TABLE = 'regular_ingredients';

const RegularIngredientSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
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
};

class RegularIngredient extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: REGULAR_INGREDIENT_TABLE,
      modelName: 'RegularIngredient',
      timestamps: false,
    };
  }
}

module.exports = {
  REGULAR_INGREDIENT_TABLE,
  RegularIngredientSchema,
  RegularIngredient,
};
