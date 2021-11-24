const Joi = require('joi');

module.exports = {
  // GET /v1/products
  listProducts: {
    query: Joi.object({
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      price: Joi.number(),
    }),
  },

  // POST /v1/products
  createProduct: {
    body: Joi.object({
      price: Joi.number(),
      name: Joi.string().max(128),
    }),
  },

  // PUT /v1/products/:productId
  replaceProduct: {
    body: Joi.object({
      price: Joi.number(),
      name: Joi.string().max(128),
    }),
    params: Joi.object({
      productId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    }),
  },

  // PATCH /v1/products/:productId
  updateProduct: {
    body: Joi.object({
      price: Joi.number(),
      name: Joi.string().max(128),
    }),
    params: Joi.object({
      productId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    }),
  },
};
