import { Provider } from "react-redux";
import ShowData from "./components/ShowData";
import store from "./redux/Store";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Carrito from "./components/Carrito";
import ProductDetails from "./components/productDetails";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ShowData />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
