import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { UserContext } from "./userContext";
const LogInPage = () => {
  const [newuser, setNewUser] = useState(null);
  const [firstnName, setFirstnName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [reccomended, setReccomended] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [nameSignIn, setNameSignIn] = useState("");

  const { currentUser, setCurrentUser } = useContext(UserContext);
  let navigate = useNavigate();
  const handleCreateNewUser = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstnName: firstnName,
        lastName: lastName,
        avatar: avatar,
        email: email,
        password: password,
        reccomended: reccomended,
        reviews: reviews,
      }),
    };
    const response = await fetch("/signup/newuser", requestOptions);
    const data = await response.json();
    setNewUser(data);
    console.log(data);
  };

  const handleChange = (e) => {
    setNameSignIn(e.target.value);
  };
  const handleSignIn = (e) => {
    e.preventDefault();

    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        const found = data.data.find((user) => {
          localStorage.setItem("name", JSON.stringify(user));
          return user.email.toLowerCase() === nameSignIn.toLocaleLowerCase();
        });
        if (found) {
          setCurrentUser(found);

          navigate(`/my-profile/${found._id}`);
        } else {
          //to do :
          // setIsSignedIn("error");
        }
      });
  };
  console.log(currentUser);
  return (
    <>
      <div>this is the log in page</div>
      sign up
      <Container>
        <Form>
          <label>
            <input
              type="text"
              placeholder="first name"
              onChange={(event) => {
                setFirstnName(event.target.value);
              }}
            ></input>
          </label>
          <label>
            <input
              type="text"
              placeholder="last name"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            ></input>
          </label>
          <label>
            <input
              type="text"
              placeholder="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>
          </label>
          <input
            type="password"
            placeholder="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
          <Button onClick={handleCreateNewUser}>sign up</Button>
        </Form>
      </Container>
      <div> already have an account? log in</div>
      <form>
        <label>
          <input
            type="text"
            placeholder="email"
            onChange={handleChange}
          ></input>
          <input type="password" placeholder="password"></input>
          <Button onClick={handleSignIn}>log In</Button>
        </label>
      </form>
    </>
  );
};
const Container = styled.div`
  display: block;
`;
const Button = styled.button`
  background-color: #d08c60;
  border: none;
  border-radius: 10px;
  padding: 10px;
  width: 75px;
  color: white;
  cursor: pointer;
`;
const Form = styled.form`
  display: block;
  height: 100px;
`;
export default LogInPage;
