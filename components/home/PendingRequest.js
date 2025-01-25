import React, { useEffect, useState } from "react";
import { MaterialIcons, Feather } from "@expo/vector-icons";

import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { __postApiData } from "../../utils/api";
import { Image } from "react-native";
import { __formatDate } from "../../utils/function";
import Loader3 from "../Loader3";
const PendingRequest = ({ navigation, __handleUpdateService }) => {
    const [state, setState] = useState({
        data: null,
        isLoading: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { data, isLoading } = state;

    const __handleGetData = () => {
        updateState({
            isLoading: true,
            data: null,
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
                status: "0",
                profession: "",
                for: "work",
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

    useEffect(() => {
        __handleGetData();
    }, []);

    return (
        <View style={{}}>
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
                    Pending Request
                </Text>
                {data ? (
                    <Text
                        style={{
                            ...Fonts.orangeColorBold,
                            color: Colors.primaryColor,
                            fontSize: 10,
                        }}
                        onPress={() => navigation.push("pendingRequest")}
                    >
                        Show all
                    </Text>
                ) : null}
            </View>
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
                            <View style={styles.doctorImageContainerStyle}>
                                <Image
                                    source={
                                        data?.costumer?.profile
                                            ? {
                                                  uri: data?.costumer?.profile,
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

                            <View style={{ flex: 1, paddingEnd: 10 }}>
                                <Text
                                    style={{
                                        ...Fonts.blackColor16SemiBold,
                                        marginTop: 10,
                                    }}
                                >
                                    {data.costumer?.name}
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
                                        {data.costumer?.city},
                                    </Text>
                                    <Text
                                        style={{
                                            ...Fonts.primaryColor12Medium,
                                        }}
                                    >
                                        {" "}
                                        {data.costumer?.state}
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
                            </View>
                        </View>
                        <View
                            style={{
                                borderTopWidth: 0.5,
                                borderBottomWidth: 0.5,
                                marginVertical: 5,
                                paddingHorizontal: 10,
                                borderColor: Colors.lightGrayColor,
                                paddingVertical: 5,
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

                        <View style={styles.bookContainerStyle}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={async () => {
                                    let res = await __handleUpdateService(
                                        data.service?.id,
                                        1
                                    );
                                    __handleGetData();
                                }}
                            >
                                <View
                                    style={styles.bookVideoConsultButtonStyle}
                                >
                                    <Text
                                        style={{
                                            ...Fonts.orangeColorBold,
                                            color: Colors.whiteColor,
                                        }}
                                    >
                                        Accept
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={async () => {
                                    await __handleUpdateService(
                                        data.service?.id,
                                        3
                                    );
                                    __handleGetData();
                                }}
                            >
                                <View style={styles.bookAppointmentButtonStyle}>
                                    <Text
                                        style={{
                                            ...Fonts.primaryColor12Bold,
                                            color: Colors.whiteColor,
                                        }}
                                    >
                                        Reject
                                    </Text>
                                </View>
                            </TouchableOpacity>
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
                            Request will auto consider as rejected after 24hrs
                        </Text>
                    </View>
                </>
            ) : null}
            {!data && !isLoading ? (
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
                        No Request is pending
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
        justifyContent: "space-around",
        marginHorizontal: Sizes.fixPadding,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding - 5.0,
        gap: 20,
    },
    bookVideoConsultButtonStyle: {
        width: 110,
        borderColor: Colors.greenColor,
        backgroundColor: Colors.greenColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: "center",
    },
    bookAppointmentButtonStyle: {
        width: 110,
        borderColor: Colors.redColor,
        borderWidth: 1.0,
        backgroundColor: Colors.redColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: "center",
    },
});

export default PendingRequest;
