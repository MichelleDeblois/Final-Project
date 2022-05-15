import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./userContext";
import Modal from "./Modal";

const CoffeeShopPage = () => {
  const { _id } = useParams();
  const [shop, setShop] = useState(null);
  const { currentUser, users } = useContext(UserContext);
  const [isReccomended, setIsReccomended] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [review, setReview] = useState("");
  const [reviewArr, setReviewArr] = useState([]);
  // TO FETCH THE SINGLE COFFEESHOP
  useEffect(() => {
    const findItem = async () => {
      const response = await fetch(`/coffeeshop/${_id}`);
      const data = await response.json();

      setShop(data.data);
      setReviewArr(data.data.reviews);
    };
    findItem();
  }, []);

  //TO ADD THE ADDRESS IN THE GOOGLE MAP API
  const query = shop?.adr.split(" ").join("%20");

  // FUNCTION TO ADD IN THE CURRENT USER RECCOMENDED LIST
  const handleReccomend = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser._id, shopId: shop._id }),
    };

    fetch(`/coffeeshop/${_id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {});
  };
  const handleClick = () => {
    setIsReccomended(true);
    handleReccomend();
  };

  // FUNCTION TO REMOVE FROM THE CURRENT USER'S RECCOMENDED LIST
  const handleUnReccomend = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser._id, shopId: shop._id }),
    };

    fetch(`/coffeeshop/remove/${_id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {});
  };

  const handleClickUnRec = () => {
    setIsReccomended(false);
    handleUnReccomend();
  };

  // TO POST A REVIEW

  const handleReview = () => {
    setReviewArr((previous) => {
      return [...previous, { review, userId: currentUser._id }];
    });
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: currentUser._id,
        shopId: shop._id,
        review: review,
      }),
    };

    fetch(`/coffeeshop/review/${_id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {});
  };
  const handleChange = (event) => {
    setReview(event.target.value);
  };

  if (!shop && !users) {
    return <div>...loading</div>;
  }

  return (
    <>
      {!shop && <div>...loading</div>}
      {shop && users && (
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
              <p>this coffee shop has {shop.reviews.length} reviews</p>
              <p>
                the coffee shop has been recommended by{" "}
                <button onClick={() => setShowUser(true)}>
                  {shop.reccomendedBy.length}
                </button>
                people
              </p>
              <Modal onClose={() => setShowUser(false)} show={showUser} />

              <ReviewBox>
                <div>
                  {reviewArr?.map((review) => {
                    const userReview = users?.find(
                      (x) => x._id === review.userId
                    );

                    return (
                      <>
                        <ReviewContainer>
                          <ReviewAvt src={userReview?.avatar}></ReviewAvt>
                          <ReviewInfo>
                            <p>{userReview?.firstnName} said:</p>
                            {review.review}
                          </ReviewInfo>
                        </ReviewContainer>
                      </>
                    );
                  })}
                </div>

                <CurrentUserAvt src={currentUser?.avatar} />
                <textarea
                  onChange={handleChange}
                  type="text"
                  name="review"
                  placeholder="add your review here "
                  value={review}
                ></textarea>
              </ReviewBox>
              <Button>Social Media</Button>
              <Button onClick={handleReview}>Add a review</Button>
              {(shop.reccomendedBy.length > 0 &&
                shop.reccomendedBy.find((x) => x === currentUser?._id)) ||
              isReccomended ? (
                <Button onClick={handleClickUnRec}>
                  remove from my recommended
                </Button>
              ) : (
                <Button onClick={handleClick}>add to my reccomendation </Button>
              )}
            </SubContainer>
            <Img src={shop.img}></Img>
          </Container>
        </Wrapper>
      )}
    </>
  );
};

const ReviewInfo = styled.div`
  display: block;
`;
const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d08c60;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;
const ReviewAvt = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-right: 5px;
`;
const CurrentUserAvt = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-right: 5px;
`;
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
