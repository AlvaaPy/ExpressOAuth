import mongoose from "mongoose";

const connectDatabase = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected.... ${conn.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}


export default connectDatabase;