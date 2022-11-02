
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { Home } from "./pages/Home"
import { Listings } from './pages/Listings';
import { ListingOffers } from './pages/ListingOffers';
import { SingleSwapComplete } from './pages/SingleSwapComplete';
import { SingleSwapOffer } from './pages/SingleSwapOffer';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="listing" element={<Listings />} />
          <Route path="listing/offers" element={<ListingOffers />} />
          <Route path="swap" element={<SingleSwapOffer />} />
          <Route path="swap/done" element={<SingleSwapComplete />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
