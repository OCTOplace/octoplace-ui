import { Box, Divider, IconButton, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaDiscord } from "react-icons/fa";
import { MailLockOutlined } from "@mui/icons-material";

export const Footer = () => {
  const styles =  {
    nav: {
      backgroundColor: "#262626",
      position: "relative",
      bottom: 0,
      width: "100%",
      paddingTop: 2,
    },
    row: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 1,
      color: "white",
      width: "100%",
      fontSize: "1rem",
      textWrap: 'nowrap'
    },
    legal: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 3,
      color: "#6C6C6C",
      mt: ".75rem",
      mb: ".75rem",
      width: "100%",
      fontSize: ".75rem",
      cursor: "pointer",
    },
    legalTextContainer: (theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        [theme.breakpoints.down(840)]: {
          display: 'none'
        }
    }),
    legalText: {
      textWrap: "nowrap",
      "&:hover": {
        color: "#F4F4F4",
      },
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    icon: {
      color: "#fff",
      "&:hover": {
        color: "#F78C09",
      },
    },
  };
  return (
    <Fragment>
      <nav style={styles.nav}>
        <Container>
          <Row>
            <Col lg={12} sm={12} md={12}>
              <Box display="flex">
                <Box sx={styles.row}>
                  <Typography>&#169; 2023 OCTO</Typography>
                </Box>
                <Box sx={styles.legal}>
                  <Box sx={styles.legalTextContainer}>
                    <Typography sx={styles.legalText}>Privacy Policy</Typography>
                    <Typography sx={styles.legalText}>
                      Terms of Service
                    </Typography>
                    <Typography sx={styles.legalText}>Risks Disclamer</Typography>
                  </Box>
                  <Box sx={styles.iconContainer}>
                    <IconButton
                      href="https://twitter.com/octoplace"
                      target="_blank"
                      sx={styles.icon}
                    >
                      <TwitterIcon />
                    </IconButton>
                    <IconButton
                      target="_blank"
                      href="https://discord.gg/73Ru5XUP2X"
                      sx={styles.icon}
                    >
                      <FaDiscord />
                    </IconButton>
                    <IconButton href="mailto:" target="_blank" sx={styles.icon}>
                      <EmailIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Col>
          </Row>
        </Container>
      </nav>
    </Fragment>
  );
};
