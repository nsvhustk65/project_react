import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input, Button, message, Form, Spin } from "antd";
import { useEffect } from "react";

interface Brand {
  id: string;
  name: string;
  description: string;
}

function EditBrand() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data, isLoading } = useQuery<Brand>({
    queryKey: ["brand", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/brands/${id}`);
      if (!res.ok) throw new Error("Không tìm thấy thương hiệu");
      return res.json();
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        description: data.description,
      });
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: async (updatedBrand: Brand) => {
      const res = await fetch(`http://localhost:3001/brands/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBrand),
      });
      if (!res.ok) throw new Error("Cập nhật thất bại");
      return res.json();
    },
    onSuccess: () => {
      message.success("Cập nhật thương hiệu thành công");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      navigate("/admin/brands");
    },
    onError: () => message.error("Lỗi khi cập nhật"),
  });

  const handleSubmit = (values: { name: string; description: string }) => {
    const updatedBrand: Brand = {
      id: id!,
      name: values.name,
      description: values.description,
    };
    mutation.mutate(updatedBrand);
  };

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="row">
          <div className="col-sm-12">
            <section className="card p-4">
              <header className="card-header fs-4 fw-bold mb-3">
                Cập nhật thương hiệu
              </header>
              {isLoading ? (
                <Spin tip="Đang tải..." />
              ) : (
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                  <Form.Item
                    label="Tên thương hiệu"
                    name="name"
                    rules={[{ required: true, message: "Nhập tên thương hiệu" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: "Nhập mô tả thương hiệu" }]}
                  >
                    <Input.TextArea />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="me-2">
                      Lưu
                    </Button>
                    <Button onClick={() => navigate("/admin/brands")}>Quay lại</Button>
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

export default EditBrand;
