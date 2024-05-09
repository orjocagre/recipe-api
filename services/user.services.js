const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class UsersService {
  constructor() {}

  async login(userName, password) {
    const user = await models.User.findOne({
      where: {
        userName,
        password,
      },
    });
    return user;
  }

  async find() {
    const res = await models.User.findAll({
      include: ['regularIngredients'],
    });
    return res;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['regularIngredients'],
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const res = await user.update(changes);
    return res;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;
