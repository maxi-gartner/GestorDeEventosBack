<h1>Proyecto Gestor de Eventos - Backend</h1>

<h2>🚀 Tecnologías Utilizadas</h2>

<p>Este proyecto de backend fue desarrollado usando las siguientes tecnologías:</p>
<ul>
  <li><strong>Node.js</strong> 🟩 - Para manejar el servidor y la lógica del backend.</li>
  <li><strong>Express</strong> 🚏 - Framework minimalista para la creación de APIs.</li>
  <li><strong>MongoDB</strong> 🍃 - Base de datos NoSQL para almacenar eventos y usuarios.</li>
  <li><strong>Mongoose</strong> - ODM para modelar la base de datos en MongoDB.</li>
  <li><strong>JWT</strong> 🔒 - Autenticación basada en JSON Web Tokens.</li>
  <li><strong>Cloudinary</strong> ☁️ - Almacenamiento de imágenes en la nube.</li>
</ul>

<h2>🛠️ Instalación y Uso</h2>

<p>Seguí estos pasos para correr el proyecto de backend en tu entorno local:</p>

<ol>
  <li>Cloná el repositorio:</li>

  <pre><code>git clone https://github.com/maxi-gartner/GestorDeEventosBack.git</code></pre>

  <li>Instalá las dependencias:</li>

  <pre><code>npm install</code></pre>

  <li>Configura las variables de entorno:</li>

  <p>Crea un archivo <code>.env</code> en la raíz del proyecto con las siguientes variables:</p>

  <pre><code>
    PORT=4000
    MONGO_URI=tu_url_de_mongoDB
    JWT_SECRET=tu_secreto_para_JWT
    CLOUDINARY_CLOUD_NAME=tu_nombre_de_cloudinary
    CLOUDINARY_API_KEY=tu_api_key
    CLOUDINARY_API_SECRET=tu_api_secret
  </code></pre>

  <li>Iniciá el servidor localmente:</li>

  <pre><code>npm start</code></pre>

  <p>El servidor debería estar corriendo en <a href="http://localhost:4000">http://localhost:4000</a> 🎉.</p>
</ol>

<h2>🗃️ Estructura del Proyecto</h2>

<pre><code>
├── controllers/
│   ├── authController.js        # Controlador para la autenticación de usuarios
│   ├── eventController.js       # Controlador para la gestión de eventos
│   ├── placeController.js       # Controlador para la gestión de lugares
│   └── userController.js        # Controlador para la gestión de usuarios
├── models/
│   ├── Event.js                 # Modelo de evento
│   ├── Place.js                 # Modelo de lugar
│   └── User.js                  # Modelo de usuario
├── routes/
│   ├── authRoutes.js            # Rutas para autenticación
│   ├── eventRoutes.js           # Rutas para eventos
│   ├── placeRoutes.js           # Rutas para lugares
│   └── userRoutes.js            # Rutas para usuarios
├── services/
│   ├── cloudinary.js            # Configuración de Cloudinary
│   └── jwt.js                   # Funciones relacionadas con JWT
├── middleware/
│   ├── authMiddleware.js        # Middleware de autenticación
│   └── errorMiddleware.js       # Middleware para manejo de errores
├── config/
│   ├── db.js                    # Conexión a la base de datos MongoDB
├── .env                         # Variables de entorno (no se sube a git)
├── server.js                    # Configuración e inicialización del servidor
└── package.json                 # Dependencias y scripts del proyecto
</code></pre>

<h2>🚩 Características Principales</h2>

<ul>
  <li>🔒 <strong>Autenticación Segura</strong>: Usando JWT para proteger rutas y recursos.</li>
  <li>📅 <strong>Gestión de Eventos</strong>: CRUD completo para la gestión de eventos.</li>
  <li>📍 <strong>Gestión de Lugares</strong>: Manejá lugares donde se realizan los eventos.</li>
  <li>☁️ <strong>Almacenamiento en la Nube</strong>: Imágenes de los eventos almacenadas en Cloudinary.</li>
  <li>🗂️ <strong>Base de Datos NoSQL</strong>: MongoDB para una gestión eficiente de datos.</li>
</ul>

<h2>🤝 Contribuir</h2>

<p>Si querés contribuir al desarrollo de este backend, ¡sería genial! Podés hacer un fork del repositorio y abrir un pull request con tus mejoras. También podés abrir un issue si encontrás algún error o sugerencia.</p>

<h2>📄 Licencia</h2>

<p>Este proyecto está bajo la licencia <strong>MIT</strong>. Podés usarlo y modificarlo libremente, siempre y cuando menciones al autor original.</p>

<p>---<br>¡Gracias por pasarte y no dudes en dejar una estrellita ⭐ si te gusta el proyecto!</p>
