import React from "react";
import { Button, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";

const { TextArea } = Input;

function AdminIntro() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      const response = await axios.post("/api/portfolio/update-intro", {
        ...values,
        _id: portfolioData?.intro?._id,
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
      initialValues={portfolioData?.intro}
    >
      <Form.Item
        label="Welcome Text"
        name="welcomeText"
        rules={[{ required: true, message: "Please Enter Introduction" }]}
      >
        <Input placeholder="Welcome Text" />
      </Form.Item>

      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please Enter First Name" }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please Enter Last Name" }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        label="Caption"
        name="caption"
        rules={[{ required: true, message: "Please Enter Caption" }]}
      >
        <Input placeholder="Caption" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please Enter Description" }]}
      >
        <TextArea rows={4} placeholder="Description" />
      </Form.Item>

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit">
          SAVE
        </Button>
      </div>
    </Form>
  );
}

export default AdminIntro;
