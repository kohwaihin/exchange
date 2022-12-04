import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./template/Layout";
import HomePage from "./template/HomePage";
import MyFavourite from "./template/MyFavourite";
import AboutUs from "./template/AboutUs";
import ExchangeDetail from "./template/ExchangeDetail";
import NoPage from "./template/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/MyFavourite" element={<MyFavourite />} />
          <Route path="/ExchangeDetail" element={<ExchangeDetail />} >
            <Route path=":exchange_id" element={<ExchangeDetail />} />
          </Route>
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
