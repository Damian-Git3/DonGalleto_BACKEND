class Usuario {
    
    constructor({id, usuario, contrasenia, estatus}) {
        this.id = id;
        this.usuario = usuario;
        this.contrasenia = contrasenia;
        this.estatus = estatus

    }

    constructor ({usuario, contrasenia}) {
        this.usuario = usuario;
        this.contrasenia = contrasenia;
    }

    // Getters
    getId() {
        return this.id;
    }

    getUsuario() {
        return this.usuario;
    }

    getContrasenia() {
        return this.contrasenia;
    }

    getEstatus(){
        return this.contrasenia;
    }

    // Setters

    setId(id) {
        this.id = id;
    }

    setUsuario(usuario) {
        this.usuario = usuario;
    }

    setContrasenia(contrasenia) {
        this.contrasenia = contrasenia;
    }

    setEstatus(estatus){
        this.estatus = estatus;
    }

}