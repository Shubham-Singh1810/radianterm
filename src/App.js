import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="d-flex">
      <Sidebar/>
      <div style={{width:"84%"}}>

      <Navbar/>
      <Dashboard/>
      </div>
    </div>
  );
}

export default App;
