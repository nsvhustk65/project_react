import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, Spin, message } from "antd";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    const res = await fetch(`http://localhost:3001/products/${id}`);
    if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
    return res.json();
  };

  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: fetchProduct,
  });

  const handleEdit = () => {
    message.info("Chức năng chỉnh sửa chưa được phát triển");
    // navigate(`/admin/products/edit/${id}`);
  };

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <section className="card p-4 shadow-lg">
              <header className="card-header mb-4 d-flex justify-content-between align-items-center">
                <h2 className="fw-bold fs-3">Chi tiết sản phẩm</h2>
                <div>
                  <Button
                    type="primary"
                    className="me-2"
                    onClick={handleEdit}
                    icon={<i className="fa fa-edit me-1" />}
                  >
                    Sửa
                  </Button>
                  <Button
                    type="default"
                    onClick={() => navigate("/admin/products")}
                    icon={<i className="fa fa-arrow-left me-1" />}
                  >
                    Quay lại
                  </Button>
                </div>
              </header>

              {isLoading && <Spin size="large" />}
              {error && (
                <p className="text-danger">
                  {(error as Error).message || "Đã xảy ra lỗi"}
                </p>
              )}

              {data && (
                <div className="product-detail px-3">
                  <div className="row align-items-center">
                    <div className="col-md-6 text-center mb-4">
                      <img
                        src={data.image}
                        alt={data.name}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "500px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-3 fw-bold">{data.name}</h3>

                      <p className="fs-5">
                        <strong>Mô tả:</strong>
                        <br />
                        <span className="text-muted">{data.description}</span>
                      </p>

                      <p className="fs-5 mt-3">
                        <strong>Giá tiền:</strong>{" "}
                        <span className="text-danger fw-semibold">
                          {data.price.toLocaleString()}₫
                        </span>
                      </p>

                      <p className="fs-5">
                        <strong>Số lượng:</strong> {data.quantity}
                      </p>

                      <p className="fs-5">
                        <strong>Tình trạng:</strong>{" "}
                        {data.quantity > 0 ? (
                          <span className="text-success">Đang hoạt động</span>
                        ) : (
                          <span className="text-danger">Không hoạt động</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}

export default ProductDetail;
