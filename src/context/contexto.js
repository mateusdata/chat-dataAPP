import React, { createContext, useEffect, useState } from "react";
export const Context = createContext();
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, StatusBar, Text, View } from "react-native";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [nome, seName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [listUser, setListUser] = useState([]);
  const [currentTalk, setCurrentTalk] = useState("");
  const [nameFriend, setNameFriend] = useState("Usuario");
  const [isMenu, setIsMenu] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("usuarios")
      .then((response) => {
        setUser(response);
        setTimeout(() => {
          setLoading(false);
        }, 320);
      })
      .catch((error) => console.log(error));
  }, []);

  const logar = async () => {
    const data = {
      token: "ads2dsd3asd5",
      user: { name: "Mateus", email: "mateus@gmail.com" },
    };
    const { user } = data;

    seName(data.user.name);
    setEmail(data.user.email);
    setUser(user);
    setLoading(true);
    await AsyncStorage.setItem("usuarios", JSON.stringify(data.user)).then(
      (response) => {
        setTimeout(() => {
          setLoading(false);
        }, 600);
      }
    );
  };

  const sair = async () => {
    setLoading(true);
    await AsyncStorage.removeItem("usuarios").then((response) => {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    });
    setUser(false);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1F2C34",
        }}
      >
        <StatusBar
          translucent={false}
          backgroundColor="#1F2C34"
          barStyle="dark-content"
        />
        <ActivityIndicator animating={true} color={"green"} size={"100%"} />
      </View>
    );
  }
  return (
    <Context.Provider
      value={{
        nome,
        email,
        user,
        logado: !!user,
        logar,
        sair,
        setUser,
        listUser,
        setListUser,
        currentTalk,
        setCurrentTalk,
        nameFriend,
        setNameFriend,
        isMenu,
        setIsMenu,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
