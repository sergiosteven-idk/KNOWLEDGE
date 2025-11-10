CREATE DATABASE IF NOT EXISTS KNOWLEDGE;
USE KNOWLEDGE;

-- =========================
-- TABLAS MAESTRAS Y CONFIGURACIÓN
-- =========================

CREATE TABLE IF NOT EXISTS Administrador (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    tipo_admin ENUM('super', 'editor', 'moderador') DEFAULT 'editor',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Miembro (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('estudiante', 'docente', 'invitado') DEFAULT 'estudiante',
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso DATETIME,
    preferencias_accesibilidad JSON,
    activo BOOLEAN DEFAULT TRUE,
    id_admin INT,
    FOREIGN KEY (id_admin) REFERENCES Administrador(id_admin) ON DELETE SET NULL
);

-- =========================
-- ROLES Y PERMISOS MEJORADOS
-- =========================

CREATE TABLE IF NOT EXISTS Rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    nivel_permisos INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS Permiso (
    id_permiso INT AUTO_INCREMENT PRIMARY KEY,
    accion VARCHAR(100) NOT NULL,
    recurso VARCHAR(100) NOT NULL,
    descripcion TEXT,
    UNIQUE KEY unique_permiso (accion, recurso)
);

CREATE TABLE IF NOT EXISTS Rol_Permiso (
    id_rol INT,
    id_permiso INT,
    PRIMARY KEY (id_rol, id_permiso),
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol) ON DELETE CASCADE,
    FOREIGN KEY (id_permiso) REFERENCES Permiso(id_permiso) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Usuario_Rol (
    id_usuario INT,
    id_rol INT,
    fecha_asignacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_rol),
    FOREIGN KEY (id_usuario) REFERENCES Miembro(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol) ON DELETE CASCADE
);

-- =========================
-- CATEGORÍAS Y CONTENIDO EDUCATIVO
-- =========================

CREATE TABLE IF NOT EXISTS Categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    icono VARCHAR(50),
    color VARCHAR(7) DEFAULT '#3B82F6',
    activa BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS ContenidoEducativo (
    id_contenido INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo ENUM('video', 'podcast', 'texto', 'curso', 'evaluacion') NOT NULL,
    url_contenido VARCHAR(500),
    archivo_url VARCHAR(255) NULL,
    extension VARCHAR(50) NULL,
    url_subtitulos VARCHAR(500),
    url_transcripcion VARCHAR(500),
    url_audio_descripcion VARCHAR(500),
    duracion_minutos INT,
    nivel_dificultad ENUM('principiante', 'intermedio', 'avanzado') DEFAULT 'principiante',
    es_gratuito BOOLEAN DEFAULT TRUE,
    requiere_registro BOOLEAN DEFAULT FALSE,
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    estado ENUM('borrador', 'publicado', 'archivado') DEFAULT 'borrador',
    id_categoria INT,
    id_autor INT,
    metadatos_accesibilidad JSON,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria) ON DELETE SET NULL,
    FOREIGN KEY (id_autor) REFERENCES Miembro(id_usuario) ON DELETE SET NULL
);

-- =========================
-- DONACIONES MEJORADAS
-- =========================

CREATE TABLE IF NOT EXISTS Donaciones (
    id_donacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    monto DECIMAL(10,2) NOT NULL,
    fecha_donacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    metodo_pago ENUM('tarjeta', 'paypal', 'transferencia', 'efectivo'),
    estado ENUM('pendiente', 'completada', 'fallida') DEFAULT 'pendiente',
    comprobante_url VARCHAR(500),
    mensaje_donante TEXT,
    anonima BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES Miembro(id_usuario) ON DELETE SET NULL
);

-- =========================
-- CURSOS Y PROGRESO MEJORADO
-- =========================

CREATE TABLE IF NOT EXISTS Curso (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100),
    nivel ENUM('básico', 'intermedio', 'avanzado') DEFAULT 'básico',
    fecha_inicio DATE,
    fecha_fin DATE,
    precio DECIMAL(10,2) DEFAULT 0.00,
    imagen_url VARCHAR(500),
    estado ENUM('activo', 'inactivo', 'en_desarrollo') DEFAULT 'en_desarrollo',
    requisitos TEXT,
    objetivos_aprendizaje JSON
);

