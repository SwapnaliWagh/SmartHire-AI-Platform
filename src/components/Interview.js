import React, {
    useEffect,
    useState,
    useRef,
    useCallback
} from "react";

import {
    useNavigate,
    useLocation
} from "react-router-dom";

import Webcam from "react-webcam";
import jsPDF from "jspdf";

function Interview() {

    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);

    const type = params.get("type") || "technical";

    const recognitionRef = useRef(null);

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [finished, setFinished] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [cameraOn, setCameraOn] = useState(false);
    const [timer, setTimer] = useState(60);
    const [listening, setListening] = useState(false);

    useEffect(() => {

        const resumeData =
            JSON.parse(localStorage.getItem("resumeData"));

        let level =
            localStorage.getItem("difficulty");

        const previousScore =
            Number(
                localStorage.getItem("score")
            ) || 0;

        if (previousScore >= 80) {

            level = "Advanced";

        }
        else if (previousScore >= 50) {

            level = "Medium";

        }
        else {

            level = "Beginner";
        }

        const company =
            localStorage.getItem("company");

        if (!resumeData) {
            alert("Upload Resume First");
            navigate("/resume");
            return;
        }

        const fetchQuestions = async () => {

            try {

                const res = await fetch(
                    "http://localhost:5000/api/questions",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            skills: resumeData.skills,
                            level,
                            type,
                            company
                        })
                    }
                );

                const data = await res.json();

                setQuestions(data.questions || []);
                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchQuestions();

    }, [navigate, type]);

    const calculateScore = useCallback((allAnswers) => {

        if (allAnswers.length === 0) {
            return 0;
        }

        let totalScore = 0;

        allAnswers.forEach((item) => {

            const ans = item.answer.trim();

            if (type === "aptitude") {

                totalScore +=
                    item.answer === item.correctAnswer
                        ? 100
                        : 0;

            } else {

                if (ans.length < 10) totalScore += 10;
                else if (ans.length < 30) totalScore += 30;
                else if (ans.length < 80) totalScore += 55;
                else if (ans.length < 150) totalScore += 75;
                else totalScore += 90;
            }
        });

        return Math.floor(totalScore / allAnswers.length);

    }, [type]);

    const createAnalysis = (score) => {

        return {
            score,

            confidence:
                score >= 80
                    ? "High"
                    : score >= 50
                        ? "Medium"
                        : "Low",

            communication:
                score >= 80
                    ? "Strong"
                    : score >= 50
                        ? "Average"
                        : "Weak",

            technicalDepth:
                score >= 80
                    ? "Strong"
                    : score >= 50
                        ? "Average"
                        : "Weak",

            weaknesses:
                score >= 80
                    ? ["Minor improvement needed"]
                    : score >= 50
                        ? [
                            "Add more technical details",
                            "Improve answer structure"
                        ]
                        : [
                            "Very short answers",
                            "Lack of explanation",
                            "Low confidence"
                        ],

            learningPath:
                score >= 80
                    ? [
                        "Practice advanced mock interviews",
                        "Prepare system design basics"
                    ]
                    : score >= 50
                        ? [
                            "Practice DSA",
                            "Revise resume projects",
                            "Improve communication"
                        ]
                        : [
                            "Practice basic concepts",
                            "Prepare HR questions",
                            "Write detailed answers"
                        ],

            recommendedCompanies:
                score >= 80
                    ? [
                        "TCS",
                        "Infosys",
                        "Accenture"
                    ]
                    : score >= 50
                        ? [
                            "Wipro",
                            "Capgemini",
                            "Cognizant"
                        ]
                        : [
                            "Practice more before applying"
                        ]
        };
    };

    const saveHistory = (overallScore, aiAnalysis) => {

        fetch(
            "http://localhost:5000/api/history/save",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userEmail: localStorage.getItem("userEmail"),
                    role: localStorage.getItem("role"),
                    difficulty: localStorage.getItem("difficulty"),
                    score: overallScore,
                    confidence: aiAnalysis.confidence,
                    communication: aiAnalysis.communication,
                    technicalDepth: aiAnalysis.technicalDepth,
                    weaknesses: aiAnalysis.weaknesses,
                    learningPath: aiAnalysis.learningPath
                })
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("History Saved:", data);
            })
            .catch((err) => {
                console.log("Save Error:", err);
            });
    };

    const finishInterview = useCallback((finalScore) => {

        setFinished(true);

        const sectionScores =
            JSON.parse(localStorage.getItem("sectionScores")) || {};

        sectionScores[type] = finalScore;

        localStorage.setItem(
            "sectionScores",
            JSON.stringify(sectionScores)
        );

        const completedSections =
            Object.keys(sectionScores);

        let scoreToShow = finalScore;

        if (completedSections.length === 4) {

            const overallScore =
                Math.floor(
                    Object.values(sectionScores).reduce(
                        (a, b) => a + b,
                        0
                    ) / 4
                );

            scoreToShow = overallScore;

            const oldCount =
                Number(localStorage.getItem("interviews")) || 0;

            localStorage.setItem("interviews", oldCount + 1);
            localStorage.setItem("score", overallScore);
            localStorage.setItem("timeSpent", `${oldCount + 1}h`);

            const previousPerformance =
                JSON.parse(localStorage.getItem("performanceData")) || [];

            previousPerformance.push({
                name: `Interview ${previousPerformance.length + 1}`,
                score: overallScore
            });

            localStorage.setItem(
                "performanceData",
                JSON.stringify(previousPerformance)
            );

            const skillAnalysis = [
                {
                    name: "Problem Solving",
                    value: overallScore >= 80 ? 85 : overallScore >= 50 ? 65 : 35
                },
                {
                    name: "Communication",
                    value: overallScore >= 80 ? 85 : overallScore >= 50 ? 60 : 30
                },
                {
                    name: "Technical",
                    value: overallScore >= 80 ? 88 : overallScore >= 50 ? 65 : 35
                },
                {
                    name: "Confidence",
                    value: overallScore >= 80 ? 85 : overallScore >= 50 ? 60 : 30
                }
            ];

            localStorage.setItem(
                "skillAnalysis",
                JSON.stringify(skillAnalysis)
            );

            localStorage.removeItem("sectionScores");

            const overallAnalysis =
                createAnalysis(overallScore);

            setAnalysis(overallAnalysis);

            localStorage.setItem(
                "feedback",
                JSON.stringify(overallAnalysis)
            );

            saveHistory(overallScore, overallAnalysis);

            alert(
                `Full Interview Completed! Overall Score: ${overallScore}%`
            );

            return;
        }

        const sectionAnalysis =
            createAnalysis(scoreToShow);

        setAnalysis(sectionAnalysis);

        localStorage.setItem(
            "feedback",
            JSON.stringify(sectionAnalysis)
        );

    }, [type]);

    const handleNext = useCallback(() => {

        if (!answer.trim()) {
            alert("Please write, speak, or select your answer first");
            return;
        }

        const currentQ = questions[currentQuestion];

        const updatedAnswers = [
            ...answers,
            {
                question:
                    type === "aptitude"
                        ? currentQ?.question
                        : currentQ,

                answer,

                correctAnswer:
                    type === "aptitude"
                        ? currentQ?.answer
                        : null
            }
        ];

        setAnswers(updatedAnswers);
        setAnswer("");
        setTimer(60);

        if (currentQuestion === questions.length - 1) {

            const finalScore =
                calculateScore(updatedAnswers);

            finishInterview(finalScore);

        } else {

            setCurrentQuestion(currentQuestion + 1);
        }

    }, [
        answers,
        answer,
        currentQuestion,
        questions,
        finishInterview,
        type,
        calculateScore
    ]);

    useEffect(() => {

        if (loading || finished) return;

        if (timer === 0) {
            handleNext();
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [
        timer,
        loading,
        finished,
        handleNext
    ]);

    const startListening = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.onresult = (event) => {

            let transcript = "";

            for (let i = 0; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }

            setAnswer(transcript);
        };

        recognition.start();
        recognitionRef.current = recognition;
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
    };

    function downloadReport() {

        const doc = new jsPDF();

        doc.text("SmartHire Interview Report", 20, 20);
        doc.text(`Score: ${analysis?.score}/100`, 20, 40);
        doc.text(`Confidence: ${analysis?.confidence}`, 20, 55);
        doc.text(`Communication: ${analysis?.communication}`, 20, 70);
        doc.text(`Technical: ${analysis?.technicalDepth}`, 20, 85);

        doc.text("Weak Areas:", 20, 105);

        analysis?.weaknesses?.forEach((item, index) => {
            doc.text(`- ${item}`, 25, 120 + index * 10);
        });

        doc.text("Learning Path:", 20, 160);

        analysis?.learningPath?.forEach((item, index) => {
            doc.text(`- ${item}`, 25, 175 + index * 10);
        });

        doc.save("SmartHire_Report.pdf");
    }

    function downloadCertificate() {

        const doc = new jsPDF(
            "landscape"
        );

        const userName =
            localStorage.getItem(
                "userName"
            );

        const date =
            new Date().toLocaleDateString();

        doc.setFontSize(28);

        doc.text(
            "Certificate of Completion",
            90,
            40
        );

        doc.setFontSize(18);

        doc.text(
            `This certificate is awarded to`,
            110,
            80
        );

        doc.setFontSize(24);

        doc.text(
            `${userName}`,
            120,
            105
        );

        doc.setFontSize(18);

        doc.text(
            `for successfully completing AI Mock Interview Assessment`,
            45,
            135
        );

        doc.text(
            `Score Achieved: ${analysis?.score}%`,
            110,
            165
        );

        doc.text(
            `Date: ${date}`,
            115,
            190
        );

        doc.text(
            `SmartHire AI Platform`,
            105,
            220
        );

        doc.save(
            "SmartHire_Certificate.pdf"
        );
    }

    if (loading) {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30px"
                }}
            >
                Loading AI Questions...
            </div>
        );
    }

    if (finished) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#f1f5f9",
                    padding: "40px",
                    fontFamily: "Arial"
                }}
            >
                <div
                    style={{
                        maxWidth: "900px",
                        margin: "auto",
                        background: "white",
                        borderRadius: "24px",
                        padding: "40px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
                    }}
                >
                    <h1>
                        {localStorage.getItem("sectionScores")
                            ? "Section Completed 🎉"
                            : "Full Interview Completed 🎉"}
                    </h1>

                    <h2 style={{ marginTop: "20px" }}>
                        Score: {analysis?.score}/100
                    </h2>

                    <p>
                        {localStorage.getItem("sectionScores")
                            ? "Complete all 4 sections to finish one full interview."
                            : "Your full interview has been completed and saved successfully."}
                    </p>

                    <h2 style={{ marginTop: "30px" }}>
                        AI Self Analysis
                    </h2>

                    <p><b>Confidence:</b> {analysis?.confidence}</p>
                    <p><b>Communication:</b> {analysis?.communication}</p>
                    <p><b>Technical:</b> {analysis?.technicalDepth}</p>

                    <h2 style={{ marginTop: "30px" }}>
                        Weak Areas
                    </h2>

                    <ul>
                        {analysis?.weaknesses?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h2 style={{ marginTop: "30px" }}>
                        Personalized Learning Path
                    </h2>

                    <ul>
                        {analysis?.learningPath?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h2 style={{ marginTop: "30px" }}>
                        Recommended Companies
                    </h2>

                    <ul>
                        {analysis?.recommendedCompanies?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <button
                        onClick={() =>
                            navigate("/interview-sections")
                        }
                        style={buttonStyle}
                    >
                        Back To Interview Sections
                    </button>

                    <button
                        onClick={downloadReport}
                        style={{
                            ...buttonStyle,
                            marginLeft: "15px",
                            background: "#16a34a"
                        }}
                    >
                        Download PDF Report

                        <button
                            onClick={downloadCertificate}
                            style={{
                                marginTop: "15px",
                                marginLeft: "15px",
                                background: "#2563eb",
                                color: "white",
                                border: "none",
                                padding: "14px 24px",
                                borderRadius: "12px",
                                cursor: "pointer"
                            }}
                        >
                            Download Certificate
                        </button>

                        <button
                            onClick={downloadCertificate}
                            style={{
                                marginTop: "15px",
                                marginLeft: "15px",
                                background: "#2563eb",
                                color: "white",
                                border: "none",
                                padding: "14px 24px",
                                borderRadius: "12px",
                                cursor: "pointer"
                            }}
                        >
                            Download Certificate
                        </button>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f1f5f9",
                padding: "40px",
                fontFamily: "Arial"
            }}
        >
            <div
                style={{
                    maxWidth: "1000px",
                    margin: "auto",
                    background: "white",
                    borderRadius: "24px",
                    padding: "35px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <h1>AI Mock Interview</h1>

                    <div
                        style={{
                            fontSize: "24px",
                            color: "#7c3aed",
                            fontWeight: "bold"
                        }}
                    >
                        ⏱ {timer}s
                    </div>
                </div>

                <button
                    onClick={() => setCameraOn(!cameraOn)}
                    style={buttonStyle}
                >
                    {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
                </button>

                {cameraOn && (
                    <div style={{ marginTop: "20px" }}>
                        <Webcam height={250} width={350} />
                    </div>
                )}

                <div style={{ marginTop: "40px" }}>
                    <h2>
                        Question {currentQuestion + 1}
                    </h2>

                    <p
                        style={{
                            fontSize: "22px",
                            marginTop: "20px",
                            lineHeight: "1.6"
                        }}
                    >
                        {type === "aptitude"
                            ? questions[currentQuestion]?.question
                            : questions[currentQuestion]}
                    </p>
                </div>

                {type === "aptitude" ? (

                    <div style={{ marginTop: "30px" }}>

                        {questions[currentQuestion]?.options?.map((option, index) => (

                            <button
                                key={index}
                                onClick={() => setAnswer(option)}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "15px",
                                    marginTop: "15px",
                                    borderRadius: "12px",
                                    border:
                                        answer === option
                                            ? "2px solid #7c3aed"
                                            : "1px solid #ccc",
                                    background:
                                        answer === option
                                            ? "#ede9fe"
                                            : "white",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: "16px"
                                }}
                            >
                                {option}
                            </button>

                        ))}

                    </div>

                ) : (

                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        rows="8"
                        placeholder="Type your answer..."
                        style={{
                            width: "100%",
                            marginTop: "30px",
                            padding: "20px",
                            borderRadius: "16px",
                            border: "1px solid #cbd5e1",
                            fontSize: "16px"
                        }}
                    />

                )}

                {type !== "aptitude" && (
                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            marginTop: "20px"
                        }}
                    >
                        <button
                            onClick={startListening}
                            style={buttonStyle}
                        >
                            🎤 Start Voice
                        </button>

                        <button
                            onClick={stopListening}
                            style={{
                                ...buttonStyle,
                                background: "#ef4444"
                            }}
                        >
                            ⛔ Stop Voice
                        </button>
                    </div>
                )}

                {listening && (
                    <p
                        style={{
                            color: "green",
                            marginTop: "15px"
                        }}
                    >
                        Listening...
                    </p>
                )}

                <button
                    onClick={handleNext}
                    style={{
                        ...buttonStyle,
                        marginTop: "35px",
                        width: "100%"
                    }}
                >
                    {currentQuestion === questions.length - 1
                        ? "Finish Section"
                        : "Next Question"}
                </button>
            </div>
        </div>
    );
}

const buttonStyle = {
    marginTop: "30px",
    background: "#7c3aed",
    color: "white",
    border: "none",
    padding: "14px 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px"
};

export default Interview;