import React from "react";
import { View } from "react-native";
import { Wave } from "react-native-animated-spinkit";
import { Colors, Sizes } from "../constants/styles";
import { StyleSheet } from "react-native";

const Loader3 = () => {
    return (
        <View style={styles.pageStyle}>
            <Wave size={30} color={Colors.primaryColor} />
        </View>
    );
};
const styles = StyleSheet.create({
    pageStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: "center",
        alignItems: "center",
        height: 180,
    },
});

export default Loader3;
