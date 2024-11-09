<h1>Proyecto Gestor de Eventos - Backend</h1>

<h2>🚀 Tecnologías Utilizadas</h2>

<p>Este proyecto de backend fue desarrollado usando las siguientes tecnologías:</p>
<ul>
  <li><strong>Node.js</strong> 🟩 - Para manejar el servidor y la lógica del backend.</li>
  <li><strong>Express</strong> 🚏 - Framework minimalista para la creación de APIs.</li>
  <li><strong>MongoDB</strong> 🍃 - Base de datos NoSQL para almacenar eventos y usuarios.</li>
  <li><strong>Mongoose</strong> - ODM para modelar la base de datos en MongoDB.</li>
  <li><strong>JWT</strong> 🔒 - Autenticación basada en JSON Web Tokens.</li>
</ul>


</ol>

<h2>🗃️ Estructura del Proyecto</h2>

<pre><code>
├── config/
│   ├── db.js                    # Conexión a la base de datos MongoDB
├── controllers/
│   ├── authController.js        # Controlador para la gestión de usuarios
│   ├── eventController.js       # Controlador para la gestión de eventos
│   ├── placeController.js       # Controlador para la gestión de lugares
├── models/
│   ├── Event.js                 # Modelo de evento
│   ├── Place.js                 # Modelo de lugar
│   └── User.js                  # Modelo de usuario
├── DTO/
│   ├── eventDTO.js              # DTO de evento
│   ├── PlaceDTO.js              # DTO de lugar
│   └── UserDTO.js               # DTO de usuario
├── middleware/
│   ├── passport/
│   │   └── passport.js          # Configuración de autenticación con Passport.js
│   ├── IsCreator.js             # Middleware para verificar si el usuario es el creador del evento
│   ├── isOrganizer.js           # Middleware para verificar si el usuario es el organizador de un evento
│   └── isUser.js                # Middleware para verificar si el usuario está autenticado
├── models/
│   ├── eventSchema.js           # Esquema de Mongoose para el modelo de evento
│   ├── placeSchema.js           # Esquema de Mongoose para el modelo de lugar
│   └── userSchema.js            # Esquema de Mongoose para el modelo de usuario
├── routes/
│   ├── authRoutes.js            # Rutas para autenticación
│   ├── eventRoutes.js           # Rutas para eventos
│   ├── placeRoutes.js           # Rutas para lugares
│   └── userRoutes.js            # Rutas para usuarios
├── services/
│   ├── eventService.js          # Lógica para peticiones de eventos
│   ├── placeService.js          # Lógica para peticiones de lugares
│   └── userService.js           # Lógica para peticiones de usuarios
├── utils/
│   ├── catched.js               # Middleware para manejar las excepciones de forma centralizada
│   ├── customError.js           # Clase personalizada para la gestión de errores
│   ├── handleErrors.js          # Función para capturar y procesar los errores en las rutas
│   └── httpResponse.js          # Utilidad para estructurar las respuestas HTTP
├── validator/
│   ├── schemas/
│   │   ├── eventSchemaJoi.js    # Validación con Joi para eventos
│   │   ├── placeSchemaJoi.js    # Validación con Joi para lugares
│   │   └── userSchemaJoi.js     # Validación con Joi para usuarios
│   └── validator.js                # Middleware para validar los datos de entrada usando los esquemas Joi
├── .env                         # Variables de entorno (no lo subo a git)
└── package.json                 # Dependencias y scripts del proyecto

</code></pre>

<h2>🚩 Características Principales</h2>

<ul>
  <li>🔒 <strong>Autenticación Segura</strong>: Usando JWT para proteger rutas y recursos.</li>
  <li>📅 <strong>Gestión de Eventos</strong>: CRUD completo para la gestión de eventos.</li>
  <li>📍 <strong>Gestión de Lugares</strong>: Manejá lugares donde se realizan los eventos.</li>
  <li>🗂️ <strong>Base de Datos NoSQL</strong>: MongoDB para una gestión eficiente de datos.</li>
</ul>

<h2>🤝 Contribuir</h2>

<p>Si querés contribuir al desarrollo de este backend, ¡sería genial! Podés hacer un fork del repositorio y abrir un pull request con tus mejoras. También podés abrir un issue si encontrás algún error o sugerencia.</p>

<h2>📄 Licencia</h2>

<p>Este proyecto está bajo la licencia <strong>MIT</strong>. Podés usarlo y modificarlo libremente, siempre y cuando menciones al autor original.</p>

<p>---<br>¡Gracias por pasarte y no dudes en dejar una estrellita ⭐ si te gusta el proyecto!</p>
