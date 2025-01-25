import React from "react";
import { Dimensions, Text, View } from "react-native";
const { width } = Dimensions.get("window");
import { Colors, Fonts, Sizes } from "../../constants/styles";
import OTPTextView from "react-native-otp-textinput";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const Verification = ({
    state,
    __handlSubmit,
    updateState,
    __handleResendOtp,
}) => {
    return (
        <>
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.1)",
                    zIndex: 2,
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        width: width - 40,
                        backgroundColor: Colors.whiteColor,
                        alignSelf: "center",
                        borderRadius: 20,
                        elevation: 5,
                        position: "relative",
                        shadowColor: Colors.primaryColor,
                    }}
                >
                    {closeButton()}
                    {verifyTitle()}
                    {otpFields()}
                    {resendButton()}
                    {submitButton()}
                </View>
            </View>
        </>
    );

    function closeButton(params) {
        return (
            <TouchableOpacity
                style={{
                    alignSelf: "flex-end",
                    paddingTop: 10,
                    paddingEnd: 10,
                }}
                onPress={() => {
                    updateState({ isShowVerify: false });
                }}
                activeOpacity={0.8}
            >
                <MaterialIcons
                    name="close"
                    size={25}
                    color={Colors.primaryColor}
                />
            </TouchableOpacity>
        );
    }
    function submitButton(params) {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: Colors.primaryColor,
                    alignSelf: "center",
                    marginVertical: Sizes.fixPadding * 2.0,
                    borderRadius: 5,
                }}
                activeOpacity={0.8}
                onPress={__handlSubmit}
            >
                <Text
                    style={{
                        ...Fonts.whiteColor14Medium,
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        textAlign: "center",
                        padding: 10,
                    }}
                >
                    Confirm
                </Text>
            </TouchableOpacity>
        );
    }
    function resendButton(params) {
        return (
            <TouchableOpacity onPress={__handleResendOtp} activeOpacity={0.8}>
                <Text
                    style={{
                        ...Fonts.grayColor13Regular,
                        // fontSize: 20,
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        marginTop: Sizes.fixPadding * 3.0,
                        textAlign: "center",
                    }}
                >
                    Resend OTP
                </Text>
            </TouchableOpacity>
        );
    }

    function verifyTitle() {
        return (
            <Text
                style={{
                    ...Fonts.primaryColor16SemiBold,
                    fontSize: 24,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginTop: Sizes.fixPadding * 2.0,
                    textAlign: "center",
                }}
            >
                Verify it's you
            </Text>
        );
    }
    function otpFields() {
        return (
            <OTPTextView
                containerStyle={{
                    marginTop: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
                handleTextChange={(text) => {
                    updateState({ otp: text });
                    // if (otpInput.length == 3) {
                    //     setisLoading(true);
                    //     setTimeout(() => {
                    //         setisLoading(false);
                    //         navigation.push("AppStack");
                    //     }, 2000);
                    // }
                }}
                inputCount={4}
                keyboardType="numeric"
                tintColor={Colors.primaryColor}
                textInputStyle={{ ...styles.textFieldStyle }}
                autoFocus={true}
            />
        );
    }
};

const styles = StyleSheet.create({
    textFieldStyle: {
        borderBottomWidth: null,
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderColor: "#fff",
        ...Fonts.blackColor16SemiBold,
    },
});
export default Verification;
