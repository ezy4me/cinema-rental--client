"use client";

import React from "react";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Person,
  DoorBack,
  Dashboard,
  Inventory,
  Alarm,
} from "@mui/icons-material";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#121212",
          color: "#fff",
        },
      }}>
      <List>
        <ListItem
          component={Link}
          href="/"
          sx={{
            backgroundColor: pathname === "/dashboard" ? "#202020" : "transparent",
            color: pathname === "/dashboard" ? "#FFD900" : "#fff",
          }}>
          <ListItemIcon>
            <Dashboard sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Главная" />
        </ListItem>

        <ListItem
          component={Link}
          href="/dashboard/users"
          sx={{
            backgroundColor:
              pathname === "/dashboard/users" ? "#202020" : "transparent",
            color: pathname === "/dashboard/users" ? "#FFD900" : "#fff",
          }}>
          <ListItemIcon>
            <Person sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Пользователи" />
        </ListItem>

        <ListItem
          component={Link}
          href="/dashboard/equipments"
          sx={{
            backgroundColor:
              pathname === "/dashboard/equipments" ? "#202020" : "transparent",
            color: pathname === "/dashboard/equipments" ? "#FFD900" : "#fff",
          }}>
          <ListItemIcon>
            <Inventory sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Оборудование" />
        </ListItem>

        <ListItem
          component={Link}
          href="/dashboard/orders"
          sx={{
            backgroundColor:
              pathname === "/dashboard/orders" ? "#202020" : "transparent",
            color: pathname === "/dashboard/orders" ? "#FFD900" : "#fff",
          }}>
          <ListItemIcon>
            <Alarm sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Заказы" />
        </ListItem>

        <ListItem
          component={Button}
          onClick={() => signOut()}
          sx={{
            backgroundColor: "#FFD900", 
            color: "#202020",
            "&:hover": {
              backgroundColor: "#FFC107", 
              color: "#fff", 
            },
          }}>
          <ListItemIcon>
            <DoorBack sx={{ color: "#202020" }} />
          </ListItemIcon>
          <ListItemText primary="Выход" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
