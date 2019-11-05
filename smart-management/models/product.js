const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sigla:{
    type: String,
    required: true
  },
  quantidade:{
    type: Number,
    required: true
  },
  valor:{
    type: Number,
    required: true
  },
  data:{
    type: Date,
    required: true
  },
}, {timestamps:true});

const ProductModel = mongoose.model('ProductIzabelaBrant', productSchema);

class Product{
  static createNew(product){
    return new Promise((resolve, reject) =>{
      ProductModel.create(product).then((result) =>{
        resolve(result);
      }).catch(err =>{
        reject(err);
      });
    });
  }

  static updateById(id, product){
    return new Promise((resolve, reject) =>{
      ProductModel.findByIdAndUpdate(product, id).then((result) =>{
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  }

  static getAll(){
    return new Promise((resolve, reject) => {
      ProductModel.find({}).then((results) => {
        resolve(results);
      }).catch((err) =>{
        reject(err);
      });
    });
  }
}

module.exports = Product;
