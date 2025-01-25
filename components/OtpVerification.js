import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
const { width } = Dimensions.get("window");
import { Colors, Fonts, Sizes } from "../constants/styles";
import OTPTextView from "react-native-otp-textinput";
import { StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Button, Dialog } from "@rneui/themed";
const OtpVerification = ({
    isShow,
    state,
    __handlSubmit,
    updateState,
    __handleResendOtp,
}) => {
    return (
        <>
            <Dialog
                isVisible={isShow}
                onBackdropPress={() => updateState({ showOtp: false })}
                animationType="fade"
                backdropStyle={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                }}
                overlayStyle={{
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
            </Dialog>
        </>
    );

    function closeButton(params) {
        return (
            <>
                <Button
                    onPress={() => {
                        updateState({ showOtp: false });
                    }}
                    buttonStyle={{
                        alignSelf: "flex-end",
                        paddingTop: 10,
                        paddingEnd: 10,
                        backgroundColor: "transparent",
                    }}
                    icon={
                        <MaterialIcons
                            name="close"
                            size={25}
                            color={Colors.primaryColor}
                        />
                    }
                />
            </>
        );
    }
    function submitButton(params) {
        return (
            <>
                <Button
                    title="Confirm"
                    onPress={__handlSubmit}
                    buttonStyle={{
                        backgroundColor: Colors.primaryColor,
                        alignSelf: "center",
                        marginVertical: Sizes.fixPadding * 2.0,
                        borderRadius: 5,
                    }}
                    titleStyle={{
                        ...Fonts.whiteColor14Medium,
                        marginHorizontal: Sizes.fixPadding * 1.0,
                        textAlign: "center",
                        padding: 10,
                    }}
                />
            </>
        );
    }
    function resendButton(params) {
        return (
            <TouchableOpacity onPress={__handleResendOtp} activeOpacity={0.8}>
                <Text
                    style={{
                        ...Fonts.grayColor13Regular,
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
                }}
                inputCount={4}
                keyboardType="numeric"
                tintColor={Colors.primaryColor}
                textInputStyle={{ ...styles.textFieldStyle }}
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

export default OtpVerification;
