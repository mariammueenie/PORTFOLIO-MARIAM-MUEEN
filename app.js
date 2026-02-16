const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Load .env locally
require("dotenv").config();

const app = express();

// view engine setup 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static files 
app.use(express.static(path.join(__dirname, "public")));

// ====== ROUTES ======
app.get("/", (req, res) => res.render("index", { title: "Home" }));
app.get("/about", (req, res) => res.render("about", { title: "About" }));
app.get("/projects", (req, res) => res.render("projects", { title: "Projects" }));
app.get("/contact", (req, res) => res.render("contact", { title: "Contact" }));

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler (uses views/error.hbs that you already have)
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
