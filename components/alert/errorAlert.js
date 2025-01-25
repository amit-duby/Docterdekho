import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ErrorAlert = ({ icon, header, message, updateState, image }) => {
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
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.2)",
            }}
        >
            <View style={styles.pageStyle}>
                <TouchableOpacity
                    onPress={() => {
                        updateState({ isShowInfo: false });
                    }}
                    activeOpacity={0.9}
                    style={{
                        position: "absolute",
                        right: 10,
                        top: 10,
                        borderRadius: 50,
                        padding: 10,
                    }}
                >
                    <MaterialIcons
                        name="close"
                        color={Colors.blackColor}
                        size={26}
                    />
                </TouchableOpacity>
                <Image
                    source={
                        image || require("../../assets/images/location.png")
                    }
                    style={{
                        width: 80.0,
                        height: 80,
                        resizeMode: "contain",
                        borderWidth: 1,
                        marginBottom: 20,
                        marginTop: 40,
                    }}
                />
                {header ? (
                    <Text
                        style={{
                            ...Fonts.primaryColor16SemiBold,
                            fontSize: 22,
                            marginTop: 10,
                        }}
                    >
                        {header}
                    </Text>
                ) : null}
                {message ? (
                    <Text
                        style={{
                            ...Fonts.grayColor14Regular,
                            fontSize: 16,
                            marginTop: 10,
                            textAlign: "justify",
                        }}
                    >
                        {message}
                    </Text>
                ) : null}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    pageStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        alignItems: "center",
        width: 280,
        height: 350,
        borderRadius: 30,
        backgroundColor: Colors.whiteColor,
        elevation: 10,
        position: "relative",
    },
});

export default ErrorAlert;
