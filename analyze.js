const express = require("express");
const router = express.Router();
const fs = require("fs");
const pdfParse = require("pdf-parse");

router.post("/resume-analysis", async (req, res) => {

    try {

        const filePath = req.body.filePath;

        const dataBuffer = fs.readFileSync(filePath);

        const data = await pdfParse(dataBuffer);

        const text = data.text;

        const skills = [];

        const skillList = [
            "Java",
            "Python",
            "React",
            "Node.js",
            "MongoDB",
            "Machine Learning",
            "AI",
            "SQL",
            "JavaScript",
            "C++"
        ];

        skillList.forEach(skill => {

            if (text.toLowerCase().includes(skill.toLowerCase())) {

                skills.push(skill);

            }

        });

        let score = skills.length * 10;

        if (score > 100) {
            score = 100;
        }

        let level = "Beginner";

        if (score >= 70) {
            level = "Advanced";
        }
        else if (score >= 40) {
            level = "Intermediate";
        }

        res.json({
            extractedSkills: skills,
            atsScore: score,
            candidateLevel: level,
            resumeText: text.substring(0, 1000)
        });
    } catch (error) {

        console.log(error);

    }

});

module.exports = router;