const { response } = require("express");
const Evento = require("../models/Evento");




const getEvento = async( req, res = response ) => {

    try {
        const eventos = await Evento.find( )
                                    .populate('user', 'name')
        return res.status( 200 ).json({
            ok: true, 
            eventos
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false, 
            msg: 'error getEventos'
        })
    }


}
const crearEvento = async ( req, res = response ) => {
    console.clear()
    // Verificar que tenga el evento
    const evento = new Evento(req.body) 
    
    try {
        evento.user = req.uid
        const eventoGuardado = await evento.save()
        return res.status( 200 ).json({
            ok: true, 
            evento: eventoGuardado
        
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false, 
            msg: 'Hable con el administrador...'
        })
    }

}



const actualizarEvento = async ( req, res = response ) => {
    const eventoId = req.params.id
    const uid = req.uid
    try {
        
        const evento = await Evento.findById( eventoId )
        if( !evento ) {
            return res.status(404).json({
                ok: 'false', 
                msg: 'evento no existe con ese'
            })
        }

        if( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false, 
                msg: 'No tiene los privilegios necesarios'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} )
        res.json({
            ok: true, 
            evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false, 
            msg: 'Hable con el administrador...'
        })
    }
}





const eliminarEvento = async ( req, res = response ) => {

    const eventoId = req.params.id
    const uid = req.uid
    try {
        
        const evento = await Evento.findById( eventoId )
        if( !evento ) {
            return res.status(404).json({
                ok: 'false', 
                msg: 'evento no existe con ese'
            })
        }

        if( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false, 
                msg: 'No tiene los privilegios necesarios'
            })
        }

        await Evento.findByIdAndDelete( eventoId )

        res.json({
            ok: true, 
            msg: 'Elemento borrado'
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false, 
            msg: 'Error borrar eventos'
        })
    }
}

module.exports = {
    getEvento, 
    crearEvento, 
    actualizarEvento, 
    eliminarEvento
}
