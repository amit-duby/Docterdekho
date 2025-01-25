import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Image,
    BackHandler,
    Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { Colors, Fonts } from "../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    __setLocalToken,
    __setLogin,
    __setTokenAndUser,
    __setUserType,
} from "../utils/localization";
import { __getApiData } from "../utils/api";
import * as Notifications from "expo-notifications";
import {
    __registerForPushNotificationsAsync,
    __schedulePushNotification,
} from "../utils/function";
import * as Font from "expo-font";

const SplashScreen = ({ navigation }) => {
    const backAction = () => {
        BackHandler.exitApp();
        return true;
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    backAction
                );
        }, [backAction])
    );

    const __handleGetLogin = () => {
        AsyncStorage.getItem("login")
            .then((data) => {
                const login = JSON.parse(data);
                if (!login) {
                    __getApiData(`api/home/token`)
                        .then((res) => {
                            console.log(res);
                            __setLocalToken(res);
                            // navigation.push("Login");
                            navigation.push("AppStack");
                        })
                        .catch((error) => {
                            Alert.alert("", "Something went wrong");
                        });
                    return;
                }
                __setUserType(login?.users?.roleID);
                __setTokenAndUser(login?.token, login?.users);
                __setLogin(true);
                setTimeout(() => {
                    navigation.push("AppStack");
                }, 2000);
            })
            .catch((error) => {
                setTimeout(() => {
                    navigation.push("Login");
                }, 2000);
            });
    };

    useEffect(() => {
        __handleGetLogin();
    }, []);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                const newMessage = JSON.parse(JSON.stringify(notification));

                const notif =
                    newMessage?.request?.trigger?.remoteMessage?.notification;

                if (notif?.body) {
                    __schedulePushNotification(notif?.title, notif?.body);
                }
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {}
            );
        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, []);

    useEffect(() => {
        (async () => {
            await Font.loadAsync({
                Poppins_Regular: require("../assets/fonts/poppins/Poppins-Regular.ttf"),
                Poppins_Medium: require("../assets/fonts/poppins/Poppins-Medium.ttf"),
                Poppins_SemiBold: require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
                Poppins_Bold: require("../assets/fonts/poppins/Poppins-Bold.ttf"),
                Charmonman_Bold: require("../assets/fonts/charmonman/Charmonman-Bold.ttf"),
            });
        })();
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#42D9C2" }}>
            <StatusBar
                translucent={false}
                backgroundColor={"#42D9C2"}
                barStyle={"dark-content"}
            />
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    source={require("../assets/images/sliderbanner.png")}
                    resizeMode="center"
                    style={{
                        width: "100%",
                        height: 700,
                        resizeMode: "contain",
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default SplashScreen;
