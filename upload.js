import express from "express";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse";

const router = express.Router();

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }
});

const upload = multer({ storage });

router.post(
    "/",
    upload.single("resume"),
    async (req, res) => {

        try {

            const dataBuffer = fs.readFileSync(
                req.file.path
            );

            const pdfData = await pdfParse(
                dataBuffer
            );

            const resumeText = pdfData.text;

            console.log(resumeText);

            // AI-like skill extraction

            const skills = [];

            const skillKeywords = [

                "Python",
                "Java",
                "React",
                "Node.js",
                "MongoDB",
                "SQL",
                "Machine Learning",
                "AI",
                "C++",
                "JavaScript"

            ];

            skillKeywords.forEach((skill) => {

                if (
                    resumeText
                        .toLowerCase()
                        .includes(
                            skill.toLowerCase()
                        )
                ) {

                    skills.push(skill);
                }
            });

            const atsScore =
                Math.floor(
                    Math.random() * 21
                ) + 80;

            const missingSkills = [
                "DSA",
                "System Design"
            ];

            res.json({

                message:
                    "Resume uploaded successfully",

                skills,

                atsScore,

                missingSkills

            });
        } catch (error) {

            console.log(error);

            res.status(500).json({

                error:
                    "Resume parsing failed"
            });
        }
    }
);

export default router;