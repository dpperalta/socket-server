import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/usariosLista';
import { Usuario } from '../classes/usuario';
import socketIO from 'socket.io';

export const usuariosConectados = new UsuariosLista();

// Conectar Cliente 
export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar(usuario);
}

// Escuchar las desconexiones de los cliente
export const desconectar = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('disconnect', () => {
        console.log("Cliente Desonectado");
        //const usuario = new Usuario(cliente.id);
        usuariosConectados.borrarUsuario(cliente.id);

        io.emit('usuarios-activos', usuariosConectados.getLista());
    });

}

// Emitir los mensajes de los clientes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string} ) => {
        console.log('Mensaje Recibido: ' , payload);

        io.emit('mensaje-nuevo', payload);
    });
}

//Configurar usuario -> para usuarios conectados
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on("configurar-usuario", (payload: {nombre: string}, callback: Function) => {
        //console.log('Usuario Conectado:', payload.nombre);
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} conectado/configurado`
        });
    });
}

export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
};