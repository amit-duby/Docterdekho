import React, { useState } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __formatDate, __setColor } from "../../utils/function";
import { __getApiData, __postApiData } from "../../utils/api";
import { __getUserType } from "../../utils/localization";
import FeedbackBox from "./FeedbackBox";
const { width } = Dimensions.get("window");
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const UserListBox = React.memo(({ item, __handleUpdateStatus }) => {
    const [state, setState] = useState({
        showFeed: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { showFeed } = state;
    return (
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
            {showFeed ? (
                <FeedbackBox
                    updateParentState={updateState}
                    onPressSubmit={({
                        is_completed,
                        on_budget,
                        on_time,
                        rating,
                    }) =>
                        __handleUpdateStatus(item.service?.id, 4, {
                            is_completed,
                            on_budget,
                            on_time,
                            rating,
                        })
                    }
                />
            ) : null}
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <View style={styles.doctorImageContainerStyle}>
                    <Image
                        source={
                            item.provider?.profile
                                ? {
                                      uri: item.provider?.profile,
                                  }
                                : require("../../assets/images/user.png")
                        }
                        style={{
                            height: 80.0,
                            width: 80,
                            borderRadius: 75.0,
                            overflow: "hidden",
                            resizeMode: "cover",
                        }}
                    />
                </View>
                <View style={{ flex: 1, paddingEnd: 10 }}>
                    <Text
                        style={{
                            ...Fonts.primaryColor12Bold,
                            textAlign: "right",
                            padding: 5,
                            paddingBottom: 0,
                            color: __setColor(item.service?.status_name),
                        }}
                    >
                        {item.service?.status_name}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            flexGrow: 1,
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={{
                                ...Fonts.blackColor16Medium,
                            }}
                        >
                            {item.provider?.name || ""}{" "}
                            {item?.provider?.verified == "1" ? (
                                <Ionicons
                                    name="shield-checkmark"
                                    size={16}
                                    color={Colors.greenColor}
                                />
                            ) : null}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            flexGrow: 1,
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.grayColor13Regular,
                            }}
                        >
                            {item.provider?.profession}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
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
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            {item.provider?.city || ""}
                        </Text>
                        <Text style={{ ...Fonts.primaryColor12Medium }}>
                            {" "}
                            {item.provider?.state}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Service Fees:{" "}
                        </Text>
                        <Text style={{ ...Fonts.blackColor13Regular }}>
                            Rs. {item.service?.amount}/-
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Mobile No.{" "}
                        </Text>
                        <Text style={{ ...Fonts.blackColor13Regular }}>
                            {item.provider?.phone}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Email ID:{" "}
                        </Text>
                        <Text style={{ ...Fonts.blackColor13Regular }}>
                            {item.provider?.email}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Request Date:{" "}
                        </Text>
                        <Text style={{ ...Fonts.blackColor13Regular }}>
                            {item?.service?.date
                                ? __formatDate(item.service.date)
                                : null}
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
                        {item.service?.status_name == "Task Completed" ? (
                            <Text
                                onPress={() => {
                                    // __handleUpdateStatus(item.service?.id, 4)
                                    updateState({ showFeed: true });
                                }}
                                style={{
                                    ...Fonts.primaryColor12Bold,
                                }}
                            >
                                Feedback
                            </Text>
                        ) : null}
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
                    Service Requested:
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
            {/* <View style={styles.bookContainerStyle}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                        __handleUpdateStatus(item.service?.id, 1);
                    }}
                >
                    <View style={styles.bookVideoConsultButtonStyle}>
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
                        __handleUpdateService(item.service?.id, 3);
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
            </View> */}
        </View>
    );
});

const styles = StyleSheet.create({
    groceryItemWrapStyle: {
        flexDirection: "row",
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
    },
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

export default UserListBox;
