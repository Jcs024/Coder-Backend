const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");
const path = require("path");
const productManager = require("./managers/productManager");
const socketHandler = require("./sockets/socketHandler");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine("hbs", handlebars.engine({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials")
}));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.set("io", io);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "../public")));


app.use("/api", require("./routes/index"));
app.use("/", require("./routes/views"));

socketHandler(io);

module.exports = httpServer;