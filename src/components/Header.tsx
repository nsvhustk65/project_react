import React, { useState } from "react";
import {
  HomeOutlined,
  ProfileFilled,
  ShopFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import BrandList from "./BrandList";
import UserList from "./UserList";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Homepage",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "Products",
    key: "/products",
    icon: <ShopFilled />,
  },
  {
    label: "Categories",
    key: "/categories",
    icon: <UnorderedListOutlined />,
  },
    {
    label: "Brands",
    key: "/brands",
    icon: <UnorderedListOutlined />,
  },
    {
    label: "Users",
    key: "/users",
    icon: <ProfileFilled />,
  },
      {
    label: "Orders",
    key: "/orders",
    icon: <ShopFilled />,
  },
  
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();

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