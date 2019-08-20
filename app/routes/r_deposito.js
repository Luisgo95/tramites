const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-out');
const abc = require('../controllers/c_deposito');

router.get('/',checkAuth, abc.findAll)
    .post('/',checkAuth, abc.create);

router.get('/:Id',checkAuth, abc.findById)
    .delete('/:Id',checkAuth, abc.delete)
    .put('/:Id',checkAuth, abc.update);

module.exports = router;