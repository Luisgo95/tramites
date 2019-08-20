const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-out');
const abc = require('../controllers/c_temporal');

router.get('/total/:Id',checkAuth, abc.TotalGestion);

router.get('/usuarios/:Id',checkAuth, abc.porUsuario);


router.get('/',checkAuth, abc.findAll)
    .post('/', checkAuth,abc.create);

router.get('/:Id',checkAuth, abc.findById)
    .delete('/:Id',checkAuth, abc.delete)
    .put('/:Id',checkAuth, abc.update);

module.exports = router;