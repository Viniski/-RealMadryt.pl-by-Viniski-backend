const User = require("../db/models/user");
const jwt = require("jsonwebtoken");

class AuthorizationController {
  async authorization(req, res) {
    const JSONWebToken = req.headers["authorization"]?.split(" ")[1];
    if (!JSONWebToken) {
      return res.sendStatus(401);
    }
    jwt.verify(JSONWebToken, process.env.ACCESS_TOKEN, (err, data) => {
      if (err) {
        return res.sendStatus(403);
      }
      res.status(200).json(data);
    });
  }

  async refreshToken(req, res) {
    const refreshToken = req.headers["authorization"]?.split(" ")[1];
    const isTokenIsCorrect = await User.findOne({ refreshToken });
    if (!(typeof isTokenIsCorrect === "object" && isTokenIsCorrect !== null)) {
      return res.sendStatus(403);
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_ACCESS_TOKEN,
      async (err, data) => {
        if (err) {
          return res.sendStatus(403);
        }
        const payload = {
          id: data._id,
          user: data.user,
          email: data.email,
          password: data.password,
        };
        const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
          expiresIn: "15m",
        });
        const refreshJWToken = jwt.sign(
          payload,
          process.env.REFRESH_ACCESS_TOKEN,
          {
            expiresIn: "1d",
          }
        );
        isTokenIsCorrect.refreshToken = refreshJWToken;
        await isTokenIsCorrect.save();
        res
          .clearCookie("jwt", {
            path: "/",
            domain: process.env.COOKIE_DOMAIN,
            withCrdentials: true,
            httpOnly: false,
            maxAge: 15 * 60 * 1000,
          })
          .cookie("jwt", newAccessToken, {
            path: "/",
            domain: process.env.COOKIE_DOMAIN,
            withCredentials: true,
            httpOnly: false,
            maxAge: 15 * 60 * 1000,
          })
          .clearCookie("refreshjwt", {
            path: "/",
            domain: process.env.COOKIE_DOMAIN,
            withCrdentials: true,
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
          })
          .cookie("refreshjwt", refreshJWToken, {
            path: "/",
            domain: process.env.COOKIE_DOMAIN,
            withCredentials: true,
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
          })
          .status(200)
          .json({ token: newAccessToken });
      }
    );
  }
}

module.exports = new AuthorizationController();
