import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <>
      <Container>
        <Link to="/">
          <Title>My Cup of Coffee</Title>
        </Link>
        <Link to="/login">
          <span>login / signup</span>
          <span>hi </span>
        </Link>
      </Container>
    </>
  );
};

const Title = styled.h1`
  color: white;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #bc8a5f;
  height: 50px;
`;
export default Header;
