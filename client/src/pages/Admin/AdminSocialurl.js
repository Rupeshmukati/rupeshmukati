import { Button, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";


function AdminSocialurl() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      const response = await axios.post("/api/portfolio/update-socialurl", {
        ...values,
        _id: portfolioData?.socialurl?._id,
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
      initialValues={portfolioData?.socialurl}
    >
      <Form.Item
        label="WhatsApp"
        name="whatsapp"
        rules={[{ message: "Please Enter WhatsApp Link" }]}
      >
        <Input placeholder="WhatsApp Link" />
      </Form.Item>

      <Form.Item
        label="Instagram"
        name="instagram"
        rules={[{ message: "Please Enter Instagram Link" }]}
      >
        <Input placeholder="Instagram Link" />
      </Form.Item>

      <Form.Item
        label="Linkedin"
        name="linkedin"
        rules={[{ message: "Please Enter Linkedin Link" }]}
      >
        <Input placeholder="Linkedin Link" />
      </Form.Item>

      <Form.Item
        label="Email Id"
        name="emailid"
        rules={[{ message: "Please Enter Email" }]}
      >
        <Input placeholder="Email Id" />
      </Form.Item>

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit">
          SAVE
        </Button>
      </div>
    </Form>
  );
}

export default AdminSocialurl;
