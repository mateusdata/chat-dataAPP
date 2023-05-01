import { Context } from "../../context/contexto";

import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const FormPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const {logar} = useContext(Context)      
  const handleRegister = () => {
    // Fazer o cadastro aqui
    console.log(name, email, password);
  };
  const handleLogin = () => {
    logar();
  };

  const handleLogin2 = () => {
    // Fazer o login aqui
    console.log(email, password);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor='#1F2C34'
        barStyle='light-content'
      />
      <Text style={styles.header}>{isLogin ? 'Login' : 'Cadastro'}</Text>
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={(text) => setName(text)}
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
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={isLogin ? handleLogin : handleRegister}
      >
        <Text style={styles.buttonText}>{isLogin ? 'Entrar' : 'Cadastrar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleForm}>
        <Text style={styles.toggleText}>
          {isLogin ? 'Ainda não tem uma conta? Cadastre-se aqui.' : 'Já tem uma conta? Faça login aqui.'}
        </Text>
      </TouchableOpacity>
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

