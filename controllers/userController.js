import Pengguna from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Register
    const user = await Pengguna.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "Berhasil Register!",
      data: { penggunaId: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Pengguna.findOne({
      email,
    });

    if (!user)
      return res.status(404).json({
        status: "Error",
        message: "Pengguna Tidak Ditemukan/Belum registrasi",
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({
        status: "Error",
        message: "Password Salah",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json ({
        status: "Berhasil Login!",
        data: { token },
      
    })
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};

const loginWeb = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Pengguna.findOne({
      email,
    });

    if (!user)
      return res.status(404).json({
        status: "Error",
        message: "Pengguna Tidak Ditemukan/Belum registrasi",
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({
        status: "Error",
        message: "Password Salah",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    req.session.token = token;

    res.redirect('/dashboard');

  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};


const logout = (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.status(500).json({ status: 'fail', message: 'Could not log out' });
      }
      res.redirect('/login'); // Arahkan kembali ke halaman login
  });
}; 

export { register, login, loginWeb, logout };
