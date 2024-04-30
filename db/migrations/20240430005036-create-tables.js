'use strict';
const { USER_TABLE, UserSchema } = require('../models/user.model');
const { RECIPE_TABLE, RecipeSchema } = require('../models/recipe.model');
const { INGREDIENT_TABLE, IngredientSchema } = require('../models/ingredient.model');
const { RECIPE_INGREDIENT_TABLE, RecipeIngredientSchema } = require('../models/recipe_ingredient.model');
const { REGULAR_INGREDIENT_TABLE, RegularIngredientSchema } = require('../models/regular_ingredient.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(RECIPE_TABLE, RecipeSchema);
    await queryInterface.createTable(INGREDIENT_TABLE, IngredientSchema);
    await queryInterface.createTable(RECIPE_INGREDIENT_TABLE, RecipeIngredientSchema);
    await queryInterface.createTable(REGULAR_INGREDIENT_TABLE, RegularIngredientSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(RECIPE_TABLE);
    await queryInterface.dropTable(INGREDIENT_TABLE);
    await queryInterface.dropTable(RECIPE_INGREDIENT_TABLE);
    await queryInterface.dropTable(REGULAR_INGREDIENT_TABLE);
  }
};
