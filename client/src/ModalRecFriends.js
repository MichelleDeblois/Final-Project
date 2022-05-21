import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "./userContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
//MODAL TO SEE THE COFFEE SHOP SOMEONE YOU ARE FOLLOWING IS RECCOMENDING
const ModalRecFriends = (props) => {
  const { coffeeShops, users } = useContext(UserContext);
  const [reccomendations, setReccomendations] = useState(null);

  useEffect(() => {
    const getReccomendationForUser = async () => {
      const response = await fetch(`/feed/${props.userId}`);
      const data = await response.json();
      const reccomededIds = data.data.reccomended;

      const reccomendationsArr = coffeeShops.filter((coffeeShop) => {
        if (reccomededIds.includes(coffeeShop._id)) {
          return true;
        } else {
          return false;
        }
      });
      setReccomendations(reccomendationsArr);
    };
    getReccomendationForUser();
  }, [props.show]);
  if (!reccomendations) {
    return <div>...loading</div>;
  }
  if (!props.show) {
    return null;
  }

  return (
    <>
      <ModalContainer onClick={props.onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {reccomendations?.map((coffeeShop) => {
            return (
              <>
                <Link
                  to={`/coffee/${coffeeShop?._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <CoffeeInfo>
                    <Img src={coffeeShop?.img}></Img>
                    <p>{coffeeShop?.name}</p>
                  </CoffeeInfo>
                </Link>
              </>
            );
          })}

          <CloseButton onClick={props.onClose}>close</CloseButton>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

const CloseButton = styled.button`
  background-color: #d08c60;
  border: none;
  border-radius: 10px;
  padding: 10px;
  width: 75px;
  color: white;
  cursor: pointer;
`;

const CoffeeInfo = styled.div`
  display: flex;
  border-bottom: 1px solid #d08c60;
  margin-bottom: 10px;
  align-items: center;
  color: black;
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
