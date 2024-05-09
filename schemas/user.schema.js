const Joi = require('joi');

const id = Joi.number().integer();
const userName = Joi.string().min(3).max(30);
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const isAdmin = Joi.boolean();

const createUserSchema = Joi.object({
  userName: userName.required(),
  password: password.required(),
  isAdmin,
});

const updateUserSchema = Joi.object({
  userName,
  password,
  isAdmin,
});

const loginUserSchema = Joi.object({
  userName: userName.required(),
  password: password.required(),
})

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, loginUserSchema };
