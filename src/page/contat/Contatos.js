import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  extInput,
  View,
  TextInput,
} from "react-native";
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_600SemiBold,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { Roboto_300Light } from "@expo-google-fonts/roboto";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../../context/contexto";
const Contatos = () => {
  const navigate = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { listUser, setListUser } = useContext(Context);
  //const {currentTalk, seturrentTalk} = useContext(Context)
  let [idUser, setIdUser] = useState();
  const [fontLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
    Roboto_300Light,
  });

  useEffect(() => {
    AsyncStorage.getItem("contacsLocal")
      // setListUser("")
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

  useEffect(() => {
    // alert("entrou")
    Axios.get(
      "https://9da0-2804-7d74-8b-a900-f1d0-4ad6-be7d-b5b8.ngrok-free.app/test",
      {
        params: {
          currentTalk: idUser,
        },
      }
    )
      .then((response) => {
        console.log(
          "resposta da solicitação do banco de dados",
          response.data.result
        );
      })
      .catch((error) => console.log(error));
    if (name && email) {
      //addContatcLocalStorage()

      AsyncStorage.setItem("contacsLocal", JSON.stringify(listUser))
        .then(() => {
          //console.log("Usuários armazenados com sucesso!");
          setEmail(""), setName("");
        })
        .catch((error) => console.log("Erro ao armazenar usuários: ", error));
    }
    //console.log(listUser);
  }, [listUser, idUser]);

  const addContatcLocalStorage = () => {
    if (name && email) {
      Axios.get(
        "https://9da0-2804-7d74-8b-a900-f1d0-4ad6-be7d-b5b8.ngrok-free.app/verificContact",
        {
          params: {
            email,
          },
        }
      ).then((response) => {
        //console.log(response.data);
        if (response.data.length > 0) {
          //console.log(contatc.idTalk=response?.data?.id);
          if (listUser?.some((item) => item.email === contatc.email)) {
            alert("Email já existe na lista!");
            //return;
          }
          const newArray = response?.data?.reduce((acumulador, atual) => {
            return acumulador.concat(atual);
          });
          console.log("novo araray: ", newArray);
          setListUser([...listUser, newArray]);
          setIdUser(newArray?.id);
          //setModalVisible(false);
          console.log("teste porra: ", listUser);
          alert(newArray.id);
        }
      }).catch(error => console.log(error));
      console.log("id do usuario: " + idUser);
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
    <View style={{ flex: 1 }}>
      <Modal
        visible={modalVisible}
        style={{ backgroundColor: "red" }}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          onTouchEnd={() => {
            setModalVisible(!modalVisible);
          }}
          style={{
            backgroundColor: "#00000090",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            onTouchEnd={(e) => {
              e.stopPropagation();
            }}
            style={{
              backgroundColor: "white",
              width: "87%",
              height: "35%",
              minWidth: "87%",
              borderRadius: 5,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text>Informações de Contatos id:{idUser}</Text>
            <TextInput
              value={name}
              onChangeText={(e) => setName(e)}
              placeholder="Nome"
              style={{
                width: "90%",
                borderWidth: 2,
                padding: 5,
                borderRadius: 5,
                borderColor: "orange",
                fontSize: 20,
                marginTop: 25,
              }}
            />
            <TextInput
              value={email}
              onChangeText={(e) => setEmail(e)}
              placeholder="Email"
              style={{
                width: "90%",
                borderWidth: 2,
                padding: 5,
                borderRadius: 5,
                borderColor: "orange",
                fontSize: 20,
                marginTop: 5,
                marginBottom: 10,
              }}
            />
            <Button
              onPress={() => {
                addContatcLocalStorage();
                //alert(name + email)
              }}
              title="Salvar Contato"
            />
          </View>
        </View>
      </Modal>

      <ScrollView style={{ flex: 1 }}>
        <View style={style.main}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Roboto_300Light",
              color: "black",
              fontWeight: "700",
            }}
          >
            Contatos via email
          </Text>
          <Pressable
            style={{
              height: 65,
              flex: 1,
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 15,
              left: 5,
              marginTop: 2,
            }}
          >
            <View
              style={{
                borderWidth: 0,
                borderColor: "white",
                borderRadius: 60,
                padding: 4,
                flexDirection: "column",
              }}
            >
              <FontAwesome name="user-plus" size={32} color="green" />
            </View>
            <View
              onTouchEnd={() => {
                setModalVisible(true);
              }}
              style={{ alignItems: "flex-start", gap: 0 }}
            >
              <Text style={[style.text, { color: "green" }]}>Novo contato</Text>
            </View>
          </Pressable>
          {listUser?.map((item, id) => (
            <Pressable key={id} style={style.presable}>
              <Image
                style={style.logo}
                source={{
                  uri: "https://tse2.mm.bing.net/th?id=OIP.oeEQzC9YpOyk2yDovQZ4RgHaI_&pid=15.1",
                }}
              />
              <View style={{ alignItems: "flex-start", gap: 0 }}>
                <Text style={style.text}>
                  {item.name} - {item.id}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Contatos;
const style = StyleSheet.create({
  main: {
    alignItems: "center",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginHorizontal: 0,
    marginBottom: 10,
    backgroundColor: "white",
  },
  presable: {
    height: 65,
    flex: 1,
    borderWidth: 0,
    borderColor: "red",
    width: "100%",
    maxWidth: "100%",
    paddingHorizontal: 0,
    paddingVertical: 7,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  text: {
    //fontFamily: "DejaVu Sans",
    //fontFamily: "Montserrat_300Light",
    fontFamily: "Roboto_300Light",
    fontSize: 20,
    textAlign: "center",
    color: "black",
    fontWeight: "700",
  },
});
