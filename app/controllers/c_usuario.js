const aws = require('aws-sdk');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generator = require('generate-password');
const db = require('../config/db.config');
const SpanishError = require('./c_spanish_error');
const Usuario = db.Usuario;
const UsuarioRol = db.UsuarioRol;
const Persona = db.Persona;
const TipoPersona = db.TipoPersona;
const Token = db.Token;


aws.config.update({
    secretAccessKey: process.env.IAM_USER_SECRET,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.IAM_USER_KEY,

});

exports.reinicio = (req, res, next) => {

    var password = generator.generate({
        length: 15,
        numbers: true
    });

    var params = {
        Destination: {
            ToAddresses: [req.body.Email]
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: "Tu nueva contraeña es:  " + password
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Reinicio de Password'
            }
        },
        Source: process.env.EmailReinicio
    };

    var sendPromise = new aws.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

    Usuario.findOne({
        where: { Email: req.body.Email }
    }).then(user => {
        if (user) {
            Usuario.update({
                Clave: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
                Reinicio: true
            }, {
                where: { id: user.id }
            }).then(respp => {
                sendPromise.then(
                    function(data) {
                        res.status(200).json({
                            message: data,
                            status: "Exito"
                        });
                    }).catch(
                    function(err) {
                        SpanishError.resolver(err, res);
                    });
            }).catch(
                function(err) {
                    SpanishError.resolver(err, res);
                });
        } else {
            res.status(200).json({
                message: "No esta registrado: " + req.body.Email,
                status: "Error"
            });
        }
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.user_login = (req, res, next) => {
    Usuario.findOne({
        where: { Email: req.body.Email }
    }).then(user => {
        console.log(user);
        if (user) {
            bcrypt.compare(req.body.Clave, user.Clave, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result && !user.Logueado) {
                    console.log(user.Logueado);
                    const token = jwt.sign({
                            email: user.Email,
                            userId: user.id,
                            ADRolId: user.ADRolId
                        },
                        process.env.JWT_KEY, { expiresIn: process.env.TTEXPIRA + "h" });
                    insetatoken(token, user.id);
                    Usuario.update({ Logueado: true }, { where: { Email: req.body.Email } });
                    return res.status(200).json({
                        email: user.Email,
                        Nombre: user.Nombre,
                        id: user.id,
                        idEmpresa: user.EmpresaId,
                        message: "Auth successful",
                        Rol:user.Rol,
                       
                        token: token
                    });
                } else {
                    if (result && user.Logueado) {
                        return res.status(200).json({
                            message: "Usuario ya logueado con anterioridad"
                        });
                    }
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        } else {
            res.status(404).json({ message: 'Auth failed' });
        }
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.user_logout = (req, res, next) => {
    Usuario.findOne({
        where: { Email: req.body.Email }
    }).then(user => {
        Usuario.update({ Logueado: false }, { where: { Email: req.body.Email } }).then(response => {
            res.status(200).json({ Codigo: 200, Mensaje: 'Sesión Cerrada' });
        }).catch(err => {
            SpanishError.resolver(err, res);
        });
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

function insetatoken(token, usuarioId) {
    try {
        Token.create({
            Token: token,
            ADUsuarioId: usuarioId
        });

        return true;
    } catch (error) {
        return false;
    }
}

exports.user_signup = (req, res) => {
    req.body.Clave = bcrypt.hashSync(req.body.Clave, bcrypt.genSaltSync(8));
    Usuario.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            res.json(err);
        });
};

exports.persona = (req, res) => {
    TipoPersona.findAndCountAll({
        include: [{
            model: Persona,
            required: true
        }]
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Persona: doc.TC_Persona.Nombres + " " + doc.TC_Persona.Apellidos
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};


exports.create = (req, res) => {
    req.body.Clave = bcrypt.hashSync(req.body.Clave, bcrypt.genSaltSync(8));
    Usuario.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            SpanishError.resolver(err, res);
        });
};


exports.findAll = (req, res) => {
    Usuario.findAll().then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.noasignados = (req, res) => {
    Usuario.findAndCountAll({
        where: {
            '$AD_Usuarios_Roles.ADRolId$': null,
            Estado: 'Activo'
        },
        include: [{
            model: UsuarioRol,
            required: false
        }]
    }).then(response => {
        const resp = {
            count: response.rows.length,
            rows: response.rows.map(doc => {
                return {
                    id: doc.id,
                    Nombre: doc.Nombre
                };
            })
        };
        res.status(200).json(resp);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};


exports.findById = (req, res) => {
    Usuario.findByPk(req.params.Id).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.update = (req, res) => {
    Usuario.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};

exports.delete = (req, res) => {
    const id = req.params.Id;
    Usuario.destroy({
        where: { id: id }
    }).then(response => {
        if (response) {
            res.status(200).json({ codigo: 200, status: "Exito", mensaje: "Registro eliminado correctamente" });
        } else res.status(200).json({ codigo: 200, status: "Error", mensaje: "Registro no encontrado" });
    }).catch(err => {
        SpanishError.resolver(err, res);
    });
};
