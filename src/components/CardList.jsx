import { Box, Grid } from "@mui/material";
import React, { Fragment } from "react";
import { CollectionCard } from "../pages/collections/components/collection-card";
import { styled } from "@mui/system";

function CardList({ list, view }) {
  return (
    <Fragment>
      <CollectionCardContainer>
        {view !== 1 &&
          list.length > 0 &&
          list.map((collectionItem, index) => {
            return (
              <CollectionCard
                key={`index_${index}`}
                collectionItem={collectionItem}
              />
            );
          })}
      </CollectionCardContainer>
    </Fragment>
  );
}

const CollectionCardContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
}));

export default CardList;
