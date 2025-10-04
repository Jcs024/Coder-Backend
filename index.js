require('dotenv').config();

const connectDB = require("./src/config/database");
const httpServer = require("./src/app");

const PORT = process.env.PORT || 8080;

connectDB();

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});