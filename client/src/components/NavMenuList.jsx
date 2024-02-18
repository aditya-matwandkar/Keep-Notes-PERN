import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  LightbulbOutlined as BulbIcon,
  ArchiveOutlined,
  DeleteOutlined,
} from "@mui/icons-material";

function NavMenuList() {
  const location = useLocation();

  const navIconList = [
    {
      id: 1,
      name: "Notes",
      icon: <BulbIcon />,
      route: "/",
    },
    {
      id: 2,
      name: "Archive",
      icon: <ArchiveOutlined />,
      route: "/archives",
    },
    {
      id: 3,
      name: "Trash",
      icon: <DeleteOutlined />,
      route: "/trash",
    },
  ];

  return (
    <List>
      {navIconList.map((list) => (
        <ListItem key={list.id} disablePadding sx={{ display: "block" }}>
          <Link
            to={list.route}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton
              style={{
                borderRadius: "12px",
                backgroundColor:
                  location.pathname === list.route ? "#feefc3" : "transparent",
              }}
            >
              <ListItemIcon>{list.icon}</ListItemIcon>
              <ListItemText
                primary={list.name}
                style={{
                  color: "#202020",
                  fontFamily: "Open sans",
                }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}

export default NavMenuList;
