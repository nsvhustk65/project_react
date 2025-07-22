import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";

interface Brand {
  id: string;
  name: string;
  description: string;
}

function BrandList() {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchBrands = async () => {
    const res = await fetch("http://localhost:3001/brands");
    return res.json();
  };

  const { data, isLoading, error } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const handleEdit = (record: Brand) => {
    navigate(`/admin/brands/edit/${record.id}`);
  };

  const handleDelete = async (record: Brand) => {
    const confirmed = window.confirm(`Bạn có chắc chắn muốn xoá ${record.name} không?`);
    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3001/brands/${record.id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          message.success(`Đã xoá thương hiệu: ${record.name}`);
          queryClient.invalidateQueries({ queryKey: ["brands"] });
        } else {
          throw new Error("Xoá thất bại");
        }
      } catch (err) {
        message.error("Lỗi khi xoá thương hiệu");
        console.error(err);
      }
    }
  };

  const filteredBrands = data?.filter((brand) => {
    const keyword = searchTerm.toLowerCase();
    return (
      brand.name.toLowerCase().includes(keyword) ||
      brand.description.toLowerCase().includes(keyword)
    );
  });

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="row">
          <div className="col-sm-12">
            <section className="card">
              <header className="card-header">
                Danh sách Thương hiệu
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
                      placeholder="Tìm kiếm Thương hiệu..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: "250px" }}
                    />
                  </form>
                  <button
                    className="btn btn-primary ml-3"
                    onClick={() => navigate("/admin/brands/add")}
                  >
                    <i className="fa fa-plus"></i> Thêm mới
                  </button>
                </div>

                {isLoading && <Spin />}
                {error && <p className="text-danger">Error: {(error as Error).message}</p>}

                <div className="adv-table">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th className="center">STT</th>
                        <th>Tên thương hiệu</th>
                        <th>Mô tả</th>
                        <th className="center hidden-phone">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBrands && filteredBrands.length > 0 ? (
                        filteredBrands.map((item, index) => (
                          <tr key={item.id} className="gradeA">
                            <td className="center">{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td className="center hidden-phone">
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
                          <td colSpan={4} className="text-center">
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

export default BrandList;