CREATE TABLE IF NOT EXISTS Modulo (
    id_modulo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_modulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    orden INT NOT NULL,
    id_curso INT NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES Curso(id_curso) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Progreso (
    id_progreso INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_contenido INT,
    id_modulo INT,
    id_curso INT,
    tipo_progreso ENUM('contenido', 'modulo', 'curso') NOT NULL,
    estado ENUM('pendiente', 'en_progreso', 'completado') DEFAULT 'pendiente',
    porcentaje_completado DECIMAL(5,2) DEFAULT 0.00,
    ultima_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    fecha_completado DATETIME NULL,
    tiempo_total_segundos INT DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES Miembro(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_contenido) REFERENCES ContenidoEducativo(id_contenido) ON DELETE CASCADE,
    FOREIGN KEY (id_modulo) REFERENCES Modulo(id_modulo) ON DELETE CASCADE,
    FOREIGN KEY (id_curso) REFERENCES Curso(id_curso) ON DELETE CASCADE
);

-- =========================
-- EVALUACIONES MEJORADAS
-- =========================

CREATE TABLE IF NOT EXISTS Evaluacion (
    id_evaluacion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo ENUM('quiz', 'examen', 'práctica', 'proyecto') DEFAULT 'quiz',
    id_modulo INT NOT NULL,
    tiempo_limite_minutos INT,
    intentos_permitidos INT DEFAULT 1,
    porcentaje_aprobacion DECIMAL(5,2) DEFAULT 70.00,
    activa BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_modulo) REFERENCES Modulo(id_modulo) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Pregunta (
    id_pregunta INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT NOT NULL,
    tipo ENUM('opcion_multiple', 'verdadero_falso', 'respuesta_abierta', 'seleccion_multiple') NOT NULL,
    opciones JSON,
    respuesta_correcta JSON,
    puntos INT DEFAULT 1,
    explicacion TEXT,
    id_evaluacion INT NOT NULL,
    FOREIGN KEY (id_evaluacion) REFERENCES Evaluacion(id_evaluacion) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Resultado (
    id_resultado INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_evaluacion INT NOT NULL,
    calificacion DECIMAL(5,2),
    fecha_realizacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    tiempo_utilizado_segundos INT,
    intento_numero INT DEFAULT 1,
    respuestas_usuario JSON,
    FOREIGN KEY (id_usuario) REFERENCES Miembro(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_evaluacion) REFERENCES Evaluacion(id_evaluacion) ON DELETE CASCADE
);

-- =========================
-- BLOG Y NOTICIAS
-- =========================

CREATE TABLE IF NOT EXISTS Blog_Noticias (
    id_blog INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT NOT NULL,
    resumen TEXT,
    autor VARCHAR(100),
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    estado ENUM('borrador', 'publicado', 'archivado') DEFAULT 'borrador',
    imagen_portada VARCHAR(500),
    etiquetas JSON,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Miembro(id_usuario) ON DELETE SET NULL
);

-- =========================
-- FEEDBACK Y COMENTARIOS
-- =========================

CREATE TABLE IF NOT EXISTS Feedback (
    id_feedback INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_contenido INT,
    id_curso INT,
    tipo_feedback ENUM('contenido', 'plataforma', 'accesibilidad', 'general'),
    calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('nuevo', 'leido', 'resuelto') DEFAULT 'nuevo',
    FOREIGN KEY (id_usuario) REFERENCES Miembro(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_contenido) REFERENCES ContenidoEducativo(id_contenido) ON DELETE SET NULL,
    FOREIGN KEY (id_curso) REFERENCES Curso(id_curso) ON DELETE SET NULL
);

-- =========================
-- EVENTOS Y COMUNIDAD
-- =========================

CREATE TABLE IF NOT EXISTS Evento (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo_evento ENUM('comunitario', 'educativo', 'cultural', 'gira'),
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME,
    ubicacion VARCHAR(200),
    es_virtual BOOLEAN DEFAULT FALSE,
    url_evento VARCHAR(500),
    capacidad_maxima INT,
    imagen_url VARCHAR(500),
    estado ENUM('activo', 'cancelado', 'completado') DEFAULT 'activo',
    id_organizador INT,
    FOREIGN KEY (id_organizador) REFERENCES Miembro(id_usuario) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Registro_Evento (
    id_registro INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('confirmado', 'pendiente', 'cancelado') DEFAULT 'confirmado',
    necesidades_accesibilidad JSON,
    FOREIGN KEY (id_evento) REFERENCES Evento(id_evento) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Miembro(id_usuario) ON DELETE CASCADE
);

-- =========================
-- ALIANZAS Y PATROCINIOS
-- =========================

CREATE TABLE IF NOT EXISTS Aliado (
    id_aliado INT AUTO_INCREMENT PRIMARY KEY,
    nombre_organizacion VARCHAR(200) NOT NULL,
    tipo_organizacion ENUM('ong', 'empresa', 'gobierno', 'institucion_educativa'),
    descripcion TEXT,
    logo_url VARCHAR(500),
    sitio_web VARCHAR(200),
    contacto_email VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    fecha_alianza DATE
);

CREATE TABLE IF NOT EXISTS Patrocinio (
    id_patrocinio INT AUTO_INCREMENT PRIMARY KEY,
    id_aliado INT NOT NULL,
    tipo_patrocinio ENUM('financiero', 'tecnologico', 'infraestructura', 'contenido'),
    descripcion TEXT,
    monto DECIMAL(15,2),
    fecha_inicio DATE,
    fecha_fin DATE,
    estado ENUM('activo', 'finalizado', 'pendiente') DEFAULT 'activo',
    FOREIGN KEY (id_aliado) REFERENCES Aliado(id_aliado) ON DELETE CASCADE
);

-- =========================
-- CONFIGURACIÓN ACCESIBILIDAD
-- =========================

CREATE TABLE IF NOT EXISTS ConfiguracionAccesibilidad (
    id_config INT AUTO_INCREMENT PRIMARY KEY,
    nombre_config VARCHAR(100) NOT NULL UNIQUE,
    valor_config JSON,
    descripcion TEXT,
    editable_por_usuario BOOLEAN DEFAULT TRUE
);

-- =========================
-- INSERCIÓN DE DATOS INICIALES
-- =========================

-- Insertar administrador por defecto
INSERT INTO Administrador (nombre, correo, contrasena, tipo_admin) 
VALUES (
  'Super Admin', 
  'admin@knowledge.com', 
  '$2b$10$mp8Z04.5IOwZTuHGTFHwe.3GyQv3ewdTrgF/TMkTn.MlZPR25NuxO', 
  'super'
);

-- Insertar miembro administrador
INSERT INTO Miembro (nombre, apellido, correo, contrasena, tipo_usuario, id_admin) 
VALUES (
  'Super', 
  'Admin', 
  'admin@knowledge.com', 
  '$2b$10$mp8Z04.5IOwZTuHGTFHwe.3GyQv3ewdTrgF/TMkTn.MlZPR25NuxO', 
  'docente', 
  1
);

-- Insertar roles básicos
INSERT INTO Rol (nombre_rol, descripcion, nivel_permisos) VALUES
('super_admin', 'Acceso total al sistema', 100),
('editor_contenido', 'Puede crear y editar contenido', 60),
('moderador', 'Puede moderar comentarios y usuarios', 40),
('estudiante_avanzado', 'Estudiante con permisos especiales', 20),
('estudiante', 'Usuario básico del sistema', 10);

-- Insertar categorías de contenido
INSERT INTO Categoria (nombre_categoria, descripcion, icono, color) VALUES
('tecnologia', 'Contenido sobre tecnología y programación', '💻', '#3B82F6'),
('ciencias', 'Matemáticas, física, química y biología', '🔬', '#10B981'),
('arte-cultura', 'Arte, música, literatura y cultura general', '🎨', '#8B5CF6'),
('desarrollo-personal', 'Habilidades blandas y crecimiento personal', '🌱', '#F59E0B'),
('accesibilidad', 'Contenido sobre inclusión y accesibilidad', '♿', '#EF4444');

-- Insertar configuraciones de accesibilidad por defecto
INSERT INTO ConfiguracionAccesibilidad (nombre_config, valor_config, descripcion) VALUES
('tamaño_fuente', '{"valores": ["pequeno", "normal", "grande", "muy_grande"], "default": "normal"}', 'Configuración de tamaño de fuente'),
('contraste', '{"valores": ["normal", "alto"], "default": "normal"}', 'Niveles de contraste visual'),
('navegacion_teclado', '{"habilitado": true}', 'Habilitar navegación por teclado'),
('lector_pantalla', '{"compatible": true}', 'Compatibilidad con lectores de pantalla'),
('velocidad_audio', '{"valores": [0.5, 0.75, 1.0, 1.25, 1.5, 2.0], "default": 1.0}', 'Velocidad de reproducción de audio');

-- Insertar permisos básicos
INSERT INTO Permiso (accion, recurso, descripcion) VALUES
('crear', 'contenido', 'Crear nuevo contenido educativo'),
('editar', 'contenido', 'Modificar contenido existente'),
('eliminar', 'contenido', 'Eliminar contenido'),
('publicar', 'contenido', 'Publicar contenido'),
('moderar', 'comentarios', 'Moderar comentarios de usuarios'),
('gestionar', 'usuarios', 'Gestionar usuarios del sistema'),
('ver', 'analiticas', 'Ver analíticas del sistema'),
('configurar', 'accesibilidad', 'Configurar opciones de accesibilidad');

-- Asignar permisos a roles
INSERT INTO Rol_Permiso (id_rol, id_permiso) 
SELECT r.id_rol, p.id_permiso 
FROM Rol r, Permiso p 
WHERE r.nombre_rol = 'super_admin';

-- Asignar rol de super admin al usuario administrador
INSERT INTO Usuario_Rol (id_usuario, id_rol) 
VALUES (1, 1);

-- =========================
-- ÍNDICES PARA MEJOR RENDIMIENTO
-- =========================

CREATE INDEX idx_miembro_correo ON Miembro(correo);
CREATE INDEX idx_miembro_tipo ON Miembro(tipo_usuario);
CREATE INDEX idx_contenido_tipo ON ContenidoEducativo(tipo);
CREATE INDEX idx_contenido_categoria ON ContenidoEducativo(id_categoria);
CREATE INDEX idx_contenido_estado ON ContenidoEducativo(estado);
CREATE INDEX idx_progreso_usuario ON Progreso(id_usuario);
CREATE INDEX idx_progreso_contenido ON Progreso(id_contenido);
CREATE INDEX idx_progreso_curso ON Progreso(id_curso);
CREATE INDEX idx_feedback_usuario ON Feedback(id_usuario);
CREATE INDEX idx_feedback_contenido ON Feedback(id_contenido);
CREATE INDEX idx_evento_fecha ON Evento(fecha_inicio);
CREATE INDEX idx_donaciones_fecha ON Donaciones(fecha_donacion);

-- =========================
-- VISTAS ÚTILES
-- =========================

CREATE VIEW Vista_Contenido_Completo AS
SELECT 
    c.id_contenido,
    c.titulo,
    c.descripcion,
    c.tipo,
    c.url_contenido,
    c.archivo_url,
    c.extension,
    c.url_subtitulos,
    c.url_transcripcion,
    c.nivel_dificultad,
    c.es_gratuito,
    cat.nombre_categoria,
    cat.color,
    m.nombre as autor_nombre,
    m.apellido as autor_apellido,
    COUNT(DISTINCT p.id_progreso) as total_estudiantes,
    AVG(f.calificacion) as calificacion_promedio
FROM ContenidoEducativo c
LEFT JOIN Categoria cat ON c.id_categoria = cat.id_categoria
LEFT JOIN Miembro m ON c.id_autor = m.id_usuario
LEFT JOIN Progreso p ON c.id_contenido = p.id_contenido
LEFT JOIN Feedback f ON c.id_contenido = f.id_contenido
WHERE c.estado = 'publicado'
GROUP BY c.id_contenido;

CREATE VIEW Vista_Progreso_Usuario AS
SELECT 
    p.id_usuario,
    m.nombre,
    m.apellido,
    COUNT(DISTINCT p.id_contenido) as total_contenidos,
    COUNT(DISTINCT p.id_curso) as total_cursos,
    SUM(p.tiempo_total_segundos) as tiempo_total_estudio,
    AVG(p.porcentaje_completado) as progreso_promedio
FROM Progreso p
JOIN Miembro m ON p.id_usuario = m.id_usuario
GROUP BY p.id_usuario;

-- =========================
-- PROCEDIMIENTOS ALMACENADOS
-- =========================

DELIMITER //

CREATE PROCEDURE sp_registrar_progreso(
    IN p_id_usuario INT,
    IN p_id_contenido INT,
    IN p_tiempo_segundos INT
)
BEGIN
    DECLARE v_porcentaje DECIMAL(5,2);
    DECLARE v_duracion_total INT;
    
    -- Obtener duración total del contenido
    SELECT duracion_minutos * 60 INTO v_duracion_total 
    FROM ContenidoEducativo 
    WHERE id_contenido = p_id_contenido;
    
    -- Calcular porcentaje basado en tiempo visto
    SET v_porcentaje = LEAST(100.00, (p_tiempo_segundos / v_duracion_total) * 100);
    
    -- Insertar o actualizar progreso
    INSERT INTO Progreso (id_usuario, id_contenido, tipo_progreso, porcentaje_completado, tiempo_total_segundos)
    VALUES (p_id_usuario, p_id_contenido, 'contenido', v_porcentaje, p_tiempo_segundos)
    ON DUPLICATE KEY UPDATE
        porcentaje_completado = GREATEST(porcentaje_completado, v_porcentaje),
        tiempo_total_segundos = tiempo_total_segundos + p_tiempo_segundos,
        ultima_modificacion = CURRENT_TIMESTAMP,
        estado = CASE 
            WHEN v_porcentaje >= 90 THEN 'completado'
            WHEN v_porcentaje > 0 THEN 'en_progreso'
            ELSE 'pendiente'
        END;
END //

DELIMITER ;