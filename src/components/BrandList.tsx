import { useQuery } from "@tanstack/react-query";
import { Image, Table, Button, Space, message } from "antd";
import Header from "./Header";

interface Brand {
  id: string;
  name: string;
  description: string;
}

function BrandList() {
  const fetchBrands = async () => {
    const res = await fetch("http://localhost:3001/brands");
    if (!res.ok) {
      throw new Error("Failed to fetch brands");
    }
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });
    // Hàm xử lý khi bấm "Sửa"
  const handleEdit = (record: Brand) => {
    console.log("Sửa sản phẩm:", record);
    message.info(`Sửa sản phẩm: ${record.name}`);
    // Ví dụ: open modal, navigate to edit page, etc.
  };

  // Hàm xử lý khi bấm "Xoá"
  const handleDelete = (record: Brand) => {
    console.log("Xoá sản phẩm:", record);
    message.warning(`Xoá sản phẩm: ${record.name}`);
    // TODO: gọi API xoá (DELETE), confirm xoá
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
      title: "Description",
      dataIndex: "description",
    },
        {
      title: "Actions",
      render: (_: any, record: Brand) => (
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
      <Header />
      
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

export default BrandList;
