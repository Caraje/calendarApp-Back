const {response} = require("express")
const { validationResult } = require("express-validator")


/* 
    Crear custom Middlewares.

    Un middleware es una funcion normal que tiene 3 argumentos, el request, el response y ademas el next.
    Cuando queremos crear un middleware, simplemnte lo metemos dentro del scope de las funcion toda nuestra logica y cuando esta se termine, lo que hacemos es llamar al next()

    Este next(), lo que hace basicamente es hacer que se ejecute el siguiente middleware que podamos tener en la lista de la ruta, por eso es importante llamarlo al final, para que en caso de que todo este correcto, pase al siguiente punto.
    
*/


const validarCampos = ( req, res = Response, next ) => {

    const errors = validationResult( req )
    if( !errors.isEmpty()) {
        return res.status(400).json({
            ok: false, 
            errors: errors.mapped()
        })
    }
    next()
}

module.exports = {
    validarCampos
}