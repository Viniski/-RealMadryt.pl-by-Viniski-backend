const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/auth/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

router.get("/auth/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "select_account",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/auth/login/failed",
  }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["profile"],
    prompt: "select_account",
  })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/register" }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/register" }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URL);
  }
);

module.exports = router;
