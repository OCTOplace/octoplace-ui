import { Box } from "@mui/material";
import { Fragment } from "react";
import { Footer } from "./Footer";
import { AppNavbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <Fragment>
      <AppNavbar />
      {children}
      <Footer />
    </Fragment>
  );
};
