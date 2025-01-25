import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Image,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
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

const ChangePassword = ({ navigation, route }) => {
    const [state, setState] = useState({
        isLoading: false,
        password: "",
        c_password: "",
        isShowPass: false,
        isShowCPass: false,
        showinfo: "",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        isLoading,
        showinfo,
        password,
        c_password,
        isShowPass,
        isShowCPass,
    } = state;

    const __HandleSave = (uri) => {
        try {
            if (!password.trim()) {
                return Alert.alert("", "Please enter new password");
            }
            if (!c_password.trim()) {
                return Alert.alert("", "Please enter confirm password");
            }
            if (password != c_password) {
                return Alert.alert(
                    "",
                    "new password not match to your confirm password, please enter valid confirm password"
                );
            }
            updateState({ isLoading: true });

            __postApiData("api/user/update_password", { password })
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
                        navigation.push("MainDrawer");
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
                    <View
                        style={{
                            backgroundColor: Colors.whiteColor,
                            margin: 15,
                            borderRadius: 10,
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.blackColor13Medium,
                                fontSize: 13,
                                paddingHorizontal: 20,
                                marginTop: 15,
                                color: Colors.grayColor,
                            }}
                        >
                            New Password
                        </Text>
                        <View
                            style={{
                                ...styles.textFieldWrapStyle,
                                marginBottom: Sizes.fixPadding * 1.0,
                                marginTop: 10,
                            }}
                        >
                            <Entypo
                                name={"lock"}
                                size={25}
                                color={Colors.grayColor}
                            />

                            <TextInput
                                value={password}
                                onChangeText={(value) =>
                                    updateState({ password: value })
                                }
                                placeholder="New Password"
                                placeholderTextColor={Colors.grayColor}
                                style={{
                                    ...Fonts.blackColor14Regular,
                                    flex: 1,
                                    marginLeft: Sizes.fixPadding + 2.0,
                                }}
                                selectionColor={Colors.primaryColor}
                                secureTextEntry={!isShowPass}
                            />
                            <Entypo
                                name={isShowPass ? "eye" : "eye-with-line"}
                                size={25}
                                onPress={() =>
                                    updateState({ isShowPass: !isShowPass })
                                }
                            />
                        </View>
                        <Text
                            style={{
                                ...Fonts.blackColor13Medium,
                                fontSize: 13,
                                paddingHorizontal: 20,
                                color: Colors.grayColor,
                            }}
                        >
                            Confirm Password
                        </Text>
                        <View
                            style={{
                                ...styles.textFieldWrapStyle,
                                marginBottom: Sizes.fixPadding * 1.0,
                                marginTop: 10,
                            }}
                        >
                            <Entypo
                                name={"lock"}
                                size={25}
                                color={Colors.grayColor}
                            />

                            <TextInput
                                value={c_password}
                                onChangeText={(value) =>
                                    updateState({ c_password: value })
                                }
                                placeholder="Enter Confirm Password"
                                placeholderTextColor={Colors.grayColor}
                                style={{
                                    ...Fonts.blackColor14Regular,
                                    flex: 1,
                                    marginLeft: Sizes.fixPadding + 2.0,
                                }}
                                selectionColor={Colors.primaryColor}
                                secureTextEntry={!isShowCPass}
                            />
                            <Entypo
                                name={isShowCPass ? "eye" : "eye-with-line"}
                                size={25}
                                onPress={() =>
                                    updateState({ isShowCPass: !isShowCPass })
                                }
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
                                    color: Colors.whiteColor,
                                }}
                            >
                                Save
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
                    Change Password
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

export default ChangePassword;



