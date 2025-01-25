
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { __postApiData } from "../../utils/api";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, Linking
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __checkLogin } from "../../utils/localization";
import { Alert } from "react-native";
const { width } = Dimensions.get("window");

const SearchListBox = ({
    item,
    navigation,
    __handleBookNotification,
    serviceslist, client_id = 1
}) => {
    const [state, setState] = useState({
        isLoading: false,
        phoneNumber: null,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    useEffect(() => {
        updateState({ isLoading: true });
        __postApiData(`api/home/actionlog`, {
            client_id: client_id,
            action_type: "Call",
        })
            .then((res) => {
                updateState({ isLoading: false });
    
                if (res.response.response_code === "200") {
                    const fetchedNumber = res.data.number; // Save the fetched number
                    updateState({ phoneNumber: fetchedNumber });
                } else {
                    Alert.alert("", res.response.response_message);
                }
            })
            .catch((error) => {
                updateState({ isLoading: false });
                console.error(error);
            });
    }, [client_id]);

    const handleCall = () => {
        if (state.phoneNumber) {
            let phoneUrl = `tel:${state.phoneNumber}`;
            return Linking.openURL(phoneUrl);
        }
    };


    return (
        <>
            <View style={{ justifyContent: "center", marginTop: 10.0 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.doctorImageContainerStyle}>
                            <Image
                                source={
                                    item?.provider?.profile
                                        ? {
                                            uri: item?.provider?.profile,
                                        }
                                        : require("../../assets/images/user.png")
                                }
                                resizeMode="cover"
                                style={{
                                    height: 100.0,
                                    width: 80.0,
                                    // borderRadius: 75.0,
                                    overflow: "hidden",
                                }}
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {item.provider.name}

                        </Text>

                        <Text
                            style={{
                                ...Fonts.blackColor13Regular,
                                color: Colors.blackColor,
                                // marginTop: Sizes.fixPadding - 1.0,
                                padding: 1
                            }}
                        >
                            {item.provider.address}
                        </Text>

                        <View style={{ flexDirection: "row", gap: 15 }}>


                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 5,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {

                                        if (__checkLogin()) {

                                            handleCall(item?.provider?.phone);
                                        } else {

                                            navigation.push("Login");
                                        }
                                    }}
                                >
                                    <Image
                                        source={require("../../assets/images/icons/calls.png")}
                                        style={{
                                            width: 16,
                                            height: 20,
                                            resizeMode: "contain",
                                            marginRight: 3,
                                        }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ ...Fonts.grayColor12Regular }}>
                                    {" "}
                                    {state.phoneNumber ? state.phoneNumber : "Fetching number..."}
                                </Text>
                            </View>


                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 10,
                            }}
                        >
                            <Image
                                source={require("../../assets/images/india.png")}
                                style={{
                                    width: 30.0,
                                    height: 30,
                                    resizeMode: "contain",
                                    marginRight: 5,
                                }}
                            />
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                {" "}
                                {item?.provider?.city_name}
                            </Text>
                            <Text style={{ ...Fonts.primaryColor12Medium }}>
                                {" "}
                                {item?.provider?.state_name}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.bookContainerStyle}>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            __checkLogin()
                                ? navigation.navigate("profectional", {
                                    ...item?.provider,
                                })
                                : navigation.push("Login");
                        }}
                    >
                        <View style={styles.ViewProfilementButtonStyle}>
                            <Text style={{ ...Fonts.whiteColor12SemiBold }}>
                                View Profile
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            __checkLogin()

                                ? navigation.navigate("TimeSloats", {
                                    ...item?.provider,
                                })
                                : navigation.push("Login");
                        }}
                    >
                        <View style={styles.bookAppointmentButtonStyle}>
                            <Text style={{ ...Fonts.whiteColor12SemiBold }}>
                                Book Appointment
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.dividerStyle}></View>
            </View>
        </>
    );
};

export default SearchListBox;
const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: Sizes.fixPadding + 5.0,
        paddingTop: Sizes.fixPadding + 10.0,
        margin: Sizes.fixPadding * 2.0,
    },

    doctorImageContainerStyle: {
        height: 100.0,
        width: 80.0,
        borderRadius: 7.0,
        backgroundColor: "white",
        borderColor: "#B3BCFC",
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 3.0,
        shadowColor: Colors.primaryColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
        elevation: 20.0,
        overflow: "hidden",
    },
    bookContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    bookVideoConsultButtonStyle: {
        width: width / 2 - 30,
        borderColor: "#FF9B07",
        borderWidth: 1.0,
        backgroundColor: "#FFEDD2",
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: "center",
    },
    ViewProfilementButtonStyle:{
        width: width / 2 - 30,
        borderColor: Colors.blueColor,
        borderWidth: 1.0,
        backgroundColor: Colors.blueColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: "center",
    },
    bookAppointmentButtonStyle: {
        width: width / 2 - 30,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: "center",
    },
    dividerStyle: {
        backgroundColor: Colors.lightGray,
        height: 0.8,
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding,
    },
});
