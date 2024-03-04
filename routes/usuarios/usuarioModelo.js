const bcrypt = require('bcryptjs');

class Usuario {
    
    constructor({id=null, usuario, contrasena, estatus=1}) {
        this.id = id;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.estatus = estatus

    }

    // Getters
    getId() {
        return this.id;
    }

    getUsuario() {
        return this.usuario;
    }

    getContrasena() {
        return this.contrasena;
    }

    getEstatus(){
        return this.estatus;
    }

    // Setters

    setId(id) {
        this.id = id;
    }

    setUsuario(usuario) {
        this.usuario = usuario;
    }

    setContrasena(contrasena) {
        this.contrasenia = contrasena;
    }

    setEstatus(estatus){
        this.estatus = estatus;
    }

    // Métodos

    async encryptPassword() {
        const salt = bcrypt.genSaltSync(10);
        this.contrasena = await bcrypt.hash(this.contrasena, salt);
    }

    validatePassword(contrasena) {
        return bcrypt.compare(contrasena, this.contrasena);
    }

}

module.exports = Usuario;