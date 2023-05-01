
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../page/singIn/login';

const AuthStack = createStackNavigator();

const PublicRoutes =  () => {
  
    return (
        <AuthStack.Navigator screenOptions={{
            animationEnabled:true,
            headerStyle:{
                backgroundColor:"#1F2C34"
            },
            headerTintColor:"white"
        }}>
            <AuthStack.Screen name="Login" component={Login} options={{
                headerTitle:"Chat data",
                headerTitleStyle:{
                    fontSize:26
                }
            }}/>
        </AuthStack.Navigator>
    );
}

export default PublicRoutes;
