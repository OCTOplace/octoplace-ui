/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Divider,
  Grid,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabUnstyled from "@mui/base/TabUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { Container, Row, Col } from "react-bootstrap";
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";
import { Fragment, useState } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { rpc, swapContract } from "../../connectors/address";
import { Contract } from "@ethersproject/contracts";
import swapAbi from "../../abi/swap.json";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetListings,
  setActiveListings,
  setAllListings,
  setCompletedListings,
} from "../../redux/slices/listing-slice";
import {
  formatListings,
  getActiveListings,
  getCompletedListings,
  metadataUrl,
} from "../../utils/format-listings";
import { Refresh } from "@mui/icons-material";
import { ActiveListings } from "./components/active";
import erc721Abi from "../../abi/erc721.json";
import axios from "axios";

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

export const Listings = () => {
  const [view, setView] = useState(3);
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.allListings);
  const getListings = async () => {
    dispatch(resetListings());
    const provider = new JsonRpcProvider(rpc);
    try {
      const contract = new Contract(swapContract, swapAbi, provider);
      let listings = await contract.readAllListings();
      listings = formatListings(listings);
      dispatch(setAllListings(listings));
      dispatch(setActiveListings(getActiveListings(listings)));
      dispatch(setCompletedListings(getCompletedListings(listings)));
    } catch (err) {
      console.log("Error fetching the listings:", err);
    }
  };

  useEffect(() => {
    
    getListings();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <TabsUnstyled defaultValue={0}>
            <Box sx={{ display: "flex", marginBottom: "24px", mt: "48px" }}>
              <TabsList>
                <Tab>Active Listings</Tab>
                <Tab>Swap Completed</Tab>
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
                    <Refresh
                      sx={{ p: 1, cursor: "pointer", fontSize: "2.2em" }}
                      onClick={() => {getListings()}}
                    />
                  </Box>
                </Paper>
              </Box>
            </Box>
            <TabPanel sx={{ minHeight: "60vh" }} value={0}>
              <Fragment>
                {listings && listings.length > 0 && (
                  <ActiveListings
                    view={view}
                    listings={getActiveListings(listings)}
                  />
                )}
              </Fragment>
            </TabPanel>
            <TabPanel value={1}>Content two</TabPanel>
          </TabsUnstyled>
        </Col>
        <Row>
          <Col></Col>
        </Row>
      </Row>
    </Container>
  );
};
