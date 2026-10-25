import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; 

const AdminHome = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">

      <Sidebar />


      <main className="flex-1 p-6 overflow-y-auto w-full">
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminHome;