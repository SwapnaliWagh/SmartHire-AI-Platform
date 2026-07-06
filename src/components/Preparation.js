import React from "react";

function Preparation() {

    const resumeData =
        JSON.parse(
            localStorage.getItem(
                "resumeData"
            )
        );

    const role =
        localStorage.getItem(
            "role"
        );

    const difficulty =
        localStorage.getItem(
            "difficulty"
        );

    const skills =
        resumeData?.skills || [];


    return (

        <div
            style={{
                minHeight:
                    "100vh",

                background:
                    "#f1f5f9",

                padding:
                    "40px",

                fontFamily:
                    "Arial"
            }}
        >

            <h1>
                AI Interview Preparation 🚀
            </h1>

            <p
                style={{
                    color:
                        "#64748b"
                }}
            >
                Personalized preparation based on your resume
            </p>


            {/* Role */}

            <div style={cardStyle}>

                <h2>
                    Upcoming Interview
                </h2>

                <h1
                    style={{
                        color:
                            "#7c3aed"
                    }}
                >
                    {role}
                </h1>

                <p>
                    Difficulty:
                    {" "}
                    {difficulty}
                </p>

            </div>


            {/* Skills */}

            <div style={cardStyle}>

                <h2>
                    Resume Skills
                </h2>

                <div
                    style={{
                        display:
                            "flex",

                        flexWrap:
                            "wrap",

                        gap:
                            "12px",

                        marginTop:
                            "20px"
                    }}
                >

                    {skills.map(
                        (
                            skill,
                            index
                        ) => (

                            <div
                                key={index}

                                style={{
                                    background:
                                        "#ede9fe",

                                    color:
                                        "#7c3aed",

                                    padding:
                                        "10px 18px",

                                    borderRadius:
                                        "30px",

                                    fontWeight:
                                        "bold"
                                }}
                            >
                                {skill}
                            </div>

                        )
                    )}

                </div>

            </div>


            {/* AI Preparation */}

            <div style={cardStyle}>

                <h2>
                    AI Preparation Roadmap
                </h2>

                <ul
                    style={{
                        marginTop:
                            "20px",

                        lineHeight:
                            "2"
                    }}
                >

                    <li>
                        Revise core concepts of your skills
                    </li>

                    <li>
                        Practice coding & DSA questions
                    </li>

                    <li>
                        Improve communication confidence
                    </li>

                    <li>
                        Practice HR interview questions
                    </li>

                    <li>
                        Prepare project explanations
                    </li>

                </ul>

            </div>


            {/* Practice Questions */}

            <div style={cardStyle}>

                <h2>
                    Important Practice Questions
                </h2>

                <ul
                    style={{
                        marginTop:
                            "20px",

                        lineHeight:
                            "2"
                    }}
                >

                    <li>
                        Explain your recent project.
                    </li>

                    <li>
                        What challenges did you face?
                    </li>

                    <li>
                        Explain React lifecycle.
                    </li>

                    <li>
                        Difference between API and REST API.
                    </li>

                    <li>
                        Tell me about yourself.
                    </li>

                </ul>

            </div>

        </div>
    );
}


const cardStyle = {

    background:
        "white",

    padding:
        "30px",

    borderRadius:
        "24px",

    marginTop:
        "30px",

    boxShadow:
        "0 4px 15px rgba(0,0,0,0.06)"
};

export default Preparation;