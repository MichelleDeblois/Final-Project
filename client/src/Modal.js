import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "./userContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
// MODAL TO SHOW WHO IS RECCOMENDING A COFFEE SHOP
const Modal = (props) => {
  const { coffeeShops, users } = useContext(UserContext);
  const [shop, setShop] = useState([]);
  const { _id } = useParams();

  useEffect(() => {
    const findItem = async () => {
      const response = await fetch(`/coffeeshop/${_id}`);
      const data = await response.json();

      setShop(data.data);
    };
    findItem();
  }, []);
  if (!shop) {
    return <div>...loading</div>;
  }
  if (!props.show) {
    return null;
  }

  return (
    <>
      <ModalContainer onClick={props.onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {shop.reccomendedBy?.map((user) => {
            const userReccomend = users.find((x) => x._id === user);

            return (
              <>
                <Link
                  to={`/profile/${userReccomend._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <UserInfo>
                    <Img src={userReccomend.avatar}></Img>
                    <p>{userReccomend?.firstnName}</p>
                    <LastName>{userReccomend.lastName}</LastName>
                  </UserInfo>
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
const LastName = styled.span`
  margin-left: 5px;
`;
const UserInfo = styled.div`
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
export default Modal;
