const db = require('../config/db.config.js');
const SpanishError = require('./c_spanish_error');
const Tramite = db.Tramite;
const TipoTramite = db.TipoTramite;


exports.create = (req, res) => {
    Tramite.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            SpanishError.resolver(err, res);
        });
};


exports.findAll = (req, res) => {
    Tramite.findAll().then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};


exports.findById = (req, res) => {
    Tramite.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.findGestion = (req, res) => {
    Tramite.findAll({
        include:[{
            model:TipoTramite,
            Required: true
        }],
        where: { GestionId: req.params.Id }
    }).then(response => {
        /**const resp = {
            rows: response.rows.map(doc => {
                return { 
                      id: doc.id,
                     Detalle: doc.DetalleTramite,
                     NombreTramite: doc.Tipos_Tramite.Nombre
                    };
            })
        };*/
        res.status(200).json(response);
    }).catch(err => {
       // res.status(200).json(err);
        SpanishError.resolver(err, res);
    });
};
/**    id: response.id,
            DetalleTramite: response.DetalleTramite,
            Costo: response.Costo,
            Estado: response.Estado,
            TiposTramiteId: response.TiposTramiteId,
            GestionId: response.GestionId, */
exports.update = (req, res) => {
    Tramite.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};


exports.delete = (req, res) => {
    const id = req.params.Id;
    Tramite.destroy({
        where: { id: id }
    }).then(response => {
        if (response) {
            res.status(200).json({ codigo: 200, status: "Exito", mensaje: "Registro eliminado correctamente" });
        } else res.status(200).json({ codigo: 200, status: "Error", mensaje: "Registro no encontrado" });
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};