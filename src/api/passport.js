/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, done) {
      return User.findOne({ email, password }).then((user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Email not found in our database' });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) {
            return next(err);
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
        return done(null, user, { message: 'Logged In Successfully' });
      });
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretsheee',
    },
    function (jwtPayload, cb) {
      return User.findOneById(jwtPayload.id)
        .then((user) => cb(null, user))
        .catch((err) => cb(err));
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // eslint-disable-next-line no-undef
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
