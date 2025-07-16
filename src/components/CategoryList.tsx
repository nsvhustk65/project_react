import { useQuery } from "@tanstack/react-query";
import { Image, Spin, Table } from "antd";

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
  ];

  return (
    <div>
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
