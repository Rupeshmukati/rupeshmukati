import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Modal, message } from "antd";
import axios from "axios";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";

function Introduction() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData || {};
  const { firstName, lastName, welcomeText, description, caption, image } =  intro || {};
  const [open, setOpen] = useState(false);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/add-enquiry", values);

      if (response.data.success) {
        message.success(response.data.message);
        setOpen(false);
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
    <section
      className="relative bg-primary overflow-hidden"
      aria-label="Introduction Section"
    >
      <div className="bg-primary sm:py-20 pt-6 pb-10 sm:px-0 intro_section grid grid-cols-1 md:grid-cols-[60%_40%] gap-5 md:gap-0">
        {/* LEFT: Text content */}
        <div className="flex flex-col gap-3 md:gap-6 sm:gap-4 justify-center md:items-start items-center order-2 md:order-1 md:text-left text-center">
          {welcomeText && (
            <p className="text-white text-sm sm:text-base mb-0">
              {welcomeText}
            </p>
          )}

          {(firstName || lastName) && (
            <h1 className="font-semibold text-secondary text-3xl md:text-4xl lg:text-5xl mb-0">
              {firstName} {lastName}
            </h1>
          )}

          {caption && (
            <h2 className="font-semibold text-white text-3xl md:text-4xl lg:text-5xl mb-0">
              {caption}
            </h2>
          )}

          {description && (
            <p className="text-white max-w-[900px] text-sm sm:text-base leading-relaxed mb-0">
              {description}
            </p>
          )}

          <button
            onClick={() => setOpen(true)}
            className="hover:bg-secondary border border-tertiary text-tertiary px-6 sm:px-10 py-2 sm:py-3 rounded-md text-sm sm:text-base"
          >
            Contact Me
          </button>
        </div>

        {/* RIGHT: Profile Image */}
        <div className="relative flex justify-center order-1 md:order-2">
          <figure className="relative z-10">
            <img
              src={image ? `/uploads/profile/${image}` : "/rupesh-profile.png"}
              alt={`${firstName}${lastName} Profile`}
              className="w-[220px] md:w-[280px] lg:w-[300px] rounded-full object-cover border-4 border-white/10 z-50"
            />
            <figcaption className="sr-only">
              Profile image of {firstName} {lastName}
            </figcaption>
          </figure>
        </div>
      </div>

      {/* ENQUIRY MODAL */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        title="Project Enquiry"
        aria-labelledby="project-enquiry-modal"
      >
        <Form layout="vertical" onFinish={onFinish}>
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
            name="projectDetails"
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
