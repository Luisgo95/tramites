const db = require('../config/db.config.js');
const SpanishError = require('./c_spanish_error');
const Gestion = db.Gestion;
const persona = db.Persona;
const usu = db.Usuario;

exports.create = (req, res) => {
    Gestion.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            SpanishError.resolver(err, res);
        });

};

exports.findAll = (req, res) => {
    Gestion.findAndCountAll({
        // const idPersona : Gestion.PersonaId;

            include:[{
                model: persona,
                Required: false
            },       
             {
                model: usu,
               
                Required:true,
              
                }],
           //,
          //  where:{ id : idPersona}
    }).then(response => {
    const resp = {
       rows: response.rows.map(doc => {
                return { 
                     id: doc.id,
                     Anticipo: doc.Anticipo,
                     Total: doc.Total,
                     Estado: doc.Estado,
                     PersonaId: doc.Persona.id,
                     Nombres: doc.Persona.Nombres,
                     Apellidos: doc.Persona.Apellidos,
                     Usuario: doc.UsuarioId,
                    Empresa: doc.Usuario.EmpresaId
                     //GestionId: doc.GestionId
                    };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });

};


exports.findById = (req, res) => {
    Gestion.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });

};

exports.update = (req, res) => {
    Gestion.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.delete = (req, res) => {
    const id = req.params.Id;
    Gestion.destroy({
        where: { id: id }
    }).then(response => {
        if (response) {
            res.status(200).json({ codigo: 200, status: "Exito", mensaje: "Registro eliminado correctamente" });
        } else res.status(200).json({ codigo: 200, status: "Error", mensaje: "Registro no encontrado" });
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};