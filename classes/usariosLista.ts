import { Usuario } from './usuario';

export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor (){}

    // Agregar un usuario a la lista
    public agregar(usuario: Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    // Actualizar información de un usuario
    public actualizarNombre(id: string, nombre: string){
        for(let usuario of this.lista){
            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('====== Actualizando Usuario ======');
        console.log(this.lista);
    }
    
    // Obtener lista de usuarios
    public getLista (){
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    // Obtener un único usuario por ID
    public getUsuario (id: string){
        return this.lista.find(usuario => usuario.id === id);
    }

    // Obtener los usuarios de una sala específica
    public getUsuarioEnSala (sala: string){
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    // Eliminar usuarios de la lista
    public borrarUsuario (id: string){
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        console.log(this.lista);
        return tempUsuario;
    }
}