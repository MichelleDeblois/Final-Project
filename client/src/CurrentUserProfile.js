import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./userContext";

const CurrentUserProfile = () => {
  const { _id } = useParams();
  const [user, setUser] = useState(null);
  const [recommendation, setRecomendation] = useState(null);
  const { coffeeShops, currentUser, users } = useContext(UserContext);
  // TO FIND THE CURRENT USER INFO
  useEffect(() => {
    const findUser = async () => {
      const response = await fetch(`/profile/${_id}`);
      const data = await response.json();

      setUser(data.data);
    };

    findUser();
  }, []);
  if (!user) {
    return <div>...loading</div>;
  }

  return (
    <>
      <Wrapper>
        <Container>
          {user.avatar.length > 0 ? (
            <Img src={user.avatar}></Img>
          ) : (
            <button>add image</button>
          )}
          <SubContainer>
            <h1>
              {user.firstnName} {user.lastName}
            </h1>
            <Link to={`/feed/${_id}`}>
              <Button>see my friend's reccomendation</Button>
            </Link>
            <p> My recommendation :</p>
            <div>
              {user.reccomended?.map((rec) => {
                const selectedCoffeeShop = coffeeShops?.find(
                  (x) => x._id === rec
                );

                return (
                  <Link
                    to={`/coffee/${selectedCoffeeShop?._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <RecBox>
                      <CoffeeImg src={selectedCoffeeShop?.img}></CoffeeImg>
                      <CoffeeName>{selectedCoffeeShop?.name}</CoffeeName>
                    </RecBox>
                  </Link>
                );
              })}
            </div>
          </SubContainer>
        </Container>
      </Wrapper>
    </>
  );
};
const RecBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d08c60;
  width: 200px;
  cursor: pointer;
`;
const CoffeeName = styled.p`
  font-size: 30px;
  margin-left: 5px;
  color: black;
`;
const CoffeeImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
const Button = styled.button`
  background-color: #d08c60;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-left: 5px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const SubContainer = styled.div`
  display: grid;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: grid;
  justify-content: center;
`;
const Container = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #d08c60;
  margin-top: 20px;
  padding-top: 40px;
  padding-left: 100px;
  padding-right: 100px;
  border-radius: 20px;
`;
const Img = styled.img`
  border-radius: 50%;
  width: 270px;
  height: 250px;
`;
export default CurrentUserProfile;
