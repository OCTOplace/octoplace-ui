import { Fragment, useState } from "react";
import { Footer } from "./Footer";
import { AppNavbar } from "./Navbar";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const Layout = ({ children }) => {
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(true);

  const handleLoginClick = () => {
    setIsWalletDialogOpen(!isWalletDialogOpen);
  };

  return (
    <Fragment>
      <AppNavbar isWalletDialogOpen={isWalletDialogOpen} />
      <MainContainer>{children}</MainContainer>
      <Footer onLoginMenuClick={handleLoginClick} />
    </Fragment>
  );
};

const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 92px - 400px)",
  width: "100%",
}));
