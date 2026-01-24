import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import axios from "axios";
import { removeEnquiry } from "../../redux/rootSlice";

function AdminEnquiries() {
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);
  const { enquiry } = portfolioData || {};

  const [enquiries, setEnquiries] = useState([]);

  // 🔄 Redux → Local state sync
  useEffect(() => {
    if (enquiry) {
      setEnquiries(enquiry);
    }
  }, [enquiry]);

  // 🗑 Delete enquiry (NO reload, NO global loader)
  const onDelete = async (id) => {
    const hide = message.loading("Deleting enquiry...", 0);

    try {
      const response = await axios.post("/api/portfolio/delete-enquiry", {
        _id: id,
      });

      if (response.data.success) {
        message.success("Enquiry deleted successfully");

        // ✅ Local UI update
        setEnquiries((prev) => prev.filter((item) => item._id !== id));

        // ✅ Redux update (MOST IMPORTANT)
        dispatch(removeEnquiry(id));
      }
    } catch (error) {
      message.error("Delete failed");
    } finally {
      hide();
    }
  };

  // 🔄 Refresh button (Redux se hi fresh data)
  const onRefresh = () => {
    setEnquiries(enquiry);
    message.success("Data refreshed");
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Project Details",
      dataIndex: "projectDetails",
      ellipsis: true,
    },
    {
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Delete this enquiry?"
          onConfirm={() => onDelete(record._id)}
        >
          <Button danger size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-row justify-between gap-3 mb-4">
        <h2 className="text-xl font-semibold text-primary">
          Project Enquiries
        </h2>

        <Button onClick={onRefresh}>🔄 Refresh</Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <Table
          columns={columns}
          dataSource={enquiries}
          rowKey="_id"
          pagination={false}
          scroll={{ x: 800 }}
        />
      </div>
    </div>
  );
}

export default AdminEnquiries;
