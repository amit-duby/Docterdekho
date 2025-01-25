import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __postApiData } from "../../utils/api";
import Loader3 from "../../components/Loader3";
import { __formatDate } from "../../utils/function";
import InfoAlert from "../../components/alert/infoAlert";
import Loader from "../../components/loader";

const PendingForPaymentScreen = ({ navigation, route }) => {
    const [state, setState] = useState({
        data: [],
        isLoading: false,
        isLoading1: false,
        showinfo: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { data, isLoading, isLoading1, showinfo } = state;

    const __handleGetData = () => {
        updateState({
            data: [],
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
                status: "1",
                profession: "",
                for: "hire",
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

    const __handleUpdateStatus = (booking_id, status, feedback = {}) => {
        updateState({
            isLoading1: true,
        });
        __postApiData(`api/Booking/status`, {
            booking_id,
            status,
            ...feedback,
        })
            .then((res) => {
                if (res.response.response_code == "200") {
                    updateState({
                        showinfo:
                            status == 2
                                ? "Payment success"
                                : res.response.response_message,
                        isLoading1: false,
                    });
                    return __handleGetData();
                }
                updateState({
                    isLoading1: false,
                });
            })
            .catch((error) => {
                updateState({
                    isLoading1: false,
                });
            });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
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
            {isLoading1 ? <Loader /> : null}
            <View style={{ flex: 1 }}>
                {header()}
                {groceriesItems()}
                {isLoading ? <Loader3 /> : null}
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
                            backgroundColor: Colors.whiteColor,
                            elevation: 0.5,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                            }}
                        >
                            <View
                                style={{ alignItems: "center", paddingTop: 10 }}
                            >
                                <View style={styles.doctorImageContainerStyle}>
                                    <Image
                                        source={
                                            item?.provider?.profile
                                                ? {
                                                      uri: item?.provider
                                                          ?.profile,
                                                  }
                                                : require("../../assets/images/user.png")
                                        }
                                        resizeMode="contain"
                                        style={{
                                            height: 80.0,
                                            width: 80,
                                            borderRadius: 75.0,
                                            overflow: "hidden",
                                        }}
                                    />
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingEnd: 10,
                                    marginVertical: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        ...Fonts.blackColor16SemiBold,
                                    }}
                                >
                                    {item.provider?.name}
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
                                        {item.provider?.city},
                                    </Text>
                                    <Text
                                        style={{
                                            ...Fonts.primaryColor12Medium,
                                        }}
                                    >
                                        {" "}
                                        {data.provider?.state}
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
                                        +91 {item.provider?.phone}
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
                                        {item.provider?.email}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        {item.service?.status == "1" ? (
                                            <>
                                                <Text
                                                    style={{
                                                        ...Fonts.grayColor12Regular,
                                                    }}
                                                >
                                                    Payment:{" "}
                                                </Text>
                                                <Text
                                                    onPress={() =>
                                                        __handleUpdateStatus(
                                                            item.service?.id,
                                                            2
                                                        )
                                                    }
                                                    style={{
                                                        ...Fonts.primaryColor12Medium,
                                                    }}
                                                >
                                                    Pay
                                                </Text>
                                                <Text
                                                    style={{
                                                        ...Fonts.grayColor12Regular,
                                                        fontSize: 10,
                                                    }}
                                                >
                                                    (To get contact details)
                                                </Text>
                                            </>
                                        ) : null}
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                borderTopWidth: 0.5,
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
                    </View>
                </>
            );
        };
        return (
            <FlatList
                data={data}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Sizes.fixPadding,
                    paddingHorizontal: Sizes.fixPadding - 5,
                }}
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
                    backgroundColor: Colors.whiteColor,
                    elevation: 0.5,
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
                    Pending for Payment
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
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 3.0,
        shadowColor: Colors.primaryColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
        elevation: 20.0,
        overflow: "hidden",
    },
});

export default PendingForPaymentScreen;
