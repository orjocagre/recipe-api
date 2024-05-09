const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class IngredientsService {
  constructor() {}

  async find() {
    const res = await models.Ingredient.findAll({
      include: 'recipes'
    });
    return res;
  }

  async findOne(id) {
    const ingredient = await models.Ingredient.findByPk(id, {
      include: 'recipes'
    });
    if (!ingredient) {
      throw boom.notFound('ingredient not found');
    }
    return ingredient;
  }

  async create(data) {
    const newIngredient = await models.Ingredient.create(data);
    return newIngredient;
  }

  async update(id, changes) {
    const ingredient = await this.findOne(id);
    const res = await ingredient.update(changes);
    return res;
  }

  async delete(id) {
    const ingredient = await this.findOne(id);
    await ingredient.destroy();
    return { id };
  }
}

module.exports = IngredientsService;
