import { Box, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState, memo } from "react";
import { styled } from "@mui/system";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TuneIcon from "@mui/icons-material/Tune";
import InfiniteScroll from "react-infinite-scroll-component";
import NFTCard from "./nft-card";
import { getNFTsForCollection } from "../../../redux/thunk/get-collection-nfts";
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

function NFTlist({ address, network, view }) {
  const [orderMethod, setOrderMethod] = useState("Price: Low to High");
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterParam, setFilterParam] = useState({
    minPrice: 0,
    maxPrice: 0,
    blockchain: "empty",
    collection: "empty",
    saleOnly: false,
    auctionOnly: false,
    offersReceived: false,
    includeBurned: false,
    traits: [],
  });
  const [totalCount, setTotalCount] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const defaultNFTs = [
    {
      contractAddress: "none",
    },
    {
      contractAddress: "none",
    },
    {
      contractAddress: "none",
    },
    {
      contractAddress: "none",
    },
    {
      contractAddress: "none",
    },
    {
      contractAddress: "none",
    },
    {
      contractAddress: "none",
    },
    {
      contractAddress: "none",
    },
    {
      contractAddress: "none",
    },
    {
      contractAddress: "none",
    },
    {
      contractAddress: "none",
    },
    {
      contractAddress: "none",
    },
  ];

  const fetchNFTs = async () => {
    const response = await getNFTsForCollection(address, {
      page: page,
      limit: 24,
      name: search,
      attributes: JSON.stringify(filterParam.traits),
    });
    const newItems = response.nfts;
    // const uniqueNewItems = newItems.filter(
    //   (newItem) => !nfts.some((item) => item.token_id === newItem.token_id)
    // );
    const newItemCount = response.count;
    setNfts([...nfts, ...newItems]);
    setAttributes(response.attributes);
    setFilteredCount(newItemCount);
    setTotalCount(response.totalCounts);
    if (nfts.length >= newItemCount) {
      setHasMore(false);
    } else {
      setPage(page + 1);
    }
    setLoading(false);
  };

  const handleOrder = (event) => {
    setOrderMethod(event.target.value);
  };

  const handleSearch = (event) => {
    setLoading(true);
    setNfts([]);
    setPage(1);
    setSearch(event.target.value);
  };

  const handleFilter = (filterParam) => {
    // console.log("///////////////////////////// handleFilter", filterParam);
    setLoading(true);
    setNfts([]);
    setPage(1);
    setFilterParam(filterParam);
  };

  useEffect(() => {
    setNfts([]);
    setPage(1);
    setTotalCount(0);
    setFilteredCount(0);
    setHasMore(true);
    fetchNFTs();
  }, [search, filterParam]);

  return (
    <Box>
      <NFTActionContainer>
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
            value={search}
            onChange={handleSearch}
            className="search-nav"
            type="text"
          />
        </Box>
      </NFTActionContainer>
      <NFTContentContainer>
        {openFilterMenu && (
          <FilterComponent
            filterPage={"Collection"}
            unionTraits={attributes}
            filterParam={filterParam}
            handleFilter={handleFilter}
          />
        )}
        {loading && (
          <SkeletonContainer>
            {[...Array(12)].map((e, i) => (
              <Skeleton variant="rounded" width={200} height={270} key={i} />
            ))}
          </SkeletonContainer>
        )}
        {!loading && nfts && nfts.length > 0 && (
          <InfiniteScroll
            dataLength={nfts.length}
            next={fetchNFTs}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <CollectionCardContainer>
              {view !== 1 &&
                nfts &&
                nfts.length > 0 &&
                nfts.map((item, index) => {
                  return (
                    <NFTCard nft={item} view={view} key={`index_${index}`} />
                  );
                })}
            </CollectionCardContainer>
          </InfiniteScroll>
        )}
        {!loading && nfts.length === 0 && (
          <Typography
            sx={{
              width: "100%",
              m: 8,
              fontSize: "1.8em",
              color: "#f4f4f4",
              textAlign: "center",
            }}
          >
            NO NFTS FOUND
          </Typography>
        )}
      </NFTContentContainer>
    </Box>
  );
}

const NFTActionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#f4f4f4",
  mb: 2,
  gap: "8px",
  [theme.breakpoints.down(540)]: {
    flexDirection: "column",
    alignItems: "flex-start",
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
  gap: "16px",
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

export default memo(NFTlist);
