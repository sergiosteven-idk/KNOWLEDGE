# 🎓 KNOWLEDGE — Plataforma Educativa Inclusiva

**Knowledge** es una plataforma educativa inclusiva diseñada para fomentar el aprendizaje accesible.  
Permite a los usuarios subir contenido educativo, seguir su progreso, realizar donaciones y participar en eventos.  
Los docentes y administradores pueden aprobar o rechazar contenido, gestionar usuarios y visualizar estadísticas globales.

---

## 🧩 ESTRUCTURA DEL PROYECTO

KNOWLEDGE/
│
├── backend/ # Servidor Node.js + Express + MySQL
│ ├── src/
│ │ ├── controllers/ # Lógica de negocio
│ │ ├── routes/ # Endpoints REST API
│ │ ├── middleware/ # Middlewares personalizados
│ │ ├── config/ # Configuración (DB, env, etc.)
│ │ └── uploads/ # Archivos subidos (PDF, MP4, etc.)
│ ├── .env
│ ├── package.json
│ └── server.js
│
├── frontend/ # Interfaz React + Vite + Tailwind + TypeScript
│ ├── src/
│ │ ├── pages/ # Páginas (Home, Dashboard, Admin, etc.)
│ │ ├── components/ # Componentes UI
│ │ ├── contexts/ # Contextos globales (Auth, Accesibilidad)
│ │ ├── services/ # Conexión con el backend (axios)
│ │ └── App.tsx
│ ├── tailwind.config.js
│ ├── package.json
│ └── index.html
│
└── Knowledge.sql # Script SQL de la base de datos


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
