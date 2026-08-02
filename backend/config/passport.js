const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/users/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.id}@google.com`;
        
        let user = await User.findOne({ 
          $or: [{ googleId: profile.id }, { email }]
        });

        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            if (profile.photos && profile.photos[0]) {
              user.profileImage = profile.photos[0].value;
            }
            await user.save();
          }
          return done(null, user);
        }

        // Generate a random secure password for OAuth user
        const randomPassword = Math.random().toString(36).slice(-10) + 'A1!';
        
        user = await User.create({
          name: profile.displayName || 'Google Eco User',
          email: email,
          password: randomPassword,
          googleId: profile.id,
          role: 'customer',
          profileImage: (profile.photos && profile.photos[0]) ? profile.photos[0].value : undefined
        });

        return done(null, user);
      } catch (error) {
        console.error('Google OAuth Strategy Error:', error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
