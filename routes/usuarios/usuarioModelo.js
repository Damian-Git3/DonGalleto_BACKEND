const bcrypt = require("bcryptjs");

class Usuario {
  constructor({ id = null, usuario, contrasena, rol = 1, estatus = 1 }) {
    this.id = id;
    this.usuario = usuario;
    this.contrasena = this.sanitizarContrasena(contrasena);
    this.rol = rol;
    this.estatus = estatus;
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

  getEstatus() {
    return this.estatus;
  }

  getRol() {
    return this.rol;
  }

  // Setters

  setId(id) {
    this.id = id;
  }

  setUsuario(usuario) {
    this.usuario = usuario;
  }

  setContrasena(contrasena) {
    this.contrasena = contrasena;
  }

  setEstatus(estatus) {
    this.estatus = estatus;
  }

  setRol(rol) {
    this.rol = rol;
  }

  // Métodos

  async encryptPassword() {
    const salt = bcrypt.genSaltSync(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
  }

  validatePassword(contrasena) {
    return bcrypt.compare(contrasena, this.contrasena);
  }

  sanitizarContrasena(contrasena) {
    // Regex que coincide con caracteres especiales y espacios en blanco
    const regex = /[`"'();,[\]{}<>\s]/g;

    // Reemplazar los caracteres especiales y espacios en blanco por un caracter vacío
    return contrasena.replace(regex, "");
  }
}


module.exports = Usuario;
