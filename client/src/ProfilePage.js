import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./userContext";

const ProfilePage = () => {
  const { _id } = useParams();
  const [user, setUser] = useState(null);

  const [isFriend, setIsFriend] = useState(false);
  const { coffeeShops, currentUser, users } = useContext(UserContext);
  //ANY OTHER USER PROFILE
  useEffect(() => {
    const findUser = async () => {
      const response = await fetch(`/profile/${_id}`);
      const data = await response.json();

      setUser(data.data);
    };
    findUser();
  }, []);
  // FUNCTION TO ADD AS FRIEND
  const handleAddFriend = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser._id }),
    };

    fetch(`/profile/addfriend/${_id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {});
  };

  const handleClick = () => {
    setIsFriend(true);
    handleAddFriend();
  };

  // TO REMOVE FROM THE FOLLOWING LIST
  const handleUnFriend = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser._id }),
    };

    fetch(`/profile/removefriend/${_id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {});
  };

  const handleClickUnFriend = () => {
    setIsFriend(false);
    handleUnFriend();
  };

  if (!user || !currentUser) {
    return <div>...loading</div>;
  }
  return (
    <>
      <Wrapper>
        <Container>
          <Img src={user.avatar}></Img>
          <SubContainer>
            <h1>
              {user.firstnName} {user.lastName}
            </h1>
            {(currentUser.following.length > 0 &&
              currentUser.following.find((x) => x === user?._id)) ||
            isFriend ? (
              <Button onClick={handleClickUnFriend}>Unfollow</Button>
            ) : (
              <Button onClick={handleClick}>follow </Button>
            )}

            <Button>see {user.firstnName}'s friends</Button>
            <p>{user.firstnName}'s recommendation :</p>
            <p>
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
            </p>
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
export default ProfilePage;
