const db = require('../config/db.config.js');
const SpanishError = require('./c_spanish_error');
const Recibo = db.Recibo;
const Gestion = db.Gestion;
const persona = db.Persona;
const usuario = db.Usuario;
const sequelize = db.sequelize;
const Op = db.Op;
exports.create = (req, res) => {
    Recibo.create(req.body)
        .then(Response => {
            /**  Recibo.findCountAll({
                 Include:[{
                     model: gestion,
                     Required:true
                 },{
                     model: persona,
                     Required: true
                 }
             ],where:{id : req.body.IdGestion}
             }).then(res=>{
                 const ResRecibo={
                     rows: ResRecibo.rows.map(doc=>{
                         return {
 
                         }
                     })
                 }
             })*/
            res.status(200).json(Response);
        }).catch(err => {
            SpanishError.resolver(err, res);
        });
};

exports.findAll = (req, res) => {
    Recibo.findAndCountAll({
        include: [{
            model: Gestion,
            Required: true,
            include: [{
                model: persona,
                Required: true
            }]
        }]//, where: { id: 9001 }
    }).then(response => {
        const resp = {
            rows: response.rows.map(doc => {
                return {
                    NoRecibo: doc.NoRecibo,
                    Cantidad: doc.Cantidad,
                    CodGestion: doc.GestionId,
                    TotalGestion: doc.Gestion.Total,
                    Acumulado: doc.Gestion.Anticipo,
                    Nombre: doc.Gestion.Persona.Nombres,
                    Apellidos: doc.Gestion.Persona.Apellidos,
                    Nit: doc.Gestion.Persona.Nit
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

/**exports.ConsultaIngresos = (req, res) => {
    Recibo.findAndCountAll({
        include: [{
            model: Gestion,
            Required: true,
            include: [{
                model: persona,
                Required: true
            }]
        }], where: {
            createdAt: {
                [Op.between]: [req.params.Inicio, req.params.Fin],
            }
        }
  
        
    }).then(response => {
        const resp = {
            rows: response.rows.map(doc => {
                return {
                    NoRecibo: doc.NoRecibo,
                    Cantidad: doc.Cantidad,
                    CodGestion: doc.GestionId,
                    TotalGestion: doc.Gestion.Total,
                    Acumulado: doc.Gestion.Anticipo,
                    Nombre: doc.Gestion.Persona.Nombres,
                    Apellidos: doc.Gestion.Persona.Apellidos,
                    Nit: doc.Gestion.Persona.Nit,
                    Fecha: doc.createdAt
                };
            })
        };
        console.log(req.params.Inicio+" "+req.params.Fin);
        res.status(200).json(resp);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

*/
exports.ConsultaIngresos = (req, res) => {
    sequelize.query('call ListarRecibos(:Inicio,:Fin);',
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



/**exports.findAll = (req, res) => {
    Recibo.findAll().then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};*/


exports.findById = (req, res) => {
    Recibo.findAndCountAll({
        include: [{
            model: usuario,
            Required: true,
        }, {
            model: Gestion,
            Required: true,
            include: [{
                model: persona,
                Required: true
            }]
        }
        ], where: { GestionId: req.params.Id }
    }).then(response => {
        const resp = {
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    NoRecibo: doc.NoRecibo,
                    Cantidad: doc.Cantidad,
                    Estado: doc.Estado,
                    createdAt: doc.createdAt,
                    GestionId: doc.GestionId,
                    clienteN: doc.Gestion.Persona.Nombres,
                    clienteP: doc.Gestion.Persona.Apellidos,
                    Nit: doc.Gestion.Persona.Nit,
                    Usuario: doc.Usuario.Nombre,
                    Empresa: doc.Usuario.EmpresaId
                };
            })
        };

        res.status(200).json(resp);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.Anulado = (req, res) => {

    Recibo.update({ Cantidad: 0 },
        //Comparo el id del recibo con el id del front
        { where: { id: req.body.Id } }).then(response => {
                    sequelize.query('call VerificarEstado(:IdGestion);',
                        {
                            replacements: {
                                IdGestion: req.body.GestionId
                            }, type: sequelize.QueryTypes.fieldMap
                        })
                }).then(Validar => {
                    res.status(200).json(Validar);
                }).catch(err => {
                    res.status(500).json(err);
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
            replacements: {
                Cantidad: req.body.Cantidad,
                IdGestion: req.body.IdGestion,
                UsuarioId: req.body.UsuarioId,
                EmpresaId: req.body.EmpresaId
            }, type: sequelize.QueryTypes.fieldMap
        }
    ).then(Response => {
        Gestion.update({ Anticipo: req.body.NuevoAnticipo }, { where: { id: req.body.IdGestion } });
        if (req.body.NuevoSaldo == 0) {
            Gestion.update({ Estado: "Inactivo" }, { where: { id: req.body.IdGestion } });
        }
        var Codigo = Response[0];
        Recibo.findAndCountAll({
            include: [{
                model: Gestion,
                Required: true,
                include: [{
                    model: persona,
                    Required: true
                }]
                //Agregar el id de la respuesta
            }], where: { id: Codigo.id }
        }).then(response => {
            const resp = {
                rows: response.rows.map(doc => {
                    return {
                        NoRecibo: doc.NoRecibo,
                        Cantidad: doc.Cantidad,
                        CodGestion: doc.GestionId,
                        TotalGestion: doc.Gestion.Total,
                        Acumulado: doc.Gestion.Anticipo,
                        Nombre: doc.Gestion.Persona.Nombres + " " + doc.Gestion.Persona.Apellidos,
                        Fecha: doc.createdAt,
                        // Apellidos: ,
                        Nit: doc.Gestion.Persona.Nit
                    };
                })
            };
            res.status(200).json(resp);
        }).catch(err => {
            SpanishError.resolver(err, res);
        });
        //var Codigo = Response[0];
        //console.log(Codigo.id);
        //res.status(200).json(Response[0]);
    }).catch(err => {
        res.json(err);
    });
};