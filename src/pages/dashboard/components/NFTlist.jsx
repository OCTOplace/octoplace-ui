import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { NFTListingCard } from "../../listings/components/ListingCard";
import { Col, Container, Row } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import TuneIcon from "@mui/icons-material/Tune";
import FilterComponent from "../../../components/FilterComponent";
import Searchbox from "../../../components/searchbox";

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
  },
}));

function NFTlist({ activeListings, view }) {
  const [orderMethod, setOrderMethod] = useState("Price: Low to High");
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filterObj, setFilterObj] = useState({
    minPrice: 0,
    maxPrice: 0,
    blockchain: "empty",
    collection: "empty",
    saleOnly: false,
    auctionOnly: false,
    offersReceived: false,
    includeBurned: false,
  });

  const handleOrder = (event) => {
    setOrderMethod(event.target.value);
  };

  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };

  const handleFilter = (filterObj) => {
    setFilterObj(filterObj);
  };

  const filteredNFTItems = activeListings.filter((item) => {
    if (
      item.metadata &&
      item.metadata.name &&
      !item.metadata.name.toLowerCase().includes(keyword.toLowerCase())
    ) {
      return false;
    }

    if (filterObj.saleOnly && !item.saleOnly) {
      return false;
    }

    if (filterObj.offersReceived && !item.offersReceived) {
      return false;
    }

    if (filterObj.includeBurned && !item.includeBurned) {
      return false;
    }

    if (
      filterObj.blockchain !== "empty" &&
      item.network.toLowerCase() !== filterObj.blockchain
    ) {
      return false;
    }

    if (
      filterObj.collection !== "empty" &&
      item.contractAddress !== filterObj.collection
    ) {
      return false;
    }

    return true;
  });

  return (
    <Box>
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
              onChange={handleOrder}
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
        <Box>
          <Searchbox
            value={keyword}
            onChange={handleSearch}
            className="search-nav"
            type="text"
          />
        </Box>
      </Box>
      <Fragment>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          {openFilterMenu && (
            <FilterComponent
              filterPage={"Dashboard"}
              filterParam={filterObj}
              handleFilter={(obj) => handleFilter(obj)}
            />
          )}
          <Grid container spacing={2}>
            {view !== 1 &&
              filteredNFTItems.length > 0 &&
              filteredNFTItems.map((item, index) => {
                return (
                  <Grid key={`index_${index}`} item xs={12} sm={6} md={view}>
                    <NFTListingCard
                      listingItem={{ listingNFT: item }}
                      view={view}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Fragment>
    </Box>
  );
}

export default NFTlist;
