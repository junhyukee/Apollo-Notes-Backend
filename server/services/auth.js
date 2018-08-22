const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    User.findOne({ username: username.toLowerCase() }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, 'Invalid Credentials'); }
        user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, 'Invalid credentials.');
        });
    });
}));

function signup({ username, password, req }) {
    const user = new User({ username, password });
    if (!username || !password) { throw new Error('You must provide an username and password.'); }

    return User.findOne({ username })
        .then(existingUser => {
            if (existingUser) { throw new Error('Username in use'); }
            return user.save();
        })
        .then(user => {
            return new Promise((resolve, reject) => {
                req.logIn(user, (err) => {
                    if (err) { reject(err); }
                    resolve(user);
                });
            });
        });
}

function login({ username, password, req }) {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user) => {
            if (!user) { reject('Invalid credentials.') }

            req.login(user, () => resolve(user));
        })({ body: { username, password } });
    });
}

module.exports = { signup, login };
