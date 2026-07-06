import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResumeUpload() {

    const [file, setFile] = useState(null);

    const [level, setLevel] = useState("Beginner");

    const [resumeInfo, setResumeInfo] =
        useState(null);

    const navigate = useNavigate();


    const handleFileChange = (e) => {

        setFile(e.target.files[0]);
    };


    const handleUpload = async () => {

        if (!file) {

            alert("Please select a resume first");

            return;
        }

        const formData = new FormData();

        formData.append("resume", file);

        try {

            const res = await fetch(
                "http://localhost:5000/api/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            console.log("Resume Data:", data);
            setResumeInfo(data);

            localStorage.setItem(
                "resumeData",
                JSON.stringify(data)
            );

            localStorage.setItem(
                "level",
                level
            );

            alert("Resume uploaded successfully!");

        } catch (error) {

            console.error(error);

            alert("Upload failed");
        }
    };


    return (

        <div
            style={{
                minHeight: "100vh",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                background:
                    "linear-gradient(135deg, #0f172a, #1e293b)",

                fontFamily: "Arial"
            }}
        >

            <div
                style={{

                    width: "420px",

                    padding: "40px",

                    borderRadius: "20px",

                    background:
                        "rgba(255,255,255,0.08)",

                    backdropFilter: "blur(10px)",

                    boxShadow:
                        "0px 8px 30px rgba(0,0,0,0.3)",

                    textAlign: "center",

                    color: "white"
                }}
            >

                <h1
                    style={{
                        marginBottom: "10px",
                        fontSize: "36px"
                    }}
                >
                    SmartHire 🚀
                </h1>

                <p
                    style={{
                        color: "#cbd5e1",
                        marginBottom: "35px"
                    }}
                >
                    AI Powered Mock Interview Platform
                </p>


                {/* Upload */}

                <div
                    style={{
                        marginBottom: "25px"
                    }}
                >

                    <h2
                        style={{
                            marginBottom: "15px"
                        }}
                    >
                        Upload Resume
                    </h2>

                    <input
                        type="file"

                        onChange={handleFileChange}

                        style={{
                            color: "white"
                        }}
                    />

                </div>


                {/* Difficulty */}

                <div
                    style={{
                        marginBottom: "30px"
                    }}
                >

                    <h3
                        style={{
                            marginBottom: "10px"
                        }}
                    >
                        Select Difficulty
                    </h3>

                    <select

                        value={level}

                        onChange={(e) =>
                            setLevel(e.target.value)
                        }

                        style={{

                            padding: "10px",

                            width: "220px",

                            borderRadius: "10px",

                            border: "none",

                            fontSize: "16px"
                        }}
                    >

                        <option value="Beginner">
                            Beginner
                        </option>

                        <option value="Intermediate">
                            Intermediate
                        </option>

                        <option value="Advanced">
                            Advanced
                        </option>

                    </select>

                </div>


                {/* Upload Button */}

                <button

                    onClick={handleUpload}

                    style={{

                        background:
                            "linear-gradient(90deg,#2563eb,#7c3aed)",

                        color: "white",

                        border: "none",

                        padding: "14px 28px",

                        borderRadius: "12px",

                        fontSize: "16px",

                        cursor: "pointer",

                        width: "100%",

                        marginBottom: "20px",

                        fontWeight: "bold"
                    }}
                >
                    Upload Resume
                </button>

                {
                    resumeInfo && (

                        <div
                            style={{
                                background:
                                    "rgba(255,255,255,0.1)",

                                padding: "20px",

                                borderRadius: "14px",

                                marginBottom: "20px",

                                textAlign: "left"
                            }}
                        >

                            <h3
                                style={{
                                    marginBottom: "15px"
                                }}
                            >
                                Resume Analysis
                            </h3>

                            <p>
                                <b>File:</b>
                                {" "}
                                {file?.name}
                            </p>

                            <p>
                                <b>Skills:</b>
                                {" "}
                                {
                                    resumeInfo.skills?.join(", ")
                                }
                            </p>

                            <p>
                                <b>ATS Score:</b>
                                {" "}
                                {resumeInfo.atsScore}%
                            </p>

                            <p>
                                <b>Skill Gap:</b>
                                {" "}
                                {
                                    resumeInfo.missingSkills?.join(", ")
                                }
                            </p>

                            <p>
                                <b>Recommended Role:</b>
                                {" "}
                                {
                                    resumeInfo.skills?.includes("React")
                                        ? "Frontend Developer"
                                        : "Software Engineer"
                                }
                            </p>

                            <p>
                                <b>Level:</b>
                                {" "}
                                {level}
                            </p>

                        </div>
                    )
                }


                {/* Start Interview */}

                <button

                    onClick={() =>
                        navigate("/interview-sections")
                    }

                    style={{

                        background:
                            "linear-gradient(90deg,#16a34a,#22c55e)",

                        color: "white",

                        border: "none",

                        padding: "14px 28px",

                        borderRadius: "12px",

                        fontSize: "16px",

                        cursor: "pointer",

                        width: "100%",

                        fontWeight: "bold"
                    }}
                >
                    Start Interview
                </button>

            </div>

        </div>
    );
}

export default ResumeUpload;