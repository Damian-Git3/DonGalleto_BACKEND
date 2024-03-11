DROP DATABASE dongalleto;
CREATE DATABASE dongalleto;
USE dongalleto;

# --------------------------------------------------------         ESTRUCTURA        ------------------------------------------------------------------
#DROP TABLE usuarios;
CREATE TABLE usuarios(
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    rol INT,
    estatus INT,
    fecha_creacion DATE DEFAULT(CURDATE()),
    hora_creacion TIME DEFAULT (CURTIME()),
    usuario_mod INT,
    fecha_mod DATE,
    hora_mod TIME
);

# --------------------------------------------------------         TRIGGERS        ------------------------------------------------------------------
DELIMITER //
CREATE TRIGGER actualizar_fecha_hora_mod 
BEFORE UPDATE ON usuarios
FOR EACH ROW
BEGIN
 SET NEW.fecha_mod = CURDATE(); -- Actualiza la fecha de modificación con la fecha actual
 SET NEW.hora_mod = CURTIME(); -- Actualiza la hora de modificación con la hora actual
END; //
DELIMITER ;

# --------------------------------------------------------         STORE PROCEDURES        ------------------------------------------------------------------

#DROP PROCEDURE guardar_usuario;
DELIMITER //
CREATE PROCEDURE guardar_usuario(
	IN id_param INT, 
    IN usuario_param VARCHAR(100), 
    IN contrasena_param VARCHAR(100),
    IN usuario_mod_param INT,
    IN rol_param INT)
BEGIN
    INSERT INTO usuarios (id, usuario, contrasena, usuario_mod, rol, estatus)
    VALUES (id_param, usuario_param, contrasena_param, usuario_mod_param, rol_param, 1)
    ON DUPLICATE KEY UPDATE
        usuario = usuario_param,
        contrasena = contrasena_param,
        usuario_mod = usuario_mod_param,
        rol = rol_param;
	SELECT LAST_INSERT_ID() AS id;
END  //
DELIMITER ;

DELIMITER //
#DROP PROCEDURE IF EXISTS modificar_estatus_usuario;
CREATE PROCEDURE modificar_estatus_usuario(
	IN id_param INT, 
    IN estatus_param INT, 
    IN usuario_mod_param INT)
BEGIN
    UPDATE usuarios SET estatus = estatus_param, usuario_mod=usuario_mod_param
    WHERE id = id_param;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE actualizar_contrasena(
    IN id_param INT, 
    IN contrasena_param VARCHAR(100))
BEGIN
    UPDATE usuarios 
    SET 
        contrasena = contrasena_param
    WHERE id = id_param;

    SELECT id_param AS id;
END //
DELIMITER ;


# --------------------------------------------------------         DML        ------------------------------------------------------------------
CALL guardar_usuario(NULL, 'ADMIN', '$2a$10$Luu61BZLmkqxplIFLyeIB.JnUy1RB5Ta0fEw8JunIlFpMuoxwwuxe', NULL, 2); #ADMIN ADMIN

SELECT * FROM usuarios;