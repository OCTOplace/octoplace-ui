/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { swapAbi } from "../../connectors/address";
import { Contract } from "@ethersproject/contracts";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { NFTDetails } from "../../components/nft-details";
import { NFTCardDetails } from "../../components/nft-card-details";
import { OfferList } from "../../components/offer-list/offer-list";
import { ListNFTDialog } from "./dialogs/list-nft-dlg";
import { toast } from "react-toastify";
import { OfferNFTDialog } from "./dialogs/offer-nft-dlg";
import { getNetworkInfo } from "../../connectors/networks";
import {
  setTxDialogFailed,
  setTxDialogHash,
  setTxDialogPending,
  setTxDialogSuccess,
  showTxDialog,
} from "../../redux/slices/app-slice";
import { SendNFT } from "./dialogs/send-nft";
import { NFTDiscussions } from "../../components/discussions/nft-discussions";
import { getCommonNFTDetail } from "../../redux/thunk/getNftDetail";
import { SellNFT } from "./dialogs/nft-sell";
import { parseUnits } from "@ethersproject/units";
import { Container } from "react-bootstrap";
import { styled } from "@mui/system";
import { useGTMDispatch } from "@elgorditosalsero/react-gtm-hook";
import {
  abortTxProcess,
  completeTxProcess,
  startTxProcess,
} from "../../redux/slices/tx-slice";
import { txInitiators, txStatus } from "../../constants/tx-initiators";
import { getSelectedListing } from "../../redux/thunk/getSelectedListing";
import { setSelectedListing } from "../../redux/slices/listing-slice";
import { getActiveListingsFromLoggingAPI } from "../../redux/thunk/get-active-listings";
import { getAllMarketItems } from "../../redux/thunk/get-all-market-items";
import { getSelectedMarketItem } from "../../redux/thunk/getSelectedMarketItem";

//create your forceUpdate hook
function useForceUpdate() {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
}

