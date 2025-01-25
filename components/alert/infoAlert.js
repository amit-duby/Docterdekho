import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const InfoAlert = ({
    icon,
    header,
    header2,
    message,
    updateState,
    isClose,
    isButton,
    handleButtonClick,
}) => {
    return (
        <View
            style={{
                flexDirection: "row",
                zIndex: 10000,
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
                {isClose ? (
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
                ) : null}
                <Image
                    source={require("../../assets/images/info.gif")}
                    style={{
                        width: 80.0,
                        height: 80,
                        resizeMode: "contain",
                        borderWidth: 1,
                        marginBottom: 20,
                        marginTop: 40,
                    }}
                />
                {/* {icon} */}
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
                {header2 ? (
                    <Text
                        style={{
                            ...Fonts.blackColor18Medium,
                            marginTop: 10,
                            fontSize: 16,
                            // textAlign: "justify",
                        }}
                    >
                        {header2}
                    </Text>
                ) : null}
                {message ? (
                    <Text
                        style={{
                            ...Fonts.grayColor14Regular,
                            fontSize: 14,
                            marginTop: 10,
                            // textAlign: "justify",
                        }}
                    >
                        {message}
                    </Text>
                ) : null}

                {isButton ? (
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.primaryColor,
                            padding: 7,
                            borderRadius: 5,
                            marginVertical: 20,
                            elevation: 3,
                            marginBottom: 40,
                            minWidth: 60,
                        }}
                        activeOpacity={0.8}
                        onPress={handleButtonClick}
                    >
                        <Text
                            style={{
                                ...Fonts.whiteColor14Medium,
                                textAlign: "center",
                            }}
                        >
                            {isButton}
                        </Text>
                    </TouchableOpacity>
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
        minHeight: 220,
        borderRadius: 30,
        backgroundColor: Colors.whiteColor,
        elevation: 20,
        position: "relative",
        shadowColor: Colors.primaryColor,
    },
});

export default InfoAlert;
