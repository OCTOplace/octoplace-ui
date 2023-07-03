import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState, memo } from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { NFTCard } from "./nft-card";
import FilterComponent from "../../../components/FilterComponent";
import Searchbox from "../../../components/searchbox";
import TuneIcon from "@mui/icons-material/Tune";

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

function NFTlist({ nfts, view }) {
  const [orderMethod, setOrderMethod] = useState("Price: Low to High");
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filterObj, setFilterObj] = useState(
    {
      minPrice: 0,
      maxPrice: 0,
      blockchain: "empty",
      collection: "empty",
      saleOnly: false,
      auctionOnly: false,
      offersReceived: false,
      includeBurned: false,
      selectedTraits: [],
    }
  );

  const handleOrder = (event) => {
    setOrderMethod(event.target.value);
  };

  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };

  const handleFilter = (filterObj) => {
    setFilterObj(filterObj);
  };

  let unionTraits = [];
  if (nfts) {
    const traits = [];

    // Loop through each object in the array
    for (let i = 0; i < nfts.length; i++) {
      const metadata = nfts[i].metadata;

      if (!metadata.attributes) {
        continue;
      }

      // Loop through each attribute in the metadata object
      for (let j = 0; j < metadata.attributes.length; j++) {
        const attribute = metadata.attributes[j];

        // Check if the trait_type already exists in the traits array
        const index = traits.findIndex((t) => t.trait_type === attribute.trait_type);

        // If it does, add the value to the existing object only if it doesn't already exist
        if (index !== -1) {
          const valueIndex = traits[index].value.findIndex((v) => v.value === attribute.value);

          if (valueIndex !== -1) {
            traits[index].value[valueIndex].count++;
          } else {
            traits[index].value.push({ value: attribute.value, count: 1 });
          }

          traits[index].count++;
        } else {
          // If it doesn't, create a new object with the trait_type, value and count
          traits.push({ trait_type: attribute.trait_type, value: [{ value: attribute.value, count: 1 }], count: 1 });
        }
      }
    }

    unionTraits = [];

    // Loop through each object in the traits array
    for (let i = 0; i < traits.length; i++) {
      const trait = traits[i];

      // Check if the trait_type value already exists in the unionTraits array
      const index = unionTraits.findIndex((t) => t.trait_type === trait.trait_type);

      // If it does, merge the value arrays only if they don't overlap
      if (index !== -1) {
        const mergedValues = unionTraits[index].value.concat(trait.value.filter((v) => !unionTraits[index].value.some((u) => u.value === v.value)));
        unionTraits[index].value = mergedValues;
        unionTraits[index].count += trait.count;
      } else {
        // If it doesn't, create a new object with the trait_type and merged values
        unionTraits.push({ trait_type: trait.trait_type, value: trait.value, count: trait.count });
      }
    }
    
  }

  const filteredNFTItems = nfts && nfts.filter((item) => {
    if (item.metadata.name && !item.metadata.name.toLowerCase().includes(keyword.toLowerCase())) {
      return false;
    }

    if (filterObj.saleOnly && !item.saleOnly) {
      return false;
    }

    if (filterObj.auctionOnly && !item.auctionOnly) {
      return false;
    }

    if (filterObj.offersReceived && !item.offersReceived) {
      return false;
    }

    if (filterObj.includeBurned && !item.includeBurned) {
      return false;
    }

    if (filterObj.minPrice !== 0 && parseInt(item.price, 10) < filterObj.minPrice) {
      return false;
    }

    if (filterObj.maxPrice !== 0 && parseInt(item.price, 10) > filterObj.maxPrice) {
      return false;
    }

    for (let i = 0; i < filterObj.selectedTraits.length; i++) {
      const traitType = filterObj.selectedTraits[i].trait_type;
      const values = filterObj.selectedTraits[i].value;

      // Check if the object has the selected trait type
      const metadata = item.metadata;
      if (!metadata.attributes) {
        continue;
      }

      const index = metadata.attributes.findIndex((a) => a.trait_type === traitType);
      
      if (index === -1) {
        return false;
      }
      else {
        // Check if the object's value for the selected trait type is in the selected values array
        if (values && !values.includes(metadata.attributes[index].value)) {
          return false;
        }
      }
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
        <Box><Searchbox value={keyword} onChange={handleSearch} className="search-nav" type="text" /></Box>
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
          {openFilterMenu && <FilterComponent filterPage={"Collection"} unionTraits={unionTraits} filterObject={filterObj} handleFilter={(obj) => handleFilter(obj)} />}
          <Grid container spacing={2}>
            {view !== 1 &&
              nfts &&
              filteredNFTItems.length > 0 &&
              filteredNFTItems.map((item, index) => {
                return (
                  <Grid key={`index_${index}`} item xs={12} sm={6} md={view}>
                    <NFTCard nft={item} view={view} />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Fragment>
    </Box>
  );
}

export default memo(NFTlist);
