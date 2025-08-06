import React, { useState, useEffect } from "react";
import {
  HomeOutlined,
  ProfileFilled,
  ShopFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Homepage",
    key: "/admin", // default path
    icon: <HomeOutlined />,
  },
  {
    label: "Products",
    key: "/admin/products",
    icon: <ShopFilled />,
  },
  {
    label: "Categories",
    key: "/admin/categories",
    icon: <UnorderedListOutlined />,
  },
  {
    label: "Brands",
    key: "/admin/brands",
    icon: <UnorderedListOutlined />,
  },
  {
    label: "Users",
    key: "/admin/users",
    icon: <ProfileFilled />,
  },
  {
    label: "Orders",
    key: "/admin/orders",
    icon: <ShopFilled />,
  },
];

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [current, setCurrent] = useState(location.pathname);

  // Cập nhật menu được chọn khi URL thay đổi
  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
