import express from "express";
import InterviewHistory from "../models/InterviewHistory.js";

const router = express.Router();

router.post("/save", async (req, res) => {
    try {
        const history = new InterviewHistory(req.body);
        await history.save();

        res.json({
            message: "Interview history saved",
            history
        });

    } catch (error) {
        res.status(500).json({
            error: "Failed to save history"
        });
    }
});

router.get("/leaderboard", async (req, res) => {
    try {
        const leaderboard = await InterviewHistory
            .find()
            .sort({ score: -1 })
            .limit(10);

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch leaderboard"
        });
    }
});

router.get("/:email", async (req, res) => {
    try {
        const history = await InterviewHistory.find({
            userEmail: req.params.email
        }).sort({ createdAt: -1 });

        res.json(history);

    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch history"
        });
    }
});


export default router;