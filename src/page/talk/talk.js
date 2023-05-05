import React, { useContext, useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_600SemiBold,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Axios from "axios";
import { Context } from "../../context/contexto";
const Talk = () => {
  const [fontLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
  });
  const [talks, setTalks] = useState([]);
  const [menseger, setMenseger] = useState("");
  const { currentTalk, seturrentTalk, myData } = useContext(Context);
  useEffect(() => {
    // alert(myData?.nome)
    Axios.get("https://api-chat-android.vercel.app/", {
      params: {
        currentTalk:
          myData?.myId < currentTalk
            ? myData?.myId.toString() + currentTalk?.toString()
            : currentTalk?.toString() + myData?.myId?.toString(),
      },
    })
      .then((response) => {
        ///console.log(response.data);
        setTalks(response.data);
      })
      .catch((err) => console.log(err));
  }, [talks]);
  const sendMen = (e) => {
    if (menseger) {
      const currentTime = new Date();
      let hours = currentTime.getHours().toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      let minutes = currentTime.getMinutes().toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      //let seconds = currentTime.getSeconds().toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false});
      const hora = `${hours}:${minutes}`;
      Axios.post("https://api-chat-android.vercel.app/send", {
        talk: menseger,
        time: hora,
        phoneUser: myData?.myEmail,
        currentUser: myData?.nome,
        currentTalk:
          myData?.myId < currentTalk
            ? myData?.myId.toString() + currentTalk?.toString()
            : currentTalk?.toString() + myData?.myId?.toString(),
      }).catch((err) => console.log(err));
      setMenseger("");
    }
   
  };

  if (!fontLoaded) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30 }}>Carregando</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#121B22",
      }}
    >
      <StatusBar
        translucent={false}
        backgroundColor="#1F2C34"
        barStyle="light-content"
      />
      <ScrollView
        style={{ width: "100%", paddingHorizontal: 10, paddingBottom: 10 }}
      >
        {talks?.map((item) => {
          if (item.currentUser === myData?.nome) {
            return (
              <View
                key={item.id}
                style={{
                  backgroundColor: "#1F2C34",
                  borderTopEndRadius: 20,
                  borderTopLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  padding: 5,
                  maxWidth: "90%",
                  minWidth: 0,
                  marginBottom: 7,
                }}
              >
                <Text
                  style={{
                    color: "#b9b9bf",
                    fontSize: 18,
                    fontFamily: "Montserrat_300Light",
                  }}
                >
                  {item.talk}
                </Text>
              </View>
            );
          } else {
            return (
              <View
                key={item.id}
                style={{ width: "100%", alignItems: "flex-end" }}
              >
                <View
                  key={item.id}
                  style={{
                    backgroundColor: "#025D4C",
                    borderTopEndRadius: 20,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    padding: 5,
                    width: "80%",
                    marginBottom: 7,
                  }}
                >
                  <Text
                    style={{
                      color: "#b9b9bf",
                      fontSize: 18,
                      fontFamily: "Montserrat_300Light",
                    }}
                  >
                    {item.phoneUser}
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 4,
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ color: "#a8a6a6" }}>20:45</Text>
                    <Ionicons
                      name="md-checkmark-done-outline"
                      size={24}
                      color="#59ccf9"
                    />
                  </View>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
      <View style={styles.container}>
        <TextInput
          value={menseger}
          style={styles.input}
          placeholder="Mensagem..."
          multiline={true}
          numberOfLines={1}
          keyboardType="ascii-capable"
          onChangeText={(e) => setMenseger(e)}
        />
        <Pressable
          onTouchStart={() => {
            sendMen();
            setMenseger("");
            //alert(menseger)
          }}
          style={styles.button}
        >
          <MaterialIcons name="send" size={28} color="white" />
        </Pressable>
      </View>
    </View>
  );
};
export default Talk;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1.9)",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginHorizontal: 0,
    marginBottom: 10,
  },
  input: {
    width: "88%",
    minHeight: 20,
    fontSize: 20,
    padding:10
  },
  button: {
    backgroundColor: "green",
    borderRadius: 50,
    padding: 10,
    marginLeft: 0,
  },
});
