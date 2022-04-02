
const { response } = require('express')
const { validationResult } = require('express-validator')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');




const crearUsuario = async (req, res = response ) => {

    const { name, email, password } = req.body

    // validacion manual *** se hara de otro modo y se comentara.
    /* 
        Al establecer el res.status() podemos decir cual es el error que se esta generando, basta con incluir el nombre del error ( de los cuales podemos obtener de https://www.restapitutorial.com/httpstatuscodes.html)

        if( name.length < 5 ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre debe ser de mas de 5 caracteres'
            })
        }

        La validacion que usaremos sera mediante express-validator ( npm i express-validator ) y esta logica se aplica en el lugar donde se ejecuta la ruta, en este caso en el archivo auth.js de la carpeta routes (ver mas info alli)
    */
/* 
    ================================================================================
*/
    /* 
        // Manejo de errores: de manera manual
        const errors = validationResult( req )
        console.log( errors )
        if( !errors.isEmpty()) {
            return res.status(400).json({
                ok: false, 
                errors: errors.mapped()
            })
        }
    */
/* 
    ================================================================================
*/
    // Manejo de errores con un custom middleware se utiliza en la misma ruta.

    try {
        // Lo ideal es gestionar este proceso con un try/catch, ya que de esta manera podemos gestionar los errores si estos se llegaran a producirse.
/* 
    ================================================================================
*/      
        // Validacion de si un usuario existe 
        /* 
            Necesitamos hacer una validacion para que el proceso se dentenga en caso de encontrar que ya existe un usuario en nuestro base de datos con el mismo correo electronico.
            Para ello guaramos en una variable( modificable ) el valor optenido de un await ( ya que es asincrono)  del Usuario pasado por el metodo findOne, al cual le pasamos los valores a buscar, en este caso es el email para decirle que guarde el usuario en variable si al crearlo detecta que ya existe uno con ese correo.
            Luego ya con el usuario que hemos guardado planteamos el IF.

        */
/* 
    ================================================================================
*/
        let usuario = await Usuario.findOne({ email: email })

        if( usuario ) {
            return res.status(400).json({
                ok: false,
                uid: usuario.id, 
                name: usuario.name
            })
        }
/* 
    ================================================================================
*/
        // Usar el esquema de usuario creado en ./models/Usuario.js
        usuario = new Usuario( req.body )
    
/* 
    ================================================================================
*/
        // Encriptar Password

        /* 
            Como una contraseña es un elemento muy sensible y hay que otorgarle una seguridad especial, necesitamos que cuando creamos un nuevo usuario, la constraseña que este nos manda, debe ser haseada o encriptada, de manera que nadie, pueda saber de que contraseña se trata.
            Para lograrlo hacemos uso de la libreria " bcrypt" y despues de importarla con "const bcrypt = require('bcryptjs'); "
            creamos una variable que le damos el valor de bcrypt.genSaltSync(), dentro de los agumentos le podemos andar un numero, por defecto es de 10, y esto son las cueltas o los nieveles de codificacion de la clave.

            Despues le decimis que el valor del usuario.password, que es el pasword que el usuario va a tener, le damos el valor del bcrypt.hashjSnc(), al que le pasamos dos valores, el primero, el del elemento que vamos a hasear, en este caso el password, y el segundo de la variable que creamos antes  pasandole el genSaltSync().

            y el usuario guarda la calve haseada.

        */

/* 
    ================================================================================
*/
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync( password , salt)
/* 
    ================================================================================
*/
        // Para guardar el usuario
        await usuario.save()

    // Generar JWT (Json web token )
    const token = await generarJWT( usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name, 
            token
        })
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false, 
            msg: 'Por favor hable con el administrador'
        })
    }
}
/* 
    ================================================================================
*/


const loginUsuario = async(req, res= response) => {
    const { email, password } = req.body

    // Validar que exista el usuario
    try {
        let usuario = await Usuario.findOne({ email: email })
        if(!usuario) {
            return res.status(400).json({
                ok: false, 
                msg: 'El usuario o la contraseña no son correctos'
            })
        }

    // Confirmar la contraseña.
        const validPassword = bcrypt.compareSync( password, usuario.password )

        if( !validPassword ){
            return res.status(400).json({
                ok: false, 
                msg: 'Password Incorrecto'
            })
        }

        // Generar JWT (Json web token )
        const token = await generarJWT( usuario.id, usuario.name)

        res.json({
            ok: true, 
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false, 
            msg: 'Por favor hable con el administrador'
        })
    }
}

/* 
    ================================================================================
*/

const revalidarToken = async ( req, res= response) => {

    const { uid, name } = req

    const token = await generarJWT( uid, name)


    res.json({
        ok: true,
        uid, 
        name,
        token
    })
}
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}











/* 
    ================================================================================
*/

/* 
    Una desventaja de hacer asi las rutas, es que perdemos el poder usar las ayudas de visuals Studio a la hora de escribir el codigo, pero podemos solucionarlo del siguiente modo: 
        1. importar de nuevo express en el archivo
            const express = require('express')

        2. darle a la response en los argumentos de la funcion, el valor por defecto de "express.response"

        ya podemos hacer uso de las ayudas de Visual studio

    NOTA: ESTO NO ES REQUERIDO HACERLO.
    NOTA"2: Tambien podemos hacer uso de la desestructuracion tal y como se ve en este archivo.
    
*/