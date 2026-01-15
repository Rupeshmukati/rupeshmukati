import React from "react";
import { Button, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      const response = await axios.post("/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData?.contact?._id,
      });

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={portfolioData?.contact}
    >
      <Form.Item
        label="Full Name"
        name="name"
        rules={[{ required: true, message: "Please enter full name" }]}
      >
        <Input placeholder="Full Name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        label="Mobile Number"
        name="mobile"
        rules={[{ required: true, message: "Please enter mobile number" }]}
      >
        <Input placeholder="Mobile Number" />
      </Form.Item>

      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: "Please enter country" }]}
      >
        <Input placeholder="Country" />
      </Form.Item>

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit">
          SAVE
        </Button>
      </div>
    </Form>
  );
}

export default AdminContact;
