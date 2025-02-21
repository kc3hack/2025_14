import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen/HomeScreen";
import OutputScreen from "./OutputScreen/OutputScreen";
import Login from "./LogIn/login";
import SignUp from "./SignUp/signup";
import './App.css';
import { FaFontAwesomeLogoFull } from "react-icons/fa";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/OutputScreen" element={<OutputScreen />} />
        <Route path="/HomeScreen" element={<HomeScreen />}/>
        <Route path="/SignUp" element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
