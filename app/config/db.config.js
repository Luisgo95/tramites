const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.database,
    process.env.user,
    process.env.clave, {
        host: process.env.host,
        dialect: 'mysql'
    });
const db = {};
db.Op = Sequelize.Op;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const ventas = require("../semillas/s_administracion");

db.Usuario = require('../models/m_usuario')(sequelize, Sequelize);
db.Lugar = require('../models/m_lugar')(sequelize, Sequelize);
db.Recibo = require('../models/m_recibo')(sequelize, Sequelize);
db.Persona = require('../models/m_persona')(sequelize, Sequelize);
db.TipoTramite = require('../models/m_tipo_tramite')(sequelize, Sequelize);
db.Traslado = require('../models/m_traslado')(sequelize, Sequelize);
db.Gestion = require('../models/m_gestion')(sequelize, Sequelize);
db.Tramite = require('../models/m_tramite')(sequelize, Sequelize);
db.SpanishError = require('../models/m_spanish_error')(sequelize, Sequelize);
db.Temporal = require('../models/m_temporal')(sequelize, Sequelize);
db.Empresa = require('../models/m_empresa')(sequelize, Sequelize);
db.Egreso = require('../models/m_egreso')(sequelize, Sequelize);
db.Deposito = require('../models/m_deposito')(sequelize, Sequelize);


db.Tramite.hasMany(db.Traslado, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.Traslado.belongsTo(db.Tramite);
db.TipoTramite.hasMany(db.Tramite, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.Tramite.belongsTo(db.TipoTramite);
db.Gestion.hasMany(db.Tramite, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.Tramite.belongsTo(db.Gestion);
db.Lugar.hasMany(db.Traslado, { foreignKey: { name: 'LugarOrigenId', allowNull: false, }, onDelete: 'RESTRICT' });
db.Traslado.belongsTo(db.Lugar, { foreignKey: { name: 'LugarOrigenId', allowNull: false } });

db.Lugar.hasMany(db.Traslado, { foreignKey: { name: 'LugarDestinoId', allowNull: false, }, onDelete: 'RESTRICT' });
db.Traslado.belongsTo(db.Lugar, { foreignKey: { name: 'LugarDestinoId', allowNull: false } });

db.Persona.hasMany(db.Gestion, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.Gestion.belongsTo(db.Persona);
db.Gestion.hasMany(db.Recibo, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.Recibo.belongsTo(db.Gestion);
db.Usuario.hasMany(db.Gestion, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });
db.Gestion.belongsTo(db.Usuario);
db.Usuario.hasMany(db.Recibo, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });

db.Recibo.belongsTo(db.Usuario);

db.Empresa.hasMany(db.Usuario, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });

db.Usuario.belongsTo(db.Empresa);

db.Usuario.hasMany(db.Egreso, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });

db.Egreso.belongsTo(db.Usuario);

db.Usuario.hasMany(db.Deposito, { foreignKey: { allowNull: false }, onDelete: 'RESTRICT' });

db.Deposito.belongsTo(db.Usuario);


if (process.env.resetDb == "Si") {
    ventas.sembraradmin(db);
}

module.exports = db;