import React from "react";
import { Button, Form, Input, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";

const { TextArea } = Input;

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      const response = await axios.post("/api/portfolio/update-about", {
        ...values, // skills already array
        _id: portfolioData?.about?._id,
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
      initialValues={portfolioData?.about}
    >
      {/* Lottie URL */}
      <Form.Item
        label="Lottie URL"
        name="lottieURL"
        rules={[{ required: true, message: "Please Enter URL" }]}
      >
        <Input placeholder="Lottie URL" />
      </Form.Item>

      {/* Description 1 */}
      <Form.Item
        label="Description 1"
        name="description1"
        rules={[{ required: true, message: "Please Add Description 1" }]}
      >
        <TextArea rows={4} placeholder="Description 1" />
      </Form.Item>

      {/* Description 2 */}
      <Form.Item
        label="Description 2"
        name="description2"
        rules={[{ required: true, message: "Please Add Description 2" }]}
      >
        <TextArea rows={4} placeholder="Description 2" />
      </Form.Item>

      {/* Skills */}
      <Form.Item
        label="Skills"
        name="skills"
        rules={[{ required: true, message: "Please add at least one skill" }]}
      >
        <Select
          mode="tags"
          placeholder="Type skill and press Enter"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit">
          SAVE
        </Button>
      </div>
    </Form>
  );
}

export default AdminAbout;
