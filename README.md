# Sistema de Gestión de Cursos - Prueba ISID

Este es un proyecto desarrollado con **Laravel 11**, **React**, e **Inertia.js**, diseñado para gestionar una plataforma de cursos e instructores.

## 🚀 Características Principales

- **Gestión de Instructores**: Lista paginada de instructores con visualización de sus últimos comentarios y calificaciones.
- **Gestión de Cursos**: Explorador de cursos con filtrado por estado, paginación y detalles del instructor.
- **Creación de Cursos**: Formulario dinámico integrado en un dropdown para añadir nuevos cursos rápidamente.
- **Relaciones Polimórficas**: Sistema de comentarios y calificaciones aplicable tanto a cursos como a instructores.
- **Tipado Fuerte**: Definiciones completas de TypeScript para todos los modelos y respuestas paginadas.

## 🛠️ Tecnologías Utilizadas

- **Backend**: Laravel 11 (PHP 8.2+)
- **Frontend**: React + TypeScript
- **Comunicación**: Inertia.js
- **Estilos**: Tailwind CSS
- **Base de Datos**: MySQL / MariaDB

## 📂 Estructura del Proyecto (Cambios Recientes)

- `app/Http/Controllers/`: Controladores para `Instructor` y `Course`.
- `resources/js/pages/`: Componentes de React para las vistas de Instructores y Cursos.
- `resources/js/types/models.d.ts`: Definiciones de interfaces para el tipado de datos.
- `routes/web.php`: Definición de rutas para la navegación y acciones del sistema.

## ⚙️ Instalación

1. Clona el repositorio.
2. Instala las dependencias de PHP: `composer install`.
3. Instala las dependencias de JS: `npm install`.
4. Configura tu archivo `.env` (Base de datos).
5. Ejecuta las migraciones: `php artisan migrate`.
6. Inicia el servidor de desarrollo: `php artisan serve` y `npm run dev`.

---
Desarrollado como parte de la prueba técnica ISID.
