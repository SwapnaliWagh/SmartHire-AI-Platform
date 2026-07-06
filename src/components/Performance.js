import { useEffect, useState } from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

function Performance() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        const email = localStorage.getItem("userEmail");

        fetch(`http://localhost:5000/api/history/${email}`)
            .then((res) => res.json())
            .then((data) => {

                if (Array.isArray(data)) {

                    setHistory(data);

                } else {

                    setHistory([]);
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    const averageScore =
        history.length > 0
            ? Math.floor(
                history.reduce((sum, item) => sum + item.score, 0) /
                history.length
            )
            : 0;

    const graphData =
        history.length > 0
            ? history
                .slice()
                .reverse()
                .map((item, index) => ({
                    name: `Interview ${index + 1}`,
                    score: item.score
                }))
            : [
                { name: "Interview 1", score: 0 }
            ];
    const skillData = [
        {
            name: "Confidence",
            value: averageScore >= 80 ? 85 : averageScore >= 50 ? 60 : 35
        },
        {
            name: "Communication",
            value: averageScore >= 80 ? 85 : averageScore >= 50 ? 60 : 35
        },
        {
            name: "Technical",
            value: averageScore >= 80 ? 88 : averageScore >= 50 ? 65 : 35
        },
        {
            name: "Problem Solving",
            value: averageScore >= 80 ? 85 : averageScore >= 50 ? 65 : 35
        }
    ];

    const COLORS = [
        "#7c3aed",
        "#2563eb",
        "#16a34a",
        "#f59e0b"
    ];

    return (
        <div
            style={{
                padding: "40px",
                background: "#f1f5f9",
                minHeight: "100vh",
                fontFamily: "Arial"
            }}
        >

            <h1>Performance Dashboard</h1>

            <p style={{ color: "#64748b" }}>
                Track your interview progress and improvement
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                    marginTop: "30px"
                }}
            >
                <div style={cardStyle}>
                    <h3>Total Interviews</h3>
                    <h1>{history.length}</h1>
                </div>

                <div style={cardStyle}>
                    <h3>Average Score</h3>
                    <h1>{averageScore}%</h1>
                </div>

                <div style={cardStyle}>
                    <h3>Best Score</h3>
                    <h1>
                        {history.length > 0
                            ? Math.max(...history.map((item) => item.score))
                            : 0}%
                    </h1>
                </div>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr 1fr",
                    gap: "20px",
                    marginTop: "30px"
                }}
            >
                <div style={cardStyle}>
                    <h2>Recent Performance</h2>

                    {graphData.length === 0 ? (
                        <p>No performance data available.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={330}>
                            <LineChart data={graphData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#7c3aed"
                                    strokeWidth={4}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>

                <div style={cardStyle}>
                    <h2>Skill Evaluation</h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={skillData}
                                dataKey="value"
                                innerRadius={70}
                                outerRadius={110}
                                paddingAngle={5}
                            >
                                {skillData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                    {skillData.map((item, index) => (
                        <p key={index}>
                            <span
                                style={{
                                    display: "inline-block",
                                    width: "12px",
                                    height: "12px",
                                    background: COLORS[index],
                                    borderRadius: "50%",
                                    marginRight: "8px"
                                }}
                            />
                            {item.name}: {item.value}%
                        </p>
                    ))}
                </div>
            </div>

            <h2 style={{ marginTop: "30px" }}>
                Interview History
            </h2>

            {history.length === 0 ? (
                <div style={cardStyle}>
                    <p>No interview history available.</p>
                </div>
            ) : (
                history.map((item, index) => (
                    <div key={index} style={cardStyle}>
                        <h3>Interview {history.length - index}</h3>
                        <p>Role: {item.role}</p>
                        <p>Difficulty: {item.difficulty}</p>
                        <p>Score: {item.score}%</p>
                        <p>Confidence: {item.confidence}</p>
                        <p>Communication: {item.communication}</p>
                        <p>Technical: {item.technicalDepth}</p>
                    </div>
                ))
            )}

        </div>
    );
}

const cardStyle = {
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    marginTop: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
};

export default Performance;