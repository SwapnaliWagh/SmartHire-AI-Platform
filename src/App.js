import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ResumeUpload from "./components/ResumeUpload";
import Interview from "./components/Interview";
import Performance from "./components/Performance";
import Feedback from "./components/Feedback";
import Profile from "./components/Profile";
import Preparation from "./components/Preparation";
import InterviewSections from "./components/InterviewSections";
import Leaderboard from "./components/Leaderboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/resume" element={<ResumeUpload />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/preparation" element={<Preparation />} />
        <Route path="/interview-sections" element={<InterviewSections />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;