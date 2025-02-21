import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen/HomeScreen";
import OutputScreen from "./OutputScreen/OutputScreen";
import Login from "./LogIn/login";
import PictureBook from "./PictureBook/PictureBook";
import './App.css';
import { FaFontAwesomeLogoFull } from "react-icons/fa";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/OutputScreen" element={<OutputScreen />} />
        <Route path="/PictureBook" element={<PictureBook />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
