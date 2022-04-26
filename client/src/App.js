import React from "react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import HomePage from "./HomePage";
import CoffeeShopPage from "./CoffeeShopPage";
import styled from "styled-components";
import LogInPage from "./LogInPage";
import AllCoffeeShops from "./AllCoffeeShops";

const App = () => {
  return (
    <>
      <Main>
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/coffee/:_id" element={<CoffeeShopPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/allCoffeeShops" element={<AllCoffeeShops />} />
            {/* <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-a-review" element={<ReviewPage />} /> */}
          </Routes>
        </Router>
      </Main>
    </>
  );
};

const Main = styled.div`
  font-family: "Abel", sans-serif;
  margin: 0px;
  text-decoration: none;
`;
export default App;
