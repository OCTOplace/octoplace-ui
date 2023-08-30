import Container from "react-bootstrap/Container";
import React from "react";
import LogoBeta from "../assets/Logo-beta.png";
import Logo from "../assets/logo.png";
import { styled } from "@mui/system";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  ButtonProps,
  Box,
} from "@mui/material";
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
import MenuIcon from "@mui/icons-material/Menu";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import CollectionsIcon from "@mui/icons-material/Collections";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import faucetImg from "../assets/faucet.png";
// import Searchbox from "./searchbox"

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

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const openMenu = Boolean(anchorEl);
  const isOpen = Boolean(anchorEl1);

  const handleBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClose1 = () => {
    setAnchorEl1(null);
  };

  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  return (
    <NavBarContainer>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Img alt="logo icon" onClick={() => navigate("/")} />
          {/* <IconButton onClick={() => navigate("/faucet")}>
            <img src={faucetImg} alt="faucet" />
          </IconButton> */}
          <MobileNavBarItemContainer>
            <IconButton aria-label="delete" size="large" onClick={handleClick}>
              <MenuIcon fontSize="inherit" sx={{ color: "#FFFFFF" }} />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl1}
              open={isOpen}
              onClose={handleMenuClose1}
              sx={{ marginTop: "8px" }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/market");
                  handleMenuClose1();
                }}
              >
                <LocalGroceryStoreIcon /> &nbsp;Market
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/collections");
                  handleMenuClose1();
                }}
              >
                <CollectionsIcon /> &nbsp;Collections
              </MenuItem>
              <MenuItem sx={{ color: "#808080" }}>
                <ForwardToInboxIcon /> &nbsp;Inbox
              </MenuItem>
            </Menu>
          </MobileNavBarItemContainer>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "56px" }}>
          <NavBarItemContainer>
            <NavItem onClick={() => navigate("/market")}>Market</NavItem>
            <NavItem onClick={() => navigate("/collections")}>
              Collections
            </NavItem>
            <NavItem disabled={true}>Inbox</NavItem>
          </NavBarItemContainer>
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
        sx={{ marginTop: "8px" }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/dashboard");
            handleMenuClose();
          }}
        >
          <DashboardIcon /> &nbsp;My Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/dashboard/settings");
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
    </NavBarContainer>
  );
};

const getAccountString = (hash) => {
  const first = hash.substring(0, 3);
  const len = hash.length;
  const last = hash.substring(len - 4, len);
  return `${first}...${last}`;
};

const Img = styled("img")(({ theme }) => ({
  content: `url(${LogoBeta})`,
  height: "66px",
  cursor: "pointer",
  [theme.breakpoints.down(768)]: {
    content: `url(${Logo})`,
    height: "40px",
  },
}));

const NavBarContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "92px",
  backgroundColor: "#262626",
  padding: "8px 0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const NavBarItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "56px",
  [theme.breakpoints.down(992)]: {
    display: "none",
  },
}));

const NavItem = styled(Box)(({ theme, disabled }) => ({
  fontWeight: "700",
  color: disabled === true ? "#808080" : "#FFFFFF",
  fontSize: "16px",
}));

const MobileNavBarItemContainer = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down(992)]: {
    display: "flex",
  },
}));

// {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             {/* <Nav className="me-auto">
//               <Searchbox className="search-nav" type="text" />
//             </Nav> */}
//             <span style={{ flex: "1 auto" }}></span>
//             <Nav>
//               <Nav.Link onClick={() => navigate("/market")}>Market</Nav.Link>
//               <Nav.Link onClick={() => navigate("/collections")}>
//                 Collections
//               </Nav.Link>
//               <Nav.Link disabled>Inbox</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//           {acctDetails && !acctDetails.isLoggedIn && (
//             <WalletButton
//               className="connect-btn"
//               onClick={() => setDlgOpen(true)}
//               variant="contained"
//             >
//               Connect Wallet
//             </WalletButton>
//           )}
//           {acctDetails && acctDetails.isLoggedIn && (
//             <Button
//               className="connect-btn"
//               onClick={handleBtnClick}
//               variant="contained"
//             >
//               {getAccountString(acctDetails.address)} &nbsp;|{" "}
//               {acctDetails.balance} {chainId === 361 ? "TFUEL" : "KAVA"}
//             </Button>
//           )} */}
