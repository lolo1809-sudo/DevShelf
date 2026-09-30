# DevShelf

# ¿Qué es "DevShelf"?

¡Bienvenido a DevShelf! Este proyecto es una plataforma integral diseñada principalmente para desarrolladores de páginas. Aquí encontrarás desde componentes listos (como inputs simples) hasta páginas webs completas y funcionales, con Front-end y Back-end.

## 📦 Principales Funcionalidades

Buscador en Tiempo Real: Filtra componentes y categorías al instante.

Visualizador de Código: Previsualiza el código antes de implementarlo.

Descarga Directa: Obtén componentes en formato .zip con un solo clic.

Favoritos: Guarda tus componentes preferidos mediante localStorage.

Subir componentes: Sube tus propios componentes a través de un formulario sencillo, se revisará el código y luego se pondrá en la sección principal

Login: podrás registrarte e iniciar sesión para asi pagar un suscripción y obtner los mejores componentes

## 📦 Stack Tecnológico & Dependencias principales

El proyecto corre sobre:
_ React 19 y Vite en el Front-end
_ Supabase en el Back-end
\_ Mercado Pago Developers para la integración con la pasarela de pagos

Para que este proyecto funcione, se instalaron las siguientes librerías:

- React (v19): El motor principal para crear la interfaz por componentes.

- React Router Dom (v7): Encargado de la navegación entre páginas sin recargar el navegador.

- Vite: El entorno de desarrollo rápido que utilizamos para compilar el proyecto.

- @fontsource/poppins: Tipografía importada localmente para evitar peticiones externas y acelerar la carga inicial.

- @fortawesome/fontawesome-free / FontAwesome: Conjunto de librerías de íconos instaladas directamente en el proyecto para eliminar la dependencia de CDNs y mejorar el rendimiento.

- @supabase/supabase-js: El cliente oficial para conectar la aplicación con la base de datos, autenticación y gestión de usuarios en Supabase.

- @tailwindcss/vite: Integración de Tailwind CSS con Vite para el diseño rápido de la interfaz mediante clases utilitarias.

- Canvas-confetti: Efectos visuales de celebración.

- Framer Motion: Animaciones avanzadas y transiciones fluidas.

- React-GA4: Librería para integrar Google Analytics 4 en aplicaciones React, permitiendo el rastreo de visitas y eventos personalizados de forma sencilla.

- React-icons: Amplia colección de íconos vectoriales populares listos para usar como componentes.

- Sonner: Librería moderna para mostrar notificaciones estilo _toast_ elegantes y dinámicas en la aplicación.

git clone [URL_DEL_REPO]
npm install
npm run dev

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

# Explicación del flujo de DevShelf

Cuando el usuario entra a la página, suceden 3 cosas:
1\_ Se trae de Supabase, de la tabla 'components', todas las filas y se los envía a las páginas por parámetros

2\_ Consulta únicamente al usuario actual que tiene la sesión abierta, comprueba si su suscripción está activa y, si la fecha actual ya superó la fecha de expiración, actualiza su estado individual a FALSE en la base de datos y le muestra una alerta.

3\_ Busca en la memoria local del navegador si hay datos guardados bajo la clave "misFavoritos". Si los encuentra, los convierte de texto a una lista de JavaScript (JSON.parse) para mostrarlos; si no hay nada, empieza con una lista vacía [].

---

Una vez que suceden estas 4 cosas, el usuario puede ir al login, en el que puede:

1\_ Registrarse: poner su gmail y contraseña por primera vez, y lo que hace es crear una nueva fila en la tabla 'usuarios' de Supabase

2\_ Iniciar Sesión: se loguea con un gmial y contraseña que ya esten en la base de datos

3\_ Cerrar sesión: pude cerrar la sesión actual, y asi poder usar otra cuente si se prefiere

4\_ Eliminar la cuenta: coloca sus datos de gmail y contraseña, y si la cuenta existe en la tabla 'usuarios' de Supabase, se elimina

---

Luego de que inicie sesión con una cuenta, puede pagar la suscripción premium y desbloquear todos los componentes, el flujo del pago es asi:

Al presionar en "Pagar de Forma Segura", va a la edge function 'pago-mercadopago' de Supabase, en donde redirige al usuario a la pasarela de pagos de Mercado Pago, y al terminar de pagar, se le avisa a Mercado Pago, y éste a través de su funcionalidad de WebHooks, le manda una notificación a otra edge funciton de Supabase, llamada 'mp-webhook', y ésta función, al recibir la notificación, realiza un cambio en la tabla 'usuarios', en la columna 'esta_suscripto', del gmail que tenía la sesión iniciada en la página, al momento de realizar el pago.
Una vez se cambió a True el campo 'esta_suscripto', se le habilita al usuario todos los componentes de pago de la página

---

En la página de inicio, se encuentra un formulario para subir contenido, llenando los campos, ésta información se sube a la tabla 'components_subidos' de Supabase, y manualmente se debe revisar que el código subido sea correcto, y recién ahí se pasa esa fila a la tabla 'components', que es la que se muestra finalmente en la página

---

Cuando el usuario entra a cada página como Inputs o Buttons, se muestran los componentes específicos de esa sección, y si el usuario pagó la suscripción, se les desbloquea los componetes premium.
Cada componente tiene la opción de Descargarlo, de "Ver Demo", "Ver Repositorio", ésto le permite al usuario tenes varias alternativas para visualizar el código, y ver si el gusta
