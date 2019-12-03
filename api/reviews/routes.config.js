const ReviewsController = require('./controllers/reviews.controller');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {
    app.post('/reviews', [
        ValidationMiddleware.validJWTNeeded,
        ReviewsController.insert
    ]);
    app.post('/reviewscheck', [
        ValidationMiddleware.validJWTNeeded,
        ReviewsController.getReviewByProductIDnEmail
    ]);
    app.get('/reviews/:productId', [
        ValidationMiddleware.validJWTNeeded,
        ReviewsController.getByProductId
    ]);
    app.get('/reviewavg', [
        ValidationMiddleware.validJWTNeeded,
        ReviewsController.getAvgRatingByProductId
    ]);
};
