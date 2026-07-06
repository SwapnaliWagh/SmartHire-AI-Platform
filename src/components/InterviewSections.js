import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function InterviewSections() {

    const navigate = useNavigate();

    const [completed, setCompleted] = useState({});

    useEffect(() => {

        const sectionScores =
            JSON.parse(
                localStorage.getItem("sectionScores")
            ) || {};

        setCompleted(sectionScores);

    }, []);

    const sections = [
        {
            key: "hr",
            title: "HR Round",
            desc: "Personality, communication and confidence questions",
            path: "/interview?type=hr"
        },
        {
            key: "aptitude",
            title: "Aptitude Round",
            desc: "Verbal, logical, analytical and numerical questions",
            path: "/interview?type=aptitude"
        },
        {
            key: "coding",
            title: "Coding Round",
            desc: "Programming and problem-solving questions",
            path: "/interview?type=coding"
        },
        {
            key: "technical",
            title: "Technical Interview",
            desc: "Resume-skill based technical questions",
            path: "/interview?type=technical"
        }
    ];

    const completedCount =
        Object.keys(completed).length;

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f1f5f9",
                padding: "40px",
                fontFamily: "Arial"
            }}
        >
            <h1>Choose Interview Section 🚀</h1>

            <p style={{ color: "#64748b" }}>
                Complete all 4 sections to finish one full interview.
            </p>

            <div style={progressBox}>
                <h2>
                    Interview Progress: {completedCount}/4 Completed
                </h2>

                {completedCount === 4 ? (
                    <p style={{ color: "green", fontWeight: "bold" }}>
                        Full interview completed successfully!
                    </p>
                ) : (
                    <p style={{ color: "#64748b" }}>
                        Remaining Sections: {4 - completedCount}
                    </p>
                )}
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "25px",
                    marginTop: "40px"
                }}
            >
                {sections.map((section) => {

                    const isCompleted =
                        completed[section.key] !== undefined;

                    return (
                        <div
                            key={section.key}
                            style={{
                                background: "white",
                                padding: "30px",
                                borderRadius: "24px",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                                border: isCompleted
                                    ? "2px solid #16a34a"
                                    : "2px solid transparent"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <h2>{section.title}</h2>

                                <span
                                    style={{
                                        background: isCompleted
                                            ? "#dcfce7"
                                            : "#fee2e2",
                                        color: isCompleted
                                            ? "#16a34a"
                                            : "#dc2626",
                                        padding: "6px 12px",
                                        borderRadius: "20px",
                                        fontSize: "13px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {isCompleted ? "Completed" : "Pending"}
                                </span>
                            </div>

                            <p style={{ color: "#64748b" }}>
                                {section.desc}
                            </p>

                            {isCompleted && (
                                <p>
                                    Score: {completed[section.key]}%
                                </p>
                            )}

                            <button
                                onClick={() => navigate(section.path)}
                                style={{
                                    marginTop: "20px",
                                    background: isCompleted
                                        ? "#16a34a"
                                        : "#7c3aed",
                                    color: "white",
                                    border: "none",
                                    padding: "12px 22px",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    fontSize: "16px"
                                }}
                            >
                                {isCompleted ? "Retake" : "Start"}
                            </button>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={() => navigate("/dashboard")}
                style={{
                    marginTop: "35px",
                    background: "#0f172a",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    cursor: "pointer"
                }}
            >
                Back To Dashboard
            </button>
        </div>
    );
}

const progressBox = {
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    marginTop: "25px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
};

export default InterviewSections;