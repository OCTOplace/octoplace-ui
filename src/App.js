
/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home"
import { Listings } from './pages/listings/Listings';
import {MyNFT} from './pages/dashboard/MyNFT';
import { ListingOffers } from './pages/ListingOffers';
import { SwapComplete } from './pages/SwapComplete';
import { MyListingSwapOffer } from './pages/MyListingSwapOffer';
import { SingleSwapOffer } from './pages/SingleSwapOffer';
import { MyListingSwapOffer2 } from './pages/MyListingSwapOffer2';
import {useWeb3React} from "@web3-react/core";
import "./app.scss"
import { useEffect } from "react";
import {useDispatch} from "react-redux"
import { setAddress, setBalance, setChainId, setLogin, setLogout } from "./redux/slices/accout-slice";
import {getFormattedEther} from "./utils/unit-utils";
import { resetCollections } from "./redux/slices/my-nft-slice";
import { NFTView } from "./pages/view-nft/NFTView";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { setAddressList } from "./redux/slices/app-slice";
function App() {
  const {account,chainId, library} = useWeb3React();
  const dispatch = useDispatch();

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

  const getNFTs = async () => {
    const nftCol = collection(db, "nftAddresses");
    const nftSnapshot = await getDocs(nftCol);
    const nftAddressList = nftSnapshot.docs.map((doc) => {
      return doc.data();
    });
    dispatch(setAddressList(nftAddressList));
  };
  useEffect(()=> {
getNFTs();
  dispatch({type:"LOAD_ALL_LISTING"});
  },[])
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="my-nft" element={<MyNFT />} />
          <Route path="nft/:address/:tokenId" element={<NFTView /> } />
          <Route path="listing" element={<Listings />} />
          <Route path="listing/offers" element={<ListingOffers />} />
          <Route path="swap" element={<SingleSwapOffer />} />
          <Route path="swap/mylist" element={<MyListingSwapOffer />}/>
          <Route path="swap/mylist2" element={<MyListingSwapOffer2 />}/>
          <Route path="swap/done" element={<SwapComplete />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
