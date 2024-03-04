const db = require('../../utils/bd'); // Asegúrate de tener un módulo de base de datos configurado
const logger = require('../../utils/logger');

class UsuarioDao {
    async validarUsuario (usuario){
        try {
            const query = `SELECT id,usuario, contrasena, estatus FROM usuarios WHERE binary usuario = :usuario limit 1;`;
            let [response] = await db.query(query, usuario);
            logger.debug(response);
            return response[0];
        } catch (error) {
            throw 'error: No se pudo validar el usuario';
        }
    }
    
    // Función para crear un nuevo usuario
    async registrarUsuario(usuario) {
        try {
            console.log(usuario);
            const query = 'CALL guardar_usuario(:id, :usuario, :contrasena, :estatus);';
            const [rows] = await db.query(query, usuario);
            const newUserId = rows[0][0].id; // Asume que el procedimiento almacenado devuelve el nuevo ID en la primera fila
            return { ...usuario, id: newUserId }; // Devuelve el objeto usuario con el nuevo ID
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw 'error: El nombre de usuario ya existe';
            }
            throw "error: No fue posible realizar la insercion";
        }
    }

    // Función para obtener un usuario por ID
    async getUserById(idUsuario) {
        try {
            const query = 'SELECT * FROM usuarios WHERE id = :idUsuario';
            const params = { idUsuario };
            return await db.query(query, params);
        } catch (error) {
            throw new MySqlError('error: getUserById', error.message, error.code,);
        }
    }

    // Función para obtener un usuario por nombre de usuario
    async getUserByUsername(usuario) {
        try {
            const query = 'SELECT * FROM usuarios WHERE usuario = :usuario';
            return await db.query(query, usuario);
        } catch (error) {
            throw new MySqlError('error: getUserByUsername', error.message, error.code,);
        }
    }

    // Función para eliminar un usuario
    async deleteUser(idUsuario) {
        try {
            const query = 'DELETE FROM usuarios WHERE id = :idUsuario';
            return await db.query(query, idUsuario);
        } catch (error) {
            throw new MySqlError('error: updateUser', error.message, error.code,);
        }
    }
}

let usuarioDao = new UsuarioDao(); // Instancia de la clase UsuarioDao
module.exports = usuarioDao; // Exporta la clase para que pueda ser utilizada en otros archivos