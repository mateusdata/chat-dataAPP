import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
const LoadingComponent= () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#075E54",
      }}
    >
      <StatusBar
        translucent={false}
        backgroundColor="#237243"
        barStyle="dark-content"
      />
      <ActivityIndicator animating={true} color={"green"} size={"100%"} />
    </View>
  );
};

export default LoadingComponent;
