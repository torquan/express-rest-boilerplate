const httpStatus = require('http-status');
const { omit } = require('lodash');
const Product = require('../models/product.model');

/**
 * Load product and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const product = await Product.get(id);
    req.locals = { product };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get product
 * @public
 */
exports.get = (req, res) => res.json(req.locals.product.transform());

/**
 * Create new product
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(httpStatus.CREATED);
    res.json(savedProduct.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Replace existing product
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { product } = req.locals;
    const newProduct = new Product(req.body);
    const newProductObject = omit(newProduct.toObject(), '_id');

    await product.updateOne(newProductObject, { override: true, upsert: true });
    const savedProduct = await Product.findById(product._id);

    res.json(savedProduct.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing product
 * @public
 */
exports.update = (req, res, next) => {
  const product = Object.assign(req.locals.product, req.body);

  product
    .save()
    .then((savedProduct) => res.json(savedProduct.transform()))
    .catch((e) => next(e));
};

/**
 * Get product list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const products = await Product.list(req.query);
    const transformedProducts = products.map((product) => product.transform());
    res.json(transformedProducts);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product
 * @public
 */
exports.remove = (req, res, next) => {
  const { product } = req.locals;

  product
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};
