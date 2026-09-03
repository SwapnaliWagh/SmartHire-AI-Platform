import mongoose from "mongoose";

const InterviewHistorySchema = new mongoose.Schema({
    userEmail: String,
    role: String,
    difficulty: String,
    score: Number,
    confidence: String,
    communication: String,
    technicalDepth: String,
    weaknesses: [String],
    learningPath: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model(
    "InterviewHistory",
    InterviewHistorySchema
);
