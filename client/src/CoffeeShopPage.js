import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const CoffeeShopPage = () => {
  const { _id } = useParams();
  const [shop, setShop] = useState(null);

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
  const query = shop.adr.split(" ").join("%20");

  return (
    <>
      <Wrapper>
        <Container>
          <SubContainer>
            <Name> {shop.name}</Name>
            <p>{shop.adr}</p>
            <iframe
              width="350"
              height="200"
              style={{ border: "0" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDBuSQ_yYIWjvtH8qF7YcCBkIcjkqljhBo&q=${query}`}
            ></iframe>
            <p>this coffee shop has {shop.numofReview} reviews</p>
            <p>
              {" "}
              the coffee shop has been recommended by {shop.numofRec} people
            </p>
            <ReviewBox>
              <p>{shop.review}</p>
              <form>
                <input
                  type="text"
                  name="review"
                  placeholder="add your review here "
                ></input>
              </form>
            </ReviewBox>
            <Button>Social Media</Button>
            <Button>Add a review</Button>
            <Button>Add to my recommendation</Button>
          </SubContainer>
          <Img src={shop.img}></Img>
        </Container>
      </Wrapper>
    </>
  );
};
const ReviewBox = styled.div`
  border: 1px solid;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
`;
const Button = styled.button`
  background-color: #d08c60;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-left: 5px;
  color: white;
  cursor: pointer;
`;
const Name = styled.h1`
  color: #997b66;
`;
const Img = styled.img`
  height: 600px;
  margin-left: 20px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #d08c60;
  border-radius: 20px;
  padding: 35px;
  margin-top: 30px;
`;

const SubContainer = styled.div`
  display: block;
`;
const Wrapper = styled.div`
  display: grid;
  justify-content: center;
`;
export default CoffeeShopPage;
