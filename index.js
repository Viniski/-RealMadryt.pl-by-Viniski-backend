const express = require("express");
require("dotenv").config();
const app = express();
const apiRouter = require("./app/routes/api");
const socialsApiRouter = require("./app/routes/socialApi");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./passport");
require("./app/db/mongoose");

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["topsecretkey"],
    maxAge: 15 * 60 * 1000,
    path: "/",
    domain: process.env.COOKIE_DOMAIN,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.PAGE_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "content-type, authorization, authorizationalternative, access-control-allow-credentials"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", apiRouter);
app.use("/api", socialsApiRouter);

app.listen(process.env.PORT);

