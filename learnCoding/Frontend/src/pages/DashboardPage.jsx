import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import '../App.css'
import Sidebar from "../components/Profile/Sidebar";

const DashboardPage = () => {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex-col sm:flex-row flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="sm:h-[calc(100vh-3.5rem)] h-[50vh] sm:order-[0] order-1 flex-1 overflow-auto">
        <div className="mx-auto w-11/12  h-[500px] max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
