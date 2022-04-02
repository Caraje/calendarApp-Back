const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


/* 
    Crear servidor de express
    Crear un servidor: 
        Con express, lo que hacemos es crear un servidor, para ello debemos inicializar express dandoselo como valor a una variable, que por lo general se le suele llamar app, aunque esto no obligatorio.
        Esta app, sera nuestro servidor, y en el podremos hacer los diferentes cambios que necesitemos.
*/

const app = express();


// Base de datos: 

dbConnection();


/* 
======================================================================================================================================
*/

app.use(cors())

/* 
    Directorio Publico
    con el metodo ".use()", podemos establecer una ruta al lugar que contendra nuestra aplicacion o nuestra pagina web.
    Este .use(), recive el "express.static(path)" siendo el Path, la carpeta (por ejemplo public) o el path completo dentro de nuestra estructura de archivos.

*/

app.use( express.static('public') );

/* 
======================================================================================================================================
*/


/* 
    LECTURA Y PARSEO DEL BODY
    Con el siguiente codigo, lo que hacemos es escuchar la peticion del POST y poder recibir los datos que se le envian.
    
*/

app.use( express.json() );

/* 
======================================================================================================================================
*/
/* 
    RUTAS
        Creando Rutas: 
            Una vez inicializado el servidor, podremos crear en su interior una serie de rutas en la que podremos hacer los tipicos, GET, POST, etc
                -GET: para hacer una ruta de un get, usamos el metodo ".get()" llamando a nuestra app( o servidor)
                    El get, primero le pasamos el path de la ruta que necesita, por ejemplo "/" y como segundo argumento, un callback que lleva un request y un response.

                    app.get('/', (req, res) => {
                        res.json({
                            ok: true
                        })
                    })
*/
// En el caso de este curso, como haremos varias rutas, estas las crearemos en archivos adicionales. se pueden encontrar en la carpeta "routes"
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

/*
    NOTA: para importar las rutas que crearemos en routes, hacemos uso del metodo ".use()", donde le pasaremos el path desde donde se accedra y seguido de la improtacion de donde esta el archico con un un require
 */

/* 
======================================================================================================================================
*/
/* 
    Escuchar peticiones
        Para que nuestro servidor, sea capaz de escuchar estas peticiones, o rutas debemos usar el metodo ".listen()" este metodo recibe primero un numero que sera el puerto que ocupara el servidor y tambien un callback, donde podremos establecer algunas opciones cuando se ejecuten estas rutas.
*/

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});





/* 
======================================================================================================================================
*/
/* 
    VARIABLES DE ENTORNO: 
    En nuestros proyectos podemos crear lo que se conoce como variables de entorno o ENV, esto son variables establecidas para que funcionen en toda la aplicacion y que son generales a todo el proyecto, POr ejemplo: 
    En esta aplicacion queremos usar el puerto 4000, pero no tenemos manera de saber si cuando despleguemos la aplicacion, este puerto estara disponible, entonces establecemos una variable de entorno, de modo que pueda ser facilmente modificada por el servidor, sin necesidad de estar haciendo ajustes manuales.

    Para hacer uso de estas variables de entorno, primero lo que necesitamos es un paquete de npm llamado "dotenv" (instalandose con "npm install dorenv")
    Para hacer uso de este paquete, primero necesitamos importarlo dentro del archivo en el que haremos uso de variables de entorno.
    La importacion la haremos con un simple "require('dorenv')"

    De esta manera ya podemos usar dotenv en nuestro archivo.

    - establecer variables de entorno.
        Crearemos en la carpeta raiz un archivo llamado ".env" donde se guardaran todas estas variables de entorno.
        Y para crear variables de entorno solo escribimos el nombre (SIEMPRE EN MAYUSCULAS) y le igualamos a un valor, siempre sin espacios.

        EJ:     
            PORT=4000

    - usar variables creadas: 
        Estas variables estan disponibles usando "process.env" 
        Si hacemos un console.log de process.env, veremos un monton de variables de entorno, entre ellas, las que creamos
        Ahora bien para usarlas, podemos o bien llamarla con "process.env.PORT" o bien podemos hacer la desestructuracion "const {PORT} = process.env"
*/