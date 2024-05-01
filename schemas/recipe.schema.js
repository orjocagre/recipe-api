const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(2).max(130);
const procedure = Joi.string().min(2).max(2000);
const servings = Joi.number().integer().min(1).max(1000);
const time = Joi.number().integer().min(1).max(300);
const image = Joi.string().uri();
const userId = Joi.number().integer();
const isPublic = Joi.boolean();

const createRecipeSchema = Joi.object({
  name: name.required(),
  procedure: procedure.required(),
  servings: servings.required(),
  time: time.required(),
  image,
  userId,
  isPublic,
});

const updateRecipeSchema = Joi.object({
  name,
  procedure,
  servings,
  time,
  image,
  userId,
  isPublic,
});

const getRecipeSchema = Joi.object({
  id: id.required(),
});

module.exports = { createRecipeSchema, updateRecipeSchema, getRecipeSchema };
