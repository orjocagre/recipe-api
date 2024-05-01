const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(2).max(70);
const userId = Joi.number().integer();
const isPublic = Joi.boolean();
const isCommon = Joi.boolean();

const createIngredientSchema = Joi.object({
  name: name.required(),
  userId,
  isPublic,
  isCommon,
});

const updateIngredientSchema = Joi.object({
  name,
  userId,
  isPublic,
  isCommon,
});

const getIngredientSchema = Joi.object({
  id: id.required(),
});

module.exports = { createIngredientSchema, updateIngredientSchema, getIngredientSchema };
