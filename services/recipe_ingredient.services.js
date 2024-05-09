const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class RecipeIngredientsService {
  constructor() {}

  async find() {
    const res = await models.RecipeIngredient.findAll();
    return res;
  }

  async findOne(id) {
    const recipeIngredient = await models.RecipeIngredient.findByPk(id);
    if (!recipeIngredient) {
      throw boom.notFound('recipeIngredient not found');
    }
    return recipeIngredient;
  }

  async create(data) {
    const newRecipeIngredient = await models.RecipeIngredient.create(data);
    return newRecipeIngredient;
  }

  // async update(id, changes) {
  //   const recipeIngredient = await this.findOne(id);
  //   const res = await recipeIngredient.update(changes);
  //   return res;
  // }

  async delete(id) {
    const recipeIngredient = await this.findOne(id);
    await recipeIngredient.destroy();
    return { id };
  }
}

module.exports = RecipeIngredientsService;
