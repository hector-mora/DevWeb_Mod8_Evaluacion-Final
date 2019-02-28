const path = require('path'),
      bodyParser = require('body-parser'),
      express = require('express'),
      session = require('express-session'),
      MongoClient = require('mongodb').MongoClient,
      mongoose = require('mongoose'),
      RUsuarios = require('./server/rutasUsuarios.js'),
      RArticulos = require('./server/rutasArticulos.js');
      RCarrito = require('./server/rutasCarrito.js');

const app = express()

app.set('port', process.env.PORT || 3000);

app.use(session({ secret: 'secret-pass', cookie: { maxAge: 3600000 }, resave: false, saveUninitialized: true }));

mongoose.connect('mongodb://localhost/tienda', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/usuarios', RUsuarios);
app.use('/articulos', RArticulos);
app.use('/carrito', RCarrito);

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res, next) => {
  res.sendFile(path.resolve('./public/index.html'));
});

app.listen(app.get('port'), () => console.log(`Server is listeng on port: ${app.get('port')}`));
