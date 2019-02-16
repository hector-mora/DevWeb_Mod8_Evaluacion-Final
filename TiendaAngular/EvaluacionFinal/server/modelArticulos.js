const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let ArticuloSchema = new Schema({
  producto: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
  unidades: { type: Number, required: true }
});

//autoIncrement.initialize(connection)
//CarritoSchema.plugin(autoIncrement.plugin, {model: 'eventos', startAt: 1} );

let ArticuloModel = mongoose.model('articulo', ArticuloSchema);

module.exports = ArticuloModel;
