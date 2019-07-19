const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-out');
const abc = require('../controllers/c_persona');

router.get('/',checkAuth, abc.BusquedaWicho)
    .post('/', abc.create);

router.get('/:Id', abc.findById)
    .delete('/:Id', abc.delete)
    .put('/:Id', abc.update);

module.exports = router;