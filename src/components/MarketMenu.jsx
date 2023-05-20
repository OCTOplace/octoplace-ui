import { Box } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "3rem",
  },
  btn: {
    fontWeight: 400,
    fontSize: "1.5rem",
    lineHeight: "105.02%",
    color: "#6C6C6C",
    textDecoration: "none",
  },
  activeBtn: {
    fontWeight: 400,
    fontSize: "1.5rem",
    lineHeight: "105.02%",
    color: "#f4f4f4",
    textDecoration: "underline!important",
    textDecorationColor: "#f78C09",
    textUnderlinePosition: "under",
    textUnderlineOffset: "0.5rem",
  },
};

function MarketMenu() {
  const location = useLocation();

  return (
    <Box className="market-menu">
      <Link
        to="/market"
        className={
          location.pathname === "/market" ? "active-button" : "regular-btn"
        }
      >
        Market
      </Link>
      <Link
        to="/market/swap"
        className={
          location.pathname === "/market/swap" ? "active-button" : "regular-btn"
        }
      >
        Swap
      </Link>
      <Link
        to="/market/auction"
        className={
          location.pathname === "/market/auction"
            ? "active-button"
            : "regular-btn"
        }
      >
        Auction
      </Link>
    </Box>
  );
}

export default MarketMenu;
