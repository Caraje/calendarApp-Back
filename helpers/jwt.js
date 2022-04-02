/* 
    GENERAR JWT
    Instalar libreria de JsonwebToken: npm install jsonwebtoken
    Importar libreria: const { jwt } = require("jsonwebtoken");
*/

const jwt = require("jsonwebtoken");


const generarJWT = ( uid, name ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { uid, name }

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, ( err, token ) => {
            if(err){
                console.log(err)
                reject('No se pudo generar Token')
            }
            resolve( token)
        } ) 
    })

}

module.exports = {
    generarJWT
}
