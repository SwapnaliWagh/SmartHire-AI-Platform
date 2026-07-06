import React, { useState } from "react";
import axios from "axios";
import "../Auth.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );

            alert(res.data.message);

            navigate("/");

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="container">

            <div className="card">

                <h2>Create Account</h2>

                <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="button" onClick={handleRegister}>
                    Register
                </button>

                <p style={{ marginTop: "15px" }}>

                    Already have an account?

                    <Link to="/">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;