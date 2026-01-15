import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Modal, message, Popconfirm } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { project } = portfolioData;

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();

  // ✅ Populate form on Edit
  useEffect(() => {
    if (selectedItemForEdit) {
      form.setFieldsValue({
        ...selectedItemForEdit,
        technologies: selectedItemForEdit?.technologies?.join(", "),
      });
    } else {
      form.resetFields();
    }
  }, [selectedItemForEdit, form]);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      values.technologies = values.technologies
        ? values.technologies.split(",").map((t) => t.trim())
        : [];

      const response = selectedItemForEdit
        ? await axios.post("/api/portfolio/update-project", {
            ...values,
            _id: selectedItemForEdit._id,
          })
        : await axios.post("/api/portfolio/add-project", values);

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());

      const response = await axios.post("/api/portfolio/delete-project", {
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
      message.error("Something went wrong");
    }
  };

  return (
    <div>
      {/* Add Project */}
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add Project
        </Button>
      </div>

      {/* Projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
        {project.map((item) => (
          <div
            key={item._id}
            className="relative bg-white rounded-xl border shadow-sm p-6
              hover:shadow-lg hover:-translate-y-1 transition"
          >
            <div className="absolute top-3 right-3 flex gap-2">
              <Popconfirm
                title="Delete Project?"
                description="Are you sure you want to delete this project?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => onDelete(item)}
              >
                <button className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600 hover:bg-red-500 hover:text-white">
                  Delete
                </button>
              </Popconfirm>

              <button
                className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white"
                onClick={() => {
                  setSelectedItemForEdit(item);
                  setShowAddEditModal(true);
                }}
              >
                Edit
              </button>
            </div>

            <p className="font-semibold mb-3 pt-4">{item.title}</p>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[200px] rounded"
            />
            <p className="text-sm mt-4">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Project" : "Add Project"}
        footer={null}
        onCancel={() => {
          setShowAddEditModal(false);
          setSelectedItemForEdit(null);
        }}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="link" label="Project Link">
            <Input />
          </Form.Item>

          <Form.Item name="technologies" label="Technologies (comma separated)">
            <Input />
          </Form.Item>

          <div className="flex justify-end gap-3">
            <Button onClick={() => setShowAddEditModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {selectedItemForEdit ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminProjects;
