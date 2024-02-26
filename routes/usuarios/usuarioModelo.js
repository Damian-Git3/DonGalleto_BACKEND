class Usuario {
    
    constructor({id, usuario, contrasenia}) {
        this.id = id;
        this.usuario = usuario;
        this.contrasenia = contrasenia;

    }

    constructor ({usuario, contrasenia}) {
        this.usuario = usuario;
        this.contrasenia = contrasenia;
    }

    // Getters
    getId() {
        return this.id;
    }

    getNombre() {
        return this.usuario;
    }

    getContrasenia() {
        return this.contrasenia;
    }

    // Setters

    setId(id) {
        this.id = id;
    }

    setNombre(usuario) {
        this.usuario = usuario;
    }

    setContrasenia(contrasenia) {
        this.contrasenia = contrasenia;
    }

}