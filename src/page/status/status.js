import React from 'react'
import { ImageBackground, View } from 'react-native';
import gif1 from "../../../assets/gif1.gif";
const Status = () => {
  return (
    <View>
        <ImageBackground source={gif1} resizeMode='cover' style={{height:"100%", width:"100%"}}/>
    </View>
  )
}

export default Status;