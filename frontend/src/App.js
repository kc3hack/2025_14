import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen/HomeScreen";
import OutputScreen from "./OutputScreen/OutputScreen";
import Login from "./LogIn/login";
import PictureBook from "./PictureBook/PictureBook";
import SignUp from "./SignUp/signup";
import Detail from "./Detail/detail";
import CheckLogout from "./LogOut/checkLogout";
import Logout from "./LogOut/logout";
import Fortune from "./lucky_powder/lucky_powder";
import Judge from "./lucky_powder_judge/lucky_powder_judge";
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/HomeScreen" element={<HomeScreen />} />
          <Route path="/OutputScreen" element={<OutputScreen />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CheckLogout" element={<CheckLogout />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/PictureBook" element={<PictureBook />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Detail" element={<Detail />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Fortune" element={<Fortune />} />
          <Route path="/Judge" element={<Judge />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer closeOnClick theme="colored" />
    </QueryClientProvider>
  );
}

export default App;
