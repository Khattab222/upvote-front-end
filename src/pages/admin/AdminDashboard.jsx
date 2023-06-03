import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin.css";

const AdminDashboard = () => {
 
  return (
    <section 
  
    className="admin-dashboard">
      <AdminSidebar />
      <div className="w-75 mx-auto">

      <Outlet/>
      </div>
    </section>
  );
};

export default AdminDashboard;
