import { MaterialIcons, Entypo } from "@expo/vector-icons";
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
const MessageBox = ({ navigation, route }) => {
    const [state, setState] = useState({
        message: "",
        isLoading: false,
        showinfo: "",
        subject: "",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { message, showinfo, isLoading, subject } = state;
    const __handleSubmit = (message, enquiry_for) => {
        console.log(route);
        try {
            updateState({
                isLoading: true,
                showinfo: "",
            });
            __postApiData(`api/home/actionlog`, {
                client_id: route.params?.client_id,
                action_type: "Message",
            })
                .then((res) => {
                    if (res.response.response_code == "200") {
                        __postApiData(`api/home/enquiry`, {
                            client_id: route.params?.client_id,
                            message: message,
                            enquiry_for: "Message",
                            subject: subject,
                        })
                            .then((res) => {
                                return updateState({
                                    showinfo: res.response.response_message,
                                    message: "",
                                    isLoading: false,
                                    subject: "",
                                });
                            })
                            .catch((error) => {
                                updateState({
                                    isLoading: false,
                                });
                            });

                        return;
                    }
                })
                .catch((error) => {
                    updateState({ isLoading: false });

                    console.log(error);
                });
        } catch (error) {
            updateState({
                isLoading: false,
            });
        }
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
                        });
                        navigation.push("MainDrawer");
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
                    {/* {supportInfo()} */}
                    {/* {divider()} */}

                    <View
                        style={{
                            backgroundColor: Colors.whiteColor,
                            margin: 15,
                            borderRadius: 10,
                        }}
                    >
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
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginTop: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: Colors.whiteColor,
                        borderRadius: Sizes.fixPadding + 5.0,
                        paddingHorizontal: Sizes.fixPadding + 2.0,
                        paddingVertical: Sizes.fixPadding + 5.0,
                        borderWidth: 0.5,
                        borderColor: Colors.lightGray,
                        marginBottom: Sizes.fixPadding * 1.0,
                        marginTop: 20,
                    }}
                >
                    <MaterialIcons
                        name={"subject"}
                        size={25}
                        color={Colors.grayColor}
                    />
                    <TextInput
                        placeholder="Subject"
                        value={subject}
                        onChangeText={(value) =>
                            updateState({ subject: value })
                        }
                        style={{
                            ...Fonts.blackColor14Regular,
                            flex: 1,
                            marginLeft: Sizes.fixPadding + 2.0,
                        }}
                        selectionColor={Colors.primaryColor}
                    />
                </View>

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
                numberOfLines={10}
                textAlignVertical="top"
            />
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
                    Message
                </Text>
            </View>
        );
    }
};

export default MessageBox;

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
