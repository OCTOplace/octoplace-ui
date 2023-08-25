import { Box, Grid } from "@mui/material";
import React, { Fragment } from "react";
import { CollectionCard } from "../pages/collections/components/collection-card";
import { styled } from '@mui/system'

function CardList({ list, view }) {
  return (
    <Fragment>
      <CollectionCardContainer>
        {view !== 1 &&
          list.length > 0 &&
          list.map((collectionItem, index) => {
            return (
                <CollectionCard key={`index_${index}`} collectionItem={collectionItem} view={view} />
                );
              })}
      </CollectionCardContainer>
    </Fragment>
  );
}

const CollectionCardContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: '16px',
  [theme.breakpoints.down(1420)]: {
    gridTemplateColumns:'repeat(5, 1fr)'
  },
  [theme.breakpoints.down(1200)]: {
    gridTemplateColumns:'repeat(4, 1fr)'
  },
  [theme.breakpoints.down(992)]: {
    gridTemplateColumns:'repeat(3, 1fr)'
  },
  [theme.breakpoints.down(768)]: {
    gridTemplateColumns:'repeat(2, 1fr)'
  },
  [theme.breakpoints.down(450)]: {
    gridTemplateColumns:'repeat(1, 1fr)'
  },
}))

export default CardList;
