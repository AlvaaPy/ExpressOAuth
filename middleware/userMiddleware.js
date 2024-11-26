import jwt  from "jsonwebtoken";
import Pengguna from "../models/userModels.js";

const protect = async (req, res, next) =>
{
    let token = req.session?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "User Belum Login" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Pengguna.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ message: "Pengguna tidak ditemukan" });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            status : 'Fail',
            message: 'Token gagal diproses'
        })
    }
}

export default protect;