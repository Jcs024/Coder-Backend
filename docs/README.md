# 🛒 E-Commerce API - Entrega Final

Proyecto académico de un **backend para un e-commerce** desarrollado en **Node.js + Express**, con **MongoDB Atlas** como sistema de persistencia principal.  
Incluye gestión de **productos** y **carritos**, además de vistas con **Handlebars** y actualizaciones en tiempo real mediante **WebSockets**.

## 🎯 Objetivos de la Entrega

- Uso de **MongoDB Atlas** como base de datos.
- Definición de todos los **endpoints REST** para productos y carritos.
- Implementación de **validaciones** en el servidor.
- Manejo de **errores con respuestas consistentes en JSON**.
- Incorporación de **WebSockets** para productos en tiempo real.
- Interfaz con **Handlebars** y notificaciones con **SweetAlert2**.

---

## 🚀 Tecnologías utilizadas

- **Node.js** + **Express** → Servidor y endpoints REST.
- **MongoDB Atlas** + **Mongoose** → Persistencia de datos.
- **Handlebars** → Motor de plantillas.
- **Socket.io** → Comunicación en tiempo real.
- **Multer** → Subida de archivos.
- **SweetAlert2** → Notificaciones modernas en el frontend.

---

## 📦 Estructura del Proyecto

back-entrega-final/
├── src/
│ ├── controllers/ # Controladores de la API
│ ├── managers/ # Conexión y consultas a MongoDB
│ ├── services/ # Lógica de negocio
│ ├── routes/ # Rutas de la API
│ ├── sockets/ # Configuración de WebSockets
│ ├── views/ # Plantillas Handlebars
│ ├── config/ # Configuración general
│ └── utils/ # Utilidades
├── public/ # Archivos estáticos (CSS, JS)
├── uploads/ # Archivos subidos (imágenes)
├── index.js # Punto de entrada
├── package.json # Dependencias
└── README.md # Este archivo

## ⚡ Instalación y Configuración

1. **Clonar el repositorio:**
   git clone <repo>
   cd back-entrega-final
   
2. **Instalar dependencias:**
   
  npm install

3. **Configurar variables de entorno:**
  Crear un archivo .env en la raíz del proyecto con:

PORT=8080
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<base>

4. **Levantar el servidor:**
    En desarrollo:
      npm run dev

    En producción:
      npm start

5. **Abrir en el navegador:**
  http://localhost:8080


🌐 Endpoints principales

Productos: http://localhost:8080/api/products

Carritos: http://localhost:8080/api/carts

Vista Home: http://localhost:8080/

Vista en tiempo real: http://localhost:8080/realtimeproducts

📄 La documentación detallada de la API se encuentra en API.md

📊 Ejemplo de Documento en MongoDB

Producto
{
  "_id": "652fcbf3123abc7890def456",
  "title": "Mouse Gamer",
  "description": "Mouse RGB 6400DPI",
  "price": 45.99,
  "thumbnail": null,
  "code": "MGAMER001",
  "stock": 25,
  "status": true,
  "category": "perifericos"
}

Carrito
{
  "_id": "652fcc02123abc7890def457",
  "products": [
    {
      "product": "652fcbf3123abc7890def456",
      "quantity": 2
    }
  ]
}

## 🛠️ Scripts disponibles
npm run dev   # Inicia en modo desarrollo con nodemon
npm start     # Inicia en modo producción