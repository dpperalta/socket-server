import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/usariosLista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

// Conectar Cliente 
export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar(usuario);
}

// Escuchar las desconexiones de los cliente
export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log("Cliente Desonectado");
        //const usuario = new Usuario(cliente.id);
        usuariosConectados.borrarUsuario(cliente.id);
    });

}

// Emitir los mensajes de los clientes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string} ) => {
        console.log('Mensaje Recibido: ' , payload);

        io.emit('mensaje-nuevo', payload);
    });
}

//Configurar usuario -> para usuarios conectados
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on("configurar-usuario", (payload: {nombre: string}, callback: Function) => {
        //console.log('Usuario Conectado:', payload.nombre);
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} conectado/configurado`
        });
    });
}