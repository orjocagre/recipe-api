const boom = require('@hapi/boom');
const sharp = require('sharp');
const path = require('path');
const { models } = require('./../libs/sequelize');
const { User } = require('../db/models/user.model');

class RecipesService {
  constructor() {}

  helperImg = (filePath, fileName, size = 300) => {
    return new Promise((resolve, reject) => {
      const newPath = path.resolve(__dirname, '../optimize') + `/${fileName}`;
      sharp(filePath)
        .resize(size)
        .toFile(newPath, (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(fileName);
          }
        });
    });
  };

  async find() {
    const res = await models.Recipe.findAll({
      include: [
        'ingredients',
        {
          model: User,
          attributes: ['userName'],
          as: 'user',
        },
      ],
    });
    res.map((recipe) => {
      if (recipe.image)
        recipe.image = 'http://localhost:3000/images/' + recipe.image;
    });
    return res;
  }

  async findOne(id) {
    const recipe = await models.Recipe.findByPk(id, {
      include: 'ingredients',
    });
    if (!recipe) {
      throw boom.notFound('recipe not found');
    }
    if (recipe.image)
      recipe.image = 'http://localhost:3000/images/' + recipe.image;
    return recipe;
  }

  async create(data, file) {
    let newRecipe;

    if (file) {
      try {
        const newPath = await this.helperImg(
          file.path,
          `resize-${file.filename}`,
          400,
        );
        data.image = newPath;
        console.log('newPath ' + newPath);
        console.log(data);
        newRecipe = await models.Recipe.create(data);
      } catch (err) {
        throw new Error('No se pudo guardar la imagen');
      }
    } else {
      newRecipe = await models.Recipe.create(data);
    }

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
