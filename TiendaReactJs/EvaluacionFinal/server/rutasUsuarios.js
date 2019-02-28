const RouterUsuarios = require('express').Router();
const Usuario = require('./modelUsuario.js');

//validar un usuario
RouterUsuarios.post('/', function(req, res) {
  let sess = req.session;

  Usuario.find({user: req.body.email}).count(function(err, count){
    if (err) {
      res.status(500)
      res.json(err)
    }
    if(count>0){
      Usuario.findOne({user: req.body.email}).exec(function(err, doc){
        if(doc.pass == req.body.password){
          sess.user = req.body.email;
          res.json({respuesta: "Validado"})
        }else res.json({respuesta: "Contraseña invalida"})
      })
    }else res.json({respuesta: "Usuario invalido"})

  });
})

//cerrar sesion de usuario
RouterUsuarios.post('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.log(err)
      res.json({respuesta: "error al intentar cerrar la sesión"})
    } else {
      req.session = null
      res.json({respuesta: "logout"})
      res.end()
    }
  });

})

module.exports = RouterUsuarios
