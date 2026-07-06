import React, {
    useState,
    useEffect
} from "react";

import { useNavigate } from "react-router-dom";

import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function Dashboard() {

    const navigate = useNavigate();


    // =========================
    // Login Check
    // =========================

    useEffect(() => {

        const user =
            localStorage.getItem(
                "userName"
            );

        if (!user) {

            navigate("/login");
        }

    }, [navigate]);


    // =========================
    // Dashboard Data
    // =========================

    const totalInterviews =
        localStorage.getItem(
            "interviews"
        ) || 0;

    const averageScore =
        localStorage.getItem(
            "score"
        ) || 0;

    const timeSpent =
        localStorage.getItem(
            "timeSpent"
        ) || "0h";


    const userName =
        localStorage.getItem(
            "userName"
        );

    const userEmail =
        localStorage.getItem(
            "userEmail"
        );


    // =========================
    // Dropdown States
    // =========================

    const [role, setRole] =
        useState(
            localStorage.getItem(
                "role"
            ) || "Software Engineer"
        );

    const [difficulty,
        setDifficulty] =
        useState("Medium");

    const [company, setCompany] =
        useState("TCS");


    // =========================
    // Real Performance Data
    // =========================

    const performanceData =

        JSON.parse(
            localStorage.getItem(
                "performanceData"
            )
        ) || [

            {
                name:
                    "Interview 1",

                score: 0
            }
        ];


    // =========================
    // Real Skill Analysis
    // =========================

    const skillData =

        JSON.parse(
            localStorage.getItem(
                "skillAnalysis"
            )
        ) || [

            {
                name:
                    "Problem Solving",

                value: 25
            },

            {
                name:
                    "Communication",

                value: 25
            },

            {
                name:
                    "Technical",

                value: 25
            },

            {
                name:
                    "Confidence",

                value: 25
            }
        ];


    const COLORS = [

        "#8b5cf6",

        "#06b6d4",

        "#10b981",

        "#f59e0b",
    ];


    return (

        <div
            style={{
                display: "flex",

                minHeight: "100vh",

                background:
                    "#f1f5f9",

                fontFamily:
                    "Arial"
            }}
        >

            {/* ========================= */}
            {/* Sidebar */}
            {/* ========================= */}

            <div
                style={{
                    width: "260px",

                    background:
                        "#0f172a",

                    color: "white",

                    padding: "30px"
                }}
            >

                <h1>
                    SmartHire
                </h1>

                <p
                    style={{
                        marginTop: "20px",

                        color: "#cbd5e1"
                    }}
                >
                    {userName}
                </p>

                <p
                    style={{
                        fontSize: "14px",

                        color: "#94a3b8"
                    }}
                >
                    {userEmail}
                </p>


                <div
                    style={menuStyle}

                    onClick={() =>
                        navigate("/")
                    }
                >
                    🏠 Dashboard
                </div>


                <div
                    style={menuStyle}

                    onClick={() =>
                        navigate("/resume")
                    }
                >
                    📄 Resume Analysis
                </div>


                <div
                    style={menuStyle}
                    onClick={() =>
                        navigate("/interview-sections")
                    }
                >
                    🎤 Interview
                </div>

                <div
                    style={menuStyle}

                    onClick={() =>
                        navigate(
                            "/performance"
                        )
                    }
                >
                    📊 Performance
                </div>


                <div
                    style={menuStyle}

                    onClick={() =>
                        navigate(
                            "/feedback"
                        )
                    }
                >
                    💬 Feedback
                </div>


                <div
                    style={menuStyle}

                    onClick={() =>
                        navigate(
                            "/profile"
                        )
                    }
                >
                    👤 Profile
                </div>


                <div
                    style={menuStyle}

                    onClick={() =>
                        navigate("/leaderboard")
                    }
                >
                    🏆 Leaderboard
                </div>


                <div
                    style={menuStyle}

                    onClick={() => {

                        localStorage.removeItem("userName");
                        localStorage.removeItem("userEmail");

                        window.location.replace("/login");
                    }}
                >
                    🚪 Logout
                </div>

            </div>
            {/* ========================= */}
            {/* Main Content */}
            {/* ========================= */}

            <div
                style={{
                    flex: 1,

                    padding: "40px"
                }}
            >

                {/* Header */}

                <h1
                    style={{
                        fontSize: "40px",

                        marginBottom: "10px"
                    }}
                >
                    AI Mock Interview 🚀
                </h1>

                <p
                    style={{
                        color: "#64748b",

                        marginBottom: "35px"
                    }}
                >
                    Practice • Improve • Succeed
                </p>


                {/* ========================= */}
                {/* Top Cards */}
                {/* ========================= */}

                <div
                    style={{
                        display: "grid",

                        gridTemplateColumns:
                            "repeat(4,1fr)",

                        gap: "20px"
                    }}
                >

                    <Card
                        title="Total Interviews"
                        value={totalInterviews}
                        color="#dbeafe"
                    />

                    <Card
                        title="Average Score"
                        value={`${averageScore}%`}
                        color="#dcfce7"
                    />

                    <Card
                        title="Skills Improved"
                        value={skillData.length}
                        color="#fef3c7"
                    />

                    <Card
                        title="Total Time Spent"
                        value={timeSpent}
                        color="#ede9fe"
                    />

                </div>


                {/* ========================= */}
                {/* Start Interview */}
                {/* ========================= */}

                <div
                    style={{
                        background: "white",

                        marginTop: "35px",

                        padding: "30px",

                        borderRadius: "24px",

                        boxShadow:
                            "0 4px 15px rgba(0,0,0,0.06)"
                    }}
                >
                    <h2>
                        Start New Interview
                    </h2>

                    <div
                        style={{
                            marginTop: "20px",
                            display: "flex",
                            gap: "15px",
                            flexWrap: "wrap"
                        }}
                    >

                        {/* Role */}
                        <select

                            value={role}

                            onChange={(e) =>
                                setRole(
                                    e.target.value
                                )
                            }

                            style={selectStyle}
                        >

                            <option>
                                Software Engineer
                            </option>

                            <option>
                                Frontend Developer
                            </option>

                            <option>
                                Backend Developer
                            </option>

                            <option>
                                AI Engineer
                            </option>

                        </select>


                        {/* Difficulty */}
                        <select

                            value={difficulty}

                            onChange={(e) =>
                                setDifficulty(
                                    e.target.value
                                )
                            }

                            style={selectStyle}
                        >

                            <option>
                                Beginner
                            </option>

                            <option>
                                Medium
                            </option>

                            <option>
                                Advanced
                            </option>

                        </select>


                        {/* Company */}
                        <select

                            value={company}

                            onChange={(e) =>
                                setCompany(
                                    e.target.value
                                )
                            }

                            style={selectStyle}
                        >

                            <option value="TCS">
                                TCS
                            </option>

                            <option value="Infosys">
                                Infosys
                            </option>

                            <option value="Wipro">
                                Wipro
                            </option>

                            <option value="Accenture">
                                Accenture
                            </option>

                            <option value="Capgemini">
                                Capgemini
                            </option>

                        </select>

                    </div>


                    {/* SAME SIZE BUTTON */}

                    <button

                        onClick={() => {

                            localStorage.setItem(
                                "role",
                                role
                            );

                            localStorage.setItem(
                                "company",
                                company
                            );
                            navigate("/resume");
                        }}

                        style={mainButtonStyle}
                    >
                        Start Interview
                    </button>

                </div>


                {/* ========================= */}
                {/* Lower Dashboard */}
                {/* ========================= */}

                <div
                    style={{
                        display: "grid",

                        gridTemplateColumns:
                            "1.3fr 1fr 1fr",

                        gap: "25px",

                        marginTop: "35px"
                    }}
                >

                    {/* ========================= */}
                    {/* Upcoming Interview */}
                    {/* ========================= */}

                    <div
                        style={{
                            background: "white",

                            borderRadius:
                                "24px",

                            padding: "28px",

                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.06)"
                        }}
                    >

                        <div
                            style={{
                                display: "flex",

                                justifyContent:
                                    "space-between",

                                alignItems:
                                    "center"
                            }}
                        >

                            <h2>
                                Upcoming Interview
                            </h2>

                            <span
                                style={{
                                    background:
                                        "#ede9fe",

                                    color:
                                        "#7c3aed",

                                    padding:
                                        "6px 12px",

                                    borderRadius:
                                        "20px",

                                    fontSize:
                                        "13px",

                                    fontWeight:
                                        "bold"
                                }}
                            >
                                Tomorrow
                            </span>

                        </div>


                        <div
                            style={{
                                marginTop:
                                    "35px"
                            }}
                        >

                            <h1
                                style={{
                                    fontSize:
                                        "30px"
                                }}
                            >
                                {
                                    localStorage.getItem(
                                        "role"
                                    ) || "Software Engineer"
                                }
                            </h1>

                            <p
                                style={{
                                    color:
                                        "#64748b"
                                }}
                            >
                                AI Personalized Preparation
                            </p>


                            <div
                                style={{
                                    display:
                                        "flex",

                                    gap:
                                        "12px",

                                    marginTop:
                                        "25px"
                                }}
                            >

                                <div
                                    style={{
                                        background:
                                            "#f1f5f9",

                                        padding:
                                            "10px 18px",

                                        borderRadius:
                                            "12px"
                                    }}
                                >
                                    ⏱ 45 Min
                                </div>

                                <div
                                    style={{
                                        background:
                                            "#f1f5f9",

                                        padding:
                                            "10px 18px",

                                        borderRadius:
                                            "12px"
                                    }}
                                >
                                    🎯 {difficulty}
                                </div>

                            </div>


                            {/* SAME SIZE BUTTON */}

                            <button

                                onClick={() =>
                                    navigate(
                                        "/preparation"
                                    )
                                }

                                style={mainButtonStyle}
                            >
                                Start Preparation
                            </button>

                        </div>

                    </div>


                    {/* ========================= */}
                    {/* Recent Performance */}
                    {/* ========================= */}

                    <div
                        style={{
                            background: "white",

                            borderRadius:
                                "24px",

                            padding: "24px",

                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.06)"
                        }}
                    >

                        <h2>
                            Recent Performance
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={250}
                        >

                            <LineChart
                                data={
                                    performanceData
                                }
                            >

                                <XAxis
                                    dataKey="name"
                                />

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

                    </div>


                    {/* ========================= */}
                    {/* Top Skill Evaluation */}
                    {/* ========================= */}

                    <div
                        style={{
                            background: "white",

                            borderRadius:
                                "24px",

                            padding: "24px",

                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.06)"
                        }}
                    >

                        <h2>
                            Top Skill Evaluation
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={240}
                        >

                            <PieChart>

                                <Pie
                                    data={skillData}

                                    cx="50%"

                                    cy="50%"

                                    innerRadius={55}

                                    outerRadius={85}

                                    paddingAngle={5}

                                    dataKey="value"
                                >

                                    {skillData.map(
                                        (
                                            entry,
                                            index
                                        ) => (

                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                    index %
                                                    COLORS.length
                                                    ]
                                                }
                                            />

                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>


                        <div
                            style={{
                                marginTop:
                                    "10px"
                            }}
                        >

                            {skillData.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <div
                                        key={index}

                                        style={{
                                            display:
                                                "flex",

                                            alignItems:
                                                "center",

                                            marginBottom:
                                                "10px"
                                        }}
                                    >

                                        <div
                                            style={{
                                                width:
                                                    "12px",

                                                height:
                                                    "12px",

                                                borderRadius:
                                                    "50%",

                                                background:
                                                    COLORS[
                                                    index
                                                    ],

                                                marginRight:
                                                    "10px"
                                            }}
                                        />

                                        <span>
                                            {item.name}
                                            {" "}
                                            -
                                            {" "}
                                            {item.value}%
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div >
    );
}


// =========================
// Card Component
// =========================

function Card({
    title,
    value,
    color
}) {

    return (

        <div
            style={{
                background: color,

                padding: "30px",

                borderRadius: "20px",

                boxShadow:
                    "0px 2px 10px rgba(0,0,0,0.08)"
            }}
        >

            <h3>{title}</h3>

            <h1
                style={{
                    marginTop: "15px",

                    fontSize: "40px"
                }}
            >
                {value}
            </h1>

        </div>
    );
}


// =========================
// Shared Button Style
// =========================

const mainButtonStyle = {

    marginTop: "35px",

    background:
        "#7c3aed",

    color:
        "white",

    border:
        "none",

    padding:
        "10px 18px",

    borderRadius:
        "14px",

    fontSize:
        "14px",

    cursor:
        "pointer",

    fontWeight:
        "bold"
};


// =========================
// Styles
// =========================

const menuStyle = {

    marginTop: "25px",

    cursor: "pointer",

    fontSize: "18px"
};

const selectStyle = {

    padding: "12px",

    borderRadius: "10px",

    border:
        "1px solid #cbd5e1",

    fontSize: "16px"
};

export default Dashboard;