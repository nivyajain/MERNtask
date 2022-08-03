import "./App.css";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CategoryData } from "./components/Data/CategoryData";
import { ProductData } from "./components/Data/ProductData";
import Layout from "./components/Data/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="category" element={<CategoryData />} />
          <Route path="product" element={<ProductData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
