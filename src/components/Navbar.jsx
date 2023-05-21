import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import logo from "../assets/Logo-beta.png";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Menu, MenuItem, ButtonProps } from "@mui/material";
import { useNavigate, useRoutes } from "react-router-dom";
import { ConnectWalletDlg } from "./connnect-wallet-dlg";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import faucetImg from "../assets/faucet.png";

const WalletButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  fontWeight: 600,
  lineHeight: "105.02%",
  backgroundColor: "#f4f4f4",
  color: "#262626",
  borderRadius: "12px",
  padding: "8px 32px",
  // "&:hover": {
  //   backgroundColor: "#262626",
  //   color: "#f4f4f4",
  //   boxShadow: "none",
  //   border: "1px solid #262626",
  // },
});

export const AppNavbar = () => {
  const [dlgOpen, setDlgOpen] = useState(false);
  const { deactivate, chainId } = useWeb3React();
  const navigate = useNavigate();
  const acctDetails = useSelector((state) => state.account);

  useEffect(() => {}, [acctDetails]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" variant="dark">
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img src={logo} alt="logo icon" height="66px" />
          </Navbar.Brand>
          {/* <IconButton onClick={() => navigate("/faucet")}>
            <img src={faucetImg} alt="faucet" />
          </IconButton> */}
        </div>

        <div
          style={{ display: "flex", justifyContent: "", alignItems: "center" }}
        >
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* <Nav className="me-auto">
              <Searchbox className="search-nav" type="text" />
            </Nav> */}
            {/* <span style={{ flex: "1 auto" }}></span> */}
            <Nav>
              <Nav.Link onClick={() => navigate("/market")}>Market</Nav.Link>
              <Nav.Link onClick={() => navigate("/collections")}>
                Collections
              </Nav.Link>
              <Nav.Link disabled>Inbox</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {acctDetails && !acctDetails.isLoggedIn && (
            <WalletButton
              className="connect-btn"
              onClick={() => setDlgOpen(true)}
              variant="contained"
            >
              Connect Wallet
            </WalletButton>
          )}
          {acctDetails && acctDetails.isLoggedIn && (
            <Button
              className="connect-btn"
              onClick={handleBtnClick}
              variant="contained"
            >
              {getAccountString(acctDetails.address)} &nbsp;|{" "}
              {acctDetails.balance} {chainId === 361 ? "TFUEL" : "KAVA"}
            </Button>
          )}
        </div>
      </Container>
      <ConnectWalletDlg open={dlgOpen} onClose={() => setDlgOpen(false)} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/my-nft");
            handleMenuClose();
          }}
        >
          <DashboardIcon /> &nbsp;My Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/my-nft");
            handleMenuClose();
          }}
        >
          <SettingsIcon /> &nbsp;Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            deactivate();
            handleMenuClose();
          }}
        >
          <LogoutIcon /> &nbsp;Logout
        </MenuItem>
      </Menu>
    </Navbar>
  );
};

const getAccountString = (hash) => {
  const first = hash.substring(0, 3);
  const len = hash.length;
  const last = hash.substring(len - 4, len);
  return `${first}...${last}`;
};
