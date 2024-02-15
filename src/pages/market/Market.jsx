/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import MarketMenu from "../../components/MarketMenu";
import { useDispatch, useSelector } from "react-redux";
import { getAllMarketItems } from "../../redux/thunk/get-all-market-items";
import { Box, IconButton, Skeleton, Typography } from "@mui/material";
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
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import {
  setAddToMarkets,
  setCurrentPage,
  setHasMore,
  setNextPage,
  setTotalCount,
} from "../../redux/slices/market-slice";
import { useWeb3React } from "@web3-react/core";

const apiUrl = process.env.REACT_APP_LOGGING_API_URL;

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
  const {account} = useWeb3React();
  const [view, setView] = useState(2);
  const isLoading = useSelector((state) => state.market.isLoading);
  const marketItems = useSelector((state) => state.market.markets);
  const [orderMethod, setOrderMethod] = useState("Newest");
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const pageNumber = useSelector((state) => state.market.currentPage);
  const nextPage = useSelector((state) => state.market.nextPage);
  const hasMore = useSelector((state) => state.market.hasMore);
  const marketSettings = useSelector(
    (state) => state.marketSettings.marketplaces
  );
  const marketSymbols = useSelector((state) => state.marketSettings.symbols);
  const [filterObj, setFilterObj] = useState({
    minPrice: 0,
    maxPrice: 0,
    blockchain: "empty",
    collection: "empty",
    saleOnly: false,
    auctionOnly: false,
    offersReceived: false,
    includeBurned: false,
    onlyMyListings:false
  });

  useEffect(() => {
      if (marketSettings && marketSettings.length > 0) {
        if (marketSymbols && marketSymbols.length > 0) {
          dispatch(getAllMarketItems({ symbols: marketSymbols, pageNumber:1 }));
        }
      }
    
  }, [marketSettings]);
  const fetchNext = async () => {
    if (nextPage && marketSymbols) {
      let items = [];
      const result = await axios.post(
        `${apiUrl}/api/market-place/get-active-listings-by-page`,
        {
          symbols: marketSymbols,
          pageSize: 18,
          pageNumber: nextPage,
          sortBy: "desc",
        }
      );
      items = result.data.marketItems;
      if (result.data.marketItems.length > 0) {
        dispatch(setAddToMarkets(items));
        dispatch(setCurrentPage(nextPage));
        dispatch(setNextPage(nextPage + 1));
        dispatch(setTotalCount(result.data.total));
        if(result.data.marketItems.length === 18){
          dispatch(setHasMore(true));
        }else{
          dispatch(setHasMore(false));
        }
      }else{
        dispatch(setHasMore(false));
        dispatch(setTotalCount(result.data.total));
      }
    }
  };
  const handleOrder = (event) => {
    setOrderMethod(event.target.value);
  };

  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };

  const handleFilter = (filterObj) => {
    setFilterObj(filterObj);
  };

  const sortByOrderMethod = (items, orderMethod) => {
    const sortedItems = [...items];
    switch (orderMethod) {
      case "Price: Low to High":
        return sortedItems.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return sortedItems.sort((a, b) => b.price - a.price);
      case "Newest":
        return sortedItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "Oldest":
        return sortedItems.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      default:
        return sortedItems.sort((a, b) => a.price - b.price);
    }
  };

  const filteredMarketItems = marketItems.filter((item) => {
    if (item.isSold) {
      return false;
    }

    if (
      item.nftDetails &&
      item.nftDetails.metadata &&
      item.nftDetails.metadata.name &&
      !item.nftDetails.metadata.name
        .toLowerCase()
        .includes(keyword.toLowerCase())
    ) {
      return false;
    }

    if (
      filterObj.minPrice !== 0 &&
      parseInt(item.price, 10) < filterObj.minPrice
    ) {
      return false;
    }

    if(filterObj.onlyMyListings === true && item.seller.toLowerCase() !== account.toLowerCase()){
      return false;
    }
    if (
      filterObj.maxPrice !== 0 &&
      parseInt(item.price, 10) > filterObj.maxPrice
    ) {
      return false;
    }

    if (
      filterObj.blockchain !== "empty" &&
      item.network?.toLowerCase() !== filterObj.blockchain?.toLowerCase()
    ) {
      return false;
    }

    if (
      filterObj.collection !== "empty" &&
      item.nftContract?.toLowerCase() !== filterObj.collection?.toLowerCase()
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
          <InfiniteScroll
            dataLength={filteredMarketItems.length}
            next={fetchNext}
            hasMore={hasMore}
            style={{ width: "100%" }}
          >
            <CollectionCardContainer>
              {!isLoading &&
                view !== 1 &&
                filteredMarketItems.length > 0 &&
                sortByOrderMethod(filteredMarketItems, orderMethod).map(
                  (item, index) => {
                    return (
                      <NFTMarketCard
                        marketItem={item}
                        view={view}
                        key={`index_${index}`}
                      />
                    );
                  }
                )}
              {!isLoading && view !== 1 && filteredMarketItems.length === 0 && (
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                    height: "200px",
                  }}
                >
                  <Typography
                    style={{
                      width: "100%",
                      color: "#f4f4f4",
                      fontSize: "1.5rem",
                    }}
                  >
                    There are currently no items available in the market.
                  </Typography>
                </Box>
              )}

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
          </InfiniteScroll>
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
