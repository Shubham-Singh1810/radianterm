import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import EmployeeLayout from "./layouts/EmployeeLayout";
import { useState } from "react";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
function App() {
  const [user, setUser]=useState(null)
  return (
    <>
      {user ? (
        <div className="d-flex">
          <Sidebar />
          <div style={{ width: "80%" }}>
            <Navbar />
            <SuperAdminLayout />
          </div>
        </div>
      ) : (
        <Login setUser={setUser}/>
      )}
    </>
  );
}

export default App;
