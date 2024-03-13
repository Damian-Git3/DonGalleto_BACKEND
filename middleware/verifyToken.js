const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
 const token = req.headers["x-access-token"];
 if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "No token provided" });
 }

 try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.id;
    next();
 } catch (error) {
    // Aquí manejamos los errores específicos de JWT
    if (error instanceof jwt.JsonWebTokenError) {
      // Este bloque maneja errores generales de JWT, como un token inválido
      return res.status(401).send({ success: false, message: "Token incorrecto" });
    } else if (error instanceof jwt.TokenExpiredError) {
      // Este bloque maneja el caso específico de un token expirado
      return res.status(401).send({ success: false, message: "La sesión expiró" });
    } else {
      // Para cualquier otro tipo de error, puedes manejarlo de manera general
      return res.status(500).send({ success: false, message: "Internal server error" });
    }
 }
}

module.exports = verifyToken;