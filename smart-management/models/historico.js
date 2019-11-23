const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  data: {
    type: [{date:String, value: Number}],
    required: true
  },
},{
  timestamps: true
});

const HistoricoModel = mongoose.model('ProductIzabelaBrant', productSchema);

class Historico {
  static createNew(product) {
    return new Promise((resolve, reject) => {
      HistoricoModel.create(product).then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  }

  static updateById(id, product) {
    return new Promise((resolve, reject) => {
      HistoricoModel.findByIdAndUpdate(product, id).then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      HistoricoModel.find({}).then((results) => {
        resolve(results);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  static getAllById(id) {
    return new Promise((resolve, reject) => {
      HistoricoModel.find({
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
      HistoricoModel.findOneAndRemove({_id:id}, function(err){
        if(err){
          console.log(err)
        }
      });
    });
  }
}

module.exports = Product;