export const NFTView = () => {
  const { network, address, tokenId } = useParams();
  const sendDataToGTM = useGTMDispatch();
  const market = useSelector((state) => state.market.selectedMarketItem);
  const [listDlgOpen, setListDlgOpen] = useState(false);
  const [offerDlgOpen, setOfferDlgOpen] = useState(false);
  const [metadata, setMetadata] = useState();
  const marketItems = useSelector((state) => state.market.markets);
  const [collectionName, setCollectionName] = useState("");
  const [owner, setOwner] = useState("");
  const [isListedForSwap, setListedForSwap] = useState(false);
  const { account, chainId } = useWeb3React();
  const [sendOpen, setSendOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [isUpdatePrice, setIsUpdatePrice] = useState(false);
  const [loading, setLoading] = useState(true);
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.account.balance);

  const selectedListing = useSelector(
    (state) => state.listings.selectedListing
  );
  const isMarketLoading = useSelector((state) => state.market.isLoading);
  const isListingsLoading = useSelector((state) => state.listings.isLoading);

  const { txInitiator, status } = useSelector((state) => state.txProcess);

  useEffect(() => {
    return () => {
      dispatch(setSelectedListing());
      setListedForSwap(false);
    };
  }, []);

  useEffect(() => {
    if (!isMarketLoading && !isListingsLoading) {
      setLoading(false);
    }
  }, [isMarketLoading, isListingsLoading]);
  useEffect(() => {
    if (network && address && tokenId) {
      dispatch(
        getSelectedListing({
          network,
          address,
          tokenId,
        })
      );
    }
  }, [network, address, tokenId]);

  const updateAfterListing = () => {
    dispatch(
      getSelectedListing({
        network,
        address,
        tokenId,
      })
    );
  };
  useEffect(() => {
    if (
      txInitiator === txInitiators.REMOVE_SWAP_LISTING &&
      status === txStatus.COMPLETED
    ) {
      dispatch(getActiveListingsFromLoggingAPI());
      setListedForSwap(false);
      toast.success("NFT Listing removed!");
      dispatch(setTxDialogSuccess(true));
      dispatch(setTxDialogPending(false));
      dispatch(setTxDialogFailed(false));
      dispatch(completeTxProcess());
    }
    if (
      txInitiator === txInitiators.REMOVE_MARKET_LISTING &&
      status === txStatus.COMPLETED
    ) {
      dispatch(getSelectedMarketItem({ network, address, tokenId }));
      getDetailsFromSite();
      dispatch(setTxDialogSuccess(true));
      dispatch(setTxDialogFailed(false));
      dispatch(setTxDialogPending(false));
      toast.success("NFT Listing Removed!");

      setSellOpen(false);
      dispatch(completeTxProcess());
    }
    if (
      txInitiator === txInitiators.ADD_MARKET_LISTING &&
      status === txStatus.COMPLETED
    ) {
      dispatch(getAllMarketItems());
      dispatch(getSelectedMarketItem({ network, address, tokenId }));
      console.log("this is called!")
    }
    if(txInitiator === txInitiators.BUY_MARKET_LISTING &&
      status === txStatus.COMPLETED){
      getDetailsFromSite();
      
      dispatch(setTxDialogFailed(false));
      dispatch(setTxDialogSuccess(true));
      dispatch(setTxDialogPending(false));
      toast.success("NFT buy Successful!");

      sendDataToGTM({
        event: "View NFT Buy Transaction Successful Popup",
        customData: { "Collection Address": address, "token Id": tokenId },
      });
    }
    if (
      (txInitiator === txInitiators.REMOVE_MARKET_LISTING || txInitiator === txInitiators.BUY_MARKET_LISTING) &&
      status === txStatus.FAILED
    ) {
      dispatch(getSelectedMarketItem({ network, address, tokenId }));
      dispatch(setTxDialogSuccess(false));
      dispatch(setTxDialogPending(false));
      dispatch(setTxDialogFailed(true));
      dispatch(abortTxProcess());
      forceUpdate();
    }
    if (
      txInitiator === txInitiators.REMOVE_SWAP_LISTING &&
      status === txStatus.FAILED
    ) {
      dispatch(getActiveListingsFromLoggingAPI());
      dispatch(setTxDialogSuccess(false));
      dispatch(setTxDialogPending(false));
      dispatch(setTxDialogFailed(true));
      dispatch(getActiveListingsFromLoggingAPI());
      dispatch(abortTxProcess());
    }
  }, [status]);


  useEffect(() => {
    console.log("This is market:", market)
    console.log("This is Listing:", selectedListing)
  }, [market, selectedListing, isListedForSwap])
  useEffect(() => {
    if (selectedListing) {
      setListedForSwap(true);
    }
  }, [selectedListing]);
  const styles = {
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 3,
    },
    orangeButton: {
      width: "100%",
      backgroundColor: "#F78C09",
      color: "#262626",
      fontWeight: 600,
      fontSize: "1rem",
      borderRadius: "0.594rem",
      mb: 2,
      "&:disabled": {
        backgroundColor: "#F78C09",
        color: "rgba(0, 0, 0, 0.26)",
      },
    },
  };

  const getDetailsFromSite = async () => {
    const nftDetails = await getCommonNFTDetail({
      contractAddress: address,
      tokenId: tokenId,
    });

    if (nftDetails) {
      setOwner(nftDetails.wallet_address || "");
      setCollectionName(nftDetails.collection_name || "");
      setMetadata(nftDetails.metadata);
      // setNetwork(nftDetails.network || "");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getDetailsFromSite();
  }, []);

  useEffect(() => {
    dispatch(getSelectedMarketItem({ network, address, tokenId }));
  }, [network]);

  const handleOfferSwap = () => {
    if (account) {
      sendDataToGTM({
        event: "Clicked Offer Swap CTA",
        customData: {
          "Collection Address": address,
          "token Id": tokenId,
        },
      });

      if (account.toLowerCase() !== owner.toLowerCase()) {
        setOfferDlgOpen(true);
      }
    } else {
      toast.info("Please connect your wallet!");
    }
  };

  const handleUpdatePrice = async () => {
    setIsUpdatePrice(true);
    setSellOpen(true);
  };

  const handleRemoveNFT = async () => {
    try {
      dispatch(showTxDialog());
      const netDetails = getNetworkInfo(network);
      if (chainId !== parseInt(netDetails.dataNetwork.CHAIN_ID)) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [netDetails.switch],
        });
      }
      const provider = new Web3Provider(window.ethereum, "any");
      const signer = await provider.getSigner();
      const contract = new Contract(
        netDetails.dataNetwork.SWAP_CONTRACT,
        swapAbi,
        signer
      );
      const txResult = await contract.removeListingById(
        selectedListing.listingId
      );
      dispatch(setTxDialogHash(txResult.hash));
      dispatch(
        startTxProcess({
          txHash: txResult.hash,
          initiator: txInitiators.REMOVE_SWAP_LISTING,
        })
      );
      txResult.wait();
    } catch (error) {
      console.log("Error on handleRemoveNFT", error);
      dispatch(setTxDialogSuccess(false));
      dispatch(setTxDialogPending(false));
      dispatch(setTxDialogFailed(true));
    }
    forceUpdate();
  };

  const cancelSale = async () => {
    dispatch(showTxDialog());
    const netDetails = getNetworkInfo(network);
    if (chainId !== parseInt(netDetails.dataNetwork.CHAIN_ID)) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [netDetails.switch],
      });
    }
    const provider = new Web3Provider(window.ethereum, "any");
    const signer = await provider.getSigner();
    try {
      const contract = new Contract(
        netDetails.dataNetwork.MARKETPLACE_CONTRACT,
        netDetails.dataNetwork.MARKET_ABI,
        signer
      );
      const txResult = await contract.createMarketCancel(
        address,
        market.marketId
      );
      dispatch(setTxDialogHash(txResult.hash));
      dispatch(
        startTxProcess({
          txHash: txResult.hash,
          initiator: txInitiators.REMOVE_MARKET_LISTING,
        })
      );
      txResult.wait();
    } catch (err) {
      console.log("Error on cancelSale", err);
      dispatch(setTxDialogFailed(true));
      dispatch(setTxDialogSuccess(false));
      dispatch(setTxDialogPending(false));
    }
    forceUpdate();
  };

  const buyNFT = async () => {
    if (!account) {
      toast.warning("Please connect your wallet!", {
        toastId: "connectWallet",
      });
      return;
    }

    if (market.price > balance) {
      toast.error("Your balance is not enough to buy this NFT");
      return;
    }

    sendDataToGTM({
      event: "Click Buy NFT",
      customData: { "Collection Address": address, "token Id": tokenId },
    });

    if (account.toLowerCase() === market.seller.toLowerCase()) {
      return;
    }

    dispatch(showTxDialog());
    const netDetails = getNetworkInfo(network);
    if (chainId !== parseInt(netDetails.dataNetwork.CHAIN_ID)) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [netDetails.switch],
      });
    }
    const provider = new Web3Provider(window.ethereum, "any");
    const signer = await provider.getSigner();
    try {
      const contract = new Contract(
        netDetails.dataNetwork.MARKETPLACE_CONTRACT,
        netDetails.dataNetwork.MARKET_ABI,
        signer
      );
      const overRides = {
        value: parseUnits(market.price.toString(), "ether"),
      };
      const txResult = await contract.createMarketSale(
        address,
        market.marketId,
        overRides
      );
      dispatch(setTxDialogHash(txResult.hash));
      dispatch(
        startTxProcess({
          txHash: txResult.hash,
          initiator: txInitiators.BUY_MARKET_LISTING,
        })
      );
      txResult.wait();

      
    } catch (err) {
      console.log("Error on buyNFT", err);
      dispatch(setTxDialogFailed(true));
      dispatch(setTxDialogSuccess(false));
      dispatch(setTxDialogPending(false));

      sendDataToGTM({
        event: "View NFT Buy Transaction Failed Popup",
        customData: { "Collection Address": address, "token Id": tokenId },
      });
    }
    forceUpdate();
  };
  useEffect(() => {
    console.log("debug market", market);
  }, [market]);
  return (
    <Fragment>
      <Container>
        <NFTCardContainer>
          <NFTCardDetails
            metadata={metadata}
            tokenId={tokenId}
            owner={market ? market.seller : owner}
            name={collectionName}
          />
          <NFTCardActionContaniner>
            {!loading && (market || selectedListing) ? (
              <>
                {isListedForSwap && account ? (
                  <>
                    {account &&
                    account.toLowerCase() === owner.toLowerCase() ? (
                      <Button
                        sx={styles.orangeButton}
                        color="error"
                        variant="contained"
                        onClick={handleRemoveNFT}
                      >
                        Remove Listing
                      </Button>
                    ) : (
                      <Button
                        sx={styles.orangeButton}
                        variant="contained"
                        onClick={handleOfferSwap}
                      >
                        Offer SWAP
                      </Button>
                    )}
                  </>
                ) : (
                  <></>
                )}
                {selectedListing && !account ? (
                  <Button
                    sx={styles.orangeButton}
                    variant="contained"
                    onClick={handleOfferSwap}
                  >
                    Offer SWAP
                  </Button>
                ) : (
                  ""
                )}
                {market && account ? (
                  <>
                    {account &&
                    market &&
                    account.toLowerCase() === market.seller.toLowerCase() ? (
                      <>
                        <Box sx={styles.row}>
                          <Button
                            sx={styles.orangeButton}
                            color="error"
                            variant="contained"
                            onClick={cancelSale}
                          >
                            Remove Listing
                          </Button>
                          <Button
                            sx={styles.orangeButton}
                            variant="contained"
                            onClick={handleUpdatePrice}
                          >
                            Update Price
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box sx={styles.row}>
                          <Button
                            sx={styles.orangeButton}
                            variant="contained"
                            onClick={buyNFT}
                          >
                            Buy
                          </Button>
                        </Box>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
                {market && !account ? (
                  <Box sx={styles.row}>
                    <Button
                      sx={styles.orangeButton}
                      variant="contained"
                      onClick={buyNFT}
                    >
                      Buy
                    </Button>
                  </Box>
                ) : (
                  <></>
                )}
              </>
            ) : (
              ""
            )}
            {!loading &&
            !market &&
            !isListedForSwap &&
            account &&
            account.toLowerCase() === owner.toLowerCase() ? (
              <>
                <Box sx={styles.row}>
                  <Button
                    sx={styles.orangeButton}
                    variant="contained"
                    onClick={() => setListDlgOpen(true)}
                  >
                    LIST TO SWAP
                  </Button>
                  <Button
                    sx={styles.orangeButton}
                    variant="contained"
                    onClick={() => setSellOpen(true)}
                  >
                    LIST TO SELL
                  </Button>
                  <Button
                    sx={styles.orangeButton}
                    variant="contained"
                    onClick={() => setSendOpen(true)}
                  >
                    SEND NFT
                  </Button>
                </Box>
              </>
            ) : (
              ""
            )}
            {market && market.price && (
              <Typography variant="h6" sx={{ mt: 0, mb: 1, color: "#FFFFFF" }}>
                Price: {`${market.price}`} TFUEL
              </Typography>
            )}
            <NFTDetails
              metadata={metadata}
              address={address}
              tokenId={tokenId}
              chainId={network}
            />
            {selectedListing && (
              <OfferList
                network={network}
                offers={selectedListing.offers}
                listingId={selectedListing.listingid}
              />
            )}
            <NFTDiscussions
              metadata={metadata}
              address={address}
              tokenId={tokenId}
              network={network}
              isAccordion={true}
            />
          </NFTCardActionContaniner>
        </NFTCardContainer>
      </Container>
      <ListNFTDialog
        metadata={metadata}
        tokenId={tokenId}
        owner={owner}
        open={listDlgOpen}
        onClose={(isSuccess) => {
          setListDlgOpen(false);
          if (isSuccess) {
            updateAfterListing();
            dispatch(getActiveListingsFromLoggingAPI());
          }
        }}
        network={network}
        address={address}
      />
      {selectedListing && (
        <OfferNFTDialog
          tokenAddress={address}
          listingId={selectedListing.listingId}
          open={offerDlgOpen}
          network={network}
          onClose={(isSuccess) => {
            setOfferDlgOpen(false);
            if (isSuccess) {
              setListedForSwap(true);
            }
          }}
        />
      )}
      <SendNFT
        isOpen={sendOpen}
        tokenId={tokenId}
        contractAddress={address}
        network={network}
        onCloseDlg={() => {
          setSendOpen(false);
          getDetailsFromSite();
        }}
      />
      <SellNFT
        isOpen={sellOpen}
        tokenId={tokenId}
        contractAddress={address}
        network={network}
        metadata={metadata}
        isUpdate={isUpdatePrice}
        itemPrice={market ? market.price : 0}
        marketId={market ? market.marketId : 0}
        listingId={market ? market.id : 0}
        onCloseDlg={() => {
          setTimeout(() => {
            dispatch(getSelectedMarketItem({ network, address, tokenId }));
          }, 3000);
          setSellOpen(false);
          getDetailsFromSite();
          setIsUpdatePrice(false);
        }}
      />
    </Fragment>
  );
};

const metaUrl = (url) => {
  if (url.includes("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
};

const NFTCardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  [theme.breakpoints.down(992)]: {
    flexDirection: "column",
  },
}));

const NFTCardActionContaniner = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "50%",
  [theme.breakpoints.down(992)]: {
    width: "100%",
  },
}));
