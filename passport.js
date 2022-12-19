const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_BASE_URL}/api/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.API_BASE_URL}/api/auth/github/callback`,
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});