import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import {
    __getApiData,
    __postApiData,
    __postApiDataFormData,
} from "../../utils/api";
import Loader2 from "../../components/Loader2";
import InfoAlert from "../../components/alert/infoAlert";
import { ImageBackground } from "react-native";

const ForgetPassword = ({ navigation, route }) => {
    const [state, setState] = useState({
        isLoading: false,
        password: "",
        c_password: "",
        isShowPass: false,
        isShowCPass: false,
        showinfo: "",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isLoading, password, showinfo } = state;

    const __HandleSave = (uri) => {
        try {
            if (!password.trim()) {
                return Alert.alert("", "Please enter Mobile Number");
            }
            if (password.trim().length != 10) {
                return Alert.alert("", "Please enter valid Mobile Number");
            }

            updateState({ isLoading: true });

            __postApiData("api/home/change_password", { phone: password })
                .then((res) => {
                    updateState({ isLoading: false });

                    if (res.response.response_code == "200") {
                        return updateState({
                            showinfo: res.response.response_message,
                        });
                    }
                    Alert.alert("", res.response.response_message);
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                    updateState({ isLoading: false });
                    Alert.alert("", "Failed");
                });
        } catch (error) {
            console.log(JSON.stringify(error));
            updateState({ isLoading: false });
            Alert.alert("", "Failed");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
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
                        navigation.goBack();
                    }}
                />
            ) : null}
            <ImageBackground
                source={require("../../assets/images/greens.png")}
                style={{ flex: 1 }}
            >
                {header()}
                {isLoading && <Loader2 />}

                <ScrollView>
                    <Text
                        style={{
                            ...Fonts.blackColor13Medium,
                            fontSize: 15,
                            paddingHorizontal: 20,
                            marginTop: 15,
                            color: Colors.whiteColor,
                            textAlign: "center",
                            marginVertical: 20,
                        }}
                    >
                        Enter your mobile number and we send you a new password
                        for login.
                    </Text>

                    <View
                        style={{
                            backgroundColor: Colors.whiteColor,
                            margin: 15,
                            borderRadius: 10,
                        }}
                    >
                        <View
                            style={{
                                ...styles.textFieldWrapStyle,
                                marginBottom: Sizes.fixPadding * 1.0,
                                marginTop: 20,
                            }}
                        >
                            <Entypo
                                name={"phone"}
                                size={25}
                                color={Colors.grayColor}
                            />

                            <TextInput
                                value={password}
                                onChangeText={(value) =>
                                    updateState({ password: value })
                                }
                                placeholder="Mobile Number"
                                placeholderTextColor={Colors.grayColor}
                                style={{
                                    ...Fonts.blackColor14Regular,
                                    flex: 1,
                                    marginLeft: Sizes.fixPadding + 2.0,
                                }}
                                selectionColor={Colors.primaryColor}
                                keyboardType="phone-pad"
                            />
                        </View>

                        <TouchableOpacity
                            onPress={__HandleSave}
                            activeOpacity={0.9}
                            style={{
                                backgroundColor: Colors.primaryColor,
                                marginHorizontal: 20,
                                borderRadius: 10,
                                padding: 15,
                                marginBottom: 60,
                                marginTop: 20,
                            }}
                        >
                            <Text
                                style={{
                                    ...Fonts.whiteColor12SemiBold,
                                    textAlign: "center",
                                    fontSize: 15,
                                }}
                            >
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );

    function header() {
        return (
            <View
                style={{
                    padding: Sizes.fixPadding * 2.0,
                    flexDirection: "row",
                    alignItems: "center",
                    // backgroundColor: Colors.whiteColor,
                    elevation: 0.5,
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
                    Forget Password
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    textFieldWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderWidth: 0.5,
        borderColor: Colors.lightGray,
    },
});

export default ForgetPassword;
