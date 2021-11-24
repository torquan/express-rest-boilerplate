const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/product.controller');
const {
  listProducts,
  createProduct,
  replaceProduct,
  updateProduct,
} = require('../../validations/product.validation');

const router = express.Router();

/**
 * Load product when API with productId route parameter is hit
 */
router.param('productId', controller.load);

router
  .route('/')
  /**
   * @api {get} v1/products List Products
   * @apiDescription Get a list of products
   * @apiVersion 1.0.0
   * @apiName ListProducts
   * @apiGroup Product
   * @apiPermission public
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Products per page
   * @apiParam  {String}             [name]       Product's name
   * @apiParam  {Number}             [price]      Product's price
   *
   * @apiSuccess {Object[]} products List of products.
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   */
  .get(validate(listProducts), controller.list)
  /**
   * @api {post} v1/products Create Product
   * @apiDescription Create a new product
   * @apiVersion 1.0.0
   * @apiName CreateProduct
   * @apiGroup Product
   * @apiPermission public
   *
   * @apiParam  {String{..128}}      [name]    Product's name
   * @apiParam  {Number}  [price]    Product's price

   *
   * @apiSuccess (Created 201) {String}  id         Product's id
   * @apiSuccess (Created 201) {String}  name       Product's name
   * @apiSuccess (Created 201) {Number}  price      Product's price
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   */
  .post(validate(createProduct), controller.create);

router
  .route('/:productId')
  /**
   * @api {get} v1/products/:id Get Product
   * @apiDescription Get product information
   * @apiVersion 1.0.0
   * @apiName GetProduct
   * @apiGroup Product
   * @apiPermission public
   *
   * @apiSuccess {String}  id         Product's id
   * @apiSuccess {String}  name       Product's name
   * @apiSuccess {Number}  price      Product's price
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Not Found 404)    NotFound     Product does not exist
   */
  .get(controller.get)
  /**
   * @api {put} v1/products/:id Replace Product
   * @apiDescription Replace the whole product document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceProduct
   * @apiGroup Product
   * @apiPermission public
   *
   * @apiParam  {String{..128}}      [name]    Product's name
   * @apiParam  {Number}             [price]    Product's price
   *
   * @apiSuccess {String}  id         Product's id
   * @apiSuccess {String}  name       Product's name
   * @apiSuccess {Number}  price      Product's price
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Not Found 404)    NotFound     Product does not exist
   */
  .put(validate(replaceProduct), controller.replace)
  /**
   * @api {patch} v1/products/:id Update Product
   * @apiDescription Update some fields of a product document
   * @apiVersion 1.0.0
   * @apiName UpdateProduct
   * @apiGroup Product
   * @apiPermission public
   *
   * @apiParam  {String{..128}}      [name]    Product's name
   * @apiParam  {Number}             [price]    Product's price
   *
   * @apiSuccess {String}  id         Product's id
   * @apiSuccess {String}  name       Product's name
   * @apiSuccess {Number}  price      Product's price
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Not Found 404)    NotFound     Product does not exist
   */
  .patch(validate(updateProduct), controller.update)
  /**
   * @api {patch} v1/products/:id Delete Product
   * @apiDescription Delete a product
   * @apiVersion 1.0.0
   * @apiName DeleteProduct
   * @apiGroup Product
   * @apiPermission public
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Not Found 404)    NotFound      Product does not exist
   */
  .delete(controller.remove);

module.exports = router;
