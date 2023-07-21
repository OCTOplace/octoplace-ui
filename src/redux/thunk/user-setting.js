import axios from "axios";

const registerOrFetchUserSetting = async (address, network) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  try {
    const result = await axios.post(`${apiUrl}/users/register`, {
      address: address,
      network: network,
    });
    return result.data;
  } catch (error) {
    // Handle error here, e.g. show an error message
    console.log("Error fetching user setting:", error);
    throw new Error("Failed to fetch user setting");
  }
};

const updateUserSetting = async (userObj) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  try {
    const result = await axios.post(`${apiUrl}/users/update`, {
      user: userObj,
    });
    return result.data;
  } catch (error) {
    // Handle error here, e.g. show an error message
    console.log("Error updating user setting:", error);
    throw new Error("Failed to update user setting");
  }
};

const updateUserTopNFT = async (nftObj) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  try {
    const result = await axios.post(`${apiUrl}/users/update-top-nft`, {
      topNFT: nftObj,
    });
    return result.data;
  } catch (error) {
    // Handle error here, e.g. show an error message
    console.log("Error updating user setting:", error);
    throw new Error("Failed to update user setting");
  }
};

const fetchUserSetting = async (address) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  try {
    const result = await axios.get(
      `${apiUrl}/users/find/${address}?${Date.now()}`
    );
    return result.data;
  } catch (error) {
    // Handle error here, e.g. show an error message
    console.log("Error getting user setting:", error);
    throw new Error("Failed to fetch user setting");
  }
};

const fetchUserTopNFTs = async (address) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  try {
    const result = await axios.get(
      `${apiUrl}/users/find-top-nft/${address}?${Date.now()}`
    );
    return result.data;
  } catch (error) {
    // Handle error here, e.g. show an error message
    console.log("Error getting user setting:", error);
    throw new Error("Failed to fetch user setting");
  }
};

export {
  registerOrFetchUserSetting,
  updateUserSetting,
  updateUserTopNFT,
  fetchUserSetting,
  fetchUserTopNFTs,
};
