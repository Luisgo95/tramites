const db = require('../config/db.config.js');
const SpanishError = db.SpanishError;


exports.create = (req, res) => {

    SpanishError.create(req.body)
        .then(Response => {
            res.status(200).json(Response);
        }).catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.findAll = (req, res) => {
    SpanishError.findAll().then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({ error: err });
    });
};


exports.findById = (req, res) => {
    SpanishError.findByPk(req.params.Id).then(response => {
        res.status(200).json({ status: "Error", mensaje: response.MensajeEspaniol });
    }).catch(err => {
        res.status(500).json({ error: err });
    });
};

exports.update = (req, res) => {
    SpanishError.update(req.body, { where: { id: req.params.Id } }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({ error: err });
    });
};

exports.delete = (req, res) => {
    const id = req.params.Id;
    SpanishError.destroy({
        where: { id: id }
    }).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({ error: err });
    });
};

exports.resolver = (req, res) => {
    SpanishError.findByPk(req.name)
        .then(spanisherror => {
            if (spanisherror) {
                res.status(200).json({ codigo: 500, status: "Error", mensaje: spanisherror.MensajeEspaniol });
            } else {
                SpanishError.create({
                    MensajeIngles: req.name,
                    MensajeEspaniol: "Error: " + req.name + " pendiente de traducción, notifique al administrador"
                });
                res.status(200).json({ codigo: 500, status: "Error", mensaje: "Error " + req.name + " pendiente de traducción, notifique al administrador" });
            }
        });
};