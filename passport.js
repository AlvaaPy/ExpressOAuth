import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Pengguna from './models/userModels.js';

const GOOGLE_CLIENT_ID = "1YOUR_CLIENT_ID";
const GOOGLE_CLIENT_SECRET = "YOUR_CLIENT_SECRET";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5050/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    const userData = {
      googleId: profile.id,
      name: profile.displayName, // Ambil nama dari profil
      email: profile.emails[0].value // Ambil email dari profil
    };

    try {
      const user = await Pengguna.findOrCreate(userData); // Menggunakan userData yang lengkap
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));



// Serialize and deserialize user
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
    try {
      const user = await Pengguna.findById(id); // Gunakan await untuk menunggu hasil
      cb(null, user);
    } catch (err) {
      cb(err); // Tangani error jika ada
    }
  });
  
