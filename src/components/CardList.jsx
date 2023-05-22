import { Grid } from "@mui/material";
import React, { Fragment } from "react";
import { CollectionCard } from "../pages/collections/components/collection-card";

function CardList({ list, view }) {
  return (
    <Fragment>
      <Grid container spacing={2}>
        {view !== 1 &&
          list.length > 0 &&
          list.map((collectionItem, index) => {
            console.log(collectionItem)
            return (
              <Grid key={`index_${index}`} item xs={12} sm={6} md={view}>
                <CollectionCard collectionItem={collectionItem} view={view} />
              </Grid>
            );
          })}
      </Grid>
    </Fragment>
  );
}

export default CardList;
