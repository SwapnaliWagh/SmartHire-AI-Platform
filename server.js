import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import questionRoutes from "./routes/question.js";
import evaluateRoutes from "./routes/evaluate.js";
import uploadRoutes from "./routes/upload.js";
import historyRoutes from "./routes/history.js";
import mongoose from "mongoose";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/evaluate", evaluateRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/history", historyRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});