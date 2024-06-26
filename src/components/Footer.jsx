/* eslint-disable no-unused-vars */
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { FaDiscord } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import EmailIcon from "@mui/icons-material/Email";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ALink } from "../components/ALink";
import Logo from "../assets/logo_f.svg";
import OCTO from "../assets/text.svg";
import { ConnectWalletDlg } from "./connect-wallet-dlg";

import { useGTMDispatch } from "@elgorditosalsero/react-gtm-hook";

export const Footer = ({ onLoginMenuClick }) => {
  const sendDataToGTM = useGTMDispatch();
  const navigate = useNavigate();
  const [walletDlgOpen, setWalletDlgOpen] = useState(false);
  const acctDetails = useSelector((state) => state.account);
  const contactEmail = "contact@octoplace.io";

  const styles = {
    nav: {
      backgroundColor: "#151515",
      position: "relative",
      bottom: 0,
      width: "100%",
      marginTop: "16px",
      zIndex: 10,
    },
    row: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      color: "white",
      width: "20%",
      fontSize: "1rem",
    },
    legal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      color: "#6C6C6C",
      mt: ".75rem",
      mb: ".75rem",
      width: "100%",
      fontSize: ".75rem",
      cursor: "pointer",
    },
    legalTextContainer: (theme) => ({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down(840)]: {
        display: "none",
      },
    }),
    legalText: {
      "&:hover": {
        color: "#F4F4F4",
      },
    },
    iconContainer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "4px",
    },
    icon: {
      color: "#fff",
      "&:hover": {
        color: "#F78C09",
      },
    },
  };

  const handleWalletOpen = () => {
    setWalletDlgOpen(true);
    sendDataToGTM({
      event: "View Connect Wallet Popup",
    });
  };

  const handleWalletClose = () => {
    setWalletDlgOpen(false);
    sendDataToGTM({
      event: "Closed Wallet Popup",
    });
  };

  return (
    <Fragment>
      <nav style={styles.nav}>
        <ContainerWrapper>
          <FooterLinkContainer>
            <FooterExplain>
              <Box style={{ width: "100%", textAlign: "center" }}>
                <OctoLogo
                  src={OCTO}
                  alt="kingpad-footer-logo"
                  onClick={() => {
                    navigate("/");
                    window.scrollTo(0, 0);
                  }}
                />
              </Box>
              <Box style={{ width: "100%", textAlign: "center" }}>
                <FooterLogo
                  src={Logo}
                  alt="kingpad-footer-logo"
                  onClick={() => {
                    navigate("/");
                    window.scrollTo(0, 0);
                  }}
                />
              </Box>
              <ExplainContent>
                More features, More chains, Less fees, One place.
              </ExplainContent>
              <ExplainContent1 style={{ fontSize: "14px" }}>
                OCTO is super dApp that resolves around Non-Fungible
                Tokens(NFTs) with a string emphasis on creators and communities.
                Most comprehensive functionality with built-in social tools,
                while being chain-agnostic, as Web3 should be. Join us today!
              </ExplainContent1>
            </FooterExplain>
            <FooterLinks>
              <FooterLink>
                <FooterLinkTitle>KNOWLEDGE BASE</FooterLinkTitle>
                <FooterLinkNavs>
                  <FooterLinkNav style={{ color: "#757575" }}>
                    Guide
                  </FooterLinkNav>
                  <FooterLink>
                    <FooterLinkNav style={{ color: "#757575" }}>
                      What are NFTs?
                    </FooterLinkNav>
                  </FooterLink>
                  <FooterLink>
                    <FooterLinkNav style={{ color: "#757575" }}>
                      How to buy NFTs?
                    </FooterLinkNav>
                  </FooterLink>
                  <FooterLink>
                    <FooterLinkNav style={{ color: "#757575" }}>
                      Sequrity questions
                    </FooterLinkNav>
                  </FooterLink>
                  <FooterLink>
                    <FooterLinkNav style={{ color: "#757575" }}>
                      FAQ
                    </FooterLinkNav>
                  </FooterLink>
                </FooterLinkNavs>
              </FooterLink>
              <FooterLink>
                <FooterLinkTitle>DISCOVER</FooterLinkTitle>
                <FooterLinkNavs>
                  <FooterLink>
                    <FooterLinkNav
                      onClick={() => {
                        if (acctDetails && acctDetails.isLoggedIn) {
                          navigate("/dashboard");
                        } else {
                          handleWalletOpen();
                        }

                        window.scrollTo(0, 0);
                      }}
                    >
                      Log in
                    </FooterLinkNav>
                  </FooterLink>
                  <FooterLink>
                    <FooterLinkNav
                      onClick={() => {
                        navigate("/market");
                        window.scrollTo(0, 0);
                      }}
                    >
                      Trade
                    </FooterLinkNav>
                  </FooterLink>
                  <FooterLink>
                    <FooterLinkNav
                      onClick={() => {
                        navigate("/market/swap");
                        window.scrollTo(0, 0);
                      }}
                    >
                      Swap
                    </FooterLinkNav>
                  </FooterLink>
                  <FooterLink>
                    <FooterLinkNav
                      onClick={() => {
                        navigate("/collections");
                        window.scrollTo(0, 0);
                      }}
                    >
                      Popular collections
                    </FooterLinkNav>
                  </FooterLink>
                  <FooterLink>
                    <FooterLinkNav style={{ color: "#757575" }}>
                      Popular NFTs
                    </FooterLinkNav>
                  </FooterLink>
                  <FooterLink>
                    <FooterLinkNav style={{ color: "#757575" }}>
                      Discussion boards
                    </FooterLinkNav>
                  </FooterLink>
                </FooterLinkNavs>
              </FooterLink>
              <FooterLink>
                <FooterLinkTitle>COMMUNITY</FooterLinkTitle>
                <FooterLinkNavs>
                  <ALink link="https://discord.gg/73Ru5XUP2X">
                    <FooterLinkNav>Discord</FooterLinkNav>
                  </ALink>
                  <ALink link="https://twitter.com/octoplace">
                    <FooterLinkNav>X(Twitter)</FooterLinkNav>
                  </ALink>
                  <FooterLink>
                    <FooterLinkNav style={{ color: "#757575" }}>
                      Supported blockchains
                    </FooterLinkNav>
                  </FooterLink>
                  <ALink link="https://linktr.ee/octoplace">
                    <FooterLinkNav>Linktree</FooterLinkNav>
                  </ALink>
                </FooterLinkNavs>
              </FooterLink>
              <FooterLink>
                <FooterLinkTitle>CONTACTS</FooterLinkTitle>
                <FooterLinkNavs>
                  <ALink link={`mailto:${contactEmail}`}>
                    <FooterLinkNav>Contact us</FooterLinkNav>
                  </ALink>
                  <ALink link={`mailto:${contactEmail}`}>
                    <FooterLinkNav>Get verified</FooterLinkNav>
                  </ALink>
                  <ALink link={`mailto:${contactEmail}`}>
                    <FooterLinkNav>Launchpad</FooterLinkNav>
                  </ALink>
                </FooterLinkNavs>
              </FooterLink>
              <FooterLink>
                <FooterLinkTitle>COMPANY</FooterLinkTitle>
                <FooterLinkNavs>
                  <FooterLink>
                    <FooterLinkNav style={{ color: "#757575" }}>
                      About us
                    </FooterLinkNav>
                  </FooterLink>
                  <FooterLink>
                    <FooterLinkNav style={{ color: "#757575" }}>
                      Project partnerships
                    </FooterLinkNav>
                  </FooterLink>
                  <FooterLink>
                    <FooterLinkNav style={{ color: "#757575" }}>
                      Blockchain partnerships
                    </FooterLinkNav>
                  </FooterLink>
                  <FooterLink>
                    <FooterLinkNav style={{ color: "#757575" }}>
                      Brand Kit
                    </FooterLinkNav>
                  </FooterLink>
                </FooterLinkNavs>
              </FooterLink>
            </FooterLinks>
          </FooterLinkContainer>
          <CDivider />
          <Col lg={11} sm={12} md={11}>
            <Box display="flex">
              <Box sx={styles.row}>
                <Typography>&#169; Copyright 2023</Typography>
              </Box>
              <Box sx={styles.legal}>
                <Typography sx={styles.legalText}>Terms & Conditions</Typography>
                <Typography sx={styles.legalText}>Privacy Policy</Typography>
                <Typography sx={styles.legalText}>Risks Disclamer</Typography>
                <Typography sx={styles.legalText}>Queries</Typography>
              </Box>
              <Box sx={styles.iconContainer}>
                <IconButton
                  href="https://twitter.com/octoplace"
                  target="_blank"
                  sx={styles.icon}
                >
                  <FaSquareXTwitter />
                </IconButton>
                <IconButton
                  target="_blank"
                  href="https://discord.gg/73Ru5XUP2X"
                  sx={styles.icon}
                >
                  <FaDiscord />
                </IconButton>
                <IconButton
                  href={`mailto:${contactEmail}`}
                  target="_blank"
                  sx={styles.icon}
                >
                  <EmailIcon />
                </IconButton>
              </Box>

            </Box>
          </Col>
        </ContainerWrapper>
      </nav>
      <ConnectWalletDlg open={walletDlgOpen} onClose={handleWalletClose} />
    </Fragment>
  );
};

