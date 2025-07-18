import { useQuery } from "@tanstack/react-query";
import { Table, Button, Space, message } from "antd";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

function UserList() {
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3001/users");
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const handleEdit = (record: User) => {
    console.log("Sửa người dùng:", record);
    message.info(`Sửa người dùng: ${record.name}`);
    // TODO: mở modal chỉnh sửa hoặc chuyển trang edit
  };

  const handleDelete = (record: User) => {
    console.log("Xoá người dùng:", record);
    message.warning(`Xoá người dùng: ${record.name}`);
    // TODO: confirm + gọi API xoá
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Actions",
      render: (_: any, record: User) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default UserList;
