import { Socket } from 'socket.io';

// Escuchar las desconexiones de los cliente
export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log("Cliente Desonectado");
    });

}

// Emitir los mensajes de los clientes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string} ) => {
        console.log('Mensaje Recibido: ' , payload);

        io.emit('mensaje-nuevo', payload);
    });
}