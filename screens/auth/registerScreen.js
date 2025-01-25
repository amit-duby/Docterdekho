import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import {
  __setLogin,
  __setTokenAndUser,
  __setUserType,
} from "../../utils/localization";
import { __postApiData, __postLoginSigupApiData } from "../../utils/api";
import Verification from "./verification";
import Loader from "../../components/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { __registerForPushNotificationsAsync } from "../../utils/function";
import { Entypo } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState({
    name: "",
    phone: "",
    tab: 1,
    isShowVerify: false,
    otp: "1234",
    isLoading: false,
    referral_code: "",
    isShowPass: false,
    passowrd: "",
  });
  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const {
    isShowPass,
    tab,
    name,
    phone,
    isShowVerify,
    isLoading,
    otp,
    referral_code,
    passowrd,
  } = state;

  const __handleSubmit = async () => {
    updateState({ isLoading: true });

    let data = await __registerForPushNotificationsAsync();
    console.log(data, "device token data");
    Alert(data);
    __postLoginSigupApiData(`api/home/signup`, {
      name,
      phone,
      password: passowrd,
      usertype: tab == 1 ? 3 : 2,
      otp: "1234",
      device_token: data,
      referral_code,
    })
      .then((res) => {
        console.log(res, "res");
        if (res.response.response_code == "200") {
          updateState({ isShowVerify: true, isLoading: false });
          __setUserType(res.data.users.roleID);
          __setTokenAndUser(res.data.token, res.data.users);
          __setLogin(true);
          navigation.push("Profile", { isShowDashboard: true });
          AsyncStorage.setItem("login", JSON.stringify(res.data))
            .then(() => {})
            .catch((error) => {});
        } else {
          Alert.alert("", res.response.response_message);
          updateState({ isLoading: false });
        }
      })
      .catch((error) => {
        Alert.alert("", "Something went wrong");
        updateState({ isLoading: false });
      });
  };

  const __handleVerify = async () => {
    updateState({ isLoading: true });
    // let data = await __registerForPushNotificationsAsync();
    __postLoginSigupApiData(`api/home/signup`, {
      name,
      phone,
      password: passowrd,
      usertype: tab == 1 ? 3 : 2,
      otp: "1234",
      referral_code,
      // device_token: data,
    })
      .then((res) => {
        console.log(res);

        if (res.response.response_code == "200") {
          updateState({ isShowVerify: false, isLoading: false });
          __setUserType(res.data.users.roleID);
          __setTokenAndUser(res.data.token, res.data.users);
          __setLogin(true);
          navigation.push("Profile", { isShowDashboard: true });

          AsyncStorage.setItem("login", JSON.stringify(res.data))
            .then(() => {})
            .catch((error) => {});
        } else {
          Alert.alert("", res.response.response_message);
          updateState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("", "Something went wrong");
        updateState({ isLoading: false });
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
      <StatusBar
        backgroundColor={Colors.primaryColor}
        barStyle={"dark-content"}
      />
      {/* {isShowVerify ? (
                <Verification
                    state={state}
                    updateState={updateState}
                    __handlSubmit={__handleVerify}
                    __handleResendOtp={__handleSubmit}
                />
            ) : null} */}
      {isLoading ? <Loader /> : null}
      <ImageBackground
        source={require("../../assets/images/greens.png")}
        style={{ flex: 1, justifyContent: "center" }}
      >
        {backArrow()}
        {registerTitle()}

        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            backgroundColor: Colors.whiteColor,
            marginHorizontal: 15,
            borderRadius: 30,
            paddingTop: 30,
          }}
        >
          {/* {appLogo()} */}
          {loginType()}
          {nameTextField()}
          {mobileTextField()}
          {signupButton()}
          {alreadyAccountInfo()}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
  function registerTitle() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.5,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <View style={{ marginBottom: 5 }}>
          <Text
            style={{
              ...Fonts.primaryColor16SemiBold,
              fontSize: 28,
              color: Colors.whiteColor,
            }}
          >
            REGISTER
          </Text>
        </View>
      </View>
    );
  }
  function loginType(params) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.textFieldWrapStyle,
            marginBottom: Sizes.fixPadding * 2.0,
            width: "50%",
            marginHorizontal: 0,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          }}
          onPress={() => {
            updateState({ tab: 1 });
          }}
          activeOpacity={0.8}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: tab == 1 ? Colors.whiteColor : Colors.lightGrayColor,
              marginEnd: 10,
              backgroundColor:
                tab == 1 ? Colors.primaryColor : Colors.whiteColor,
              elevation: tab == 1 ? 2 : 0,
            }}
          />
          <View style={{}}>
            <Text style={{ ...Fonts.blackColor13Medium }}>Patient</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.textFieldWrapStyle,
            marginBottom: Sizes.fixPadding * 2.0,
            width: "50%",
            marginHorizontal: 0,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
          }}
          onPress={() => {
            updateState({ tab: 2 });
          }}
          activeOpacity={0.8}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: tab == 2 ? Colors.whiteColor : Colors.lightGrayColor,
              marginEnd: 10,
              backgroundColor:
                tab == 2 ? Colors.primaryColor : Colors.whiteColor,
              elevation: tab == 2 ? 2 : 0,
            }}
          />

          <View style={{}}>
            <Text style={{ ...Fonts.blackColor13Medium }}>Doctor</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function alreadyAccountInfo() {
    return (
      <Text
        style={{
          textAlign: "center",
          margin: Sizes.fixPadding * 2.0,
          marginTop: 0,
        }}
      >
        <Text style={{ ...Fonts.grayColor14Regular }}>
          Already have an account.{" "}
        </Text>
        <Text
          onPress={() => navigation.push("Login")}
          style={{ ...Fonts.blackColor16Medium }}
        >
          Sign In
        </Text>
      </Text>
    );
  }

  function signupButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => __handleSubmit()}
        style={styles.signupButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor15Regular }}>Sign Up</Text>
      </TouchableOpacity>
    );
  }

  function nameTextField() {
    return (
      <View
        style={{
          ...styles.textFieldWrapStyle,
          marginBottom: Sizes.fixPadding * 1.0,
        }}
      >
        <Entypo name={"user"} size={25} color={Colors.grayColor} />

        <TextInput
          value={name}
          onChangeText={(value) => updateState({ name: value })}
          placeholder="Full Name *"
          placeholderTextColor={Colors.grayColor}
          style={{
            ...Fonts.blackColor14Regular,
            flex: 1,
            marginLeft: Sizes.fixPadding + 2.0,
          }}
          selectionColor={Colors.primaryColor}
          keyboardType="email-address"
        />
      </View>
    );
  }

  function mobileTextField() {
    return (
      <>
        <View
          style={{
            ...styles.textFieldWrapStyle,
            marginBottom: Sizes.fixPadding * 1.0,
          }}
        >
          <Entypo name={"phone"} size={25} color={Colors.grayColor} />

          <TextInput
            value={phone}
            onChangeText={(value) => updateState({ phone: value })}
            placeholder=" Mobile Number *"
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.blackColor14Regular,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
            }}
            selectionColor={Colors.primaryColor}
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
        <View
          style={{
            ...styles.textFieldWrapStyle,
            marginBottom: Sizes.fixPadding * 1.0,
          }}
        >
          <Entypo name={"lock"} size={25} color={Colors.grayColor} />

          <TextInput
            value={passowrd}
            onChangeText={(value) => updateState({ passowrd: value })}
            placeholder="Password"
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
            onPress={() => updateState({ isShowPass: !isShowPass })}
          />
        </View>
        {/* <View
                    style={{
                        ...styles.textFieldWrapStyle,
                    }}
                >
                    <Entypo name={"share"} size={25} color={Colors.grayColor} />

                    <TextInput
                        value={referral_code}
                        onChangeText={(value) =>
                            updateState({ referral_code: value })
                        }
                        placeholder="Referral Code"
                        placeholderTextColor={Colors.grayColor}
                        style={{
                            ...Fonts.blackColor14Regular,
                            flex: 1,
                            marginLeft: Sizes.fixPadding + 2.0,
                        }}
                        selectionColor={Colors.primaryColor}
                        keyboardType="email-address"
                    />
                </View> */}
      </>
    );
  }
  function appLogo() {
    return (
      <View style={{ ...styles.appLogosty }}>
        <Image
          source={require("../../assets/images/dicon.png")}
          resizeMode="contain"
          style={{ width: 220, height: 100 }}
        />
      </View>
    );
  }

  function backArrow() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 0,
          position: "absolute",
          top: 0,
        }}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          color={Colors.whiteColor}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
  },

  signupButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding + 5.0,
  },

  appLogosty: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default LoginScreen;
