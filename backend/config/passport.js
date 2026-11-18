const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

// Only register Google OAuth strategy if real credentials are provided
if (googleClientId && googleClientSecret && !googleClientId.includes('demo_google')) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
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
} else {
  console.log(`\x1b[33m%s\x1b[0m`, `[Passport Notice] Google OAuth disabled (dummy/missing credentials). Standard JWT Auth active.`);
}

module.exports = passport;
