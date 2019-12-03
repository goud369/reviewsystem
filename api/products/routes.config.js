const ProductController = require('./controllers/products.controller');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {
    app.get('/products', [
        ValidationMiddleware.validJWTNeeded,
        ProductController.list
    ]);
    app.get('/product/:productId', [
        ValidationMiddleware.validJWTNeeded,
        ProductController.getByProductId
    ]);
};
