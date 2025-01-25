import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Share,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
    __getApiData,
    __postApiData,
    __postApiDataFormData,
} from "../../utils/api";
import Loader2 from "../../components/Loader2";
import {
    Feather,
    FontAwesome,
    MaterialIcons,
    Entypo,
    AntDesign,
    Ionicons,
} from "@expo/vector-icons";
import { __generateRandomString } from "../../utils/function";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BannerScreen from "../home/bannerScreen";
import { __getUser } from "../../utils/localization";
import { Overlay } from "@rneui/themed";

const UserDashBoard = ({ navigation, route }) => {
    const [state, setState] = useState({
        isLoading: false,
        loginPoint: "0",
        scanPoint: "0",
        totalWinningPoint: "0",
        referralPoint: "0",
        walletPoint: 0,
        description: "",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        isLoading,
        loginPoint,
        scanPoint,
        totalWinningPoint,
        referralPoint,
        walletPoint,
        description,
    } = state;

    const __handleGetDashboard = (value) => {
        try {
            __getApiData(`/api/User/loginpoints`)
                .then((res) => {
                    console.log(res);
                    if (res.response.response_code == "200") {
                        updateState({
                            loginPoint: res.data?.total_points || "0",
                        });
                    }
                })
                .catch((error) => {});

            __getApiData(`/api/User/points`)
                .then((res) => {
                    console.log("points", res);
                    if (res.response.response_code == "200") {
                        updateState({
                            scanPoint: res.data?.total_points || "0",
                        });
                    }
                })
                .catch((error) => {});
            __getApiData(`/api/User/refer`)
                .then((res) => {
                    console.log("refer", res);
                    if (res.response.response_code == "200") {
                        updateState({
                            referralPoint: res.data?.total_ref || "0",
                        });
                    }
                })
                .catch((error) => {});
            __getApiData(`/api/User/refermoney`)
                .then((res) => {
                    console.log(res);
                    if (res.response.response_code == "200") {
                        updateState({
                            walletPoint: res.data?.total_ref || "0",
                        });
                    }
                })
                .catch((error) => {});
            __getApiData(`/api/user/winning`)
                .then((res) => {
                    console.log("winning", res);

                    if (res.response.response_code == "200") {
                        updateState({
                            totalWinningPoint: res.data?.total_points || "0",
                        });
                    }
                })
                .catch((error) => {});
            __getApiData(`/api/home/get_setting/dashboard_message`)
                .then((res) => {
                    console.log("dashboard_message", res.data.description);

                    if (res.response.response_code == "200") {
                        updateState({
                            description: res.data.description,
                        });
                    }
                })
                .catch((error) => {});
        } catch (error) {}
    };

    useEffect(() => {
        __handleGetDashboard();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            <View style={{ flex: 1 }}>
                {header()}
                {isLoading && <Loader2 />}

                <ScrollView style={{ paddingBottom: 20 }}>
                    <BannerScreen />
                    {/* <View
                        style={{
                            marginHorizontal: 10,
                            borderWidth: 2,
                            borderColor: Colors.primaryColor,
                            padding: 10,
                            borderRadius: 5,
                            marginTop: 10,
                        }}
                    >
                        <Text
                            style={{
                                // ...Fonts.blackColor13Medium,
                                fontSize: 13,
                                fontWeight: "900",
                            }}
                        >
                            {description}
                        </Text>
                    </View> */}
                    <TouchableOpacity
                        onPress={() => {
                            return navigation.push("Myappoiment");
                        }}
                        style={{
                            backgroundColor: Colors.primaryColor,
                            padding: 15,
                            margin: 10,
                            borderRadius: 10,
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        {/* <Ionicons
                            name="scan"
                            size={24}
                            color={Colors.whiteColor}
                            style={{ marginEnd: 15 }}
                        /> */}
                        <Text
                            style={{
                                ...Fonts.whiteColor14Medium,
                                textAlign: "center",
                            }}
                        >
                            My Appoiment details
                        </Text>
                    </TouchableOpacity>
                    {services()}
                    <View style={{ height: 60 }} />
                </ScrollView>
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
                    {
                        id: "4",
                        service: "Login Points",
                        color: "#8EACCD",
                        icon: (
                            <AntDesign
                                name="login"
                                size={40}
                                color={Colors.whiteColor}
                            />
                        ),
                        point: loginPoint,
                    },
                    // {
                    //     id: "4",
                    //     service: `Scan Points`,
                    //     color: "#E8B86D",
                    //     icon: (
                    //         <AntDesign
                    //             name="scan1"
                    //             size={40}
                    //             color={Colors.whiteColor}
                    //         />
                    //     ),
                    //     point: scanPoint,
                    // },
                    // {
                    //     id: "4",
                    //     service: "Total Winning Points",
                    //     color: "#CDC2A5",
                    //     icon: (
                    //         <Feather
                    //             name="wind"
                    //             size={40}
                    //             color={Colors.whiteColor}
                    //         />
                    //     ),
                    //     point: totalWinningPoint,
                    // },
                    // {
                    //     id: "4",
                    //     service: "Referral Count",
                    //     color: "#F05A7E",
                    //     icon: (
                    //         <AntDesign
                    //             name="sharealt"
                    //             size={40}
                    //             color={Colors.whiteColor}
                    //         />
                    //     ),
                    //     point: referralPoint,
                    // },
                    // {
                    //     id: "4",
                    //     service: "Wallets",
                    //     color: "#125B9A",
                    //     // path: "Profile",
                    //     point: "₹ " + walletPoint,
                    //     icon: (
                    //         <Entypo
                    //             name="wallet"
                    //             size={40}
                    //             color={Colors.whiteColor}
                    //         />
                    //     ),
                    // },
                    // {
                    //     id: "4",
                    //     service: "Refer & Earn",
                    //     color: "#C8A1E0",
                    //     // path: "Profile",
                    //     icon: (
                    //         <FontAwesome
                    //             name="money"
                    //             size={40}
                    //             color={Colors.whiteColor}
                    //         />
                    //     ),
                    //     refer: true,
                    // },
                    // {
                    //     id: "4",
                    //     service: "My Transaction History",
                    //     color: "#8EACCD",
                    //     path: "MyTransaction",
                    //     icon: (
                    //         <FontAwesome
                    //             name="list"
                    //             size={40}
                    //             color={Colors.whiteColor}
                    //         />
                    //     ),
                    // },
                    {
                        id: "4",
                        service: "My Profile",
                        color: "#E8B86D",
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
                        service: "Change Password",
                        color: "#CDC2A5",
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
                        color: "#F05A7E",
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

    function header() {
        return (
            <View
                style={{
                    padding: Sizes.fixPadding * 2.0,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: Colors.primaryColor,
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
                    Dashboard
                </Text>
            </View>
        );
    }
};
const RenderItem = React.memo(({ item, navigation }) => {
//     const onInvitePress = async () => {
//         try {
//             const message = `Happy-Family ऐप मैं आपका स्वागत है इस ऐप के माध्यम से आप महेंद्रगढ़ जिले के स्कूल कॉलेज हॉस्पिटल या व्यापारी संस्थानों से स्पेशल डिस्काउंट पाते हैं और प्रतिवर्ष हजारों रुपए की बचत मुफ्त में कर लेते हैं। यह ऐप ग्राहकों को और अधिक सशक्त बनाता है। इसमें नियमित लॉगिन कर और यहां रजिस्टर्ड संस्थानों से सर्विस लेकर या सामान खरीद कर आप विनिंग पॉइंट्स भी जोड़ते हैं। वर्ष के अंत में अधिक विनिंग पॉइंट्स वाले कस्टमर को गिफ्ट दिए जाएंगे। आप अपने मित्रों को इस ऐप से जोड़ने के लिए उन्हें रेफर कर सकते हैं। प्रति रेफर आपको ₹10 दिए जाएंगे। रेफर करने के लिए आप नीचे दिए लिंक का प्रयोग करें-

// रेफर कोड: ${__getUser()?.referral_code}

// https://play.google.com/store/apps/details?id=happyfamily.com

// धन्यवाद हैप्पी फैमिली के साथ हैप्पी हो जाएं।
          
//       `;
//             await Share.share({ message });
//         } catch (error) {}
//     };
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    return (
        <>
            {logoutDialog()}
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    if (item?.logout) {
                        return setShowLogoutDialog(true);
                    }

                    if (item?.refer) {
                        return onInvitePress();
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
                {item.point ? (
                    <Text
                        style={{
                            paddingHorizontal: Sizes.fixPadding - 5.0,
                            textAlign: "center",
                            ...Fonts.whiteColor12Medium,
                            fontSize: 18,
                        }}
                    >
                        {item.point}
                    </Text>
                ) : null}
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
                                .then((data) => {})
                                .catch((error) => {});
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

export default UserDashBoard;
