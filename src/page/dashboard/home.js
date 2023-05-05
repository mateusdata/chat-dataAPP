import React, { useContext, useEffect } from "react";
import {
  Button,
  Image,
  Linking,
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
import { Link, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingComponent from "../../components/loading/loading";
const Home = () => {
  const { sair } = useContext(Context);
  const navigate = useNavigation();
  const { listUser, setListUser } = useContext(Context);
  const {currentTalk, setCurrentTalk, nameFriend,setNameFriend, setIsMenu, setMydata, emailFriend, setEmailFriend} = useContext(Context)
  const [fontLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
    Roboto_300Light,
  });
  useEffect(() => {
    AsyncStorage.getItem("myData").then((r)=>{
      //console.log("meud dados", r);
      setMydata(JSON.parse(r))

    })
    AsyncStorage.getItem("contacsLocal")
      .then((response) => {
        //console.log("dados", JSON.parse(response));
        if (response !== null) {
          setListUser(JSON.parse(response));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log(listUser);
  }, []);
  if (!fontLoaded) {
    return (
      <LoadingComponent/>
    );
  }
  return (
    <View  style={style.main}>
      <ScrollView onTouchStart={()=>setIsMenu(false)} style={{ flex: 1, borderWidth: 0, width: "100%" }}>
        {listUser.length > 0 ? listUser?.map((item, id) => (
          <Pressable
            key={id}
            style={style.presable}
            onPress={() => {
             navigate.navigate("test");
              setCurrentTalk(item.id) 
              setNameFriend(item.name)
              setEmailFriend(item.email)
              //alert(emailFriend)
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
                  { fontSize: 17, color: "green", fontWeight: "300" },
                ]}
              >
                Novas Mensagem...
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
        )): false}
      </ScrollView>
      <Pressable
        onPress={() => navigate.navigate("Contatos")}
        style={{
          backgroundColor: "#237243",
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

      {false && <Button title="abrir navegador" onPress={()=> Linking.openURL('https://www.example.com')}/>}
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
    backgroundColor: "rgba(233, 229, 229, 0.486)"
    
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
