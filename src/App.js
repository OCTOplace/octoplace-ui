
/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home"
import { Listings } from './pages/listings/Listings';
import {MyNFT} from './pages/dashboard/MyNFT';
import { ListingOffers } from './pages/ListingOffers';
import { SwapComplete } from './pages/SwapComplete';
import { MyListingSwapOffer } from './pages/swap-offer/MyListingSwapOffer';
import { SingleSwapOffer } from './pages/SingleSwapOffer';
import { MyListingSwapOffer2 } from './pages/MyListingSwapOffer2';
import {useWeb3React} from "@web3-react/core";
import "./app.scss"
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { setAddress, setBalance, setChainId, setLogin, setLogout } from "./redux/slices/accout-slice";
import {getFormattedEther} from "./utils/unit-utils";
import { resetCollections } from "./redux/slices/my-nft-slice";
import { NFTView } from "./pages/view-nft/NFTView";
import {  setTxCharge } from "./redux/slices/app-slice";
import { createAction } from "@reduxjs/toolkit";
import { getAllTrades } from "./redux/thunk/get-trades";
import { JsonRpcProvider } from "@ethersproject/providers";
import { rpc, swapAbi, swapContract } from "./connectors/address";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { activateInjectedProvider, injectedConnector } from "./connectors/injected-connector";
function App() {
  const {account,chainId, library, activate} = useWeb3React();
  const dispatch = useDispatch();
  const loggedAddress = useSelector(state => state.account.address);
  const myNftOwner = useSelector(state => state.myNFT.nftOwner);

  const getBalance = async() => {
    const bal = await library.getBalance(account);
    dispatch(setBalance(getFormattedEther(bal)))
  }

  //Update wallet connection changes
  useEffect(() => {
    if(account && account !== ""){
      dispatch(setAddress(account));
      dispatch(setChainId(chainId));
      dispatch(setLogin());
      getBalance();
    }else{
      dispatch(setLogout())
      dispatch(resetCollections())
    }
  }, [account])

  useEffect(() => {
    if(chainId && account){
      getBalance();
    }
  }, [chainId])

  useEffect(() => {
    if(loggedAddress !== "" && myNftOwner !== loggedAddress){
      //if(chainId===361){
       dispatch(createAction("LOAD_MY_NFTS_API")({account:loggedAddress}));
      //}else {
      // dispatch(createAction("LOAD_MY_NFTS")({nftAddrList: collections, account:loggedAddress}));
      //}
      
    }
  }, [loggedAddress])

  const getTxCharge = async () => {
    const provider = new JsonRpcProvider(rpc);
    const contract = new Contract(swapContract, swapAbi, provider);
    let txCharge = await contract.getTxCharge();
    txCharge = formatUnits(txCharge, 18);
    dispatch(setTxCharge(txCharge));
  }
  useEffect(()=> {
  dispatch({type:"LOAD_ALL_LISTING"});
  dispatch({type:"LOAD_ALL_OFFERS"});
  dispatch(getAllTrades());
  getTxCharge();
  try{
    activateInjectedProvider("MetaMask")
    activate(injectedConnector)
  }catch {}
  },[])
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="my-nft" element={<MyNFT />} />
          <Route path="nft/:network/:address/:tokenId" element={<NFTView /> } />
          <Route path="listing" element={<Listings />} />
          <Route path="listing/offers" element={<ListingOffers />} />
          <Route path="swap/:network/:offerId" element={<SingleSwapOffer />} />
          <Route path="swap/initiate-offer/:network/:listingId/:offerNft/:offerTokenId" element={<MyListingSwapOffer />}/>
          <Route path="swap/mylist2" element={<MyListingSwapOffer2 />}/>
          <Route path="swap/done" element={<SwapComplete />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
