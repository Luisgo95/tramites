const db = require('../config/db.config.js');
const SpanishError = require('./c_spanish_error');
const Temporal = db.Temporal;


exports.create = (req, res) => {
    Temporal.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            SpanishError.resolver(err, res);
        });
};


exports.findAll = (req, res) => {
    Temporal.findAll().then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.findById = (req, res) => {
    Temporal.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.update = (req, res) => {
    Temporal.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.delete = (req, res) => {
    const id = req.params.Id;
    Temporal.destroy({
        where: { id: id }
    }).then(response => {
        if (response) {
            res.status(200).json({ codigo: 200, status: "Exito", mensaje: "Registro eliminado correctamente" });
        } else res.status(200).json({ codigo: 200, status: "Error", mensaje: "Registro no encontrado" });
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.TotalGestion = (req, res) => Temporal.findAll({
    attributes: [
        [Temporal.sequelize.fn('SUM', Temporal.sequelize.col('temporales.Precio')), 'totalPrecio'],
        [Temporal.sequelize.fn('SUM', Temporal.sequelize.col('temporales.Descuento')), 'totalDescuento']
    ],
    where: {
        Idusuario: req.params.Id
    }
}).then(sum => {
    res.status(200).json(sum);
}).catch(err => {
    SpanishError.resolver(err, res);
});

exports.porUsuario = (req, res) => {
    Temporal.findAll({ where: { Idusuario: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};