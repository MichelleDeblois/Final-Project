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
    };
    coffeeShops();
  }, []);
  if (!coffeeShops) {
    return <div>...loading</div>;
  }

  //function to get random coffee shop on each reload of the page
  let newArray = [];
  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * coffeeShops.length);
    const showingCoffeeShop = coffeeShops.splice(random, 1);

    newArray.push(showingCoffeeShop);
  }

  return (
    <>
      <Container>
        <Title>See all our Coffee shop in Montreal</Title>
      </Container>
      <Wrapper>
        <Link to="/allCoffeeShops" style={{ textDecoration: "none" }}>
          <Button>Coffee Shops</Button>
        </Link>
      </Wrapper>
      <Title>Popular coffee shop</Title>
      <SubContainer>
        {newArray.map((coffeeShop) => {
          return (
            <>
              <ContainerCoffee>
                <Img src={coffeeShop[0].img}></Img>
                <p>{coffeeShop[0].name}</p>
                <Link to={`/coffee/${coffeeShop[0]._id}`}>
                  <CoffeeShopButton>see full details</CoffeeShopButton>
                </Link>
              </ContainerCoffee>
            </>
          );
        })}
      </SubContainer>
    </>
  );
};
const CoffeeShopButton = styled.button`
  background-color: #d08c60;
  border: none;
  border-radius: 10px;
  padding: 10px;

  color: white;
  cursor: pointer;
`;
const ContainerCoffee = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #d08c60;
  padding: 30px;
  border-radius: 20px;
`;
const Img = styled.img`
  height: 350px;
  width: 250px;
`;
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

const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default HomePage;
