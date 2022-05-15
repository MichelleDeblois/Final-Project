import React, { useState } from "react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import HomePage from "./HomePage";
import CoffeeShopPage from "./CoffeeShopPage";
import styled from "styled-components";
import LogInPage from "./LogInPage";
import AllCoffeeShops from "./AllCoffeeShops";
import ProfilePage from "./ProfilePage";
import FeedPage from "./FeedPage";
import CurrentUserProfile from "./CurrentUserProfile";

const App = () => {
  const [signInName, setSignInName] = useState("");
  return (
    <>
      <Main>
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/coffee/:_id" element={<CoffeeShopPage />} />
            <Route
              path="/login"
              element={
                <LogInPage
                  setSignInName={setSignInName}
                  signInName={signInName}
                />
              }
            />
            <Route path="/allCoffeeShops" element={<AllCoffeeShops />} />
            <Route path="/profile/:_id" element={<ProfilePage />} />
            <Route path="/my-profile/:_id" element={<CurrentUserProfile />} />
            <Route path="/feed/:_id" element={<FeedPage />} />
          </Routes>
        </Router>
      </Main>
    </>
  );
};

const Main = styled.div`
  font-family: "Abel", sans-serif;
`;
export default App;
