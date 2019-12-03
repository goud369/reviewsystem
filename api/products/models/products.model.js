const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const productSchema = new Schema({
        product_id : Number,
        product_name : String,
        image_url : String,
        rented_from : Date,
        rented_to : Date,
        rented_for : String,
        location : String,
        price : String,
        total : String
});

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
productSchema.set('toJSON', {
    virtuals: true
});

productSchema.findById = function (cb) {
    return this.model('products').find({id: this.id}, cb);
};

const Product = mongoose.model('products', productSchema);


exports.findByProductId = (productId) => {
    return Product.find({product_id: productId});
};
exports.findById = (id) => {
    return Product.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createproduct = (productData) => {
    const product = new Product(productData);
    return product.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Product.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, products) {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
    });
};

exports.patchproduct = (id, productData) => {
    return new Promise((resolve, reject) => {
        Product.findById(id, function (err, product) {
            if (err) reject(err);
            for (let i in productData) {
                product[i] = productData[i];
            }
            Product.save(function (err, updatedproduct) {
                if (err) return reject(err);
                resolve(updatedproduct);
            });
        });
    })

};

exports.removeById = (productId) => {
    return new Promise((resolve, reject) => {
        Product.remove({_id: productId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

