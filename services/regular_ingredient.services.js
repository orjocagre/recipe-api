const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class RegularIngredientsService {
  constructor() {}

  async find() {
    const res = await models.RegularIngredient.findAll();
    return res;
  }

  async findOne(id) {
    const regularIngredient = await models.RegularIngredient.findByPk(id);
    if (!regularIngredient) {
      throw boom.notFound('regularIngredient not found');
    }
    return regularIngredient;
  }

  async create(data) {
    const newRegularIngredient = await models.RegularIngredient.create(data);
    return newRegularIngredient;
  }

  // async update(id, changes) {
  //   const regularIngredient = await this.findOne(id);
  //   const res = await regularIngredient.update(changes);
  //   return res;
  // }

  async delete(id) {
    const regularIngredient = await this.findOne(id);
    await regularIngredient.destroy();
    return { id };
  }
}

module.exports = RegularIngredientsService;