const CDivider = styled(Divider)`
  width: 95%;
  background-color: white;
  height: 2;
  @media screen and (max-width: 768px) {
    width: 95vw;
  }
`;

const ContainerWrapper = styled.div`
  width: 100%;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterExplain = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
  @media screen and (max-width: 1120px) {
    gap: 35px;
    align-items: center;
  }
`;

const OctoLogo = styled.img`
  text-align: center;
  width: auto;
  height: 70px;
  cursor: pointer;
`;

const FooterLogo = styled.img`
  text-align: center;
  width: auto;
  height: 100px;
  cursor: pointer;
`;

const ExplainContent = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  width: 400px;
  textAlign: justify;
  color: #f4f4f4;
  @media screen and (max-width: 1120px) {
    width: auto;
  }
  @media screen and (max-width: 768px) {
    text-align: center;
  }
  @media screen and (max-width: 450px) {
    width: 260px;
  }
`;

const ExplainContent1 = styled.div`
  font-size: 16px;
  line-height: 20px;
  width: 400px;
  text-align: justify;
  color: #f4f4f4;
  @media screen and (max-width: 1120px) {
    width: auto;
  }
  @media screen and (max-width: 768px) {
    text-align: center;
  }
  @media screen and (max-width: 450px) {
    width: 260px;
  }
