import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import App from "./App.jsx"
import Signin from "./auth/Signin.jsx"
import Signup from "./auth/Signup.jsx"
import Home from "./components/Home.jsx"
import ProtectedRoute from "./context/AuthContext.jsx"
import "./index.css"

export default function FinanceFlowMain() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes: App handles all internal routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
}

// Render
createRoot(document.getElementById("root")).render(<FinanceFlowMain />)
