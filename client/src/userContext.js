import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [coffeeShops, setCoffeeShops] = useState(null);
  const [users, setUsers] = useState(null);
  // FETCH COFFEESHOPS
  useEffect(() => {
    const coffeeShops = async () => {
      const response = await fetch("/coffeeshop");
      const data = await response.json();

      setCoffeeShops(data.data);
    };
    coffeeShops();
  }, []);
  //FETCH THE USERS
  useEffect(() => {
    const users = async () => {
      const response = await fetch("/users");
      const data = await response.json();

      setUsers(data.data);
    };
    users();
  }, []);
  //LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("name");
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, coffeeShops, users }}
    >
      {children}
    </UserContext.Provider>
  );
};
