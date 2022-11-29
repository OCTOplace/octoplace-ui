/* eslint-disable react-hooks/exhaustive-deps */
import { Paper } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, {useEffect} from 'react'
import { useDispatch } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { setAddressList } from "../redux/slices/app-slice";

export const Home = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const getNFTs = async () => {
    const nftCol = collection(db, "nftAddresses");
    const nftSnapshot = await getDocs(nftCol);
    const nftAddressList = nftSnapshot.docs.map((doc) => {
      return doc.data();
    });
    dispatch(setAddressList(nftAddressList));
  };

  useEffect(() => {
    getNFTs();
  }, []);
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
