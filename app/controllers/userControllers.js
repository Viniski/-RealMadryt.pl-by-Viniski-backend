const User = require("../db/models/user");
const jwt = require("jsonwebtoken");

class UserController {
  async register(req, res) {
    const user = new User({
      user: req.body.user,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      await user.save();
      const payload = { user: req.body.user, email: req.body.email };
      const jwToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: "15m",
      });
      const refreshJWToken = jwt.sign(
        payload,
        process.env.REFRESH_ACCESS_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      const userWithoutRefreshToken = await User.findOne({
        email: req.body.email,
      });
      userWithoutRefreshToken.refreshToken = refreshJWToken;
      await userWithoutRefreshToken.save();
      res
        .cookie("jwt", jwToken, {
          withCrdentials: true,
          httpOnly: false,
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshjwt", refreshJWToken, {
          withCrdentials: true,
          httpOnly: false,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(201)
        .json({ token: jwToken, refresh: refreshJWToken });
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error("Podano błędny adres email lub błędne hasło.");
      }
      const isValidPassword = user.comparePassword(req.body.password);
      if (!isValidPassword) {
        throw new Error("Podano błędny adres email lub błędne hasło.");
      }
      const payload = { user: user.user, email: req.body.email };
      const jwToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: "15m",
      });
      const refreshJWToken = jwt.sign(
        payload,
        process.env.REFRESH_ACCESS_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      user.refreshToken = refreshJWToken;
      await user.save();
      res
        .cookie("jwt", jwToken, {
          path: "/",
          domain: "localhost",
          withCredentials: true,
          httpOnly: false,
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshjwt", refreshJWToken, {
          path: "/",
          domain: "localhost",
          withCrdentials: true,
          httpOnly: false,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ token: jwToken, refresh: refreshJWToken, userName: user.user });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  async passwordChange(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const authEmail = req.body.authEmail;
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error(
          "Podano błedny adres email. Podaj email, którym logujesz się na konto w naszym serwisie."
        );
      }
      if (email !== authEmail) {
        throw new Error(
          "Podano błedny adres email. Podaj email, którym logujesz się na konto w naszym serwisie."
        );
      }
      if (password.length < 8) {
        throw new Error(
          "Podano zbyt krótkie hasło. Nowe hasło powinno mieć minimum 8 znaków."
        );
      }
      user.password = password;
      await user.save();
      res.sendStatus(201);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  async logout(req, res) {
    const refreshToken = req.headers["authorization"]?.split(" ")[1];
    const userName = req.headers["authorizationalternative"]?.split(" ")[1];
    if (refreshToken !== "undefined") {
      const logoutUser = await User.findOne({ refreshToken: refreshToken });
      logoutUser.refreshToken = "";
      await logoutUser.save();
    } else {
      const logoutUser = await User.findOne({ user: userName });
      logoutUser.refreshToken = "";
      await logoutUser.save();
    }
    res
      .clearCookie("refreshjwt", {
        path: "/",
        domain: "localhost",
        withCrdentials: true,
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .clearCookie("jwt", {
        path: "/",
        domain: "localhost",
        withCrdentials: true,
        httpOnly: false,
        maxAge: 15 * 60 * 1000,
      })
      .sendStatus(204);
  }
}

module.exports = new UserController();
