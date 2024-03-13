const db = require("../../utils/bd"); // Asegúrate de tener un módulo de base de datos configurado
const logger = require("../../utils/logger");

class UsuarioDao {
    async validarUsuario(usuario) {
        try {
            const query = `SELECT id,usuario, contrasena, estatus, rol FROM usuarios WHERE BINARY usuario = :usuario limit 1;`;
            let [response] = await db.query(query, usuario);
            logger.debug(response);
            return response[0];
        } catch (error) {
            throw new Error('error: No se pudo validar el usuario');
        }
    }

    // Función para crear un nuevo usuario
    async registrarUsuario(usuario) {
        try {

            const query = 'CALL guardar_usuario(:id, :usuario, :contrasena, :usuario_mod, :rol);';
            const [rows] = await db.query(query, usuario);
            const newUserId = rows[0][0].id; // Asume que el procedimiento almacenado devuelve el nuevo ID en la primera fila
            return { ...usuario, id: newUserId }; // Devuelve el objeto usuario con el nuevo ID
        } catch (error) {
            console.log("Error SQL registrar: ", error);
            console.log("Error SQL registrar: ", error.sqlMessage);
            console.log("Error SQL codigo", error.code)
            if (error.code === 'ER_SIGNAL_EXCEPTION')
            {
                return new Error("Usuario ya registrado")
            }else{
                return new Error("No fue posible realizar la insercion", error.message, error.code,);
            }
            
        }
    }

    // Función para obtener un usuario por ID
    async getUserById(idUsuario) {
        try {
            const query = 'SELECT * FROM usuarios WHERE id = ?';
            const result = await db.query(query, [idUsuario]);

            // Devolver el primer resultado si existe
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            throw new Error('error: getUserById', error.message, error.code,);
        }
    }


    async getUsers() {
        try {
            const query = 'SELECT * FROM usuarios';

            const res = await db.query(query);

            return res[0]
        }
        catch (error) {
            console.log(error);
            throw new Error('error: getUsers', error.message, error.code,);
        }
    }

    // Función para obtener un usuario por nombre de usuario
    async getUserByUsername(usuario) {
        try {
            const query = 'SELECT * FROM usuarios WHERE usuario = :usuario';
            return await db.query(query, usuario);
        } catch (error) {
            throw new Error('error: getUserByUsername', error.message, error.code,);
        }
    }

  // Función para eliminar un usuario
  async deleteUser(idUsuario) {
    try {
      const query = "UPDATE usuarios SET estatus = 0 WHERE id = " + idUsuario;
      return await db.query(query);
    } catch (error) {
      console.log(error);
      throw "error: No fue posible borrar el usuario";
    }
  }

    async listarUsuarios() {
        try {
            const query = `SELECT * FROM UsuariosFull`
            return await db.query(query, {});
        } catch (error) {
            throw new Error('error: listarUsuarios', error.message, error.code,);
        }
    }

    async listarUsuariosActivos() {
        try {
            const query = 'SELECT * FROM UsuariosActivos'
            return await db.query(query, {});
        } catch (error) {
            throw new Error('error: listarUsuariosActivos', error.message, error.code)
        }
    }

  async updateUserData(data) {
    try {
        
      const query =
        "UPDATE usuarios SET usuario = :nuevo_usuario, contrasena = :contrasena, usuario_mod = :id WHERE id = :id";
        return await db.query(query, data);
      
    } catch (error) {
        
      throw "error: No fue posible actualizar el usuario";
    }
  }
}

let usuarioDao = new UsuarioDao(); // Instancia de la clase UsuarioDao
module.exports = usuarioDao; // Exporta la clase para que pueda ser utilizada en otros archivos
