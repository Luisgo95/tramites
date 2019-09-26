const db = require('../config/db.config.js');
const SpanishError = require('./c_spanish_error');
const Egreso = db.Egreso;
const sequelize = db.sequelize;
const usuario = db.Usuario;
const Op = db.Op;

exports.create = (req, res) => {
    Egreso.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            SpanishError.resolver(err, res);
        });

};


exports.findAll = (req, res) => {
    Egreso.findAndCountAll({
        include: [{
            model: usuario,
            Required: true,
        }]
    }).then(response => {
        const resp = {
            rows: response.rows.map(doc => {
                return {
                    id:doc.id,
                    Nombre:doc.Nombre,
                    Comprobante:doc.Comprobante,
                    Descripcion:doc.Descripcion,
                    Monto:doc.Monto,
                    Estado:doc.Estado,
                    createdAt:doc.createdAt,
                    updatedAt:doc.updatedAt,
                    UsuarioId:doc.Usuario.Nombre,
                    Empresa: doc.Usuario.EmpresaId            
                    };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });

};

exports.ConsultaEgresos = (req, res) => {
    sequelize.query('call ListarEgresos(:Inicio,:Fin);',
        {
            replacements: {
                Inicio: req.params.Inicio,
                Fin: req.params.Fin,
            }, type: sequelize.QueryTypes.fieldMap
        })
        .then(response => {
            res.status(200).json(response);
        }).catch(err => {
            SpanishError.resolver(err, res);
        });
};
exports.findById = (req, res) => {
    Egreso.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });

};

exports.update = (req, res) => {
    Egreso.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.delete = (req, res) => {
    const id = req.params.Id;
    Egreso.destroy({
        where: { id: id }
    }).then(response => {
        if (response) {
            res.status(200).json({ codigo: 200, status: "Exito", mensaje: "Registro eliminado correctamente" });
        } else res.status(200).json({ codigo: 200, status: "Error", mensaje: "Registro no encontrado" });
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};