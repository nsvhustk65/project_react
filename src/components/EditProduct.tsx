import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Input, Button, message, Form, Spin } from "antd";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string; // URL ảnh
}

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>("");

  // Lấy dữ liệu sản phẩm từ server
  const { data, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/products/${id}`);
      if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
      return res.json();
    },
  });

  // Đổ dữ liệu sản phẩm vào form
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        price: data.price,
        description: data.description,
      });
      setImageUrl(data.image || "");
    }
  }, [data, form]);

  // Mutation cập nhật sản phẩm
  const mutation = useMutation({
    mutationFn: async (updatedProduct: Product) => {
      const res = await fetch(`http://localhost:3001/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) throw new Error("Cập nhật thất bại");
      return res.json();
    },
    onSuccess: () => {
      message.success("Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin/products");
    },
    onError: () => {
      message.error("Lỗi khi cập nhật");
    },
  });

  // Xử lý khi submit form
 const handleSubmit = (values: { name: string; price: number; description: string }) => {

    const updatedProduct: Product = {
      id: id!,
      name: values.name,
      price: Number(values.price),
      description: values.description,
      image: imageUrl, // dùng URL ảnh
    };

    mutation.mutate(updatedProduct);
  };

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="row">
          <div className="col-sm-12">
            <section className="card p-4">
              <header className="card-header fs-4 fw-bold mb-3">
                Cập nhật sản phẩm
              </header>

              {isLoading ? (
                <Spin tip="Đang tải..." />
              ) : (
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                  <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: "Nhập giá sản phẩm" }]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: "Nhập mô tả" }]}
                  >
                    <Input.TextArea />
                  </Form.Item>

                  <Form.Item label="Link ảnh sản phẩm">
                    <Input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Nhập URL ảnh (https://...)"
                    />
                    {imageUrl && (
                      <div style={{ marginTop: 10 }}>
                        <img
                          src={imageUrl}
                          alt="Preview"
                          style={{
                            width: "200px",
                            marginBottom: "8px",
                            borderRadius: "4px",
                          }}
                        />
                        <Button
                          danger
                          size="small"
                          style={{ marginLeft: 8 }}
                          onClick={() => setImageUrl("")}
                        >
                          Xóa ảnh
                        </Button>
                      </div>
                    )}
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="me-2">
                      Lưu
                    </Button>
                    <Button onClick={() => navigate("/admin/products")}>
                      Quay lại
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}

export default EditProduct;
