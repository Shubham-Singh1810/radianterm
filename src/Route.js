import React from "react";
import Login from "./pages/Login";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import AdminLayout from "./layouts/AdminLayout";
import SupervisorLayout from "./layouts/SupervisorLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import { useGlobalState } from "./GlobalProvider";

function Route() {
  const { globalState } = useGlobalState();
  const renderLayout = () => {
    switch (globalState?.user?.role) {
      case "1":
        return <SuperAdminLayout />;
      case "2":
        return <AdminLayout />;
      case "3":
        return <SupervisorLayout />;
      case "4":
        return <EmployeeLayout />;
      default:
        return <Login />;
    }
  };

  return <div>{renderLayout()}</div>;
}

export default Route;
