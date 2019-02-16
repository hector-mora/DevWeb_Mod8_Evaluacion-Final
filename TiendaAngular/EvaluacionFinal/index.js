const //http = require('http'),
      path = require('path'),
      express = require('express'),
      bodyParser = require('body-parser'),
      //cors = require('cors'),
      session = require('express-session'),
      MongoClient = require('mongodb').MongoClient,
      mongoose = require('mongoose'),
      RUsuarios = require('./server/rutasUsuarios.js'),
      RArticulos = require('./server/rutasArticulos.js');
      RCarrito = require('./server/rutasCarrito.js');

const PORT = 3000;
const app = express()//,
      //Server = http.createServer(app);

app.use(session({ secret: 'secret-pass', cookie: { maxAge: 3600000 }, resave: false, saveUninitialized: true }));

mongoose.connect('mongodb://localhost/tienda', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(cors());
app.use('/usuarios', RUsuarios);
app.use('/articulos', RArticulos);
app.use('/carrito', RCarrito);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res, next) => {
  res.sendFile(path.resolve('./client/dist/index.html'));
});


app.listen(PORT, () => console.log('Server is listeng on port: ' + PORT));
