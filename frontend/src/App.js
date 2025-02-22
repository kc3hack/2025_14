import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen/HomeScreen";
import OutputScreen from "./OutputScreen/OutputScreen";
import Login from "./LogIn/login";
import PictureBook from "./PictureBook/PictureBook";
import SignUp from "./SignUp/signup";
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
          <Route path="/" element={<Login />} />
          <Route path="/OutputScreen" element={<OutputScreen />} />
          <Route path="/HomeScreen" element={<HomeScreen />} />
          <Route path="/PictureBook" element={<PictureBook />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer closeOnClick theme="colored" />
    </QueryClientProvider>
  );
}

export default App;
