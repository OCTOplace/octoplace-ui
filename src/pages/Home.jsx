import { Box, Grid, Paper } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
export const Home = () => {
  return (
    <Container>
      <Row className="home-container">
        <Col lg={6} md={6} sm={12}>
          <Paper className="paper-menu">
            <h3>Active Listings</h3>
          </Paper>
        </Col>
        <Col lg={6} md={6} sm={12}>
          <Paper className="paper-menu">
            <h3>My NFT's</h3>
          </Paper>
        </Col>
      </Row>
          </Container>
  );
};
