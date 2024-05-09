const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class RecipesService {
  constructor() {}

  async find() {
    const res = await models.Recipe.findAll({
      include: 'ingredients'
    });
    return res;
  }

  async findOne(id) {
    const recipe = await models.Recipe.findByPk(id, {
      include: 'ingredients'
    });
    if (!recipe) {
      throw boom.notFound('recipe not found');
    }
    return recipe;
  }

  async create(data) {
    const newRecipe = await models.Recipe.create(data);
    return newRecipe;
  }

  async update(id, changes) {
    const recipe = await this.findOne(id);
    const res = await recipe.update(changes);
    return res;
  }

  async delete(id) {
    const recipe = await this.findOne(id);
    await recipe.destroy();
    return { id };
  }
}

module.exports = RecipesService;
