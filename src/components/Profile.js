import { useEffect, useState } from "react";

function Profile() {

    const [history, setHistory] =
        useState([]);

    const name =
        localStorage.getItem(
            "userName"
        );

    const email =
        localStorage.getItem(
            "userEmail"
        );

    useEffect(() => {

        fetch(
            `http://localhost:5000/api/history/${email}`
        )
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

    }, [email]);

    const averageScore =
        history.length > 0
            ? Math.floor(
                history.reduce(
                    (sum, item) =>
                        sum + item.score,
                    0
                ) / history.length
            )
            : 0;

    const bestScore =
        history.length > 0
            ? Math.max(
                ...history.map(
                    (item) => item.score
                )
            )
            : 0;

    return (

        <div
            style={{
                padding: "40px",
                background: "#f1f5f9",
                minHeight: "100vh",
                fontFamily: "Arial"
            }}
        >

            <h1>
                User Profile
            </h1>

            <div
                style={cardStyle}
            >

                <h2>
                    👤 {name}
                </h2>

                <p>
                    📧 {email}
                </p>

                <p>
                    🎤 Total Interviews:
                    {" "}
                    {history.length}
                </p>

                <p>
                    🎯 Average Score:
                    {" "}
                    {averageScore}%
                </p>

                <p>
                    🏆 Best Score:
                    {" "}
                    {bestScore}%
                </p>

            </div>

            <h2
                style={{
                    marginTop: "30px"
                }}
            >
                Recent Interview History
            </h2>

            {
                history.length === 0 ? (

                    <div style={cardStyle}>

                        <p>
                            No interview history available
                        </p>

                    </div>

                ) : (

                    history.map(
                        (
                            item,
                            index
                        ) => (

                            <div
                                key={index}
                                style={cardStyle}
                            >

                                <h3>
                                    Interview {history.length - index}
                                </h3>

                                <p>
                                    Role:
                                    {" "}
                                    {item.role}
                                </p>

                                <p>
                                    Difficulty:
                                    {" "}
                                    {item.difficulty}
                                </p>

                                <p>
                                    Score:
                                    {" "}
                                    {item.score}%
                                </p>

                                <p>
                                    Confidence:
                                    {" "}
                                    {item.confidence}
                                </p>

                                <p>
                                    Communication:
                                    {" "}
                                    {item.communication}
                                </p>

                                <p>
                                    Technical:
                                    {" "}
                                    {item.technicalDepth}
                                </p>

                            </div>
                        )
                    )
                )
            }

        </div>
    );
}

const cardStyle = {

    background: "white",

    padding: "25px",

    borderRadius: "20px",

    marginTop: "20px",

    boxShadow:
        "0 2px 10px rgba(0,0,0,0.08)"
};

export default Profile;