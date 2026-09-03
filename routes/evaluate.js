import express from "express";
import { evaluateAnswer } from "../gemini.js";

const router = express.Router();

router.post("/evaluate", async (req, res) => {
    try {
        const { question, answer } = req.body;

        const feedback = await evaluateAnswer(question, answer);

        let confidence = "Medium";

        let communication = "Average";

        let technicalDepth = "Strong";

        let grammar = "Good";

        let weaknesses = [];

        let recommendations = [];

        recommendations.push(
            "Practice mock interviews daily"
        );

        if (weaknesses.includes("Low Confidence")) {

            recommendations.push(
                "Improve speaking confidence"
            );
        }

        if (weaknesses.includes("Grammar Issues")) {

            recommendations.push(
                "Practice communication skills"
            );
        }

        if (answer.length < 50) {

            weaknesses.push("Low Confidence");

            weaknesses.push("Short Answer");
        }

        if (!answer.includes(".")) {

            weaknesses.push("Grammar Issues");
        }

        if (answer.length > 150) {

            confidence = "High";

            communication = "Strong";
        }

        res.json({

            feedback,

            confidence,

            communication,

            technicalDepth,

            grammar,

            weaknesses,

            recommendations

        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Evaluation failed" });
    }
});

export default router;
