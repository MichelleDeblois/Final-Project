import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "./userContext";
const Header = () => {
  const [userLogOut, setUserLogOut] = useState(null);
  const { currentUser, setCurrentUser, users } = useContext(UserContext);
  // FUNCTION TO LOG OUT
  const handleLogOut = () => {
    const logOut = localStorage.clear("name");
    setCurrentUser(null);
    setUserLogOut(JSON.parse(logOut));
  };

  useEffect(() => {
    if (!users) {
      return;
    }
    if (!currentUser && !!localStorage.getItem("name")) {
      const connectedUser = users.find((user) => {
        return user?._id === JSON.parse(localStorage.getItem("name"))?._id;
      });
      setCurrentUser(connectedUser);
    }
  }, [users]);
  return (
    <>
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Title>My Cup of Coffee</Title>
        </Link>
        <LogInAndOutSection>
          <Link
            to={currentUser ? `/my-profile/${currentUser._id}` : "/login"}
            style={{ textDecoration: "none" }}
          >
            <LogInButton>
              {currentUser ? currentUser.firstnName : "Sign in!!"}
              <Link to="/login" style={{ textDecoration: "none" }}>
                {currentUser && (
                  <LogInButton onClick={handleLogOut}>/ log out</LogInButton>
                )}
              </Link>
            </LogInButton>
          </Link>
        </LogInAndOutSection>
      </Container>
    </>
  );
};
const LogInAndOutSection = styled.div`
  display: flex;
`;
const LogInButton = styled.span`
  color: white;
  font-size: 20px;
  margin-right: 10px;
  margin-left: 5px;
`;

const Title = styled.h1`
  color: white;
  margin-left: 10px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #bc8a5f;
  height: 50px;
`;
export default Header;
