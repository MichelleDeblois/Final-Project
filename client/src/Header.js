import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "./userContext";
const Header = () => {
  const { currentUser } = useContext(UserContext);
  console.log("hello", currentUser);
  return (
    <>
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Title>My Cup of Coffee</Title>
        </Link>
        <Link to={currentUser ? `/my-profile/${currentUser._id}` : "/login"}>
          <LogInButton>
            {currentUser ? currentUser.firstnName : "Sign in!!"}
          </LogInButton>
        </Link>
      </Container>
    </>
  );
};

const LogInButton = styled.p`
  color: white;
  font-size: 20px;
  margin-right: 10px;
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
