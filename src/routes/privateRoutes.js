import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../page/dashboard/home";
import { Menu } from "react-native-paper";
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_600SemiBold,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import Talk from "../page/talk/talk";
import { Image, Text } from "react-native";
import { View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import Contatos from "../page/contat/Contatos";
import { Context } from "../context/contexto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const Tab = createBottomTabNavigator();
//const Tab = createMaterialTopTabNavigator();
const AppStack = createStackNavigator();
const PrivateRoutes = () => {
  const { nameFriend } = useContext(Context);
  const { isMenu, setIsMenu , sair} = useContext(Context);
  const navigation = useNavigation()
  const [fontLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
  });

  if (!fontLoaded) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30 }}>Carregando</Text>
      </View>
    );
  }
  return (
    <AppStack.Navigator
      screenOptions={{
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              // transform: [{ translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [200, 0] }) }],
              transform: [
                {
                  translateX: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [390, 0],
                  }),
                },
              ],
            },
          };
        },
        animationEnabled: true,
        headerShown: true,
        headerStyle: {
          height: 80,
          maxHeight: 80,
          minHeight: 80,
        },
      }}
    >
      <AppStack.Screen
        name="Chat data"
        options={{
          headerStyle: {
            backgroundColor: "#1F2C34",
          },
          headerTitleStyle: {
            color: "white",
            fontFamily: "Montserrat_300Light",
          },
          headerShown: false,
          animationEnabled: false,
        }}
      >
        {() => {
          return (
            <Tab.Navigator
              screenOptions={{
                tabBarStyle: {
                  backgroundColor: "#1F2C34",
                  elevation: 0,
                  shadowOpacity: 0,
                  borderTopWidth: 0,
                },
                tabBarActiveTintColor: "#0e7c3a",
                tabBarInactiveTintColor: "#c2c4c6",
                tabBarLabelStyle: {
                  fontFamily: "Montserrat_300Light",
                  fontSize: 12,
                },
                headerTitleStyle: {
                  fontFamily: "Montserrat_500Medium",
                  fontSize: 24,
                },
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#006d7e",
                },
                headerTintColor: "white",
                headerRight: () => (
                  <View>
                    {!isMenu ? (
                      <SimpleLineIcons
                        onTouchEnd={() => setIsMenu(!isMenu)}
                        name="options-vertical"
                        size={22}
                        color="#b9bdbf"
                      />
                    ) : (
                      <View style={{ flex: 1 }}>
                        <Menu.Item
                          onPress={() => {
                            setIsMenu(!isMenu);
                          }}
                          style={{ backgroundColor: "pink" }}
                          title="Opções"
                        />
                        <Menu.Item
                          leadingIcon="email"
                          onPress={() => {navigation.navigate("Contatos")}}
                          style={{ backgroundColor: "pink" }}
                          title="Contatos do email"
                        />
                        <Menu.Item
                          leadingIcon="city"
                          onPress={() => {}}
                          style={{ backgroundColor: "pink" }}
                          title="Dark-theme"
                        />
                        <Menu.Item
                          leadingIcon="content-cut"
                          onPress={() => {}}
                          style={{ backgroundColor: "pink" }}
                          title="Colar"
                          disabled
                        />
                        <Menu.Item
                          leadingIcon="content-copy"
                          onPress={() => {}}
                          style={{ backgroundColor: "pink" }}
                          title="Copiar"
                          disabled
                        />
                        <Menu.Item
                          leadingIcon="content-paste"
                          onPress={() => {}}
                          style={{ backgroundColor: "pink" }}
                          title="Pasta"
                        />
                        <Menu.Item
                          leadingIcon="logout"
                          onPress={() => {
                            setIsMenu(false)
                            sair();
                          }}
                          style={{ backgroundColor: "#f76f83" }}
                          title="Sair"
                        />
                      </View>
                    )}
                  </View>
                ),
              }}
            >
              <Tab.Screen
                name="Conversas"
                component={Home}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Entypo name="chat" size={25} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Amigos"
                component={Home}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="user-friends" size={20} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Stories"
                component={Home}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Zocial name="statusnet" size={20} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          );
        }}
      </AppStack.Screen>
      <AppStack.Screen
        name="test"
        component={Talk}
        options={{
          animationEnabled: true,
          headerStyle: {
            backgroundColor: "#1F2C34",
          },
          headerTitleStyle: {
            color: "red",
            fontFamily: "Montserrat_300Light",
          },
          headerTintColor: "white",
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                gap: 10,
                rigth: 5,
              }}
            >
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy_jD1P_BTG92SdYYH-QJ7s-XOohXAOfocMaBM8juABq1Hj177NjVngf4qJerJdlrA_1w&usqp=CAU",
                }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                  right: 15,
                }}
              />
              <Text style={{ right: 15, fontSize: 20, color: "#b9bdbf" }}>
                {nameFriend}
              </Text>
            </View>
          ),
          headerRight: () => (
            <SimpleLineIcons
              name="options-vertical"
              size={20}
              color="#b9bdbf"
              style={{ right: 15 }}
            />
          ),
        }}
      />

      <AppStack.Screen
        name="Contatos"
        component={Contatos}
        options={{
          animationEnabled: true,
          headerStyle: {
            backgroundColor: "#006d7e",
          },
          headerTitleStyle: {
            color: "white",
            fontFamily: "Montserrat_300Light",
          },
          headerTintColor: "white",
        }}
      />
    </AppStack.Navigator>
  );
};

export default PrivateRoutes;
