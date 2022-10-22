
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { Home } from "./pages/Home"
import { Listings } from './pages/Listings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="listing" element={<Listings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
