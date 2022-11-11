import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TextBox from "../components/text";
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
                <Typography sx={{ fontSize: "16px" }}>Subscribe</Typography>
                <Typography
                  sx={{ fontSize: "12px", ml: "25px", alignSelf: "center" }}
                >
                  Join our mailing service
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{ width: "100%", marginTop: "12px" }}
              >
                <TextBox placeholder="Your email address" />
                <Button
                  variant="outlined"
                  sx={{
                    width: "120px",
                    borderRadius: "20px",
                    marginLeft: "16px",
                  }}
                >
                  Sign Up
                </Button>
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
                <IconButton>
                  <TwitterIcon className="icon" />
                </IconButton>
                <IconButton>
                  <FacebookIcon className="icon" />
                </IconButton>
                <IconButton>
                  <InstagramIcon className="icon" />
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
                  &#169; 2022
                </Typography>
                <Typography sx={{ fontSize: "12px", alignSelf: "center" }}>
                  SkeletonArts.Studio
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", color: "white",
                  mt: "12px",mb:'12px', width:"100%" }}>
                <Typography sx={{ mr: 3, fontSize: "12px" }}>
                  Provicy Policy
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
