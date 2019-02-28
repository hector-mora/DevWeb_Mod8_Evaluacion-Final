const RouterArticulos = require('express').Router();
const Usuario = require('./modelUsuario.js');
const Articulo = require('./modelArticulos.js');

//Obtener todos los Articulos
RouterArticulos.get('/all', function(req, res) {
  req.session.reload(function(err) {
      if(req.session.user){
        if(err){
          res.json({respuesta: "logout"})
        }else{
          Usuario.findOne({user: req.session.user}).exec({}, function(error, doc){
            if(error){
              res.json({respuesta: "logout"})
            }else{
              Articulo.find().exec(function(err, articulos) {
                if (err) {
                    res.sendStatus(500)
                    res.json({respuesta: "Error al intentar consultar los artículos"})
                }
                res.json({respuesta: "OK", articulos})
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

//Obtener 1 Articulo
RouterArticulos.get('/:id', function(req, res) {
  console.log(req.params);

  req.session.reload(function(err) {
      if(req.session.user){
        if(err){
          res.json({respuesta: "logout"})
        }else{
          Usuario.findOne({user: req.session.user}).exec({}, function(error, doc){
            if(error){
              res.json({respuesta: "logout"})
            }else{
              Articulo.findOne({_id: req.params.id}).exec(function(err, articulo) {
                if (err) {
                    res.json({respuesta: "Error al intentar consultar los artículos"})
                }
                res.json({respuesta: "OK", articulo})
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

//Actualizar Articulo
RouterArticulos.post('/update', function(req, res) {
  req.session.reload(function(err) {
    if(err){
      console.log(err)
      res.json({respuesta: "logout"})
    }else{
      Articulo.findOne({_id:req.body._id}).exec((error, result) => {
        let id = req.body._id,
            unidades = (req.body.unidades - req.body.cantidad)

        if (error){
          res.json({respuesta: "Error al intentar consultar el artículo"})
        }else{
          console.log("articulos => "+id+" => "+req.body.unidades+" - "+req.body.cantidad+" => "+unidades);
          Articulo.update({_id: id}, {unidades: unidades}, (error, result) => {
            if (error){
              res.json({respuesta: "Error al intentar actualizar el artículo"})
            }else{
              res.json({respuesta: "OK"});
            }
          })
        }
      })
    }
  })
})

module.exports = RouterArticulos
