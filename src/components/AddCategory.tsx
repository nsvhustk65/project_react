import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function AddCategory() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      message.warning("Vui lòng nhập tên danh mục!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        message.success("Thêm danh mục thành công!");
        navigate("/admin/categories");
      } else {
        throw new Error("Thêm thất bại");
      }
    } catch (error) {
      console.error(error);
      message.error("Đã có lỗi xảy ra khi thêm danh mục");
    }
  };

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="row">
          <div className="col-sm-12">
            <section className="card">
              <header className="card-header">Thêm mới danh mục</header>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Tên danh mục</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Nhập tên danh mục"
                      value={formData.name}
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

                  <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary">Lưu</button>
                    <button
                      type="button"
                      className="btn btn-secondary ml-2"
                      onClick={() => navigate("/admin/categories")}
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

export default AddCategory;
