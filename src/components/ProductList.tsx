import { useQuery } from "@tanstack/react-query";
import { Image, Table, Button, Space, message } from "antd";
import Header from "./Header";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}
function ProductList() {
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    return res.json();
  };
  // state data, isLoading, error
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  console.log(data, isLoading, error);
    // Hàm xử lý khi bấm "Sửa"
  const handleEdit = (record: Product) => {
    console.log("Sửa sản phẩm:", record);
    message.info(`Sửa sản phẩm: ${record.name}`);
    // Ví dụ: open modal, navigate to edit page, etc.
  };

  // Hàm xử lý khi bấm "Xoá"
  const handleDelete = (record: Product) => {
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
      title: "Price",
      dataIndex: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (src: string, recourd: Product, index: number) => {
        return <Image src={src} width={300} alt={recourd.name} />;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
    },
      {
      title: "Actions",
      render: (_: any, record: Product) => (
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
    
      {/* {isLoading && <Spin />} */}
      {error && <p>Error: {error.message}</p>}
      {/* {data?.map((item: Product) => (
        <p key={item.id}>{item.name}</p>
      ))} */}
      <Table
        dataSource={data}
        columns={columns}
        rowKey={"id"}
        loading={isLoading} // Hiển thị spinner khi đang tải
        pagination={{ pageSize: 5 }} // Phân trang, mỗi trang 5 bản ghi
      />
    </div>
  );
}

export default ProductList;