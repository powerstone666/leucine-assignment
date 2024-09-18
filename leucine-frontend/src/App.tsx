import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./authContext";
import Admin from "./Admin/admin";
import Navbar from "./navbar";
import Signin from "./registration/signin";
import Signup from "./registration/signup";
import Student from "./Student/student";
import Faculty from "./Faculty/faculty";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/student" element={<Student />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
