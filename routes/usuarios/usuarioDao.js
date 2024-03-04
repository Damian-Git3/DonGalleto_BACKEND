const db = require('../../utils/bd'); // Asegúrate de tener un módulo de base de datos configurado

class UsuarioDao {
    async validarUsuario(usuario){
        try {
            const query = `SELECT usuario, contrasena FROM usuarios WHERE usuario = :usuario AND contrasena = :contrasena`;
            return db.query(query, usuario);
        } catch (error) {
            throw new MySqlError('error: getUserById')
        }
    }
    
    
    // Función para crear un nuevo usuario
    async saveUser(usuario) {
        try {
            const query = 'CALL guardar_usuario(:idUsuario, :usuario, :contrasena, :estatus);';
            return db.query(query, usuario);
        } catch (error) {
            throw new MySqlError('error: createUser', error.message, error.code,);
        }
    }

    // Función para obtener un usuario por ID
    async getUserById(idUsuario) {
        try {
            const query = 'SELECT * FROM usuarios WHERE id = :idUsuario';
            const params = { idUsuario };
            return db.query(query, params);
        } catch (error) {
            throw new MySqlError('error: getUserById', error.message, error.code,);
        }
    }

    // Función para obtener un usuario por nombre de usuario
    async getUserByUsername(usuario) {
        try {
            const query = 'SELECT * FROM usuarios WHERE usuario = :usuario';
            return db.query(query, usuario);
        } catch (error) {
            throw new MySqlError('error: getUserByUsername', error.message, error.code,);
        }
    }

    // Función para eliminar un usuario
    async deleteUser(idUsuario) {
        try {
            const query = 'DELETE FROM usuarios WHERE id = :idUsuario';
            return db.query(query, idUsuario);
        } catch (error) {
            throw new MySqlError('error: updateUser', error.message, error.code,);
        }
    }
}

module.exports = UsuarioDao; // Exporta la clase para que pueda ser utilizada en otros archivos