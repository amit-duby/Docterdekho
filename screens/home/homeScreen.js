import {
    MaterialIcons,
    MaterialCommunityIcons,
    Ionicons,
} from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
    BackHandler,
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import UserHome from "./userHome";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProfessionalHome from "./professionalHome";
import {
    __checkLogin,
    __getUser,
    __getUserType,
} from "../../utils/localization";
import InfoAlert from "../../components/alert/infoAlert";
import Loader from "../../components/loader";
import { __postApiData, BASE_URL } from "../../utils/api";
import BottomButton from "../../components/BottomButton";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
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

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000);
    }

    const [backClickCount, setBackClickCount] = useState(0);

    const [state, setState] = useState({
        isLoading: false,
        showinfo: null,
        count: 0,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const { isLoading, showinfo, count } = state;

    const __handleBookNotification = (item, services) => {
        const service_name = item.service?.name;
        const service_amount = item.service?.amount;
        const provider_id = item.provider?.id;
      
        const date = new Date();
        updateState({
            isLoading: true,
        });
        __postApiData(`api/Booking/book_service`, {
            service_name,
            provider_id,
            service_amount,
            date,
            services,
        })
            .then((res) => {
                updateState({
                    showinfo:
                        "Your request has been sent to the professional, and we will let you know when it has been approved",
                    isLoading: false,
                });
            })
            .catch((error) => {
                updateState({
                    isLoading: false,
                    showinfo: "Booking failed!",
                });
            });
    };

    const __handleUpdateService = async (booking_id, status) => {
        updateState({
            isLoading: true,
        });
        return await __postApiData(`api/Booking/status`, {
            booking_id,
            status,
        })
            .then((res) => {
                updateState({
                    showinfo: res.response.response_message,
                    isLoading: false,
                });

                return "done";
            })
            .catch((error) => {
                updateState({
                    isLoading: false,
                });
                return "done";
            });
    };

    const __handleGetNotification = () => {
        __postApiData(`api/Booking/notification_count`, {})
            .then((res) => {
                updateState({
                    count: res?.data?.count_ || 0,
                });
            })
            .catch((error) => {});
    };
    useFocusEffect(
        useCallback(() => {
            __handleGetNotification();
            return () => {};
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
                barStyle={"light-content"}
            />
            {showinfo ? (
                <InfoAlert
                    header2={showinfo}
                    isButton={"Ok"}
                    handleButtonClick={() => {
                        updateState({
                            showinfo: null,
                        });
                    }}
                />
            ) : null}
            {isLoading ? <Loader /> : null}
            <View style={{ flex: 1 }}>
                {header()}

                {__getUserType() == "2" ? (
                    <ProfessionalHome
                        navigation={navigation}
                        __handleUpdateService={__handleUpdateService}
                    />
                ) : (
                    <UserHome
                        navigation={navigation}
                        __handleBookNotification={__handleBookNotification}
                        __handleUpdateService={__handleUpdateService}
                    />
                )}
            </View>
            {backClickCount == 1 ? (
                <View style={[styles.animatedView]}>
                    <Text style={{ ...Fonts.whiteColor12Medium }}>
                        Press Back Once Again to Exit
                    </Text>
                </View>
            ) : null}
        </SafeAreaView>
    );

    function header() {
        return (
            <View style={styles.headerStyle}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <MaterialIcons
                        name="menu"
                        size={24}
                        color={Colors.whiteColor}
                        onPress={() => {
                            __checkLogin()
                                ? navigation.openDrawer()
                                : navigation.push("Login");
                        }}
                    />
                    <Text
                        style={{
                            lineHeight: 25.0,
                            marginLeft: Sizes.fixPadding - 5.0,
                            ...Fonts.blackColor18SemiBold,
                            color: Colors.whiteColor,
                        }}
                    >
                        {__getUserType() != "2" ? "Home" : "Dashboard"}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View style={styles.container1}>
                        <TouchableOpacity
                            style={styles.centerButtonContainer}
                            onPress={() => {
                             navigation.navigate("ambulance")
                                
                            }}
                            activeOpacity={0.5}
                        >
                            <Text style={styles.centerButtonText}>
                                Book Ambulance
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {__checkLogin() ? (
                        <ImageBackground
                            source={
                                __getUser() && __getUser().profile
                                    ? {
                                          uri: BASE_URL + __getUser().profile,
                                      }
                                    : require("../../assets/images/user.png")
                            }
                            resizeMode="cover"
                            style={{
                                width: 45,
                                height: 45,
                                borderRadius: 50,
                                overflow: "hidden",
                            }}
                        ></ImageBackground>
                    ) : (
                        <Text
                            onPress={() => {
                                navigation.push("Login");
                            }}
                            style={{
                                ...Fonts.primaryColor12Bold,
                                fontSize: 15,
                                color: Colors.whiteColor,
                            }}
                        >
                            Login
                        </Text>
                    )}
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Sizes.fixPadding * 1.5,
        paddingVertical: Sizes.fixPadding,
        elevation: 0.5,
        backgroundColor: Colors.primaryColor,
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    centerButtonContainer: {
        backgroundColor: Colors.blueColor,
        width: 115,
        height: 40,
        borderRadius: 5,
        right: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    centerButtonText: {
        color: Colors.whiteColor,
        fontWeight: "bold",
        fontSize: 12,
    },
    container1: {
        marginTop: 5,
        alignItems: "center",
    },
});

export default HomeScreen;
