import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen/HomeScreen";
import OutputScreen from "./OutputScreen/OutputScreen";
import PictureBook from "./PictureBook/PictureBook";
import Login from "./SingIn/signin";
import './App.css';

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
