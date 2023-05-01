import { Box,  Divider, IconButton, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import discord from "../assets/discord.svg"
export const Footer = () => {
  return (
    <Fragment>
      <nav style={{ backgroundColor:"#3d3d3d", paddingTop:'30px'}}>
        <Container>
          <Row className="footer-row">
            <Col lg={6} sm={12} md={12}>
              <Box
                sx={{ color: "white" }}
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{ width: "100%", marginTop: "12px" }}
              >
                
              </Box>
            </Col>
            <Col lg={6} sm={12} md={12}>
              <Box
              className="community-box1"
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{ width: "100%", color: "white" }}
              >
                <Typography sx={{ fontSize: "16px" }}>
                  Join the community
                </Typography>
              </Box>
              <Box
              className="community-box2"
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{ width: "100%", color: "white" }}
              >
                <IconButton href="https://twitter.com/octoplace" target="_blank">
                  <TwitterIcon className="icon" />
                </IconButton>
                <IconButton target="_blank" href="https://discord.gg/73Ru5XUP2X">
                  <img width={30} src={discord} alt="discord" />
                </IconButton>
      
              </Box>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <Divider
                sx={{
                  bgcolor: "#f4f4f4",
                  mt: "16px",
                }}
              />
            </Col>
            <Col lg={12} sm={12} md={12}>
              <Box flexDirection="row" display="flex">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "white",
                  mt: "12px",mb:'12px', width:"100%"
                }}
              >
                <Typography sx={{ mr: 1, fontSize: "12px" }}>
                  &#169; 2023
                </Typography>
                <Typography sx={{ fontSize: "12px", alignSelf: "center" }}>
                  OCTO
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", color: "white",
                  mt: "12px",mb:'12px', width:"100%" }}>
                <Typography sx={{ mr: 3, fontSize: "12px" }}>
                  Privacy Policy
                </Typography>
                <Typography sx={{ fontSize: "12px", alignSelf: "center" }}>
                  Terms of Service
                </Typography>
              </Box>
              </Box>
            </Col>
            
          </Row>
        </Container>
      </nav>
    </Fragment>
  );
};
