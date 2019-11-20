const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  investedAmount: {
    type: Number,
    required: true
  },
  totalinvestedAmount: {
    type: Number,
  },
  date: {
    type: Date,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

const ProductModel = mongoose.model('ProductIzabelaBrant', productSchema);

class Product {
  static createNew(product) {
    return new Promise((resolve, reject) => {
      ProductModel.create(product).then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  }

  static updateById(id, product) {
    return new Promise((resolve, reject) => {
      ProductModel.findByIdAndUpdate(product, id).then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      ProductModel.find({}).then((results) => {
        resolve(results);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  static getAllById(id) {
    return new Promise((resolve, reject) => {
      ProductModel.find({
        "user_id": id
      }).then((results) => {
        resolve(results);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  static removeById(id) {
    return new Promise((resolve, reject) => {
      ProductModel.findOneAndRemove({_id:id}, function(err){
        if(err){
          console.log(err)
        }
      });
    });
  }
}

module.exports = Product;
