// config/passport.js
// Configures Passport strategies (local and GitHub) for Serenity Spa

const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function (passport) {
  // How to store the user in the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // How to get the full user object from the id in the session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Local strategy: email + password
  passport.use(new LocalStrategy(
    { usernameField: 'email' }, // we are using email instead of username
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user || !user.passwordHash) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  // GitHub strategy (social login)
  passport.use(new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // try to find existing user by GitHub id
        let user = await User.findOne({ githubId: profile.id });

        // if not found, create a new user
        if (!user) {
          user = await User.create({
            githubId: profile.id,
            displayName: profile.username || profile.displayName || 'GitHub User'
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
};
