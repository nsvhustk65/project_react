import { useQuery } from "@tanstack/react-query";
import { Table, Button, Space, message } from "antd";
import Header from "./Header";

interface Order {
  id: string;
  customerName: string;
  totalAmount: number;
  status: string;
  date: string;
}

function OrderList() {
  const fetchOrders = async () => {
    const res = await fetch("http://localhost:3001/orders");
    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const handleView = (record: Order) => {
    console.log("Xem chi tiết đơn hàng:", record);
    message.success(`Xem chi tiết đơn hàng #${record.id}`);
    // TODO: mở modal chi tiết hoặc chuyển sang trang chi tiết
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
    },
        {
      title: "Sản phẩm",
      dataIndex: "products",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      render: (amount: number) => `${amount.toLocaleString()}₫`,
      sorter: (a: Order, b: Order) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
    },
    {
      title: "Hành động",
      render: (_: any, record: Order) => (
        <Space>
          <Button type="primary" onClick={() => handleView(record)}>
            Xem chi tiết
          </Button>

        </Space>
      ),
    },
  ];

  return (
  <div >
  
    {error && <p className="text-danger">Lỗi: {error.message}</p>}

    <Table
      dataSource={data}
      columns={columns}
      rowKey="id"
      loading={isLoading}
      pagination={{ pageSize: 5 }}
      className="table-striped table-bordered"
    />
  </div>
);
}

export default OrderList;
