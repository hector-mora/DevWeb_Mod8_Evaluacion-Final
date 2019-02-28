const mongoose = require('mongoose')
//const autoIncrement = require('mongoose-auto-increment');
const Usuario = require('./modelUsuario.js');
const Articulos = require('./modelArticulos.js');

//connection = mongoose.createConnection('mongodb://localhost/tienda', { useNewUrlParser: true });

const Schema = mongoose.Schema;

let CarritoSchema = new Schema({
  producto: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
  unidades: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  producto_id: { type: Schema.ObjectId, ref: "articulos" },
  user: { type: Schema.ObjectId, ref: "usuarios" }
});

//autoIncrement.initialize(connection)
//CarritoSchema.plugin(autoIncrement.plugin, {model: 'eventos', startAt: 1} );

let CarritoModel = mongoose.model('carrito', CarritoSchema);

module.exports = CarritoModel;
