const { User, UserSchema } = require("./user.model");
const { Ingredient, IngredientSchema } = require("./ingredient.model");
const { Recipe, RecipeSchema } = require("./recipe.model");
const { RegularIngredient, RegularIngredientSchema } = require("./regular_ingredient.model");
const { RecipeIngredient, RecipeIngredientSchema } = require("./recipe_ingredient.model");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Ingredient.init(IngredientSchema, Ingredient.config(sequelize));
  Recipe.init(RecipeSchema, Recipe.config(sequelize));
  RegularIngredient.init(RegularIngredientSchema, RegularIngredient.config(sequelize));
  RecipeIngredient.init(RecipeIngredientSchema, RecipeIngredient.config(sequelize));

  User.associate(sequelize.models);
  Recipe.associate(sequelize.models);
  Ingredient.associate(sequelize.models);

}

module.exports = setupModels;
