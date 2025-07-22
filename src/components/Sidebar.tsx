import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside>
      <div id="sidebar" className="nav-collapse">
        <ul className="sidebar-menu" id="nav-accordion">
          <li>
            <NavLink to="/admin" end className={({ isActive }) => isActive ? "active" : ""}>
              <i className="fa fa-dashboard"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/products" className={({ isActive }) => isActive ? "active" : ""}>
              <i className="fa fa-laptop"></i>
              <span>Quản lý sản phẩm</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/categories" className={({ isActive }) => isActive ? "active" : ""}>
              <i className="fa fa-book"></i>
              <span>Quản lý Danh mục</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/users" className={({ isActive }) => isActive ? "active" : ""}>
              <i className="fa fa-user"></i>
              <span>Quản lý tài khoản</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/brands" className={({ isActive }) => isActive ? "active" : ""}>
              <i className="fa fa-sitemap"></i>
              <span>Quản lý Thương hiệu</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "active" : ""}>
              <i className="fa fa-sitemap"></i>
              <span>Quản lý Đơn hàng</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
 