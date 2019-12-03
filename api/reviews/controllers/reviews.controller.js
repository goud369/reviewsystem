const ReviewModel = require('../models/reviews.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    ReviewModel.createReview(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.getReviewByProductIDnEmail = (req,res) => {
    ReviewModel.getReviewByProductIDnEmail(req.body)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getAvgRatingByProductId = (req, res) =>{
    ReviewModel.getAvgRatingByProductId()
    .then((result) => {
        res.status(200).send(result);
    });
}

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    ReviewModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    ReviewModel.findById(req.params.reviewId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByProductId = (req, res) => {
    ReviewModel.findByProductId(req.params.productId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    ReviewModel.patchUser(req.params.reviewId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    ReviewModel.removeById(req.params.reviewId)
        .then((result)=>{
            res.status(204).send({});
        });
};