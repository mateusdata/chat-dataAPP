import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/routes";
import AuthProvider from "./src/context/contexto";
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        translucent={false}
        backgroundColor='#006d7e'
        barStyle='light-content'
      />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
