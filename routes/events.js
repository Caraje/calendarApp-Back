const { Router } = require('express');
const { check } = require('express-validator');
const { getEvento, actualizarEvento, eliminarEvento, crearEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router()

/* 
    RUTAS DE EVENTOS /events
    host + /api/events 
*/

// VALIDAR JWT general: 
/* 
    En el caso de que un middleware, se repita en todas las rutas, podemos hacer que sea llamado en una sola linea para todas las rutas incluidas.
    para eso basta con llamar a .use() y pasarle como argumento el middelware
    Ahora todas las rutas que estan bajo esta llamada al .use(), tendrna incluido dicho middleware.

*/
router.use( validarJWT )

// Obtener eventos
router.get('/' ,getEvento)

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento )

// Actualizar Evento
router.put('/:id' ,actualizarEvento)

// Borrar Evento
router.delete('/:id' ,eliminarEvento)

module.exports = router
