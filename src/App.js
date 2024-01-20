import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import HomePage from "./pages/homePage/homePage";
import Footer from "./components/footer/footer";
import LoginPage from "./pages/loginPage/loginPage";
import SingUpPage from "./pages/singUpPage/singUpPage";
import ContactPage from "./pages/contactPage/contactPage";
import CardDetailPage from "./pages/cardDetailPage/cardDetailPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/singUp" element={<SingUpPage />} />
          <Route path="/contactUs" element={<ContactPage />} />
          <Route path="/products/:id" element={<CardDetailPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
