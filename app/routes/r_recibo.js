const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-out');
const abc = require('../controllers/c_recibo');

router.get('/', checkAuth,abc.findAll)
    .post('/',abc.InRecibo);

router.get('/:Id',checkAuth, abc.findById)
    .delete('/:Id',checkAuth, abc.delete)
    .put('/:Id',checkAuth, abc.update);

module.exports = router;