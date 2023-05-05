import React from 'react'
import { ImageBackground, View } from 'react-native';
import gif2 from "../../../assets/gif2.gif";
const Users = () => {
  return (
    <View>
        <ImageBackground source={gif2}  resizeMode='contain' style={{height:"100%", width:"100%"}}/>
    </View>
  )
}

export default Users;