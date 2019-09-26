const db = require('../config/db.config.js');
const SpanishError = require('./c_spanish_error');
const Deposito = db.Deposito;
const usuario = db.Usuario;
const empresa = db.Empresa;
const Op = db.Op;

exports.create = (req, res) => {
    Deposito.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            SpanishError.resolver(err, res);
        });

};

exports.findAll = (req, res) => {
    Deposito.findAndCountAll({
        include: [{
            model: usuario,
            Required: true,
            include: [{
                model: empresa,
                Required: true,
            }]
        }]
    }).then(response => {
        const resp = {
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    NoBoleta: doc.NoBoleta,
                    DelRecibo: doc.DelRecibo,
                    AlRecibo: doc.AlRecibo,
                    Cantidad: doc.Cantidad,
                    UsuarioId: doc.Usuario.Nombre,
                    EmpresaId: doc.Usuario.Empresa.id,       
                    Empresa: doc.Usuario.Empresa.Nombre       
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });

};
exports.ConsultaSaldo = (req, res) => {
    Deposito.findAndCountAll({
     /**   include:[{
            model:usuarios,
            Required: true
        }],*/
        where: { 
           // UsuarioId: req.params.Id, 
           // $and:{
                    createdAt:{
                        [Op.between]: [req.params.Inicio, req.params.Fin],
                 //   $between: [req.params.Inicio, req.params.Fin]
                    }    
               // }  createdAt:  between req.params.fecha and req.params.fechaFin
           // } 
            
        }
        }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });

};


exports.findById = (req, res) => {
    Deposito.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });

};

exports.update = (req, res) => {
    Deposito.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.delete = (req, res) => {
    const id = req.params.Id;
    Deposito.destroy({
        where: { id: id }
    }).then(response => {
        if (response) {
            res.status(200).json({ codigo: 200, status: "Exito", mensaje: "Registro eliminado correctamente" });
        } else res.status(200).json({ codigo: 200, status: "Error", mensaje: "Registro no encontrado" });
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};