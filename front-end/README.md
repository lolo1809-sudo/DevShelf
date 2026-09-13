# DevShelf

# ¿Qué es "DevShelf"?

¡Bienvenido a DevShelf! Este proyecto es una plataforma integral diseñada principalmente para desarrolladores Front-end, aunque tambíen es útil para Back-end. Aquí encontrarás desde componentes listos hasta páginas webs completas y funcionales, con Front-end y Back-end

# ✨ ¿Qué hay en la página?

La página es un catálogo de componentes, que guarda desde inputs hasta páginas webs completas, todo en un mismo lugar.

Cada componente es una tarjeta que tiene:
\_ Una vista interactiva o una imagen (para componentes mas grandes), para previsualizar rápidamente de que se trata

\_ Posee un botón para poder ver la demo, en una página aparte, podrás interactuar libremente y decidir si te gusta o no

\_ Si te resulta mas cómodo, puedes descargar el componente, en un archivo.zip

\_ Se puede guardar en favoritos el componente, por si lo necesitas mas adelante

\_ Podrás abrir el repositorio y asi ver el código sin necesidad de descargarlo

## 🛠️ Stack Tecnológico & Dependencias

El proyecto corre sobre React 19 y Vite, utilizando las siguientes librerías para garantizar rendimiento y experiencia de usuario:

Dependencia,Versión,Propósito
React / React-DOM,^19.2.0,El motor principal de la interfaz (última versión estable).
React Router Dom,^7.12.0,Manejo de navegación dinámica entre secciones.
@tailwindcss/vite,^4.2.1,Estilizado ultra rápido y moderno mediante utilidades.
Framer Motion,^12.33.0,Animaciones fluidas y transiciones de página profesionales.
Canvas-confetti,^1.9.4,Efectos visuales de celebración al descargar componentes.
React-GA4,^2.1.0,Integración con Google Analytics para medir visitas y eventos.
Iconografía,Variable,Combinación de FontAwesome (Solid/Brands) y React-Icons para máxima variedad.
@fontsource/poppins,^5.2.7,Tipografía local para optimizar el CLS y la velocidad de carga.

## 📦 Dependencias principales

Para que este proyecto funcione, se instalaron las siguientes librerías:

- **React (v19)**: El motor principal para crear la interfaz por componentes.
- **React Router Dom (v7)**: Encargado de la navegación entre páginas sin recargar el navegador.
- **Next-themes**: La librería que facilita la lógica del cambio entre modo claro y oscuro.
- **Vite**: El entorno de desarrollo rápido que utilizamos para compilar el proyecto.
- **@fontsource/poppins**: Tipografía importada localmente para evitar peticiones externas y acelerar la carga inicial.
- **@fortawesome/fontawesome-free**: Librería de íconos instalada directamente en el proyecto para eliminar la dependencia de CDNs y mejorar el rendimiento.
- **Canvas-confetti**: Efectos visuales de celebración.
- **Framer Motion**: Animaciones avanzadas y transiciones fluidas.
- **React-GA4**: Librería para integrar Google Analytics 4 en aplicaciones React, permitiendo el rastreo de visitas y eventos personalizados de forma sencilla.

git clone [URL_DEL_REPO]
npm install
npm run dev

## 📦 Principales Funcionalidades

Buscador en Tiempo Real: Filtra componentes y categorías al instante.

Visualizador de Código: Previsualiza el código antes de implementarlo.

Descarga Directa: Obtén componentes en formato .zip con un solo clic.

Favoritos: Guarda tus componentes preferidos mediante localStorage.

# ¿Cómo está organizado?

A continuación voy a explicar la funcón de cada carpeta y archivo:

1\_ src: contiene todo el código de la págin

2\_ pages: las distintas secciónes con los componentes. Ej: inputs, buttons, formularios, etc

3\_ components: el código de React que se repiten

4\_ App.jsx: la aplicación de todo el proyecto, que une todos los links con el objeto de Brouse Router

5\_ public: todas las imágenes y archivos públicos

src/
├── App.jsx # La App que conecta todo
├── main.jsx
│── supabaseClient.js # Conexión a la base de datos de Supabase
├── components/ # Componentes globales (Footer, Revelar, TituloDescripcion)
└── pages/ # (Buttons, Cards, etc.)
