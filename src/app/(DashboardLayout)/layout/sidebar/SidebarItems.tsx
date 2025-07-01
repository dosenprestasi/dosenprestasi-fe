import React, { useEffect } from "react";
import Menuitems from "./MenuItems";
import { Box, Typography } from "@mui/material";
import {
  Logo,
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import { IconPoint } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upgrade } from "./Updrade";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/user";
import Loading from "@/app/loading";

const renderMenuItems = (user: User, items: any, pathDirect: any) => {
  return items.map((item: any) => {
    const Icon = item.icon ? item.icon : IconPoint;
    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    if (item.subheader && item.roles.includes(user.role)) {
      // Display Subheader
      return <Menu subHeading={item.subheader} key={item.subheader} />;
    }

    //If the item has children (submenu)
    if (item.children && item.roles.includes(user.role)) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
          borderRadius="7px"
        >
          {renderMenuItems(user!, item.children, pathDirect)}
        </Submenu>
      );
    }

    // If the item has no children, render a MenuItem
    return item.roles.includes(user.role) ? (
      <Box px={3} key={item.id}>
        <MenuItem
          key={item.id}
          isSelected={pathDirect === item?.href?.split("/")[1]}
          borderRadius="8px"
          icon={itemIcon}
          link={item.href}
          component={Link}
        >
          {item.title}
        </MenuItem>
      </Box>
    ) : (
      ""
    );
  });
};

const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname?.split("/")[1] ?? "";
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <MUI_Sidebar
        width={"100%"}
        showProfile={false}
        themeColor={"#5D87FF"}
        themeSecondaryColor={"#49beff"}
      >
        <Typography textAlign={"center"} variant="h3" marginTop={3}>
          Dosen Prestasi
        </Typography>
        {renderMenuItems(user!, Menuitems, pathDirect)}
      </MUI_Sidebar>
    </>
  );
};
export default SidebarItems;
