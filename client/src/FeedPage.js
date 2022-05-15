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
    <div>
      <h1> See what your friends are reccomending</h1>
      {userFollowing.following?.map((user) => {
        const followingInfo = users?.find((x) => x._id === user);

        return (
          <div>
            <Img src={followingInfo?.avatar}></Img>
            {followingInfo?.firstnName} {followingInfo?.lastName} is
            recomending:{" "}
            <button
              onClick={() => {
                setShowFriendsRec(true);
                setSelectedUserId(followingInfo._id);
              }}
            >
              {followingInfo?.reccomended.length}
            </button>
            coffee shops
            <button>see {followingInfo?.firstnName}'s profile</button>
          </div>
        );
      })}
      {showFriendsRec && (
        <ModalRecFriends
          onClose={() => setShowFriendsRec(false)}
          show={showFriendsRec}
          userId={selectedUserId}
        />
      )}
    </div>
  );
};
const Img = styled.img`
  width: 100px;
  border-radius: 50%;
`;
export default FeedPage;
