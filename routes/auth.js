/* 
    Es aconsejable añadir un comentario como este, para especificar donde seran llamados estos datos.

    RUTAS DE USUARIOS /Auth
    host + /api/auth 
*/


const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router()
/*
    Lo de arriba es lo mismo que hacer esto otro: 
        const express = require('express')
        const router = express.Router 
*/


// NOTA: PAra evitar saturacion de logica en el codigo, lo que hacemos es crear una carpeta en la raiz del proyecto llamada controllers, donde crearemos la logica que usaremos dentro de cada una de las rutas que necesitaremos.

/* 
    Validacion de rutas con express-validator
    Estas validaciones se hacen por midelwares ( que son basicamente funciones que ofrece la propia express-validator.)
    Para usarlos basta con situarlos entre el path y el callback de la ruta, en caso de ofrecer mas de uno, lo haremos usando un arreglo "[]"
        Check() = se usa para checkear que el campo esta siendo usado, y para configurarlo, dentro de los argumentos primero le pasamos el campo que debemos chekear, por ejemplo el Name y como segundo argumento, el mensaje de error que se lanzara en caso de que falle la autentificacion.



    Uso de custom Middlewares: 
    Cuando queremos usar un custom middleware, simplemente lo usamos como un middleware mas, llamandolo al final del resto de middlewares.

    */
router.post(
    '/new',
    [
        // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'El Password debe ser de 6 caracteres o mas').isLength({min: 6}),
        validarCampos

    ], 
    crearUsuario )

router.post(
    '/',
    [
        check('email', 'El email no es correcto').isEmail(),
        check('password', 'El Password debe ser de 6 caracteres o mas').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario )

router.get(
    '/renew',
    [
        validarJWT
    ],
    revalidarToken )


/* 
    Exportaciones: 
    Para hacer una exportacion en node la hacemos usando: "module.exports"
*/
module.exports = router