`;

const FooterLinkContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 60px 20px 70px 20px;
  @media screen and (max-width: 1120px) {
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 100px;
  text-align: center;
  @media screen and (max-width: 1440px) {
    gap: 40px;
    justify-content: space-between;
  }
  @media screen and (max-width: 768px) {
    gap: 32px;
    justify-content: space-around;
  }
  @media screen and (max-width: 425px) {
    flex-direction: column;
    align-items: center;
    justify-content: items-start;
    gap: 40px;
  }
`;

const FooterLinksWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 100px;
  @media screen and (max-width: 1120px) {
    /* justify-content: space-between; */
    gap: 75px;
  }
  @media screen and (max-width: 350px) {
    gap: 30px;
  }
`;

const FooterLink = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
  @media screen and (max-width: 768px) {
    width: 120px;
  }
  @media screen and (max-width: 425px) {
    gap: 30px;
  }
`;

const FooterLinkTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 18px;
  color: #f4f4f4;
  // font-family: "gotham-bold";
`;

const FooterLinkNavs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const FooterLinkNav = styled.div`
  color: #f4f4f4;
  font-size: 15px;
  line-height: 18px;
  cursor: pointer;
  :hover {
    background: linear-gradient(99.95deg, #cd9bf4 8.73%, #432ad9 83.74%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }
`;

const FooterSocialContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1120px) {
    flex-direction: column-reverse;
    gap: 75px;
  }
  @media screen and (max-width: 450px) {
    gap: 30px;
  }
`;

const FooterSocialContent = styled.div`
  color: #f4f4f4;
  font-size: 10px;
  line-height: 20px;
  width: 615px;
  @media screen and (max-width: 1120px) {
    width: auto;
  }
`;

const FooterSocialItems = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const FooterSocialItem = styled.img`
  width: 24px;
  height: auto;
  cursor: pointer;
  transition: all linear 0.2s;
  &:hover {
    filter: brightness(0) invert(1);
    color: #ffffff;
  }
  @media screen and (max-width: 450px) {
    width: 20px;
  }
`;
