import { useEffect, useState } from "react";

function Leaderboard() {

    const [history, setHistory] =
        useState([]);

    useEffect(() => {

        fetch(
            "http://localhost:5000/api/history/leaderboard"
        )
            .then((res) => res.json())

            .then((data) => {

                console.log(data);

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
                🏆 Leaderboard
            </h1>

            <p
                style={{
                    color: "#64748b"
                }}
            >
                Top Interview Performers
            </p>

            {
                history.length === 0 ? (

                    <div
                        style={cardStyle}
                    >

                        <h2>
                            No leaderboard data available
                        </h2>

                        <p>
                            Complete interviews to appear here.
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

                                <h2>
                                    #{index + 1}
                                    {" "}
                                    {item.userEmail}
                                </h2>

                                <p>
                                    🎯 Score:
                                    {" "}
                                    {item.score}%
                                </p>

                                <p>
                                    🎤 Confidence:
                                    {" "}
                                    {item.confidence}
                                </p>

                                <p>
                                    💬 Communication:
                                    {" "}
                                    {item.communication}
                                </p>

                                <p>
                                    💻 Technical:
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

export default Leaderboard;