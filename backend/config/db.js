import mongoose from "mongoose"

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("DB Connected")
        return connection
    } catch (error) {
        console.log("DB Error", error)
        throw error
    }
}

export default connectDb;
