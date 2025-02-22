import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen/HomeScreen";
import OutputScreen from "./OutputScreen/OutputScreen";
import LuckyPowder from "./lucky_powder/lucky_powder"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LuckyPowder />} />
        <Route path="/OutputScreen" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
