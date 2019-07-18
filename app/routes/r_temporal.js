const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-out');
const abc = require('../controllers/c_temporal');

router.get('/total/:Id', abc.TotalGestion);

router.get('/usuarios/:Id', abc.porUsuario);


router.get('/', abc.findAll)
    .post('/', abc.create);

router.get('/:Id', abc.findById)
    .delete('/:Id', abc.delete)
    .put('/:Id', abc.update);

module.exports = router;