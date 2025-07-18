import { useQuery } from "@tanstack/react-query";
import { Image, Table, Button, Space, message } from "antd";
import Header from "./Header";

// Interface cho danh mục
interface Category {
  id: number;
  name: string;
  description: string;
}

function CategoryList() {
  // Hàm fetch data
  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3001/categories");
    return res.json();
  };

  // Dùng React Query để gọi API
  const { data, isLoading, error } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
    // Hàm xử lý khi bấm "Sửa"
  const handleEdit = (record: Category) => {
    console.log("Sửa sản phẩm:", record);
    message.info(`Sửa sản phẩm: ${record.name}`);
    // Ví dụ: open modal, navigate to edit page, etc.
  };

  // Hàm xử lý khi bấm "Xoá"
  const handleDelete = (record: Category) => {
    console.log("Xoá sản phẩm:", record);
    message.warning(`Xoá sản phẩm: ${record.name}`);
    // TODO: gọi API xoá (DELETE), confirm xoá
  };
  // Cột bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
        {
      title: "Actions",
      render: (_: any, record: Category) => (
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
      {error && <p>Lỗi: {(error as Error).message}</p>}
      <Table
        dataSource={data}
        columns={columns}
        rowKey={"id"}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default CategoryList;
