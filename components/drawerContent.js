import { DrawerContentScrollView } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Overlay } from "@rneui/themed";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { __getUser, __getUserType } from "../utils/localization";
import { __getApiData, BASE_URL } from "../utils/api";
const CustomDrawer = (props) => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(1);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [cmsList, setCmsList] = React.useState([]);

    const __HandleGetSMS = (uri) => {
        try {
            __getApiData("api/home/pages")
                .then((res) => {
                    // Alert.alert("", res.response.response_message);
                    console.log(res);
                    if (res.response.response_code == "200") {
                        setCmsList(res?.data);
                    }
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                });
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    };
    useEffect(() => {
        __HandleGetSMS();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
                barStyle={"light-content"}
            />
            {profileInfo()}
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: Colors.primaryColor,
                }}
                showsVerticalScrollIndicator={false}
            >
                {drawerContent()}
            </DrawerContentScrollView>
            {logoutDialog()}
        </View>
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
                            props.navigation.navigate("Login");

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

    function drawerContent() {
        return (
            <View style={styles.drawerContentWrapStyle}>{drawerOptions()}</View>
        );
    }

    function drawerOptions() {
        return (
            <View style={{ paddingTop: Sizes.fixPadding * 3.0 }}>
                {otherOptions()}
                {divider()}

                {aboutOptions()}
                {divider()}
                {logoutOption()}
            </View>
        );
    }

    function logoutOption() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => {
                    setShowLogoutDialog(true);
                }}
                style={{ ...styles.drawerOptionStyle, alignSelf: "flex-start" }}
            >
                <Image
                    source={require("../assets/images/icons/logout.png")}
                    style={{
                        ...styles.drawerIconsStyle,
                        tintColor: Colors.whiteColor,
                    }}
                />
                <Text
                    style={{
                        marginTop: Sizes.fixPadding - 7.0,
                        lineHeight: 22.0,
                        marginLeft: Sizes.fixPadding + 5,
                        ...Fonts.blackColor14Medium,
                        color: Colors.whiteColor,
                    }}
                >
                    Logout
                </Text>
            </TouchableOpacity>
        );
    }

    function divider() {
        return <View style={styles.drawerDividerStyle} />;
    }

    function aboutOptions() {
        return (
            <View>
                <View style={{}}>
                    {cmsList.map((item) =>
                        drawerOptionSort({
                            icon: require("../assets/images/icons/grocery.png"),
                            option: item?.contant_hadding,
                            index: 6,
                            navigateTo: "TermsAndConditions",
                            varable: {
                                id: item?.contant_auto_id,
                                name: item?.contant_hadding,
                            },
                        })
                    )}
                </View>
            </View>
        );
    }

    function otherOptions() {
        return (
            <View>
                
                <View style={{}}>
                    {__getUserType() == "2" &&
                        drawerOptionSort({
                            icon: require("../assets/images/icons/home.png"),
                            option: "Dashboard",
                            index: 3,
                            onPress: () => {
                                console.log("first");
                                props.navigation.closeDrawer();
                            },
                        })}
                    {__getUserType() != "2" &&
                        drawerOptionSort({
                            icon: require("../assets/images/icons/home.png"),

                            option: "Dashboard",
                            index: 3,
                            navigateTo: "UserDashBoard",
                        })}
                    {drawerOptionSort({
                        icon: require("../assets/images/icons/user.png"),

                        option: "Profile",
                        index: 3,
                        navigateTo: "Profile",
                    })}

                    {drawerOptionSort({
                        icon: require("../assets/images/icons/basket.png"),

                        option: "Change Password",
                        index: 3,
                        navigateTo: "ChangePassword",
                    })}
                    {drawerOptionSort({
                        icon: require("../assets/images/icons/help.png"),

                        option: "Support",
                        index: 3,
                        navigateTo: "HelpAndSupport",
                    })}
                </View>
            </View>
        );
    }

    function drawerOptionSort({
        icon,
        option,
        index,
        navigateTo,
        varable,
        onPress,
    }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => {
                    onPress && onPress();
                    setSelectedOptionIndex(index);
                    navigateTo &&
                        props.navigation.navigate(navigateTo, { varable });
                    setSelectedOptionIndex(1);
                }}
                style={{
                    ...styles.drawerOptionStyle,
                    // backgroundColor:
                    //     selectedOptionIndex == index
                    //         ? Colors.primaryColor
                    //         : Colors.whiteColor,
                    alignSelf:
                        selectedOptionIndex == index ? "stretch" : "flex-start",
                    paddingVertical:
                        selectedOptionIndex == index ? Sizes.fixPadding : 0.0,
                }}
            >
                {icon ? (
                    <Image
                        source={icon}
                        style={{
                            ...styles.drawerIconsStyle,
                            tintColor: Colors.whiteColor,
                        }}
                    />
                ) : null}
                <Text
                    style={{
                        marginTop: Sizes.fixPadding - 7.0,
                        lineHeight: 22.0,
                        marginLeft: Sizes.fixPadding + 5,
                        ...Fonts.blackColor14Medium,
                        color: Colors.whiteColor,
                    }}
                >
                    {option}
                </Text>
            </TouchableOpacity>
        );
    }

    function profileInfo() {
        return (
            <View style={styles.profileInfoWrapStyle}>
                <ImageBackground
                    source={
                        __getUser().profile
                            ? {
                                  uri: BASE_URL + __getUser().profile,
                              }
                            : require("../assets/images/user.png")
                    }
                    style={{ ...styles.profileImageStyle }}
                />
                <View style={{ marginLeft: Sizes.fixPadding, flex: 1 }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            lineHeight: 20.0,
                            ...Fonts.whiteColor15Medium,
                        }}
                    >
                        {__getUser().name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{
                            lineHeight: 15.0,
                            ...Fonts.whiteColor13Regular,
                        }}
                    >
                        {__getUser().phone}
                    </Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
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
        backgroundColor: "#02b593",
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
        // backgroundColor: Colors.whiteColor,
        // elevation: 1.0,
        // shadowColor: Colors.lightGrayColor,
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

export default CustomDrawer;
