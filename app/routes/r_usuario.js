const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-out');
const abc = require('../controllers/c_usuario');


router.get('/', abc.findAll)
    .post('/signup', abc.user_signup);

router.post('/reinicio', abc.reinicio);

router.post('/login', abc.user_login);
router.post('/logout', abc.user_logout);

router.post('/', abc.create);

router.get('/noasignados', checkAuth, abc.noasignados);
router.get('/persona', checkAuth, abc.persona);


router.get('/:Id', checkAuth, abc.findById)
    .delete('/:Id', checkAuth, abc.delete)
    .put('/:Id', checkAuth, abc.update);

module.exports = router;