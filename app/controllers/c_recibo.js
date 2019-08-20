const db = require('../config/db.config.js');
const SpanishError = require('./c_spanish_error');
const Recibo = db.Recibo;
const sequelize = db.sequelize;
exports.create = (req, res) => {
    Recibo.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            SpanishError.resolver(err, res);
        });
};

exports.findAll = (req, res) => {
    Recibo.findAll().then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};


exports.findById = (req, res) => {
    Recibo.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.update = (req, res) => {
    Recibo.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.delete = (req, res) => {
    const id = req.params.Id;
    Recibo.destroy({
        where: { id: id }
    }).then(response => {
        if (response) {
            res.status(200).json({ codigo: 200, status: "Exito", mensaje: "Registro eliminado correctamente" });
        } else res.status(200).json({ codigo: 200, status: "Error", mensaje: "Registro no encontrado" });
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};
exports.InRecibo = (req, res) => {
    sequelize.query('call InRecibos(:Cantidad,:IdGestion,:UsuarioId,:EmpresaId);',
  { 
    replacements: { Cantidad: req.body.Cantidad,
    IdGestion:req.body.IdGestion,
    UsuarioId:req.body.UsuarioId,
    EmpresaId :req.body.EmpresaId},type: sequelize.QueryTypes.fieldMap}
).then(Response => {
  console.log(Response)
  res.status(200).json(Response);

}).catch(err => {
    res.json(err);
});
};