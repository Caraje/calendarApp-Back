const { Schema, model } = require('mongoose')



/* 
    Crear un esquema de usuario para Moongoose.
    Necesitamos establecer la base o el esquema que tendra cada uno de los usuarios que cremos en nuestra base de datos, esto quiere decir, que necesitamos establecer los campos que deberan tener nuestros usuarios y si estos deben de ser obligatorios o no.

    para hacerlo lo primero que necesitamos es importar en nuestro archivo el Schema y el model de Mongoose
    Acto seguido creamos algo parecido a una clase, a la que llamamos schema
    dentro de este Schema establecemos los campos necesarios, en ese caso, el name, el email y el password. 
    Para configurar cada uno de estos campos, y establecer que tipo de datos debe aportase en la creacion, establecemos un "type", que podria ser del tipo String, Number, o el que necesitemos.
    Ademas, debemos establecer un campo llamado require, si necesitamos que sea obligatorio. 
    El campo unique, es para establecer, que ese campo debe ser unico, que no debe repetirse dentro de nuestra base de datos.


    En la exportacion del esquema, lo hacemos por defecto (usando module.exports = elementoExportado) y exportamos un "model"
    Este model lleva dentro dos valores, el primero que establece el nombre del esquema, y el segundo, es el esquema que hemos creado 
*/
const UsuariosSchema = Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password:{
        type: String, 
        required: true, 

    },
})


module.exports= model('Usuario', UsuariosSchema )