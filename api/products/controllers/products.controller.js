const ProductModel = require('../models/Products.model');

exports.insert = (req, res) => {
    ProductModel.createProduct(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    ProductModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    return User.find({email: email});
    ProductModel.findById(req.params.productId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByProductId = (req, res) => {
    ProductModel.findByProductId(req.params.productId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    ProductModel.patchUser(req.params.productId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    ProductModel.removeById(req.params.productId)
        .then((result)=>{
            res.status(204).send({});
        });
};