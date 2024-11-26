import mongoose from "mongoose";

const penggunaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//
penggunaSchema.statics.findOrCreate = async function({ googleId, email, name }) {
    let user = await this.findOne({ email });
    if (!user) {
        user = await this.create({ email, name, password: googleId });
    }
    return user;
};

const Pengguna = mongoose.model("Pengguna", penggunaSchema);



export default Pengguna;