import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import ModalRecFriends from "./ModalRecFriends";
import { UserContext } from "./userContext";
const FeedPage = () => {
  const { currentUser, users, coffeeShops } = useContext(UserContext);
  const { _id } = useParams();
  const [userFollowing, setUserFollowing] = useState(null);
  const [showFriendsRec, setShowFriendsRec] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  //Fetch the users
  useEffect(() => {
    const findItem = async () => {
      const response = await fetch(`/feed/${_id}`);
      const data = await response.json();

      setUserFollowing(data.data);
    };
    findItem();
  }, []);
  if (!userFollowing || !users) {
    return <div>...loading</div>;
  }

  return (
    <Wrapper>
      <h1> People you are following are reccomending</h1>
      {userFollowing.following?.map((user) => {
        const followingInfo = users?.find((x) => x._id === user);

        return (
          <>
            <Container>
              <Img src={followingInfo?.avatar}></Img>
              <SubContainer>
                <Info>
                  {followingInfo?.firstnName} {followingInfo?.lastName} is
                  recomending:
                  <UserReccomendButton
                    onClick={() => {
                      setShowFriendsRec(true);
                      setSelectedUserId(followingInfo._id);
                    }}
                  >
                    {followingInfo?.reccomended.length}
                  </UserReccomendButton>
                  Coffee Shops
                </Info>
                <ProfileButton>
                  see {followingInfo?.firstnName}'s profile
                </ProfileButton>
              </SubContainer>
            </Container>
          </>
        );
      })}
      {showFriendsRec && (
        <ModalRecFriends
          onClose={() => setShowFriendsRec(false)}
          show={showFriendsRec}
          userId={selectedUserId}
        />
      )}
    </Wrapper>
  );
};

const UserReccomendButton = styled.button`
  background-color: white;
  border: none;
  color: #d08c60;
  cursor: pointer;
`;
const Info = styled.span`
  margin-bottom: 10px;
`;
const ProfileButton = styled.button`
  background-color: #d08c60;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-left: 5px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  width: 200px;
`;
const Wrapper = styled.div`
  display: grid;
  justify-content: center;
`;
const SubContainer = styled.div`
  display: grid;
  justify-content: center;
  margin-left: 10px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d08c60;
  margin-top: 20px;
  padding-top: 40px;
  padding-left: 50px;
  padding-bottom: 40px;
  padding-right: 50px;
  border-radius: 20px;
  width: 450px;
`;
const Img = styled.img`
  width: 100px;
  border-radius: 50%;
  height: 100px;
`;
export default FeedPage;
