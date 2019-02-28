const RouterCarrito = require('express').Router();
const Usuario = require('./modelUsuario.js');
const Articulo = require('./modelArticulos.js');
const Carrito = require('./modelCarrito.js');
let ObjectId = require('mongoose').Types.ObjectId;

//Obtener todos los eventos
RouterCarrito.get('/all', function(req, res) {
  req.session.reload(function(err) {
      if(req.session.user){
        if(err){
          res.json({respuesta: "logout"})
        }else{
          Usuario.findOne({user: req.session.user}).exec({}, function(error, doc){
            if(error){
              res.json({respuesta: "logout"})
            }else{
              Carrito.find({user: doc._id}).exec(function(err, carrito) {
                if (err) {
                    res.sendStatus(500)
                    res.json({respuesta: "Error al intentar consultar los artículos"})
                }
                res.json({respuesta: "OK", carrito})
              })
            }
          })
        }
      }else{
        res.json({respuesta: "logout"}); //Devolver mensaje "logout"
        res.end()
      }
    })

})

// Agregar un Articulo
RouterCarrito.post('/new', function(req, res) {
  req.session.reload(function(err) {
    if(err){
      console.log(err);
      res.json({respuesta: "logout"});
    }else{
      Usuario.findOne({user:req.session.user}).exec({}, function(error, doc){
        let carrito = new Carrito({
          producto: req.body.producto.producto,
          precio: req.body.producto.precio,
          imagen: req.body.producto.imagen,
          unidades: req.body.producto.unidades,
          cantidad: req.body.cantidad,
          producto_id: req.body.producto._id,
          user: doc._id
        })
        console.log(carrito);
        carrito.save(function(error) {
          if (error) {
            console.log(error)
            res.sendStatus(500)
            res.json({respuesta: "Error al intentar guardar los artículos"})
          }
          res.json({respuesta: "OK"});
        })
      })
    }
  })
})

// Eliminar un Articulo por su id
RouterCarrito.post('/delete', function(req, res) {
  let id = req.body._id
  console.log(req.body);

  req.session.reload(function(err) {
    if(err){
      console.log(err)
      res.json({respuesta: "logout"})
    }else{
      Carrito.deleteOne({_id: id}, function(error) {
          if(error) {
            console.log(error)
            res.sendStatus(500)
            res.json({respuesta: "No se pudo realizar la eliminacion de los datos"})
          }
          res.json({respuesta: "OK"});
      })
    }
  })
})



module.exports = RouterCarrito
