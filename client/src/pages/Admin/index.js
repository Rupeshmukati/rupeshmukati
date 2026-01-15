import { useEffect, useState } from "react";
import { Tabs, Button, Popconfirm } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header";
import Footer from "../Home/Footer";

import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminCourses from "./AdminCourse";
import AdminContact from "./AdminContact";

import { ShowLoading, HideLoading } from "../../redux/rootSlice";

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
  ];

  const logout = () => {
    dispatch(ShowLoading());
    localStorage.removeItem("token");
    dispatch(HideLoading());
    window.location.href = "/admin-login";
  };

  useEffect(() => {
    const handleResize = () => {
      setTabPlacement(window.innerWidth < 768 ? "top" : "left");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      <Header />

      {/* Admin Content Wrapper */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Admin Title Row */}
        <div className="flex items-center justify-between mb-6">
          {/* Left */}
          <div className="flex items-center gap-4 w-full pr-4">
            <h1 className="text-lg sm:text-2xl font-semibold text-secondary whitespace-nowrap mb-0">
              Admin Portfolio
            </h1>
            <div className="flex-1 h-[1px] bg-tertiary opacity-80 max-w-[200px]"></div>
          </div>

          {/* Right */}
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

        {/* Admin Tabs Card */}
        {portfolioData && (
          <div className="bg-white/95 rounded-2xl border border-gray-200 shadow-md p-4 sm:p-6">
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
