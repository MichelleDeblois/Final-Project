import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "./userContext";
const LogInPage = () => {
  const [newuser, setNewUser] = useState(null);
  const [firstnName, setFirstnName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [reccomended, setReccomended] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [nameSignIn, setNameSignIn] = useState("");
  const [following, setFollowing] = useState([]);

  const { currentUser, setCurrentUser } = useContext(UserContext);
  let navigate = useNavigate();
  // TO POST TO MONGODB A NEW USER
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
        following: following,
      }),
    };
    const response = await fetch("/signup/newuser", requestOptions);
    const data = await response.json();
    setNewUser(data);
    setCurrentUser(data.data);
    localStorage.setItem("name", JSON.stringify(currentUser));
    navigate("/");
  };

  const handleChange = (e) => {
    setNameSignIn(e.target.value);
  };

  //TO LOG ON THE APP IF YOU ALREADY HAVE AN ACCOUNT
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
          //
        }
      });
  };

  return (
    <>
      <Wrapper>
        <Container>
          <h3>Create an account</h3>
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
        <Container>
          <h3> already have an account? log in</h3>
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
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  display: block;
  width: 200px;
  padding: 20px;
  border: 1px solid #d08c60;
  border-radius: 20px;
  margin-top: 50px;
  height: 200px;
  margin-left: 20px;
`;
const Button = styled.button`
  background-color: #d08c60;
  border: none;
  border-radius: 10px;
  padding: 10px;
  width: 75px;
  color: white;
  cursor: pointer;
  margin-top: 20px;
`;
const Form = styled.form`
  display: block;
  height: 100px;
`;
export default LogInPage;
