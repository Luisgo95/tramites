require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*var whitelist = ['localhost:4200']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));*/
// const RouteRol = require('./app/routes/AD/r_rol');

const RouteUsuario = require('./app/routes/r_usuario');
const RouteGestion = require('./app/routes/r_gestion');
const RouteLugar = require('./app/routes/r_lugar');
const RoutePersona = require('./app/routes/r_persona');
const RouteTipoTramite = require('./app/routes/r_tipo_tramite');
const RouteTraslado = require('./app/routes/r_traslado');
const RouteTramite = require('./app/routes/r_tramite');
const RouteRecibo = require('./app/routes/r_recibo');
const RouteTemporal = require('./app/routes/r_temporal');
const RouteEmpresa = require('./app/routes/r_empresa');
const RouteEgreso = require('./app/routes/r_egreso');
const RouteDeposito = require('./app/routes/r_deposito');


app.use('/usuarios', RouteUsuario);
app.use('/personas', RoutePersona);
app.use('/gestiones', RouteGestion);
app.use('/lugares', RouteLugar);
app.use('/tipos-tramites', RouteTipoTramite);
app.use('/traslados', RouteTraslado);
app.use('/tramites', RouteTramite);
app.use('/recibos', RouteRecibo);
app.use('/temporal', RouteTemporal);
app.use('/empresas', RouteEmpresa);
app.use('/egresos', RouteEgreso);
app.use('/depositos', RouteDeposito);


app.use((req, res, net) => {
    const error = new Error('Not Found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;