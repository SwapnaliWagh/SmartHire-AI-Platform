import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const {
            skills,
            level,
            type,
            company
        } = req.body;

        const userSkills =
            skills && skills.length > 0
                ? skills
                : ["Programming"];

        let questions = [];

        // =========================
        // HR ROUND
        // =========================

        if (type === "hr") {

            questions = [
                `Tell me about yourself and your experience with ${userSkills.join(", ")}.`,
                `Why do you want to join ${company || "this company"}?`,
                `Which project from your resume are you most confident about?`,
                `What challenges did you face while working with ${userSkills[0]}?`,
                `How do you handle pressure during project deadlines?`,
                `What are your strengths related to ${userSkills[0]}?`,
                `Describe a time when you worked in a team.`,
                `What is your career goal?`
            ];

        }

        // =========================
        // APTITUDE ROUND
        // =========================

        else if (type === "aptitude") {

            if (company === "TCS") {

                questions = [
                    {
                        question: "TCS Pattern: What is 25% of 240?",
                        options: ["40", "50", "60", "70"],
                        answer: "60"
                    },
                    {
                        question: "TCS Logical: Find the next number: 3, 6, 12, 24, ?",
                        options: ["30", "36", "48", "54"],
                        answer: "48"
                    },
                    {
                        question: "TCS Verbal: Choose the synonym of 'Rapid'.",
                        options: ["Slow", "Fast", "Weak", "Late"],
                        answer: "Fast"
                    },
                    {
                        question: "TCS Analytical: If 6 workers complete work in 12 days, how many days will 12 workers take?",
                        options: ["4", "6", "8", "12"],
                        answer: "6"
                    }
                ];

            } else if (company === "Infosys") {

                questions = [
                    {
                        question: "Infosys Puzzle: A clock shows 3:15. What is the angle between hour and minute hand?",
                        options: ["0°", "7.5°", "15°", "30°"],
                        answer: "7.5°"
                    },
                    {
                        question: "Infosys Logical: Find the odd one out.",
                        options: ["2", "3", "5", "9"],
                        answer: "9"
                    },
                    {
                        question: "Infosys Analytical: If A is brother of B and B is sister of C, how is A related to C?",
                        options: ["Brother", "Sister", "Father", "Mother"],
                        answer: "Brother"
                    },
                    {
                        question: "Infosys Verbal: Choose antonym of 'Complex'.",
                        options: ["Difficult", "Simple", "Hard", "Confusing"],
                        answer: "Simple"
                    }
                ];

            } else if (company === "Wipro") {

                questions = [
                    {
                        question: "Wipro Verbal: Choose correct spelling.",
                        options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"],
                        answer: "Accommodate"
                    },
                    {
                        question: "Wipro Quant: What is 15% of 300?",
                        options: ["30", "35", "45", "60"],
                        answer: "45"
                    },
                    {
                        question: "Wipro Logical: Complete series: A, C, F, J, ?",
                        options: ["L", "M", "N", "O"],
                        answer: "O"
                    },
                    {
                        question: "Wipro Analytical: If today is Monday, what day after 45 days?",
                        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
                        answer: "Wednesday"
                    }
                ];

            } else if (company === "Accenture") {

                questions = [
                    {
                        question: "Accenture Scenario: If a project deadline is near and one teammate is absent, what will you do?",
                        options: [
                            "Ignore the task",
                            "Inform manager and divide work",
                            "Blame teammate",
                            "Stop working"
                        ],
                        answer: "Inform manager and divide work"
                    },
                    {
                        question: "Accenture Logical: Find next: 1, 4, 9, 16, ?",
                        options: ["20", "24", "25", "30"],
                        answer: "25"
                    },
                    {
                        question: "Accenture Verbal: Choose synonym of 'Collaborate'.",
                        options: ["Compete", "Work together", "Avoid", "Delay"],
                        answer: "Work together"
                    },
                    {
                        question: "Accenture Quant: If cost price is 100 and profit is 20%, selling price is?",
                        options: ["100", "110", "120", "130"],
                        answer: "120"
                    }
                ];

            } else {

                questions = [
                    {
                        question: "Capgemini Technical Aptitude: Which data structure follows FIFO?",
                        options: ["Stack", "Queue", "Tree", "Graph"],
                        answer: "Queue"
                    },
                    {
                        question: "Capgemini Quant: What is the square root of 144?",
                        options: ["10", "11", "12", "14"],
                        answer: "12"
                    },
                    {
                        question: "Capgemini Logical: Find next number: 5, 10, 20, 40, ?",
                        options: ["50", "60", "70", "80"],
                        answer: "80"
                    },
                    {
                        question: "Capgemini Verbal: Choose antonym of 'Strong'.",
                        options: ["Powerful", "Weak", "Hard", "Heavy"],
                        answer: "Weak"
                    }
                ];
            }

        }

        // =========================
        // CODING ROUND
        // =========================

        else if (type === "coding") {

            userSkills.forEach((skill) => {

                if (level === "Beginner") {

                    questions.push(
                        `Write a simple program using ${skill}.`
                    );

                    questions.push(
                        `Explain basic syntax of ${skill}.`
                    );

                } else if (level === "Advanced") {

                    questions.push(
                        `Solve an optimized coding problem using ${skill}.`
                    );

                    questions.push(
                        `Explain time and space complexity of your ${skill} solution.`
                    );

                } else {

                    questions.push(
                        `Write a program to solve an array or string problem using ${skill}.`
                    );

                    questions.push(
                        `Explain how you used ${skill} in your resume project.`
                    );

                }

            });

            questions.push(
                "Write a program to reverse a string.",
                "Write a program to find the largest element in an array.",
                "Explain time complexity with an example."
            );

        }

        // =========================
        // TECHNICAL ROUND
        // =========================

        else {

            userSkills.forEach((skill) => {

                if (level === "Beginner") {

                    questions.push(
                        `What is ${skill}?`
                    );

                    questions.push(
                        `Why is ${skill} used?`
                    );

                    questions.push(
                        `Explain basic concepts of ${skill}.`
                    );

                } else if (level === "Advanced") {

                    questions.push(
                        `Explain advanced concepts in ${skill}.`
                    );

                    questions.push(
                        `How do you optimize performance in ${skill}?`
                    );

                    questions.push(
                        `Explain a real-world project using ${skill}.`
                    );

                } else {

                    questions.push(
                        `Explain your experience with ${skill}.`
                    );

                    questions.push(
                        `What projects have you built using ${skill}?`
                    );

                    questions.push(
                        `What challenges did you face while using ${skill}?`
                    );

                }

            });

        }

        res.json({
            questions: questions.slice(0, 8)
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Question generation failed",
            questions: [
                "Explain your resume project.",
                "What technologies have you used?",
                "What challenges did you face?"
            ]
        });
    }
});

export default router;
