/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-else-return */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
// eslint-disable-next-line no-unused-vars
const passportJWT = require('passport-jwt');

const User = require('./models/user');

const customFields = {
  usernameField: 'username',
  passwordField: 'password',
};

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secretsheee',
  algorithms: ['RS256'],
};

const verifyCallback = (username, password, done) => {
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'Email not found in our database' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          return done(err);
        }
        if (res) {
          // passwords match, log the user in
          return done(null, user, { message: 'Logged In Successfully!' });
          // eslint-disable-next-line no-else-return
        } else {
          // passwords don't match
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: 'secretsheee',
//     },
//     function (jwtPayload, cb) {
//       return User.findOneById(jwtPayload.id)
//         .then((user) => cb(null, user))
//         .catch((err) => cb(err));
//     },
//   ),
// );

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // eslint-disable-next-line no-undef
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, function (jwtPayload, done) {
      console.log(jwtPayload);

      // We will assign the `sub` property on the JWT to the database ID of user
      User.findOne({ _id: jwtPayload.sub }, function (err, user) {
        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }),
  );
};
