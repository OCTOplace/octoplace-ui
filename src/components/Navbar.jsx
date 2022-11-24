import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import logo from "../assets/logo.png";
import { Button, Menu, MenuItem } from "@mui/material";
import Searchbox from "./searchbox";
import { useNavigate } from "react-router-dom";
import { ConnectWalletDlg } from "./connnect-wallet-dlg";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
export const AppNavbar = () => {
  const [dlgOpen, setDlgOpen] = useState(false);
  const {deactivate} = useWeb3React();
  const acctDetails = useSelector((state) => state.account);
  useEffect(() => {
  }, [acctDetails]);
  const navigate = useNavigate();

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
      <Container style={{ alignItems: "center", justifyContent: "flex-start" }}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand onClick={() => navigate("/")}>
          <img
            src={logo}
            alt="logo icon"
            style={{
              width: "3%",
              height: "auto",
              minWidth: "48px",
              marginRight: "16px",
            }}
          />
          <span className="logo-text">octo</span>
        </Navbar.Brand>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Searchbox className="search-nav" type="text" />
          </Nav>
          <Nav>
            <Nav.Link>Listings</Nav.Link>
            <Nav.Link>Swap</Nav.Link>
            <Nav.Link disabled>Auction</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {acctDetails && !acctDetails.isLoggedIn && (
          <Button
            className="connect-btn"
            onClick={() => setDlgOpen(true)}
            variant="contained"
          >
            Connect Wallet
          </Button>
        )}{
          acctDetails && acctDetails.isLoggedIn && (
            <Button
            className="connect-btn"
            onClick={handleBtnClick}
            variant="contained"
          >
            {getAccountString(acctDetails.address)} &nbsp;| {acctDetails.balance} TFUEL
          </Button>
          )
        }
      </Container>
      <ConnectWalletDlg open={dlgOpen} onClose={() => setDlgOpen(false)} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleMenuClose}><DashboardIcon/> &nbsp;My Dashboard</MenuItem>
        <MenuItem onClick={() => {
          deactivate();
          handleMenuClose()
        }}><LogoutIcon/> &nbsp;Logout</MenuItem>
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