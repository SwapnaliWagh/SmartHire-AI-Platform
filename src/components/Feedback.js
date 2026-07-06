import { useEffect, useState } from "react";

function Feedback() {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        fetch(`http://localhost:5000/api/history/${email}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setFeedbackList(data);
                } else {
                    setFeedbackList([]);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div style={{ padding: "40px", background: "#f1f5f9", minHeight: "100vh" }}>
            <h1>AI Feedback Reports</h1>

            {feedbackList.length === 0 ? (
                <p>No feedback available</p>
            ) : (
                feedbackList.map((feedback, index) => (
                    <div key={index} style={cardStyle}>
                        <h2>Interview {feedbackList.length - index}</h2>
                        <h3>Score: {feedback.score}%</h3>
                        <p><b>Confidence:</b> {feedback.confidence}</p>
                        <p><b>Communication:</b> {feedback.communication}</p>
                        <p><b>Technical:</b> {feedback.technicalDepth}</p>

                        <h3>Weak Areas</h3>
                        <ul>
                            {feedback.weaknesses?.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>

                        <h3>Learning Path</h3>
                        <ul>
                            {feedback.learningPath?.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}

const cardStyle = {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    marginTop: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
};

export default Feedback;