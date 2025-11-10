markdown
# 🎓 KNOWLEDGE — Plataforma Educativa Inclusiva

**Knowledge** es una plataforma educativa inclusiva diseñada para fomentar el aprendizaje accesible.  
Permite a los usuarios subir contenido educativo, seguir su progreso, realizar donaciones y participar en eventos.  
Los docentes y administradores pueden aprobar o rechazar contenido, gestionar usuarios y visualizar estadísticas globales.

---

## 🧩 ESTRUCTURA DEL PROYECTO
##KNOWLEDGE/
## │
## ├── backend/ # Servidor Node.js + Express + MySQL
## │ ├── src/
## │ │ ├── controllers/ # Lógica de negocio
## │ │ ├── routes/ # Endpoints REST API
## │ │ ├── middleware/ # Middlewares personalizados
## │ │ ├── config/ # Configuración (DB, env, etc.)
## │ │ └── uploads/ # Archivos subidos (PDF, MP4, etc.)
## │ ├── .env
## │ ├── package.json
## │ └── server.js
## │
## ├── frontend/ # Interfaz React + Vite + Tailwind + TypeScript
## │ ├── src/
## │ │ ├── pages/ # Páginas (Home, Dashboard, Admin, etc.)
## │ │ ├── components/ # Componentes UI
## │ │ ├── contexts/ # Contextos globales (Auth, Accesibilidad)
## │ │ ├── services/ # Conexión con el backend (axios)
## │ │ └── App.tsx
## │ ├── tailwind.config.js
## │ ├── package.json
## │ └── index.html
## │
## └── Knowledge.sql # Script SQL de la base de datos

---

## ⚙️ CONFIGURACIÓN DEL ENTORNO

### 1️⃣ **Requisitos previos**

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (v18 o superior)
- [MySQL Server](https://dev.mysql.com/downloads/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

---

### 2️⃣ **Clonar el proyecto**

```bash
git clone https://github.com/tuusuario/Knowledge.git
cd Knowledge
3️⃣ Configurar la base de datos
Crea la base de datos:

sql
CREATE DATABASE KNOWLEDGE CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
Importa el archivo SQL:

bash
mysql -u root -p KNOWLEDGE < Knowledge.sql
Crea el archivo .env dentro de /backend:

env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=KNOWLEDGE
JWT_SECRET=supersecretkey
UPLOAD_PATH=./uploads
🚀 BACKEND — Servidor Express.js
📦 Instalación
bash
cd backend
npm install
🧱 Dependencias principales
Paquete	Descripción
express	Framework para crear rutas y manejar peticiones HTTP.
cors	Permite peticiones desde otros orígenes (Frontend ↔ Backend).
dotenv	Manejo de variables de entorno desde .env.
mysql2	Conector MySQL moderno con soporte de promesas.
bcryptjs	Cifrado de contraseñas antes de almacenarlas.
jsonwebtoken (JWT)	Autenticación segura basada en tokens.
multer	Middleware para subir archivos (videos, PDFs, imágenes).
nodemon	Reinicia automáticamente el servidor en modo desarrollo.
⚙️ Scripts útiles
bash
# Inicialización con nodemon
npm run dev

# Modo producción
node src/server.js
📡 Servidor en ejecución
text
http://localhost:5000
💻 FRONTEND — React + Vite + TailwindCSS
📦 Instalación
bash
cd frontend
npm install
🧱 Dependencias principales
Paquete	Descripción
react / react-dom	Biblioteca base para la construcción de interfaces.
react-router-dom	Sistema de rutas para navegación SPA.
axios	Cliente HTTP para consumir la API del backend.
tailwindcss	Framework CSS para crear interfaces modernas y responsivas.
autoprefixer	Añade compatibilidad automática de CSS entre navegadores.
postcss	Procesador CSS requerido por Tailwind.
vite	Bundler ultrarrápido para desarrollo React.
typescript	Tipado estático opcional para mayor mantenibilidad.
@headlessui/react	Componentes accesibles integrables con Tailwind.
framer-motion	Animaciones fluidas y accesibles en componentes.
clsx	Librería auxiliar para clases condicionales.
⚙️ Scripts útiles
bash
# Ejecutar modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build
npm run preview
🌐 Interfaz disponible en:
text
http://localhost:5173
🔒 ROLES Y PERMISOS
Rol	Funcionalidades
🧑‍🎓 Estudiante	Subir y visualizar contenidos, seguir su progreso.
🧑‍🏫 Docente	Aprobar, rechazar o eliminar contenidos subidos por usuarios.
🧑‍💼 Administrador	Gestión completa del sistema: usuarios, estadísticas y control global.
🧠 FUNCIONALIDADES CLAVE
✅ Autenticación JWT – Login y registro seguros.
✅ Gestión de roles – Permisos diferenciados por usuario.
✅ Subida de archivos – PDF, videos y materiales didácticos.
✅ Revisión y aprobación – Contenido validado antes de publicación.
✅ Dashboard de progreso – Seguimiento visual del avance.
✅ Panel administrativo – Usuarios, estadísticas y control de contenido.
✅ Accesibilidad total – Lectura de texto, modo oscuro, contraste alto y control de fuente.
✅ Eventos y donaciones – Espacios para participación y soporte a la comunidad.

🗃️ BASE DE DATOS (Resumen)
Tablas principales:

Miembro — usuarios registrados (id_usuario, nombre, correo, tipo_usuario, activo).

ContenidoEducativo — materiales subidos y su estado (pendiente/aprobado/rechazado).

Progreso — seguimiento del aprendizaje.

Evento — actividades o eventos comunitarios.

Feedback — opiniones y valoraciones de usuarios.

Donacion — registro de aportes económicos.