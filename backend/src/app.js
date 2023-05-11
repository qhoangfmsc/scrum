const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
//const session = require("express-session");
const session = require("cookie-session");
// const cron = require("./cron-job");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3307;
const HOST = process.env.SERVER_HOST || "127.0.0.1";
// Specific domain
const allowedOrigins = JSON.parse(process.env.ALLOW_ORIGINS);

require("./models");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "test",
    cookie: { maxAge: 3600000 },
  })
);

/* CROS middleware */
app.use(function (req, res, next) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(routes);

//cron.start();

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port: ${PORT} ${HOST}`);
});
