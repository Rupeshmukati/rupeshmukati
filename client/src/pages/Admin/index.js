import { useEffect, useState } from "react";
import { Tabs, Button, Popconfirm } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../Home/Footer";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminCourses from "./AdminCourse";
import AdminContact from "./AdminContact";
import AdminSocialurl from "./AdminSocialurl";

import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import AdminHeader from "../../components/AdminHeader";

function Admin() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const firstName = portfolioData?.intro?.firstName;
  const lastName = portfolioData?.intro?.lastName;

  const [tabPlacement, setTabPlacement] = useState("left");

  const items = [
    { key: "1", label: "Introduction", children: <AdminIntro /> },
    { key: "2", label: "About", children: <AdminAbout /> },
    { key: "3", label: "Experiences", children: <AdminExperiences /> },
    { key: "4", label: "Projects", children: <AdminProjects /> },
    { key: "5", label: "Courses", children: <AdminCourses /> },
    { key: "6", label: "Contacts", children: <AdminContact /> },
    { key: "7", label: "Social Urls", children: <AdminSocialurl /> },
  ];

  // 🔓 LOGOUT (sirf yahin se admin-login allowed)
  const logout = () => {
    dispatch(ShowLoading());
    localStorage.removeItem("token");
    dispatch(HideLoading());
    window.location.replace("/admin-login"); // ⬅️ IMPORTANT
  };

  // 🔐 Token check
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.replace("/admin-login");
    }
  }, []);

  // 🚫 Back button + admin-login URL block
  useEffect(() => {
    const blockNavigation = () => {
      // Agar admin-login jane ki koshish kare
      if (window.location.pathname === "/admin-login") {
        window.history.pushState(null, "", "/admin");
      }
    };

    // Initial lock
    window.history.pushState(null, "", "/admin");

    window.addEventListener("popstate", blockNavigation);

    return () => {
      window.removeEventListener("popstate", blockNavigation);
    };
  }, []);

  // 📱 Responsive tabs
  useEffect(() => {
    const handleResize = () => {
      setTabPlacement(window.innerWidth < 768 ? "top" : "left");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      <AdminHeader />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 w-full pr-4">
            <h1 className="text-lg sm:text-2xl font-semibold text-secondary mb-0">
              Admin Portfolio
            </h1>
            <div className="flex-1 h-[1px] bg-tertiary opacity-80 max-w-[100px] sm:max-w-[225px]"></div>
          </div>

          <Popconfirm
            title="Are you sure you want to logout?"
            onConfirm={logout}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<LogoutOutlined />}>
              Logout
            </Button>
          </Popconfirm>
        </div>

        {portfolioData && (
          <div className="bg-white rounded-2xl py-6 sm:pr-6 sm:pl-0 shadow">
            <Tabs
              defaultActiveKey="1"
              tabPlacement={tabPlacement}
              items={items}
            />
          </div>
        )}
      </div>

      <Footer firstName={firstName} lastName={lastName} />
    </div>
  );
}

export default Admin;
