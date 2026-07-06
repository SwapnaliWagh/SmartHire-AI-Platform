import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const email =
        localStorage.getItem(
            "userEmail"
        );

    if (!email) {

        return (
            <Navigate
                to="/login"
            />
        );
    }

    return children;
}

export default ProtectedRoute;