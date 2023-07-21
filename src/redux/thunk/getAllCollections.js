import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getAllCollections = createAsyncThunk(
  "collections/getAllCollections",
  async (network, thunkAPI) => {
    let items = [];
    // const result = await axios.get(`${apiUrl}/nft/get-collections`);
    const result = await axios.get(
      `${apiUrl}/collections/listAllVisible?limit=5000`
    );
    items = result.data.items.map((item) => {
      let slug = slugify(item.collectionName);
      return { ...item, slug };
    });
    // items =items.filter(item => item.site !== "thetadrop");
    return items;
  }
);

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
