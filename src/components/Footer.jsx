import { Box, Divider, IconButton, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import discord from "../assets/discord.svg";
import { MailLockOutlined } from "@mui/icons-material";

export const Footer = () => {
  return (
    <Fragment>
      <nav
        style={{
          backgroundColor: "#262626",
          position: "relative",
          bottom: 0,
          width: "100%",
          paddingTop: "30px",
        }}
      >
        <Container>
          <Row>
            {/* <Col lg={12} md={12} sm={12}>
              <Divider
                sx={{
                  bgcolor: "#f4f4f4",
                  mt: "16px",
                }}
              />
            </Col> */}
            <Col lg={12} sm={12} md={12}>
              <Box flexDirection="row" display="flex">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                    color: "white",
                    width: "100%",
                    fontSize: "16px",
                  }}
                >
                  <Typography>&#169; 2023</Typography>
                  <Typography>OCTO</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 3,
                    color: "#6C6C6C",
                    mt: "12px",
                    mb: "12px",
                    width: "100%",
                    fontSize: "12px",
                  }}
                >
                  <Typography>Privacy Policy</Typography>
                  <Typography>Terms of Service</Typography>
                  <Typography>Risks Disclamer</Typography>
                  <div>
                    <IconButton
                      href="https://twitter.com/octoplace"
                      target="_blank"
                      color="primary"
                    >
                      <TwitterIcon className="icon" />
                    </IconButton>
                    <IconButton
                      target="_blank"
                      href="https://discord.gg/73Ru5XUP2X"
                    >
                      <img width={26} src={discord} alt="discord" />
                    </IconButton>
                    <IconButton href="mailto:" target="_blank" color="primary">
                      <EmailIcon className="icon" />
                    </IconButton>
                  </div>
                </Box>
              </Box>
            </Col>
          </Row>
        </Container>
      </nav>
    </Fragment>
  );
};
