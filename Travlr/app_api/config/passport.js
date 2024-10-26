const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy(
    // Tell Passport which user property is used as the username
    { 
        usernameField: 'email' 
    },

    // Provide Passport a function to use for validating users
    async (username, password, done) => {
            const q = await User
            .findOne({ email: username })
            .exec();
            // If no user matchs the e-mail, fail
            
            if (!q) {
                return done(null, false, { message: 'Incorrect username' });
            }
            // Test the password
            if (!q.validatePassword(password)) {
                return done(null, false, { message: 'Incorrect password' });
            }

            // Everything passed, allow log in
            return done(null, q);
        }
    
));