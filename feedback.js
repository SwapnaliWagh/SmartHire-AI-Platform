const express = require("express");

const router = express.Router();

router.post("/generate-feedback", (req, res) => {

    const { skills, score } = req.body;

    let feedback = "";

    if (score >= 70) {

        feedback =
            "Excellent profile with strong technical skills and good ATS performance.";

    }
    else if (score >= 40) {

        feedback =
            "Good profile but adding more projects and advanced skills can improve opportunities.";

    }
    else {

        feedback =
            "Profile needs improvement. Add more technical skills, projects, and certifications.";

    }

    res.json({

        strengths: skills,

        weaknesses: [
            "Need more practical projects",
            "Improve communication skills",
            "Add certifications"
        ],

        feedback: feedback,

        recommendation:
            "Recommended for software development and AI-related roles."

    });

});

module.exports = router;