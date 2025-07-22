import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message, Spin } from "antd";

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  status: "active" | "inactive"; // Thêm trạng thái
}

function UserList() {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3001/users");
    return res.json();
  };

  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (user: User) => {
      const updatedStatus = user.status === "active" ? "inactive" : "active";
      const res = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updatedStatus }),
      });
      if (!res.ok) throw new Error("Không thể cập nhật trạng thái");
      return res.json();
    },
    onSuccess: () => {
      message.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      message.error("Có lỗi xảy ra khi cập nhật trạng thái");
    },
  });

  const handleToggleStatus = (user: User) => {
    updateStatusMutation.mutate(user);
  };

  const filteredUsers = data?.filter((user) => {
    const keyword = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(keyword) ||
      user.phone.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.address.toLowerCase().includes(keyword)
    );
  });

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="row">
          <div className="col-sm-12">
            <section className="card">
              <header className="card-header">
                Danh sách Tài khoản
              </header>
              <div className="card-body">
                <div className="form-group mb-3 d-flex justify-content-between align-items-center">
                  <form className="d-flex">
                    <input
                      type="text"
                      name="search"
                      className="form-control"
                      placeholder="Tìm kiếm người dùng..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: 300 }}
                    />
                  </form>
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
                        <th>Tên người dùng</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                        <th className="center">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers && filteredUsers.length > 0 ? (
                        filteredUsers.map((item, index) => (
                          <tr key={item.id} className="gradeA">
                            <td className="center">{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td>
                              {item.status === "active"
                                ? "Hoạt động"
                                : "Không hoạt động"}
                            </td>
                            <td className="center">
                              <button
                                className={`btn btn-${
                                  item.status === "active" ? "danger" : "success"
                                } btn-sm`}
                                onClick={() => handleToggleStatus(item)}
                              >
                                {item.status === "active"
                                  ? "Chặn tài khoản"
                                  : "Mở chặn"}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center">
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

export default UserList;
