import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
  const [coffeeShops, setCoffeeShops] = useState(null);
  useEffect(() => {
    const coffeeShops = async () => {
      const response = await fetch("/coffeeshop");
      const data = await response.json();

      setCoffeeShops(data.data);
      console.log(data.data);
    };
    coffeeShops();
  }, []);
  if (!coffeeShops) {
    return <div>...loading</div>;
  }

  return (
    <>
      <Container>
        <Title>See all our Coffee shop in Montreal</Title>
      </Container>
      <Wrapper>
        <Link to="/allCoffeeShops">
          <Button>Coffee Shops</Button>
        </Link>
      </Wrapper>
      <SubContainer>
        <Title>Popular coffee shop</Title>
        {coffeeShops.map((coffeeShop) => {
          return (
            <>
              <div>{coffeeShop.name}</div>
            </>
          );
        })}
      </SubContainer>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid #bc8a5f;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: #e7bc91;
`;

const SubContainer = styled.div``;
export default HomePage;
