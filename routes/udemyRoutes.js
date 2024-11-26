import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  create,
  deleteBook,
  getAllBooksPage,
  getBokk,
  getBookID,
  updateBook,
} from "../controllers/bookControllers.js";
import {
  login,
  loginWeb,
  logout,
  register,
} from "../controllers/userController.js";
import protect from "../middleware/userMiddleware.js";

const router = express.Router();

// Create
router.post("/book", protect, create);

// Get all books
router.get("/book", protect, getBokk);

// Get single book
router.get("/book/:id", protect, getBookID);

// Update book
router.put("/book/:id", protect, updateBook);

// Delete Book
router.delete("/book/:id", protect, deleteBook);

router.get("/dashboard", protect, getAllBooksPage);

// User
router.post("/user", register);

//Login
router.post("/user/login", login);

// Login Web
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", loginWeb);

router.get("/dashboard", protect, (req, res) => {
  res.render("dashboard", { user: req.user });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    // Jika login berhasil, buat token JWT untuk pengguna
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Simpan token di session
    req.session.token = token;

    // Redirect ke dashboard
    res.redirect("/dashboard");
  }
);

router.get("/logout", logout);

export default router;
