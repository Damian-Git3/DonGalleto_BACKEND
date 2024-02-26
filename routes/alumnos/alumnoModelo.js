
class Alumno {

    constructor({id, nombre, apellido, email, password, telefono, matricula, fecha_nacimiento, foto, estado, codigoPostal, numInterior, numExterior, calle, colonia, municipio}) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.matricula = matricula;
        this.fecha_nacimiento = fecha_nacimiento;
        this.foto = foto;
        this.estado = estado;
        this.codigoPostal = codigoPostal;
        this.numInterior = numInterior;
        this.numExterior = numExterior;
        this.calle = calle;
        this.colonia = colonia;
        this.municipio = municipio;
    }

    constructor({nombre, apellidoPaterno, apellidoMaterno, email, telefono, codigoPostal, colonia, calle, numInterior, numExterior, matricula, fecha_nacimiento, foto, estado, municipio}) {
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.email = email;
        this.telefono = telefono;
        this.codigoPostal = codigoPostal;
        this.colonia = colonia;
        this.calle = calle;
        this.numInterior = numInterior;
        this.numExterior = numExterior;
        this.matricula = matricula;
        this.fecha_nacimiento = fecha_nacimiento;
        this.foto = foto;
        this.estado = estado;
        this.municipio = municipio;
        this.id_usuario = null;
    }

    constructor({ id, nombre, apellidoPaterno, apellidoMaterno, email, telefono, codigoPostal, colonia, calle, numInterior, numExterior, matricula, fecha_nacimiento, foto, estado, municipio, id_usuario }) {
        this.id = id;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.email = email;
        this.telefono = telefono;
        this.codigoPostal = codigoPostal;
        this.colonia = colonia;
        this.calle = calle;
        this.numInterior = numInterior;
        this.numExterior = numExterior;
        this.matricula = matricula;
        this.fecha_nacimiento = fecha_nacimiento;
        this.foto = foto;
        this.estado = estado;
        this.municipio = municipio;
        this.id_usuario = id_usuario;
    }

    constructor({nombre, apellidoPaterno, apellidoMaterno, email, telefono, codigoPostal, colonia, calle, numInterior, numExterior, matricula, fecha_nacimiento, foto, estado, municipio}) {
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.email = email;
        this.telefono = telefono;
        this.codigoPostal = codigoPostal;
        this.colonia = colonia;
        this.calle = calle;
        this.numInterior = numInterior;
        this.numExterior = numExterior;
        this.matricula = matricula;
        this.fecha_nacimiento = fecha_nacimiento;
        this.foto = foto;
        this.estado = estado;
        this.municipio = municipio;
    }


    // Getters
    getId() {
        return this.id;
    }

    getNombre() {
        return this.nombre;
    }

    getApellido() {
        return this.apellidoPaterno;
    }

    getEmail() {
        return this.email;
    }

    getTelefono() {
        return this.telefono;
    }

    getCodigoPostal() {
        return this.codigoPostal;
    }

    getColonia() {
        return this.colonia;
    }

    getCalle() {
        return this.calle;
    }

    getNumInterior() {
        return this.numInterior;
    }

    getNumExterior() {
        return this.numExterior;
    }

    getMatricula() {
        return this.matricula;
    }

    getFechaNacimiento() {
        return this.fecha_nacimiento;
    }

    getFoto() {
        return this.foto;
    }

    getEstado() {
        return this.estado;
    }

    getMunicipio() {
        return this.municipio;
    }

    getIdUsuario() {
        return this.id_usuario;
    }

    // Setters

    setId(id) {
        this.id = id;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    setApellido(apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    setEmail(email) {
        this.email = email;
    }

    setTelefono(telefono) {
        this.telefono = telefono;
    }

    setCodigoPostal(codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    setColonia(colonia) {
        this.colonia = colonia;
    }

    setCalle(calle) {
        this.calle = calle;
    }

    setNumInterior(numInterior) {
        this.numInterior = numInterior;
    }

    setNumExterior(numExterior) {
        this.numExterior = numExterior;
    }

    setMatricula(matricula) {
        this.matricula = matricula;
    }

    setFechaNacimiento(fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    setFoto(foto) {
        this.foto = foto;
    }

    setEstado(estado) {
        this.estado = estado;
    }

    setIdUsuario(id_usuario) {
        this.id_usuario = id_usuario;
    }

}