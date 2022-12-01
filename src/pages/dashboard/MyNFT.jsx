/* eslint-disable react-hooks/exhaustive-deps */
import { Box, CircularProgress, Divider, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabUnstyled from "@mui/base/TabUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { Container, Row, Col } from "react-bootstrap";
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setAddressList } from "../../redux/slices/app-slice";
import { useWeb3React } from "@web3-react/core";
import {  resetCollections } from "../../redux/slices/my-nft-slice";
import { NFTCard } from "../../components/NFTCard";
import RefreshIcon from '@mui/icons-material/Refresh';
import { createAction } from "@reduxjs/toolkit";
import { MyListedNFT } from "./my-listed-nft";
const Tab = styled(TabUnstyled)`
  color: #6c6c6c;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  background-color: #3d3d3d;
  padding: 8px 24px;
  border-radius: 12px;
  border: none;
  display: flex;
  margin-right: 8px;
  &.Mui-selected {
    font-size: 14px;
    color: #3d3d3d;
    background-color: #f4f4f4;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
`;

const TabsList = styled(TabsListUnstyled)`
  background-color: #3d3d3d;
  padding: 0 8px 0 8px;
  margin-bottom: 10px;
  display: flex;
  align-content: space-evenly;
  border-radius: 8px;
  width: 900px;
  @media only screen and (max-width: 900px) {
    width: 90%;
  }
`;

export const MyNFT = () => {
  const [view, setView] = useState(3);
  const loading = useSelector(state => state.myNFT.isLoading);
  const { account, library } = useWeb3React();
  const nftAddrList = useSelector((state) => state.app.nftAddressList);
  const nfts = useSelector((state) => state.myNFT.nfts);
  const loggedAddress = useSelector(state => state.account.address);
  const nftOwner = useSelector(state => state.myNFT.ownerAddress);

  const dispatch = useDispatch();

  const getNFTs = async () => {
    const nftCol = collection(db, "nftAddresses");
    const nftSnapshot = await getDocs(nftCol);
    const nftAddressList = nftSnapshot.docs.map((doc) => {
      return doc.data();
    });
    dispatch(setAddressList(nftAddressList));
  };
  const getNFTDetails = async () => {
    if(nfts.length ===0){
      dispatch(createAction("LOAD_MY_NFTS")({nftAddrList, account}));
    }
  };

  useEffect(() => {
    if(!nftAddrList.length === 0){
      getNFTs();
    }
  }, []);

  useEffect(() => {
    if (account && library) {
      getNFTDetails();
    }
  }, [account, library]);

  const handleRefresh = async () => {
    if(account && library){
      dispatch(resetCollections());
      getNFTDetails();
    }
  }
  return (
    <Container>
      <Row>
        <Col>
          <TabsUnstyled defaultValue={0}>
            <Box sx={{ display: "flex", marginBottom: "24px", mt: "48px" }}>
              <TabsList>
                <Tab>My NFT</Tab>
                <Tab>Listed</Tab>
              </TabsList>
              <Box
                sx={{
                  width: "100%",
                  height: "38px",
                  borderRadius: "12px",
                  justifyContent: "flex-end",
                  display: "flex",
                  "& .MuiSvgIcon-root": { color: "#3d3d3d" },
                }}
              >
                <Paper sx={{ borderRadius: "10px" }}>
                  <Box display="flex" flexDirection="row">
                    <WindowOutlinedIcon
                      sx={{ p: 1, cursor: "pointer", fontSize: "2.2em" }}
                      onClick={() => setView(6)}
                    />
                    <Divider
                      sx={{ borderColor: "black" }}
                      orientation="vertical"
                      variant="middle"
                      flexItem
                    />
                    <GridOnOutlinedIcon
                      sx={{ p: 1, cursor: "pointer", fontSize: "2.2em" }}
                      onClick={() => setView(3)}
                    />
                    <Divider
                      sx={{ borderColor: "black" }}
                      orientation="vertical"
                      variant="middle"
                      flexItem
                    />
                    <RefreshIcon
                      sx={{ p: 1, cursor: "pointer", fontSize: "2.2em" }}
                      onClick={() => handleRefresh()}
                    />
                  </Box>
                </Paper>
              </Box>
            </Box>
            <TabPanel sx={{minHeight: '60vh'}} value={0}>
              <Grid container spacing={2}>
                {!account && (
                  <div style={{textAlign: "center", width: "100%", marginTop: "10vh"}}>
                    <Typography variant="h4" sx={{color:"grey", textAlign: "center"}}>Connect your wallet to browse your NFT's.</Typography>
                  </div>
                )}
                {(account && nfts.length === 0 && !loading) && (
                  <div style={{textAlign: "center", width: "100%", marginTop: "10vh"}}>
                  <Typography variant="h4" sx={{color:"grey", textAlign: "center"}}>You do not have any NFT's in your wallet.</Typography>
                </div>
                )}
                {view !== 1 &&
                  nfts.map((item, index) => {
                    return (
                      <Grid key={`index_${index}`} item xs={12} sm={6} md={view}>
                        {<NFTCard nft={item} view={view}/>}
                      </Grid>
                    );
                  })}
                {
                  loading && account && (
                    <div style={{textAlign: "center", width: "100%", marginTop: "10vh"}}>
              <CircularProgress color="primary" />
              </div>
                  )
                }
              </Grid>
            </TabPanel>
            <TabPanel value={1}>
            <MyListedNFT />
            </TabPanel>
          </TabsUnstyled>
        </Col>
        <Row>
          <Col></Col>
        </Row>
      </Row>
    </Container>
  );
};
