import express  from "express";
import dotenv from "dotenv";
import router from "./routes/udemyRoutes.js";
import connectDatabase from "./config/database.js";
import session  from "express-session";
import passport from 'passport';
import './passport.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(session({
    secret: process.env.SESSION_SECRET, // Buat variabel SESSION_SECRET di .env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set 'true' jika menggunakan HTTPS
  }));

app.set('view engine', 'ejs');
app.set('views', './views')

app.use(passport.initialize()); // Inisialisasi Passport
app.use(passport.session()); // Gunakan session Passport

app.use("/", router )

connectDatabase();

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});


