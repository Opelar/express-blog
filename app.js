const express = require("express");
const hbs = require("hbs");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const debug = require("./app/lib/debug");
const config = require("./config/default");
const initDB = require("./app/lib/initDB");
// import router
const index = require("./app/routes/index");
const admin = require("./app/routes/admin");

const app = express();

// Access-Control-Allow-Origin
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", "3.2.1");
  if (req.method == "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});

// view engine setup
app.set("views", path.join(__dirname, "/app/views"));
app.set("view engine", "hbs");

hbs.registerHelper("formate", function (timestamp) {
  return new Date(timestamp).toLocaleString();
});

hbs.registerHelper("decode", function (content) {
  return decodeURIComponent(content);
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    name: config.session.name,
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: config.session.cookie
  })
);

app.use("/", index);
app.use("/admin", admin);

// 挂载debug中间件
app.use(debug);

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

initDB();

module.exports = app;
