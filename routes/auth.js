const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js')
const { crearUsuario, loginUsuario, revalidadToken } = require('../controllers/auth')
const { validarJWT } = require('../middlewares/validar-jwt.js')

const router = Router();

//rutas
router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es tener mas de 6 caracteres').isLength({ min: 6 }),
        validarCampos

    ], 
    crearUsuario)

router.post('/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es tener mas de 6 caracteres').isLength({ min: 6 }),
        validarCampos

    ], 
    loginUsuario)

router.get('/renew', validarJWT, revalidadToken)

module.exports = router;