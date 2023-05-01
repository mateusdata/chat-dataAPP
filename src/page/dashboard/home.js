import React, { useContext, useEffect } from "react";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Context } from "../../context/contexto";
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_600SemiBold,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { Roboto_300Light } from "@expo-google-fonts/roboto";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Home = () => {
  const { sair } = useContext(Context);
  const navigate = useNavigation();
  const { listUser, setListUser } = useContext(Context);
  const {currentTalk, setCurrentTalk, nameFriend,setNameFriend, setIsMenu} = useContext(Context)
  const [fontLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
    Roboto_300Light,
  });
  useEffect(() => {
    AsyncStorage.getItem("contacsLocal")
      .then((response) => {
        console.log("dados", JSON.parse(response));
        if (response !== null) {
          setListUser(JSON.parse(response));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(listUser);
  }, []);
  if (!fontLoaded) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30 }}>Carregando</Text>
      </View>
    );
  }
  return (
    <View  style={style.main}>
      <ScrollView onTouchStart={()=>setIsMenu(false)} style={{ flex: 1, borderWidth: 0, width: "100%" }}>
        {listUser.map((item, id) => (
          <Pressable
            key={id}
            style={style.presable}
            onPress={() => {
              navigate.navigate("test");
              setCurrentTalk(item.id)
              setNameFriend(item.name)
              //alert(item.name)
            }}
          >
            <Image
              style={style.logo}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy_jD1P_BTG92SdYYH-QJ7s-XOohXAOfocMaBM8juABq1Hj177NjVngf4qJerJdlrA_1w&usqp=CAU",
              }}
            />
            <View style={{ alignItems: "flex-start", gap: 0 }}>
              <Text style={style.text}>{item.name}</Text>
              <Text
                style={[
                  style.text,
                  { fontSize: 17, color: "grey", fontWeight: "300" },
                ]}
              >
                oi iai Lorena silva ...
              </Text>
            </View>
            <Text
              style={[
                style.text,
                { fontSize: 13, marginLeft: "30%", fontWeight: "600" },
              ]}
            >
              05:58
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <Pressable
        onPress={() => navigate.navigate("Contatos")}
        style={{
          backgroundColor: "green",
          borderRadius: 50,
          position: "absolute",
          top: "90%",
          width: 60,
          padding: 15,
          left: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="message-reply-text"
          size={30}
          color="white"
        />
      </Pressable>
    </View>
  );
};

export default Home;
const style = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "white",
    padding: 0,
  },
  presable: {
    height: 70,

    flex: 1,
    borderWidth: 0,
    borderColor: "red",
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: 7,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 0,
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  text: {
    //fontFamily: "DejaVu Sans",
    //fontFamily: "Montserrat_300Light",
    fontFamily: "Roboto_300Light",
    fontSize: 15,
    textAlign: "center",
    color: "black",
    fontWeight: "700",
  },
});
