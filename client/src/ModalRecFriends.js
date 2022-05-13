import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "./userContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ModalRecFriends = (props) => {
  const { coffeeShops, users } = useContext(UserContext);
  const [friendsRec, setFriendsRec] = useState(null);
  const { _id } = useParams();
  useEffect(() => {
    const findItem = async () => {
      const response = await fetch(`/profile/${_id}`);
      const data = await response.json();

      setFriendsRec(data.data);
    };
    findItem();
  }, []);
  if (!friendsRec) {
    return <div>...loading</div>;
  }
  if (!props.show) {
    return null;
  }

  return (
    <>
      <ModalContainer onClick={props.onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {friendsRec.reccomended?.map((user) => {
            const recInfo = coffeeShops?.find((x) => x._id === user);

            return (
              <>
                <Link to={`/coffee/${recInfo._id}`}>
                  <CoffeeInfo>
                    <Img src={recInfo.img}></Img>
                    <p>{recInfo?.name}</p>
                  </CoffeeInfo>
                </Link>
              </>
            );
          })}

          <button onClick={props.onClose}>close</button>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

const CoffeeInfo = styled.div`
  display: flex;
  border-bottom: 1px solid #d08c60;
  margin-bottom: 10px;
  align-items: center;
`;
const Img = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50px;
  margin-right: 5px;
`;
const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  width: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
`;
export default ModalRecFriends;
