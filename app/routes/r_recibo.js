const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-out');
const abc = require('../controllers/c_recibo');

router.get('/', checkAuth,abc.findAll)
    .post('/',checkAuth,abc.InRecibo)
//.get('/:Inicio?/:Fin?',checkAuth, abc.ConsultaSaldo)
router.get('/:Id',checkAuth, abc.findById)
    .get('/:Inicio?/:Fin?',checkAuth, abc.ConsultaIngresos)
    .delete('/:Id',checkAuth, abc.delete)
    .put('/',checkAuth, abc.Anulado);

module.exports = router;
