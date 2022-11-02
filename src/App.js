
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { Home } from "./pages/Home"
import { Listings } from './pages/Listings';
import { ListingOffers } from './pages/ListingOffers';
import { SwapComplete } from './pages/SwapComplete';
import { MyListingSwapOffer } from './pages/MyListingSwapOffer';
import { SingleSwapOffer } from './pages/SingleSwapOffer';
import { MyListingSwapOffer2 } from './pages/MyListingSwapOffer2';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
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
