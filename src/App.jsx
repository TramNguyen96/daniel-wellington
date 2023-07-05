import "./App.scss";
import { Routes, Route } from "react-router-dom";
import LazyLoad from "./LazyLoad";
import Navbar from "@components/Navbars/Navbar";
import Footer from "@components/Footers/Footer";
import Header from "@components/Headers/Header";
import Home from "@pages/Homes/Home";
import { useSelector } from 'react-redux';
import Loading from '@components/Loadings/Loading';
function App() {
  const userLoginStore = useSelector(store => store.userLoginStore);
  return (
    <div className="App">
      {
        userLoginStore.loading ? <Loading></Loading> : <></>
      }
      {/* Header Navbar */}
      <div className="navbar_container">
        <div className="navbar_contents">
          <Header />
          <Navbar />
          {/* <Carousels /> */}
          {/* <Banner /> */}
          {/* <hr style={{ width: "100%", backgroundColor: "f5f5f5" }} />
          <CartProductMen />
          <hr style={{ width: "100%", backgroundColor: "f5f5f5" }} />
          <CartProductWomen />
          <hr style={{ width: "100%", backgroundColor: "f5f5f5" }} />
          <CartJewellery />
          <hr style={{ width: "100%", backgroundColor: "f5f5f5" }} />
          <Resizable />
          <OfferFooter /> */}
        </div>
      </div>
      <div className="app_container">
        {/* Content Router */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={LazyLoad(() =>
              import("@pages/Registers/Register")
            )()}
          />
          <Route
            path="/login"
            element={LazyLoad(() =>
              import("@pages/Logins/Login")
            )()}
          />
          <Route
            path="/carts"
            element={LazyLoad(() =>
              import("@pages/TotalCarts/TotalCarts")
            )()}
          />
          <Route
            path="/detailproducts/:id"
            element={LazyLoad(() =>
              import("@pages/Homes/components/ListCartDetails/ListCartDetails")
            )()}
          />
          <Route
            path="/shop/:type"
            element={LazyLoad(() =>
              import("@pages/Products/Product")
            )()}
          />
          <Route
            path="/searchproduct"
            element={LazyLoad(() =>
              import("@pages/SearchByName/SearchByName")
            )()}
          />
        </Routes>
      </div>
      {/* Content Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
