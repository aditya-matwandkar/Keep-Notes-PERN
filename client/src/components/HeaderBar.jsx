import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const AppBar = styled(MuiAppBar)({
  zIndex: "1300",
  background: "#fff",
  height: "70px",
  boxShadow: "inset 0 -1px 0 0 #dadce0",
  display: "flex",
  justifyContent: "center",
});

const LogoName = styled(Typography)({
  color: "#383838",
  fontSize: "1.6rem",
});

function HeaderBar({ open, handleDrawer }) {
  return (
    <AppBar open={open}>
      <Toolbar>
        <IconButton onClick={handleDrawer} edge="start" sx={{ marginRight: 3 }}>
          <MenuIcon />
        </IconButton>
        <img
          src="/google-keep-icon.svg"
          alt="keep logo"
          style={{ height: "50px", marginRight: "12px" }}
        ></img>
        <LogoName>Keep</LogoName>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar;
