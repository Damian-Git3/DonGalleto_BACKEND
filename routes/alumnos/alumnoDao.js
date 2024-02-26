const db = require('../../utils/bd'); // Asegúrate de tener un módulo de base de datos configurado

class AlumnoDao {
    // Función para crear un nuevo alumno
    async createAlumno(alumno) {
        try {
            const query = 'INSERT INTO alumnos (nombre, apellido, email, telefono, codigoPostal, colonia, calle, numExterior, numInterior, matricula, fecha_nacimiento, foto, estado, municipio)' +
                'VALUES (:nombre, :apellido, :email, :telefono, :codigoPostal, :colonia, :calle, :numExterior, :numInterior, :matricula, :fecha_nacimiento, :foto, :estado, :municipio)';
            const params = {
                nombre: alumno.getNombre(),
                apellido: alumno.getApellido(),
                email: alumno.getEmail(),
                telefono: alumno.getTelefono(),
                codigoPostal: alumno.getCodigoPostal(),
                colonia: alumno.getColonia(),
                calle: alumno.getCalle(),
                numExterior: alumno.getNumExterior(),
                numInterior: alumno.getNumInterior(),
                matricula: alumno.getMatricula(),
                fecha_nacimiento: alumno.getFechaNacimiento(),
                foto: alumno.getFoto(),
                estado: alumno.getEstado(),
                municipio: alumno.getMunicipio()
            };
            return db.query(query, params);
        } catch (error) {
            throw new MySqlError('error: createAlumno', error.message, error.code,);
        }
    }

    // Función para obtener un alumno por ID
    async getAlumnoById(id_alumno) {
        try {
            const query = 'SELECT * FROM alumnos WHERE id = :id_alumno';
            const params = { id_alumno };
            return db.query(query, params);
        } catch (error) {
            throw new MySqlError('error: getAlumnoById', error.message, error.code,);
        }
    }

    // Función para actualizar un alumno
    async updateAlumno(id_alumno, alumno) {
        try {
            const query = 'UPDATE alumnos SET nombre = :nombre, apellido = :apellido, email = :email, telefono = :telefono, codigoPostal = :codigoPostal, colonia = :colonia, calle = :calle, numInterior = :numInterior, numExterior = :numExterior, matricula = :matricula, fecha_nacimiento = :fecha_nacimiento, foto = :foto, estado = :estado, municipio = :municipio WHERE id = :id_alumno';
            const params = {
                id_alumno,
                nombre: alumno.getNombre(),
                apellido: alumno.getApellido(),
                email: alumno.getEmail(),
                telefono: alumno.getTelefono(),
                codigoPostal: alumno.getCodigoPostal(),
                colonia: alumno.getColonia(),
                calle: alumno.getCalle(),
                numInterior: alumno.getNumInterior(),
                numExterior: alumno.getNumExterior(),
                matricula: alumno.getMatricula(),
                fecha_nacimiento: alumno.getFechaNacimiento(),
                foto: alumno.getFoto(),
                estado: alumno.getEstado(),
                municipio: alumno.getMunicipio()
            };
            return db.query(query, params);
        } catch (error) {
            throw new MySqlError('error: updateAlumno', error.message, error.code,);
        }
    }

    // Función para eliminar un alumno
    async deleteAlumno(id_alumno) {
        try {
            const query = 'DELETE FROM alumnos WHERE id = :id_alumno';
            const params = { id_alumno };
            return db.query(query, params);
        } catch (error) {
            throw new MySqlError('error: deleteAlumno', error.message, error.code,);
        }
    }
}

module.exports = AlumnoDao; // Exporta la clase para que pueda ser utilizada en otros archivos