import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DisplayCategoryResult from "./components/DisplayCategoryResult/DisplayCategoryResult";
import DisplaySearchResult from "./components/DisplaySearchResult/DisplaySearchResult";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<DisplayCategoryResult />} />
          <Route path="/search/:id" element={<DisplaySearchResult />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
