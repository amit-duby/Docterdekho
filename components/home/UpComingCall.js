import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { __postApiData } from "../../utils/api";
import { Image } from "react-native";
import { __formatDate } from "../../utils/function";
const { width } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";
import Loader3 from "../Loader3";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const UpComingCall = ({ navigation, userType }) => {
    const [state, setState] = useState({
        data: null,
        isLoading: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { data, isLoading } = state;
    const __handleGetData = () => {
        updateState({
            isLoading: true,
        });
        __postApiData(`api/Service/transaction`, {
            draw: 1,
            columns: [
                {
                    data: "bookings.id",
                    name: "",
                    searchable: true,
                    orderable: true,
                    search: {
                        value: "",
                        regex: false,
                    },
                },
            ],
            order: [
                {
                    column: 0,
                    dir: "desc",
                },
            ],
            start: 0,
            length: 1,
            search: {
                value: "",
                regex: false,
            },
            advance_search: {
                start_date: "",
                end_date: "",
                status: "2",
                profession: "",
                for: userType == "user" ? "hire" : "work",
            },
        })
            .then((res) => {
                if (res.response.response_code == "200") {
                    return updateState({
                        data: res.data?.aaData[0] || null,
                        isLoading: false,
                    });
                }
                updateState({
                    isLoading: false,
                });
            })
            .catch((error) => {
                updateState({
                    isLoading: false,
                });
            });
    };

    useFocusEffect(
        useCallback(() => {
            __handleGetData();
            return () => {};
        }, [])
    );
    return (
        <View style={{}}>
            {userType == "prov" ? (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.orangeColorBold,
                            color: Colors.blackColor,
                            fontSize: 10,
                        }}
                    >
                        Upcoming Call
                    </Text>
                    {data ? (
                        <Text
                            style={{
                                ...Fonts.orangeColorBold,
                                color: Colors.primaryColor,
                                fontSize: 10,
                            }}
                            onPress={() =>
                                navigation.push("upcommingcall", {
                                    type: "work",
                                })
                            }
                        >
                            Show all
                        </Text>
                    ) : null}
                </View>
            ) : null}
            {userType == "user" && data ? (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.orangeColorBold,
                            color: Colors.blackColor,
                            fontSize: 10,
                        }}
                    >
                        Upcoming Call
                    </Text>
                    {data ? (
                        <Text
                            style={{
                                ...Fonts.orangeColorBold,
                                color: Colors.primaryColor,
                                fontSize: 10,
                            }}
                            onPress={() =>
                                navigation.push("upcommingcall", {
                                    type: "hire",
                                })
                            }
                        >
                            Show all
                        </Text>
                    ) : null}
                </View>
            ) : null}
            {data ? (
                <>
                    <View
                        style={{
                            justifyContent: "center",
                            marginTop: 15.0,
                            borderWidth: 0.5,
                            borderRadius: 10,
                            borderColor: Colors.lightGray,
                            paddingBottom: 10,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                            }}
                        >
                            <View style={{ alignItems: "center" }}>
                                <View style={styles.doctorImageContainerStyle}>
                                    <Image
                                        source={
                                            data[
                                                userType == "user"
                                                    ? "provider"
                                                    : "costumer"
                                            ]?.profile
                                                ? {
                                                      uri: data[
                                                          userType == "user"
                                                              ? "provider"
                                                              : "costumer"
                                                      ]?.profile,
                                                  }
                                                : require("../../assets/images/user.png")
                                        }
                                        style={{
                                            height: 80.0,
                                            width: 80,
                                            borderRadius: 75.0,
                                            overflow: "hidden",
                                            resizeMode: "center",
                                        }}
                                    />
                                </View>

                                <View
                                    style={{
                                        borderWidth: 0.5,
                                        borderRadius: 3,
                                        borderColor: "green",
                                        marginTop: 10,
                                        paddingHorizontal: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...Fonts.blackColor13Medium,
                                            fontSize: 10,
                                            color: "green",
                                        }}
                                    >
                                        Accepted
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    paddingEnd: 10,
                                    marginTop: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        ...Fonts.blackColor16SemiBold,
                                    }}
                                >
                                    {
                                        data[
                                            userType == "user"
                                                ? "provider"
                                                : "costumer"
                                        ]?.name
                                    }

                                    {data[
                                        userType == "user"
                                            ? "provider"
                                            : "costumer"
                                    ]?.verified == "1" ? (
                                        <Ionicons
                                            name="shield-checkmark"
                                            size={16}
                                            color={Colors.greenColor}
                                        />
                                    ) : null}
                                </Text>

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
                                            marginRight: 10,
                                        }}
                                    />
                                    <Text
                                        style={{ ...Fonts.grayColor12Regular }}
                                    >
                                        {
                                            data[
                                                userType == "user"
                                                    ? "provider"
                                                    : "costumer"
                                            ]?.city
                                        }
                                        ,
                                    </Text>
                                    <Text
                                        style={{
                                            ...Fonts.primaryColor12Medium,
                                        }}
                                    >
                                        {" "}
                                        {
                                            data[
                                                userType == "user"
                                                    ? "provider"
                                                    : "costumer"
                                            ]?.state
                                        }
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        style={{ ...Fonts.grayColor12Regular }}
                                    >
                                        Service Fees:{" "}
                                    </Text>
                                    <Text
                                        style={{ ...Fonts.blackColor13Regular }}
                                    >
                                        Rs. {data.service?.amount}/-
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        style={{ ...Fonts.grayColor12Regular }}
                                    >
                                        Request Date:{" "}
                                    </Text>
                                    <Text
                                        style={{ ...Fonts.blackColor13Regular }}
                                    >
                                        {__formatDate(data.service?.date)}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        style={{ ...Fonts.grayColor12Regular }}
                                    >
                                        Mobile No.{" "}
                                    </Text>
                                    <Text
                                        style={{ ...Fonts.blackColor13Regular }}
                                    >
                                        +91{" "}
                                        {
                                            data[
                                                userType == "user"
                                                    ? "provider"
                                                    : "costumer"
                                            ]?.phone
                                        }
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        style={{ ...Fonts.grayColor12Regular }}
                                    >
                                        Email ID:{" "}
                                    </Text>
                                    <Text
                                        style={{ ...Fonts.blackColor13Regular }}
                                    >
                                        {
                                            data[
                                                userType == "user"
                                                    ? "provider"
                                                    : "costumer"
                                            ]?.email
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                borderTopWidth: 0.5,
                                marginTop: 5,
                                paddingHorizontal: 10,
                                borderColor: Colors.lightGrayColor,
                                paddingTop: 5,
                            }}
                        >
                            <Text style={{ ...Fonts.grayColor12Regular }}>
                                Service Requested:{" "}
                            </Text>
                            <Text
                                style={{
                                    ...Fonts.blackColor13Regular,
                                    fontSize: 11,
                                }}
                            >
                                {data.service?.name}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            borderWidth: 0.3,
                            marginVertical: 10,
                            padding: 5,
                            borderRadius: 5,
                            borderColor: "#FF9B07",
                            backgroundColor: "#FFEDD2",
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.blackColor13Regular,
                                fontSize: 10,
                                color: Colors.redColor,
                            }}
                        >
                            Contact Details will be Visible for 7 Days from
                            Payment date
                        </Text>
                    </View>
                </>
            ) : null}

            {!data && !isLoading && userType == "prov" ? (
                <View
                    style={{
                        justifyContent: "center",
                        marginTop: 15.0,
                        borderWidth: 0.5,
                        borderRadius: 10,
                        borderColor: Colors.lightGray,
                        paddingBottom: 10,
                        height: 150,
                        marginBottom: 15,
                        alignItems: "center",
                    }}
                >
                    <Feather
                        name="alert-triangle"
                        size={24}
                        color={"#FF9B07"}
                    />
                    <Text
                        style={{
                            ...Fonts.grayColor12Regular,
                            marginTop: 10,
                            color: "#FF9B07",
                        }}
                    >
                        No Request is upcoming!
                    </Text>
                </View>
            ) : null}
            {isLoading ? <Loader3 /> : null}
        </View>
    );
};
const styles = StyleSheet.create({
    doctorImageContainerStyle: {
        height: 80.0,
        width: 80.0,
        borderRadius: 75.0,
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
        marginHorizontal: Sizes.fixPadding,
        marginTop: Sizes.fixPadding,
    },
    bookVideoConsultButtonStyle: {
        width: width / 2 - 40,
        borderColor: "#FF9B07",
        backgroundColor: "#FFEDD2",
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: "center",
    },
    bookAppointmentButtonStyle: {
        width: width / 2 - 40,
        borderColor: Colors.redColor,
        borderWidth: 1.0,
        backgroundColor: "#ffdede",
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: "center",
    },
});

export default UpComingCall;
