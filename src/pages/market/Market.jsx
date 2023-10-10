import React, { useEffect, useState } from "react";
import MarketMenu from "../../components/MarketMenu";
import { useSelector } from "react-redux";
// import { setActiveListings } from "../../redux/slices/listing-slice";
// import { getActiveListings } from "../../utils/format-listings";
import { Box, IconButton, Skeleton, Typography } from "@mui/material";
// import { NFTListingCard } from "../listings/components/ListingCard";
import { Container } from "react-bootstrap";
import { styled } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { NFTMarketCard } from "./compoents/nft-market-card";
import TuneIcon from "@mui/icons-material/Tune";
import FilterComponent from "../../components/FilterComponent";
import Searchbox from "../../components/searchbox";
// import Skelethon from "./compoents/sketlethon";

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
  // const dispatch = useDispatch();
  // const listings = useSelector((state) => state.listings.allListings);
  // const activeListings = useSelector((state) => state.listings.activeListings);
  const [view, setView] = useState(2);
  const marketItems = useSelector((state) => state.market.markets);
  const isLoading = useSelector((state) => state.market.isLoading);
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

  useEffect(() => {}, [marketItems]);

  const handleOrder = (event) => {
    setOrderMethod(event.target.value);
  };

  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };

  const handleFilter = (filterObj) => {
    setFilterObj(filterObj);
  };

  const filteredMarketItems = marketItems.filter((item) => {
    if (
      item.TokenName &&
      !item.TokenName.toLowerCase().includes(keyword.toLowerCase())
    ) {
      return false;
    }

    if (
      filterObj.minPrice !== 0 &&
      parseInt(item.Price, 10) < filterObj.minPrice
    ) {
      return false;
    }

    if (
      filterObj.maxPrice !== 0 &&
      parseInt(item.Price, 10) > filterObj.maxPrice
    ) {
      return false;
    }

    if (
      filterObj.blockchain !== "empty" &&
      item.Network.toLowerCase() !== filterObj.blockchain
    ) {
      return false;
    }

    if (
      filterObj.collection !== "empty" &&
      item.NFTContractAddress !== filterObj.collection
    ) {
      return false;
    }

    return true;
  });

  return (
    <Container>
      <NFTListContainer>
        {!isHome && <MarketMenu />}
        <NFTSettingContainer>
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
        </NFTSettingContainer>
        <NFTContentContainer>
          {openFilterMenu && (
            <FilterComponent
              filterPage={"Market"}
              filterParam={filterObj}
              handleFilter={(obj) => handleFilter(obj)}
            />
          )}
          <CollectionCardContainer>
            {view !== 1 &&
              filteredMarketItems.length > 0 &&
              filteredMarketItems.map((item, index) => {
                return (
                  <NFTMarketCard
                    marketItem={item}
                    view={view}
                    key={`index_${index}`}
                  />
                );
              })}
            {isLoading && (
              <SkeletonContainer>
                {[...Array(12)].map((e, i) => (
                  <Box className="nft-card-link">
                    <Skeleton
                      className="mySkeleton"
                      variant="rounded"
                      key={i}
                      animation="wave"
                      style={{
                        borderRadius: "0.75rem",
                        marginBottom: "16px",
                        width: "100%",
                        height: "0",
                        paddingTop: "145%",
                      }}
                    />
                  </Box>
                ))}
              </SkeletonContainer>
            )}
          </CollectionCardContainer>
        </NFTContentContainer>
      </NFTListContainer>
    </Container>
  );
}

const NFTListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

const NFTSettingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: "16px",
  alignItems: "center",
  color: "#f4f4f4",
  mb: 2,
  [theme.breakpoints.down(490)]: {
    flexDirection: "column",
  },
}));

const NFTContentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "16px",
  [theme.breakpoints.down(992)]: {
    flexDirection: "column",
  },
}));

const CollectionCardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
}));

const SkeletonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
}));

export default Market;
