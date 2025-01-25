import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __postApiData } from "../../utils/api";
import InfoAlert from "../../components/alert/infoAlert";
import Loader2 from "../../components/Loader2";
import { ImageBackground } from "react-native";
const HeplAndSupportScreen = ({ navigation }) => {
    const [state, setState] = useState({
        message: "",
        isLoading: false,
        showinfo: "",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { message, showinfo, isLoading } = state;
    const __handleSubmit = (message, enquiry_for) => {
        updateState({
            isLoading: true,
            showinfo: "",
        });
        __postApiData(`api/home/support`, {
            message,
            enquiry_for,
        })
            .then((res) => {
                return updateState({
                    showinfo: res.response.response_message,
                    isLoading: false,
                });
            })
            .catch((error) => {
                updateState({
                    isLoading: false,
                });
            });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            {showinfo ? (
                <InfoAlert
                    header2={showinfo}
                    isButton={"Ok"}
                    handleButtonClick={() => {
                        updateState({
                            showinfo: null,
                            message: "",
                        });
                    }}
                />
            ) : null}
            {isLoading ? <Loader2 /> : null}
            <ImageBackground
                source={require("../../assets/images/greens.png")}
                style={{ flex: 1 }}
            >
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {supportInfo()}

                    <View
                        style={{
                            backgroundColor: Colors.whiteColor,
                            padding: 10,
                            marginHorizontal: 15,
                            borderRadius: 10,
                            marginTop: 20,
                        }}
                    >
                        <View
                            style={{ ...styles.callusAndMailusButtonWrapStyle }}
                        >
                            {callusButton()}
                            {/* {mailusButton()} */}
                        </View>
                        <Text
                            style={{
                                lineHeight: 15.0,
                                ...Fonts.primaryColor12Bold,
                                fontSize: 10,
                                color: Colors.redColor,
                                paddingHorizontal: 20,
                            }}
                        >
                            On your request, Our Customer executive will call
                            you in Business hour
                        </Text>
                        {divider()}
                        {sendMessageInfo()}
                        {submitButton()}
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => {
                    if (!message) {
                        return updateState({
                            showinfo: "Message Must Be Required!",
                        });
                    }
                    __handleSubmit(message, "Suggestion");
                }}
                style={styles.buttonStyle}
            >
                <Text
                    style={{ lineHeight: 18.0, ...Fonts.whiteColor16SemiBold }}
                >
                    Submit
                </Text>
            </TouchableOpacity>
        );
    }

    function sendMessageInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding - 5.0,
                        marginTop: Sizes.fixPadding,
                        ...Fonts.blackColor16SemiBold,
                    }}
                >
                    For Query/Suggestion
                </Text>
                {messageTextField()}
            </View>
        );
    }

    function messageTextField() {
        return (
            <TextInput
                placeholder="Message"
                value={message}
                onChangeText={(value) => updateState({ message: value })}
                style={{ ...styles.textFieldStyle, marginTop: 10 }}
                selectionColor={Colors.primaryColor}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
            />
        );
    }

    function divider() {
        return <View style={{ ...styles.dividerStyle }} />;
    }

    function supportInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text
                    style={{
                        ...Fonts.blackColor16SemiBold,
                        color: Colors.whiteColor,
                    }}
                >
                    We’re Happy to hear from you !
                </Text>
                <Text
                    style={{
                        lineHeight: 15.0,
                        ...Fonts.grayColor13Regular,
                        color: Colors.whiteColor,
                    }}
                >
                    Let us know your queries and feedbacks
                </Text>
            </View>
        );
    }

    function callusButton() {
        return (
            <TouchableOpacity
                onPress={() => {
                    __handleSubmit("Request for Call", "Call");
                }}
                style={{
                    ...styles.callusMailusButtonStyle,
                    backgroundColor: Colors.primaryColor,
                    marginRight: Sizes.fixPadding,
                }}
            >
                <MaterialIcons
                    name="call"
                    color={Colors.whiteColor}
                    size={20}
                />
                <Text
                    style={{
                        ...styles.callusMailusTextStyle,
                        ...Fonts.whiteColor16SemiBold,
                    }}
                >
                    Request for Call
                </Text>
            </TouchableOpacity>
        );
    }

    function header() {
        return (
            <View
                style={{
                    margin: Sizes.fixPadding * 2.0,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <MaterialIcons
                    name="arrow-back-ios"
                    size={20}
                    color={Colors.whiteColor}
                    onPress={() => navigation.goBack()}
                />
                <Text
                    style={{
                        lineHeight: 25.0,
                        marginLeft: Sizes.fixPadding - 5.0,
                        ...Fonts.blackColor18SemiBold,
                        color: Colors.whiteColor,
                    }}
                >
                    Support & Suggestion
                </Text>
            </View>
        );
    }
};

export default HeplAndSupportScreen;

const styles = StyleSheet.create({
    callusMailusButtonStyle: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: Sizes.fixPadding - 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
    },
    callusMailusTextStyle: {
        marginLeft: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding - 7.0,
        lineHeight: 18.0,
    },
    callusAndMailusButtonWrapStyle: {
        marginVertical: Sizes.fixPadding * 2.0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    textFieldStyle: {
        paddingHorizontal: Sizes.fixPadding,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingBottom: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding + 2.0,
        ...Fonts.blackColor14Medium,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: Sizes.fixPadding + 5.0,
        paddingTop: Sizes.fixPadding + 10.0,
        margin: Sizes.fixPadding * 2.0,
    },
    dividerStyle: {
        marginVertical: Sizes.fixPadding,
        backgroundColor: Colors.lightGrayColor,
        height: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
});
