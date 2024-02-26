const db = require('../../utils/bd'); // Asegúrate de tener un módulo de base de datos configurado

class UsuarioDao {
    // Función para crear un nuevo usuario
    async createUser(usuario) {
        try {
            const query = 'INSERT INTO usuarios (usuario, contrasenia) VALUES (:usuario, :contrasenia)';
            const params = {
                nombre: usuario.getNombre(),
                contrasenia: usuario.getContrasenia()
            };
            return db.query(query, params);
        } catch (error) {
            throw new MySqlError('error: createUser', error.message, error.code,);
        }
    }

    // Función para obtener un usuario por ID
    async getUserById(id_usuario) {
        try {
            const query = 'SELECT * FROM usuarios WHERE id = :id_usuario';
            const params = { id_usuario };
            return db.query(query, params);
        } catch (error) {
            throw new MySqlError('error: getUserById', error.message, error.code,);
        }
    }

    // Función para obtener un usuario por nombre de usuario
    async getUserByUsername(usuario) {
        try {
            const query = 'SELECT * FROM usuarios WHERE usuario = :usuario';
            const params = { usuario };
            return db.query(query, params);
        } catch (error) {
            throw new MySqlError('error: getUserByUsername', error.message, error.code,);
        }
    }

    // Función para actualizar un usuario
    async updateUser(id_usuario, usuario) {
        try {
            const query = 'UPDATE usuarios SET usuario = ?, contrasenia = ? WHERE id = ?';
            const params = {
                id_usuario,
                nombre: usuario.getNombre(),
                contrasenia: usuario.getContrasenia()

            };
            return db.query(query, params);
        } catch (error) {
            throw new MySqlError('error: updateUser', error.message, error.code,);
        }
    }

    // Función para eliminar un usuario
    async deleteUser(id_usuario) {
        try {
            const query = 'DELETE FROM usuarios WHERE id = ?';
            const params = {id_usuario};
            return db.query(query, params);
        } catch (error) {
            throw new MySqlError('error: updateUser', error.message, error.code,);
        }
    }
}

module.exports = UsuarioDao; // Exporta la clase para que pueda ser utilizada en otros archivos