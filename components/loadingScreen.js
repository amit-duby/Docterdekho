import * as Font from "expo-font";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {
    useEffect(() => {
        (async () => {
            await Font.loadAsync({
                Poppins_Regular: require("../assets/fonts/poppins/Poppins-Regular.ttf"),
                Poppins_Medium: require("../assets/fonts/poppins/Poppins-Medium.ttf"),
                Poppins_SemiBold: require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
                Poppins_Bold: require("../assets/fonts/poppins/Poppins-Bold.ttf"),
                Charmonman_Bold: require("../assets/fonts/charmonman/Charmonman-Bold.ttf"),
            });
            navigation.navigate("AuthStack");
        })();
    });

    return <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />;
};

export default LoadingScreen;
