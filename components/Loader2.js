import React from "react";
import { View } from "react-native";
import { Chase } from "react-native-animated-spinkit";
import { Colors, Sizes } from "../constants/styles";
import { StyleSheet } from "react-native";

const Loader2 = () => {
    return (
        <View
            style={{
                flexDirection: "row",
                zIndex: 1000,
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.2)",
            }}
        >
            <View style={styles.pageStyle}>
                <Chase
                    size={40}
                    color={Colors.primaryColor}
                    style={{
                        position: "absolute",
                        bottom: 140.0,
                    }}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Loader2;
