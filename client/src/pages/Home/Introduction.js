import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useDispatch add kiya
import { Form, Input, Button, Modal, message } from "antd";
import axios from "axios"; // axios import kiya
import { ShowLoading, HideLoading } from "../../redux/rootSlice"; // Loading states ke liye

function Introduction() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { firstName, lastName, welcomeText, description, caption, image } = intro;
  const [open, setOpen] = useState(false);

  // Enquiry submit karne ka naya function
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      // Backend API call jo humne portfolioRoute.js mein banayi hai
      const response = await axios.post("/api/portfolio/add-enquiry", values);

      if (response.data.success) {
        message.success(response.data.message);
        setOpen(false); // Modal close karein
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Something went wrong while submitting enquiry");
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="bg-primary sm:py-20 pt-6 pb-10 sm:px-0 intro_section grid grid-cols-1 md:grid-cols-[60%_40%] gap-8 md:gap-0">
        <div className="flex flex-col gap-3 md:gap-6 sm:gap-4 justify-center md:items-start items-center order-2 md:order-1 md:text-left text-center">
          <h1 className="text-white text-sm sm:text-base mb-0">
            {welcomeText || ""}
          </h1>

          <h2 className="font-semibold text-secondary text-3xl md:text-4xl lg:text-5xl mb-0">
            {firstName || ""} {lastName || ""}
          </h2>

          <h2 className="font-semibold text-white text-3xl md:text-4xl lg:text-5xl mb-0">
            {caption || ""}
          </h2>

          <p className="text-white max-w-[900px] text-sm sm:text-base leading-relaxed mb-0">
            {description || ""}
          </p>

          <button
            onClick={() => setOpen(true)}
            className="hover:bg-secondary border border-tertiary text-tertiary px-6 sm:px-10 py-2 sm:py-3 rounded-md text-sm sm:text-base"
          >
            Contact Me
          </button>
        </div>

        {/* 👉 RIGHT: Image */}
        <div className="relative flex justify-center order-1 md:order-2">
          <div className="relative z-10">
            <img
              // Image handling logic as discussed
              src={image ? `/uploads/${image}` : "/rupesh-profile.png"}
              alt="Profile"
              className="w-[220px] md:w-[280px] lg:w-[300px] rounded-full object-cover border-4 border-white/10 z-50"
            />
          </div>
        </div>
      </div>

      {/* FIXED MODAL: Ab ye direct Database mein data save karega */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        title="Project Enquiry"
      >
        <Form
          layout="vertical"
          onFinish={onFinish} // Updated function call
        >
          <Form.Item
            label="Your Name"
            name="name"
            rules={[{ required: true, message: "Please Enter Your Name" }]}
          >
            <Input placeholder="Enter Your Name" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Please Enter Your Email" },
              { type: "email", message: "Enter a Valid Email" },
            ]}
          >
            <Input placeholder="Enter Your Email" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Please Enter Your Phone" }]}
          >
            <Input placeholder="Enter your mobile number" />
          </Form.Item>

          <Form.Item
            label="Project Details"
            name="projectDetails" // Database schema se match karne ke liye change kiya
            rules={[
              { required: true, message: "Please Describe Your Project" },
            ]}
          >
            <Input.TextArea rows={3} placeholder="Tell Us About Your Project" />
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Button type="primary" htmlType="submit" className="bg-primary">
              Send Enquiry
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
}

export default Introduction;
