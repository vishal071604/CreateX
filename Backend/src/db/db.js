const mongoose = require("mongoose");


async function connectDB() {

    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });
}


module.exports = connectDB;
