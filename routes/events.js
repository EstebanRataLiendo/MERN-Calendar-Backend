
const { Router } = require('express') 
const { check } = require('express-validator')

const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEvento, crearEvento, eliminarEvento, actualizarEvento  } = require('../controllers/events') 


const router = Router(); 

router.use( validarJWT )

//obtener eventos
router.get('/', getEvento)

//crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'La fecha final es obligatorio').custom( isDate ),
        validarCampos
    ],
    crearEvento
)

//actualizar evento
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento 
);

//borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router;