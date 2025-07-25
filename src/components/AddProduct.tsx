import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      message.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (res.ok) {
        message.success("Thêm sản phẩm thành công!");
        navigate("/admin/products");
      } else {
        throw new Error("Thêm thất bại");
      }
    } catch (error) {
      console.error(error);
      message.error("Đã có lỗi xảy ra khi thêm sản phẩm");
    }
  };

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="row">
          <div className="col-sm-12">
            <section className="card">
              <header className="card-header">Thêm mới sản phẩm</header>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Tên sản phẩm</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Nhập tên sản phẩm"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Giá sản phẩm</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      placeholder="Nhập giá sản phẩm"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div> 

                  <div className="form-group">
                    <label htmlFor="description">Mô tả</label>
                    <textarea
                      name="description"
                      className="form-control"
                      placeholder="Nhập mô tả"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="image">Link hình ảnh (URL)</label>
                    <input
                      type="text"
                      name="image"
                      className="form-control"
                      placeholder="Nhập URL ảnh sản phẩm"
                      value={formData.image}
                      onChange={handleChange}
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="preview"
                        style={{ marginTop: 10, maxWidth: 200 }}
                      />
                    )}
                  </div>

                  <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary">
                      Lưu
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary ml-2"
                      onClick={() => navigate("/admin/products")}
                    >
                      Quay lại
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}

export default AddProduct;
