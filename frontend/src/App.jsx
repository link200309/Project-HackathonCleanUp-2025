import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./features/auth/context/AuthContext";
import Home from "./features/home/Home";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ProfileSetupPage from "./features/profile/pages/ProfileSetupPage";
import LearningPage from "./features/learning/pages/LearningPage";
import ChallengePage from "./features/challenges/pages/ChallengePage";
import PublicRoute from "./shared/routes/PublicRoute";
import ProtectedRoute from "./shared/routes/ProtectedRoute";
import ProfileCheckRoute from "./shared/routes/ProfileCheckRoute";
import "./App.css";
import Navbar from "./components/Navbar";
import Learn from "./features/learn/pages/Learn";

function App() {
  return (
    <div className="bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700">
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="/profile-setup"
              element={
                <ProtectedRoute>
                  <ProfileSetupPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game"
              element={
                <ProfileCheckRoute>
                  <LearningPage />
                </ProfileCheckRoute>
              }
            />
            <Route
              path="/challenge/:challengeId"
              element={
                <ProfileCheckRoute>
                  <ChallengePage />
                </ProfileCheckRoute>
              }
            />
            <Route
              path="/learn"
              element={
                <ProfileCheckRoute>
                  <Learn />
                </ProfileCheckRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
