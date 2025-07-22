import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Footer } from "antd/es/layout/layout";
import RightSidebar from "./RightSidebar";


export default function AdminLayout() {
  return (

    <div>
     <Header />
     <Sidebar />
      <Outlet />
      <RightSidebar />
      <Footer />
    </div>
  );
 
}
