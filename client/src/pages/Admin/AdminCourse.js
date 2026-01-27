import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Modal, message, Popconfirm } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminCourses() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { course } = portfolioData;

  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;

      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-course", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-course", values);
      }

      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        form.resetFields();
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(HideLoading());
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());

      const response = await axios.post("/api/portfolio/delete-course", {
        _id: item._id,
      });

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      {/* Add Experience Button */}
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
            form.resetFields();
          }}
        >
          Add Course
        </Button>
      </div>

      {/* Experience Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
        {course.map((course) => (
          <div
            key={course._id}
            className="relative bg-white rounded-xl border border-gray-200 shadow-sm p-6
              hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-blue-600"
          >
            {/* Edit / Delete Buttons */}
            <div className="absolute top-3 right-3 flex gap-2">
              <Popconfirm
                title="Delete Course?"
                description="Are you sure you want to delete this course?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => onDelete(course)}
              >
                <button
                  className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600
      hover:bg-red-500 hover:text-white transition-all"
                >
                  Delete
                </button>
              </Popconfirm>

              <button
                className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600
                  hover:bg-blue-500 hover:text-white transition-all"
                onClick={() => {
                  setSelectedItemForEdit(course);
                  setShowAddEditModal(true);
                  setTimeout(() => {
                    form.setFieldsValue(course);
                  }, 0);
                }}
              >
                Edit
              </button>
            </div>

            {/* Content */}
            <p className="text-primary font-semibold pt-4">{course.title}</p>
            <img
              src={course.image}
              alt={course.title}
              className="w-full rounded mt-3"
            />
            <p className="text-black text-sm leading-relaxed mt-3 mb-0">
              {course.description}
            </p>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Course" : "Add Course"}
        footer={null}
        onCancel={() => {
          setShowAddEditModal(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Course Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Course Name" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true }]}
          >
            <Input placeholder="Image URL" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Course Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} placeholder="Course Description" />
          </Form.Item>

          <Form.Item name="link" label="Link">
            <Input placeholder="Link" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              onClick={() => {
                setShowAddEditModal(false);
                form.resetFields();
              }}
            >
              Cancel
            </Button>

            <Button type="primary" htmlType="submit">
              {selectedItemForEdit ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminCourses;
