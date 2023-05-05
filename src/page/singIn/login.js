import axios from "axios";
import { Context } from "../../context/contexto";

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const FormPage = () => {
  const [myNome, setMyNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [fazerLogin, setFazerLogin] = useState(true);
  const [erro,setErro]= useState("")
  const {logar} = useContext(Context);
  useEffect(()=>{

  },[]) 
  const handleRegister = () => {
    // Fazer o cadastro aqui
   // console.log(nome, email, senha);
  };
  const handleLogin = () => {
   // logar(email, nome);
   //alert( email + senha)
   
    if (email && senha) {
      axios.post("https://api-chat-android.vercel.app/login", {
        email,
        senha,
      }).then((response) => {
        //console.log(response.data);
        setErro(JSON.stringify(response.data.erroStatus));
        if (response.data.erroStatus===true) {
          //setReq(response.data)
         // logar();
          setMyNome(response.data.name)
          //alert(nome)
          console.log({nome:response.data.newName, myId:response.data.myId});
          //setData({nome:response.data.name, myId:response.data.myId})
          AsyncStorage.setItem("myData", JSON.stringify({nome:response?.data?.newName, myId:response?.data?.myId,myEmail:response?.data?.myEmail})).then((r)=>{
            console.log(r);
            logar()
          })
        }

      }).catch((error) => {
        console.error(error);
      });
      return;
    }
   
  };

  const handleLogin2 = () => {
    // Fazer o login aqui
    console.log(email, senha);
  };

  const toggleForm = () => {
    setFazerLogin(!fazerLogin);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor='#1F2C34'
        barStyle='light-content'
      />
      <Text style={styles.header}>{fazerLogin ? 'Login' : 'Cadastro'}</Text>
      {!fazerLogin && (
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={myNome}
          onChangeText={(text) => setMyNome(text)}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={fazerLogin ? handleLogin : handleRegister}
      >
        <Text style={styles.buttonText}>{fazerLogin ? 'Entrar' : 'Cadastrar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleForm}>
        <Text style={styles.toggleText}>
          {fazerLogin ? 'Ainda não tem uma conta? Cadastre-se aqui.' : 'Já tem uma conta? Faça login aqui.'}
        </Text>
      </TouchableOpacity>
      {fazerLogin && <Text style={{color:"red", fontSize:30}}>{erro}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ff6b6b',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#ff6b6b',
    marginTop: 10,
  },
});

export default FormPage;

