import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AllCoffeeShops = () => {
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
      <Title>
        <h1>Find your perfect cup of coffee</h1>
      </Title>
      {coffeeShops.map((coffeeShop) => {
        console.log();
        return (
          <>
            <Wrapper>
              <Container>
                <Img src={coffeeShop.img}></Img>
                <SubContainer>
                  <h2>{coffeeShop.name}</h2>
                  <p>recommended by {coffeeShop.numofRec} user</p>
                  <Link to={`/coffee/${coffeeShop._id}`}>
                    <Button>see full details</Button>
                  </Link>
                </SubContainer>
              </Container>
            </Wrapper>
          </>
        );
      })}
    </>
  );
};
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SubContainer = styled.div`
  display: block;
  margin-left: 10px;
`;
const Button = styled.button`
  background-color: #d08c60;
  border: none;
  border-radius: 10px;
  padding: 10px;

  color: white;
  cursor: pointer;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  border: 1px solid #d08c60;
  padding: 10px;
  width: 550px;
  display: flex;
  border-radius: 10px;
  margin-bottom: 15px;
`;
const Img = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 10px;
`;
export default AllCoffeeShops;
