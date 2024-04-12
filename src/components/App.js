import React from "react";
import Signup from './Signup.js'; // Assuming Signup component
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.js"; // Assuming Dashboard component
import Login from "./Login.js";
import { PrivateRouter } from './PrivateRouter';
import ForgotPassword from "./ForgotPassword.js";
import ImageCapture from "./ImageCapture.js";

function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <Routes>
              <Route path="/" element={<PrivateRouter />} >  
                <Route index element={<Dashboard />} />
              </Route>
              <Route path="/signup" element={<Signup />} /> 
              <Route path="/login" element={<Login />} /> {/* Login route */}
              <Route path="forgot-password" element = {<ForgotPassword/>}/>
              <Route path="image-capture" element = {<ImageCapture/>}/>
            </Routes>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;