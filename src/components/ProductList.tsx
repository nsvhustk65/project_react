import { useQuery, useQueryClient } from "@tanstack/react-query";
import { message, Spin } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // ✅ Sử dụng useNavigate để điều hướng

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    return res.json();
  };

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const handleEdit = (record: Product) => {
    navigate(`/admin/products/edit/${record.id}`);
  };

  const handleDelete = async (record: Product) => {
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xoá ${record.name} không?`
    );
    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3001/products/${record.id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          message.success(`Đã xoá sản phẩm: ${record.name}`);
          queryClient.invalidateQueries({ queryKey: ["products"] });
        } else {
          throw new Error("Xoá thất bại");
        }
      } catch (err) {
        message.error("Lỗi khi xoá sản phẩm");
        console.error(err);
      }
    }
  };

  const filteredProducts = data?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="row">
          <div className="col-sm-12">
            <section className="card">
              <header className="card-header">
                Danh sách sản phẩm
                <span className="tools pull-right">
                  <a href="#" className="fa fa-chevron-down"></a>
                  <a href="#" className="fa fa-times"></a>
                </span>
              </header>
              <div className="card-body">
                <div className="form-group mb-3 d-flex justify-content-between align-items-center">
                  <form className="d-flex">
                    <input
                      type="text"
                      name="search"
                      className="form-control"
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: "300px" }}
                    />
                  </form>
<button
  className="btn btn-primary ml-3"
  onClick={() => navigate("/admin/products/add")}
>
  <i className="fa fa-plus"></i> Thêm mới
</button>
                </div>

                {isLoading && <Spin />}
                {error && (
                  <p className="text-danger">
                    Error: {(error as Error).message}
                  </p>
                )}

                <div className="adv-table">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th className="center">STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Mô tả</th>
                        <th className="center hidden-phone">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts && filteredProducts.length > 0 ? (
                        filteredProducts.map((item, index) => (
                          <tr key={item.id} className="gradeA">
                            <td className="center">{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                              {typeof item.price === "number"
                                ? item.price.toLocaleString() + "₫"
                                : "Không rõ"}
                            </td>
                            <td>
                              <img
                                src={item.image}
                                alt={item.name}
                                width={100}
                              />
                            </td>
                            <td>{item.description}</td>
                            <td className="center hidden-phone">
                              <button
                                className="btn btn-info btn-sm mr-2"
                                title="Chi tiết"
                                onClick={() =>
                                  navigate(`/admin/detail/${item.id}`)
                                }
                              >
                                <i className="fa fa-eye"></i> Xem
                              </button>
                              <button
                                className="btn btn-warning btn-sm mr-2"
                                title="Chỉnh sửa"
                                onClick={() => handleEdit(item)}
                              >
                                <i className="fa fa-edit"></i> Sửa
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                title="Xóa"
                                onClick={() => handleDelete(item)}
                              >
                                <i className="fa fa-trash"></i> Xoá
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center">
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}

export default ProductList;
