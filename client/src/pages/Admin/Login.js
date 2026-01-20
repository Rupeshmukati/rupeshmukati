import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";

function Login() {
  const dispatch = useDispatch();

  // 🔐 BLOCK admin-login if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.replace("/admin"); // ⬅️ IMPORTANT
    }
  }, []);

  const login = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/portfolio/admin-login",
        values
      );
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);

        // ✅ Token save
        localStorage.setItem("token", JSON.stringify(response.data));

        // ✅ Redirect without history
        window.location.replace("/admin");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="w-full max-w-md bg-white/95 p-6 rounded-lg shadow-lg border border-gray-700 m-5">
        <h1 className="text-2xl font-semibold text-center">
          Portfolio - Admin Login
        </h1>

        <div className="h-[1px] bg-gray-600 my-4"></div>

        <Form layout="vertical" onFinish={login}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input placeholder="Enter Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full mt-2">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
