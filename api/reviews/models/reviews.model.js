const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    product_id:String,
    rating: Number,
    email: String,
    review_id: Number,
    description : String,
    date_created: Date,
    date_updated: Date
});

reviewSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
reviewSchema.set('toJSON', {
    virtuals: true
});

reviewSchema.findById = function (cb) {
    return this.model('reviews').find({id: this.id}, cb);
};

const Review = mongoose.model('Reviews', reviewSchema);


exports.findByProductId = (productId) => {
    return Review.find({product_id: productId});
};
exports.findById = (id) => {
    return Review.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.getReviewByProductIDnEmail = (data) => {
    return new Promise((resolve, reject) => {
        Review.find({product_id: data.product_id,email:data.email},
            (function(err,review){
        if(err){
            reject(err);
        }
        else if(review){
            resolve(review.length>0 ? {"status":true} : {"status":false});
        }
    }));
});
}

exports.getAvgRatingByProductId = () => {
 return new Promise((resolve,reject)=>{
    this.list()
    .then(arr=>{
        console.log(arr);
        var sums = {}, counts = {}, results = [], name;
    for (var i = 0; i < arr.length; i++) {
        name = arr[i].product_id;
        if (!(name in sums)) {
            sums[name] = 0;
            counts[name] = 0;
        }
        sums[name] += parseInt(arr[i].rating);
        counts[name]++;
    }
    for(name in sums) {
        results.push({ product_id: name, avgRating: sums[name] / counts[name] });
    }
    console.log(results);
    resolve(results);
    })
});
}

exports.createReview = (reviewData) => {
    const review = new Review(reviewData);
    return review.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Review.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, reviews) {
                if (err) {
                    reject(err);
                } else {
                    resolve(reviews);
                }
            })
    });
};

exports.patchreview = (id, reviewData) => {
    return new Promise((resolve, reject) => {
        Review.findById(id, function (err, review) {
            if (err) reject(err);
            for (let i in reviewData) {
                review[i] = reviewData[i];
            }
            Review.save(function (err, updatedreview) {
                if (err) return reject(err);
                resolve(updatedreview);
            });
        });
    })

};

exports.removeById = (reviewId) => {
    return new Promise((resolve, reject) => {
        Review.remove({_id: reviewId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

