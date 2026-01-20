import React from "react";
import { Button, Form, Input, message, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function AdminIntro() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();

      // Database ID provide karein
      formData.append("_id", portfolioData.intro._id);
      formData.append("welcomeText", values.welcomeText);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("caption", values.caption);
      formData.append("description", values.description);

      // AdminIntro.js ke onFinish ke andar ye logic check karein
      if (values.image && values.image.length > 0) {
        // Agar nayi file select hui hai
        if (values.image[0].originFileObj) {
          formData.append("image", values.image[0].originFileObj);
        } else {
          // Purani image ka naam hi bhej rahe hain
          formData.append("image", values.image[0].name);
        }
      } else {
        // User ne delete button dabaya hai
        formData.append("image", "");
      }

      const response = await axios.post(
        "/api/portfolio/update-intro",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      dispatch(HideLoading());
    }
  };

  // Ant Design Error fix: image field ko array mein convert karna
  const formattedInitialValues = {
    ...portfolioData?.intro,
    image: portfolioData?.intro?.image
      ? [
          {
            uid: "-1",
            name: portfolioData.intro.image,
            status: "done",
            url: `http://localhost:5000/uploads/${portfolioData.intro.image}`,
          },
        ]
      : [],
  };

  return (
    <div className="p-5">
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={formattedInitialValues}
      >
        <Form.Item
          label="Profile Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Change Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Welcome Text"
          name="welcomeText"
          rules={[{ required: true }]}
        >
          <Input placeholder="Welcome Text" />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item label="Caption" name="caption" rules={[{ required: true }]}>
          <Input placeholder="Caption" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit">
            SAVE
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AdminIntro;
