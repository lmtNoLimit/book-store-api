const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const bookRouter = require("./routes/book");
const cartRouter = require("./routes/cart");
const usersRouter = require("./routes/profile");
const { auth } = require("./middlewares/auth");

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"));

app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/books", auth, bookRouter);
app.use("/api/cart", auth, cartRouter);
app.use("/api/profile", auth, usersRouter);

module.exports = app;
