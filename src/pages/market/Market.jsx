import React, { Fragment, useEffect, useState } from "react";
import MarketMenu from "../../components/MarketMenu";
import { useDispatch, useSelector } from "react-redux";
import { setActiveListings } from "../../redux/slices/listing-slice";
import { getActiveListings } from "../../utils/format-listings";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { NFTListingCard } from "../listings/components/ListingCard";
import { Col, Container, Row } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { NFTMarketCard } from "./compoents/nft-market-card";
import TuneIcon from "@mui/icons-material/Tune";
import FilterComponent from "../../components/FilterComponent";
// import Searchbox from "../../components/searchbox";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: ".3rem 1rem",
    fontSize: ".9rem",
    borderRadius: ".75rem",
    position: "relative",
    color: "#f4f4f4",
    backgroundColor: "transparent",
    border: "1px solid #ced4da",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: ".75rem",
      borderColor: "#ced4da",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
    "& .MuiSelect-icon": {
      color: "white",
    },
  },
}));

function Market({ isHome }) {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.allListings);
  const activeListings = useSelector((state) => state.listings.activeListings);
  const [view, setView] = useState(2);
  const marketItems = useSelector((state) => state.market.markets);
  const [orderMethod, setOrderMethod] = useState("Price: Low to High");
  const [openFilterMenu, setOpenFilterMenu] = useState(false);

  const handleChange = (event) => {
    setOrderMethod(event.target.value);
  };

  useEffect(() => {
    if (listings.length > 0) {
      const active = getActiveListings(listings);
      dispatch(setActiveListings(active));
    }
  }, [listings]);

  return (
    <Container>
      {!isHome && <MarketMenu />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#f4f4f4",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 600,
            }}
          >
            NFT
          </Typography>
          <FormControl sx={{ m: 1 }} variant="standard" size="small">
            <Select
              value={orderMethod}
              onChange={handleChange}
              input={<BootstrapInput />}
              sx={{
                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
            >
              <MenuItem value="Price: High to Low">High to Low</MenuItem>
              <MenuItem value="Price: Low to High">Low to High</MenuItem>
              <MenuItem value="Newest">Newest</MenuItem>
              <MenuItem value="Oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
          <IconButton
            sx={{
              border: "1px solid #c6c6c6",
              borderRadius: ".75rem",
              color: "#f4f4f4",
            }}
            // toggle filter menu
            onClick={() => setOpenFilterMenu(!openFilterMenu)}
          >
            <TuneIcon
              sx={{
                fontSize: "1rem",
              }}
            />
          </IconButton>
        </Box>
        <Box>{/* <Searchbox className="search-nav" type="text" /> */}</Box>
      </Box>
      <Fragment>
        <Grid container spacing={2}>
          {openFilterMenu && <FilterComponent filterPage={"Market"} />}

          {view !== 1 &&
            marketItems.length > 0 &&
            marketItems.map((item, index) => {
              return (
                <Grid key={`index_${index}`} item xs={12} sm={6} md={view}>
                  <NFTMarketCard marketItem={item} view={view} />
                </Grid>
              );
            })}
        </Grid>
      </Fragment>
    </Container>
  );
}

export default Market;
