import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __postApiData } from "../../utils/api";
import { __formatDate } from "../../utils/function";
import Loader3 from "../../components/Loader3";
import InfoAlert from "../../components/alert/infoAlert";
import Loader from "../../components/loader";

const PendingRequestScreen = ({ navigation }) => {
    const [state, setState] = useState({
        data: [],
        isLoading: false,
        showinfo: null,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { data, isLoading, showinfo } = state;
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
            length: 20,
            search: {
                value: "",
                regex: false,
            },
            advance_search: {
                start_date: "",
                end_date: "",
                status: "0",
                profession: "",
            },
        })
            .then((res) => {
                if (res.response.response_code == "200") {
                    return updateState({
                        data: res.data?.aaData || [],
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

    const __handleUpdateStatus = (booking_id, status) => {
        updateState({
            isLoading: true,
        });
        __postApiData(`api/Booking/status`, {
            booking_id,
            status,
        })
            .then((res) => {
                if (res.response.response_code == "200") {
                    updateState({
                        showinfo: res.response.response_message,
                    });
                    return __handleGetData();
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
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            <View style={{ flex: 1 }}>
                {header()}
                {!isLoading && data.length == 0 ? notFound() : groceriesItems()}
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
                {isLoading && data.length > 0 ? <Loader /> : null}
                {isLoading && data.length == 0 ? <Loader3 /> : null}
            </View>
        </SafeAreaView>
    );

    function groceriesItems() {
        const renderItem = ({ item }) => {
            return (
                <>
                    <View
                        style={{
                            justifyContent: "center",
                            marginTop: 5.0,
                            borderRadius: 10,
                            paddingBottom: 10,
                            backgroundColor: Colors.whiteColor,
                            elevation: 0.5,
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
                                        item?.costumer?.profile
                                            ? {
                                                  uri: item?.costumer?.profile,
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
                                    {item.costumer?.name}
                                    {item.costumer?.verified == "1" ? (
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
                                        {item.costumer?.city},
                                    </Text>
                                    <Text
                                        style={{
                                            ...Fonts.primaryColor12Medium,
                                        }}
                                    >
                                        {" "}
                                        {item.costumer?.state}
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
                                        Rs. {item.service?.amount}/-
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
                                        {__formatDate(item.service?.date)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                borderTopWidth: 0.5,
                                borderBottomWidth: 0.5,
                                marginTop: 5,
                                paddingHorizontal: 10,
                                borderColor: Colors.lightGrayColor,
                                padding: 10,
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
                                {item.service?.name}
                            </Text>
                        </View>

                        <View style={styles.bookContainerStyle}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => {
                                    __handleUpdateStatus(item.service?.id, 1);
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
                                onPress={() => {
                                    __handleUpdateStatus(item.service?.id, 3);
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
                            marginTop: 5,
                            padding: 5,
                            borderRadius: 5,
                            borderColor: "#FF9B07",
                            backgroundColor: "#FFEDD2",
                            elevation: 0.5,
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
            );
        };
        return (
            <FlatList
                data={data}
                keyExtractor={(item) => `${item.sr_no}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Sizes.fixPadding,
                    paddingHorizontal: Sizes.fixPadding - 5.0,
                }}
            />
        );
    }

    function notFound(params) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ ...Fonts.grayColor12Regular }}>
                    No Request Found !
                </Text>
            </View>
        );
    }

    function header() {
        return (
            <View
                style={{
                    padding: Sizes.fixPadding * 2.0,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: Colors.whiteColor,
                }}
            >
                <MaterialIcons
                    name="arrow-back-ios"
                    size={20}
                    color={Colors.blackColor}
                    onPress={() => navigation.goBack()}
                />
                <Text
                    style={{
                        lineHeight: 25.0,
                        marginLeft: Sizes.fixPadding - 5.0,
                        ...Fonts.blackColor18SemiBold,
                    }}
                >
                    Pending Request
                </Text>
            </View>
        );
    }
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
        marginTop: Sizes.fixPadding * 2,
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
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding - 5.0,
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

export default PendingRequestScreen;
