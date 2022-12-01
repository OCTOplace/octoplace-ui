/* eslint-disable react-hooks/exhaustive-deps */
import { Paper } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React from 'react'

export const Home = () => {
   const navigate = useNavigate();
   

  
  return (
    <Container>
      <Row className="home-container">
        <Col lg={6} md={6} sm={12}>
          <Paper onClick={() => navigate('listing')} className="paper-menu">
            <h3>Active &nbsp;Listings</h3>
          </Paper>
        </Col>
        <Col lg={6} md={6} sm={12}>
          <Paper onClick={() => navigate('my-nft')} className="paper-menu">
            <h3>My NFT</h3>
          </Paper>
        </Col>
      </Row>
          </Container>
  );
};
