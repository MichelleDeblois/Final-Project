import React, { useState } from "react";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase.config";

const LogInPage = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  // const [user, setUser] = useState({});

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });
  // fonction to register a new user
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  //function to log in a user that already exist
  const logIn = async () => {};

  // function to log out of the website
  const logOut = async () => {};
  return (
    <>
      <Container>
        <Form>
          {/* <input type="text" placeholder="name"></input> */}
          <label>
            email
            <input
              type="text"
              placeholder="email"
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            ></input>
          </label>
          <label>
            password
            <input
              type="text"
              placeholder="password"
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            ></input>
          </label>
          <button onClick={register} type="submit">
            log in
          </button>
        </Form>
        <Form>
          {/* <input type="text" placeholder="name"></input> */}
          <label>
            email
            <input
              type="text"
              placeholder="email"
              onChange={(event) => {
                setLogInEmail(event.target.value);
              }}
            ></input>
          </label>
          <label>
            password
            <input
              type="text"
              placeholder="password"
              onChange={(event) => {
                setLogInPassword(event.target.value);
              }}
            ></input>
          </label>
          <button type="submit">sign up</button>
        </Form>
        <p>hi</p>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Form = styled.form`
  display: block;
  margin-top: 30px;
`;

export default LogInPage;
