const connectDB = require("./config/database");
connectDB();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");
const socketHandler = require("./sockets/socketHandler");
const path = require("path");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    helpers: {
      eq: (a, b) => a === b,
      multiply: (a, b) => a * b,
      calculateTotal: (products) => {
        return products.reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0);
      },
    },
  })
);

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
