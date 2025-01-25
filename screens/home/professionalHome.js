import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Text,
    RefreshControl,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
    Feather,
    FontAwesome,
    MaterialIcons,
    Entypo,
    AntDesign,
    Ionicons,
} from "@expo/vector-icons";
import { __getUser } from "../../utils/localization";
import { __getApiData, __postApiData } from "../../utils/api";
import { __generateRandomString } from "../../utils/function";
import BannerScreen from "./bannerScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Overlay } from "@rneui/themed";

const ProfessionalHome = ({ navigation }) => {
    const [state, setState] = useState({
        isLoading: false,

        call: 0,
        message: 0,
        whatapp: 0,
        totalService: 0,
        totalUsed: 0,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isLoading, call, message, whatapp, totalService, totalUsed } =
        state;

    const [refreshing, setRefreshing] = useState(false);

    const __handleGetSearchResult = (value) => {
        __postApiData(`/api/home/actionloglist`)
            .then((res) => {
                console.log(res);
                setRefreshing(false);
                if (res.response.response_code == "200") {
                    updateState({
                        call:
                            res.data.find((item) => item.action_type == "Call")
                                ?.count || 0,
                        message:
                            res.data.find(
                                (item) => item.action_type == "Message"
                            )?.count || 0,
                        whatapp:
                            res.data.find(
                                (item) => item.action_type == "Whatspp"
                            )?.count || 0,
                    });
                }
            })
            .catch((error) => { });
    };
    const __handleGetDashboard = (value) => {
        __getApiData(`/api/User/dashboard`)
            .then((res) => {
                if (res.response.response_code == "200") {
                    updateState({
                        totalService: res.data[0]?.no_of_update || 0,
                        totalUsed: res.data[0]?.total_attempt || 0,
                    });
                }
            })
            .catch((error) => { });
    };
    useEffect(() => {
        __handleGetSearchResult();
        __handleGetDashboard();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <BannerScreen />
                            {/* {countBox()} */}
                            {services()}
                            {/* <TouchableOpacity
                                onPress={() => navigation.push("EnquiryList")}
                                activeOpacity={0.9}
                                style={{
                                    backgroundColor: Colors.primaryColor,
                                    margin: 10,
                                    padding: 15,
                                    borderRadius: 10,
                                    elevation: 2,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    gap: 10,
                                }}
                            >
                                <Ionicons
                                    name="newspaper"
                                    color={Colors.whiteColor}
                                    size={25}
                                />
                                <Text
                                    style={{
                                        ...Fonts.whiteColor14Medium,
                                        marginTop: 2,
                                    }}
                                >
                                    My Enquiry
                                </Text>
                            </TouchableOpacity> */}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding * 7.0,
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                setRefreshing(true);
                                __handleGetSearchResult();
                                __handleGetDashboard();
                            }}
                        />
                    }
                />
            </View>
        </SafeAreaView>
    );

    function services() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                data={[
                    // {
                    //     id: "4",
                    //     service: "Update Plans",
                    //     color: "#91c7df",
                    //     path: "Profile",
                    //     icon: (
                    //         <FontAwesome
                    //             name="money"
                    //             size={40}
                    //             color={Colors.whiteColor}
                    //         />
                    //     ),
                    //     data: { tab: 3 },
                    // },
                    // {
                    //     id: "4",
                    //     service: `Update Ads (${totalService}/${totalUsed})`,
                    //     color: "#E8B86D",
                    //     icon: (
                    //         <Entypo
                    //             name="image"
                    //             size={40}
                    //             color={Colors.whiteColor}
                    //         />
                    //     ),
                    //     path: "ServiceScreen",
                    // },
                    {
                        id: "4",
                        service: "My Profile",
                        color: "#91c7df",
                        path: "Profile",
                        icon: (
                            <FontAwesome
                                name="user-circle-o"
                                size={40}
                                color={Colors.whiteColor}
                            />
                        ),
                    },
                    {
                        id: "4",
                        service: `All Appointment`,
                        color: "#f8886f",
                        icon: (
                            <MaterialIcons
                                name="medical-services"
                                size={40}
                                color={Colors.whiteColor}
                            />
                        ),
                        path: "DoctorAppointment",
                    },
                    {
                        id: "4",
                        service: "New Appointment",
                        color: "#E8B86D",
                        icon: (
                            <MaterialIcons name="event" size={40} color={Colors.whiteColor} />
                        ),
                        path: "NewAppointment",
                    },
                    {
                        id: "4",
                        service: "Accepted Appointment",
                        color: "#7bc579",
                        icon: (
                            <FontAwesome name="check-circle" size={40} color={Colors.whiteColor} />
                        ),
                        path: "AcceptedAppointment",
                    },
                    {
                        id: "4",
                        service: "Close Appointment",
                        color: "#d0e9e9",
                        icon: (
                            <AntDesign name="closecircle" size={40} color={Colors.whiteColor} />
                        ),
                        path: "CloseAppointment",
                    },
                    {
                        id: "4",
                        service: "Cancel Appointment",
                        color: "#ef6969",
                        icon: (
                            <AntDesign name="closecircle" size={40} color={Colors.whiteColor} />
                        ),
                        path: "CancelAppointment",
                    },

                 
                  
                    {
                        id: "4",
                        service: "Add New Appointment",
                        color: "#7aa5e8",
                        path: "Addnewpesent",
                        icon: (
                            <FontAwesome
                                name="user-circle-o"
                                size={40}
                                color={Colors.whiteColor}
                            />
                        ),
                    },
                    {
                        id: "4",
                        service: "Change Password",
                        color: "#b5f46f",
                        icon: (
                            <Entypo
                                name="lock"
                                size={40}
                                color={Colors.whiteColor}
                            />
                        ),
                        path: "ChangePassword",
                    },
                    {
                        id: "4",
                        service: "Logout",
                        color: "#03bbfb",
                        icon: (
                            <AntDesign
                                name="logout"
                                size={40}
                                color={Colors.whiteColor}
                            />
                        ),
                        logout: true,
                    },
                ]}
                keyExtractor={(item) => __generateRandomString(10)}
                renderItem={({ item }) => (
                    <RenderItem item={item} navigation={navigation} />
                )}
            />
        );
    }

    function countBox(params) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginHorizontal: 10,
                    justifyContent: "space-between",
                    paddingVertical: 20,
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.push("WhatsAppList")}
                    style={{
                        width: "32%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        backgroundColor: Colors.whiteColor,
                        elevation: 2,
                        paddingVertical: 15,
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor13Medium,
                            fontSize: 20,
                            fontFamily: "Sans-Serif",
                        }}
                    >
                        {whatapp}
                    </Text>
                    <FontAwesome name="whatsapp" size={35} color={"#25D366"} />
                    <Text
                        style={{
                            ...Fonts.blackColor13Medium,
                            fontSize: 11,
                            fontFamily: "Sans-Serif",
                            color: Colors.primaryColor,
                            textDecorationLine: "underline",
                            fontWeight: "700",
                        }}
                    >
                        click
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.push("CallList")}
                    style={{
                        width: "32%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        backgroundColor: Colors.whiteColor,
                        elevation: 2,
                        paddingVertical: 15,
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor13Medium,
                            fontSize: 20,
                            fontFamily: "Sans-Serif",
                        }}
                    >
                        {call}
                    </Text>
                    <Feather name="phone-call" size={35} color={"#7f8ff9"} />
                    <Text
                        style={{
                            ...Fonts.blackColor13Medium,
                            fontSize: 11,
                            fontFamily: "Sans-Serif",
                            color: Colors.primaryColor,
                            textDecorationLine: "underline",
                            fontWeight: "700",
                        }}
                    >
                        click
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.push("EnquiryList")}
                    style={{
                        width: "32%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        backgroundColor: Colors.whiteColor,
                        elevation: 2,
                        paddingVertical: 15,
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor13Medium,
                            fontSize: 20,
                            fontFamily: "Sans-Serif",
                        }}
                    >
                        {message}
                    </Text>
                    <MaterialIcons name="message" size={35} color={"#aeb9cc"} />
                    <Text
                        style={{
                            ...Fonts.blackColor13Medium,
                            fontSize: 11,
                            fontFamily: "Sans-Serif",
                            color: Colors.primaryColor,
                            textDecorationLine: "underline",
                            fontWeight: "700",
                        }}
                    >
                        click
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const RenderItem = React.memo(({ item, navigation }) => {
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    return (
        <>
            {logoutDialog()}
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    if (item?.logout) {
                        setShowLogoutDialog(true);
                        return;
                    }
                    item.path && navigation.push(item.path, item?.data || {});
                }}
                style={[
                    styles.servicesWrapStyle,
                    { backgroundColor: item.color },
                ]}
            >
                <View style={styles.servicesIconWrapStyle}>{item.icon}</View>
                <Text
                    numberOfLines={1}
                    style={{
                        paddingHorizontal: Sizes.fixPadding - 5.0,
                        textAlign: "center",
                        ...Fonts.whiteColor12Medium,
                        fontSize: 13.5,
                        marginTop: 10,
                    }}
                >
                    {item.service}
                </Text>
            </TouchableOpacity>
        </>
    );
    function logoutDialog() {
        return (
            <Overlay
                isVisible={showLogoutDialog}
                onBackdropPress={() => setShowLogoutDialog(false)}
                overlayStyle={styles.dialogStyle}
            >
                <Text style={{ ...styles.logoutTextStyle }}>
                    Are you sure want to logout?
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        activeOpacity={0.99}
                        onPress={() => {
                            setShowLogoutDialog(false);
                        }}
                        style={{
                            marginRight: Sizes.fixPadding,
                            ...styles.dialogButtonStyle,
                        }}
                    >
                        <Text
                            style={{
                                marginTop: Sizes.fixPadding - 7.0,
                                lineHeight: 18.0,
                                ...Fonts.primaryColor16SemiBold,
                            }}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.99}
                        onPress={() => {
                            setShowLogoutDialog(false);
                            navigation.navigate("Login");

                            AsyncStorage.removeItem("login")
                                .then((data) => { })
                                .catch((error) => { });
                        }}
                        style={{
                            ...styles.dialogButtonStyle,
                            marginLeft: Sizes.fixPadding,
                            backgroundColor: Colors.primaryColor,
                        }}
                    >
                        <Text
                            style={{
                                marginTop: Sizes.fixPadding - 7.0,
                                lineHeight: 18.0,
                                ...Fonts.whiteColor16SemiBold,
                            }}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
        );
    }
});

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },

    servicesWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        flex: 1,
        paddingVertical: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: Sizes.fixPadding - 3.0,
    },
    servicesIconWrapStyle: {
        borderRadius: 50.0,
        alignItems: "center",
        justifyContent: "center",
    },
    drawerOptionStyle: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
        borderBottomRightRadius: Sizes.fixPadding * 3.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    profileInfoWrapStyle: {
        backgroundColor: Colors.primaryColor,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: Sizes.fixPadding * 3.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding + 5.0,
    },
    profileImageStyle: {
        width: 50.0,
        height: 50.0,
        resizeMode: "center",
        borderRadius: 25.0,
        backgroundColor: Colors.blackColor,
        overflow: "hidden",
    },
    drawerContentWrapStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        elevation: 1.0,
        shadowColor: Colors.lightGrayColor,
    },

    drawerDividerStyle: {
        backgroundColor: Colors.lightGrayColor,
        height: 1.0,
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    drawerIconsStyle: {
        width: 22.0,
        height: 22.0,
        resizeMode: "contain",
    },
    dialogStyle: {
        width: "90%",
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    dialogButtonStyle: {
        flex: 1,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        alignItems: "center",
        justifyContent: "center",
        marginTop: Sizes.fixPadding * 2.0,
    },
    logoutTextStyle: {
        marginTop: Sizes.fixPadding - 7.0,
        lineHeight: 18.0,
        textAlign: "center",
        ...Fonts.blackColor16SemiBold,
    },
});

export default ProfessionalHome;
