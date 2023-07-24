import { Box, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

import infoIcon from "../../assets/Infrormation_button.svg";

import CardList from "../../components/CardList";
import RowSlider from "../../components/RowSlider";
import CarouselCollection from "../../components/CarouselCollection";
import Searchbox from "../../components/searchbox";
import { getVisibleCollections } from "../../redux/thunk/getAllCollections";

export const CollectionsPage = () => {
  const dispatch = useDispatch();
  // const collections = useSelector((state) => {
  //   console.log(state.collection.collections.slice(0,49));
  //   return state.collection.collections.slice(0,49)
  // });

  // const collections = useSelector((state) => state.collection.collections);
  const [view, setView] = useState(2);
  const [collections, setCollections] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    const response = await getVisibleCollections({
      page: page,
      limit: 24,
      search,
    });
    const newItems = response.items;
    const uniqueNewItems = newItems.filter(
      (newItem) => !collections.some((item) => item.id === newItem.id)
    );
    const newTotalCount = response.totalCount;
    setCollections([...collections, ...uniqueNewItems]);
    setTotalCount(newTotalCount);
    if (collections.length >= newTotalCount) {
      setHasMore(false);
    } else {
      setPage(page + 1);
    }
    setLoading(false);
  };

  const handleSearch = (event) => {
    setLoading(true);
    setCollections([]);
    setPage(1);
    setSearch(event.target.value);
  };

  useEffect(() => {
    setCollections([]);
    setPage(1);
    setTotalCount(0);
    setHasMore(true);
    fetchCollections(1);
  }, [search]);

  return (
    <Box>
      <CarouselCollection />
      <RowSlider title="Popular Collections" />
      <Container>
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
              justifyContent: "flex-start",
              alignItems: "center",
              mb: 2,
              gap: 1,
            }}
          >
            <h3
              style={{
                color: "#f4f4f4",
                margin: 0,
              }}
            >
              Collections
            </h3>
            <Tooltip
              title={`Found a total of ${totalCount} collections.`}
              placement="right"
            >
              <img src={infoIcon} alt="" width={16} height={16} />
            </Tooltip>
          </Box>
          <Box>
            <Searchbox
              value={search}
              onChange={handleSearch}
              className="search-nav"
              type="text"
            />
          </Box>
        </Box>
        {/* {collections && <CardList list={collections} view={view} />} */}
        {collections && (
          <InfiniteScroll
            dataLength={collections.length}
            next={fetchCollections}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <CardList list={collections} view={view} />
          </InfiniteScroll>
        )}
        {!loading && collections.length === 0 && (
          <Typography
            sx={{
              m: 8,
              fontSize: "1.8em",
              color: "#f4f4f4",
              textAlign: "center",
            }}
          >
            NO COLLECTIONS FOUND
          </Typography>
        )}
      </Container>
    </Box>
  );
};
