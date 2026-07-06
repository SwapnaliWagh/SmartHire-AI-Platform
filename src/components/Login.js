import React, {
    useState
} from "react";

import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [isRegister,
        setIsRegister] =
        useState(false);

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");


    // =========================
    // Register
    // =========================

    const handleRegister = () => {

        if (
            !name ||
            !email ||
            !password
        ) {

            alert(
                "Please fill all fields"
            );

            return;
        }

        // Save user

        const user = {

            name,
            email,
            password
        };

        localStorage.setItem(
            "smartHireUser",
            JSON.stringify(user)
        );

        alert(
            "Registration Successful ✅"
        );

        setIsRegister(false);
    };


    // =========================
    // Login
    // =========================

    const handleLogin = () => {

        const storedUser =
            JSON.parse(
                localStorage.getItem(
                    "smartHireUser"
                )
            );

        if (!storedUser) {

            alert(
                "No account found. Please Register."
            );

            return;
        }

        if (
            email === storedUser.email &&
            password === storedUser.password
        ) {

            localStorage.setItem(
                "userName",
                storedUser.name
            );

            localStorage.setItem(
                "userEmail",
                storedUser.email
            );

            navigate("/dashboard");

        } else {

            alert(
                "Invalid Email or Password"
            );
        }
    };


    return (

        <div
            style={{
                height: "100vh",

                display: "flex",

                justifyContent:
                    "center",

                alignItems:
                    "center",

                background:
                    "linear-gradient(135deg,#0f172a,#1e293b)",

                fontFamily:
                    "Arial"
            }}
        >

            <div
                style={{
                    width: "420px",

                    background:
                        "rgba(255,255,255,0.08)",

                    padding: "40px",

                    borderRadius:
                        "25px",

                    backdropFilter:
                        "blur(12px)",

                    color: "white",

                    boxShadow:
                        "0px 4px 20px rgba(0,0,0,0.3)"
                }}
            >

                <h1
                    style={{
                        textAlign: "center"
                    }}
                >
                    SmartHire 🚀
                </h1>

                <p
                    style={{
                        textAlign: "center",

                        color: "#cbd5e1"
                    }}
                >
                    AI Mock Interview Platform
                </p>


                {/* Register Name */}

                {isRegister && (

                    <input

                        type="text"

                        placeholder="Full Name"

                        value={name}

                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }

                        style={inputStyle}
                    />

                )}


                {/* Email */}

                <input

                    type="email"

                    placeholder="Email Address"

                    value={email}

                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }

                    style={inputStyle}
                />


                {/* Password */}

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }

                    style={inputStyle}
                />


                {/* Buttons */}

                {isRegister ? (

                    <button

                        onClick={
                            handleRegister
                        }

                        style={buttonStyle}
                    >
                        Register
                    </button>

                ) : (

                    <button

                        onClick={
                            handleLogin
                        }

                        style={buttonStyle}
                    >
                        Login
                    </button>

                )}


                {/* Toggle */}

                <p
                    style={{
                        textAlign: "center",

                        marginTop: "20px",

                        color: "#cbd5e1"
                    }}
                >

                    {isRegister
                        ? "Already have an account?"
                        : "Don't have an account?"}

                    <span

                        onClick={() =>
                            setIsRegister(
                                !isRegister
                            )
                        }

                        style={{
                            color: "#a78bfa",

                            cursor: "pointer",

                            marginLeft: "8px",

                            fontWeight:
                                "bold"
                        }}
                    >

                        {isRegister
                            ? "Login"
                            : "Register"}

                    </span>

                </p>

            </div>

        </div>
    );
}


// =========================
// Styles
// =========================

const inputStyle = {

    width: "100%",

    padding: "15px",

    marginTop: "20px",

    borderRadius: "12px",

    border: "none",

    outline: "none",

    fontSize: "16px",

    background:
        "rgba(255,255,255,0.12)",

    color: "white"
};

const buttonStyle = {

    width: "100%",

    padding: "15px",

    marginTop: "30px",

    background: "#7c3aed",

    color: "white",

    border: "none",

    borderRadius: "12px",

    fontSize: "18px",

    cursor: "pointer",

    fontWeight: "bold"
};

export default Login;