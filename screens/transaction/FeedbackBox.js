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
const { width } = Dimensions.get("window");
import { Dialog } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
const FeedbackBox = ({ updateParentState, onPressSubmit }) => {
    const [state, setState] = useState({
        is_completed: null,
        on_budget: null,
        on_time: null,
        rating: 0,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { is_completed, on_budget, on_time, rating } = state;
    return (
        <Dialog
            isVisible={true}
            onBackdropPress={() => {
                updateParentState({ showFeed: false });
            }}
            animationType="fade"
            backdropStyle={{
                backgroundColor: "rgba(0,0,0,0.2)",
            }}
            overlayStyle={{
                width: width - 40,
                backgroundColor: Colors.whiteColor,
                alignSelf: "center",
                borderRadius: 20,
                position: "relative",
                maxHeight: 400,
                minHeight: 100,
                elevation: 0,
                justifyContent: "center",
            }}
        >
            <Text
                style={{
                    ...Fonts.blackColor16Medium,
                    textAlign: "center",
                    borderBottomWidth: 0.4,
                    marginBottom: 20,
                    borderColor: Colors.grayColor,
                    paddingBottom: 5,
                }}
            >
                Feedback
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    alignItems: "center",
                }}
            >
                <Text style={{ ...Fonts.blackColor13Medium }}>
                    Job Completed
                </Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor:
                                is_completed == "yes"
                                    ? Colors.greenColor
                                    : Colors.whiteColor,
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            borderColor: Colors.greenColor,
                            borderWidth: 1,
                        }}
                        onPress={() => updateState({ is_completed: "yes" })}
                    >
                        <Text
                            style={{
                                ...Fonts.whiteColor12Medium,
                                color:
                                    is_completed == "yes"
                                        ? Colors.whiteColor
                                        : Colors.greenColor,
                            }}
                        >
                            Yes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor:
                                is_completed == "no"
                                    ? Colors.redColor
                                    : Colors.whiteColor,
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            borderColor: Colors.redColor,
                            borderWidth: 1,
                        }}
                        onPress={() => updateState({ is_completed: "no" })}
                    >
                        <Text
                            style={{
                                ...Fonts.whiteColor12Medium,
                                color:
                                    is_completed == "no"
                                        ? Colors.whiteColor
                                        : Colors.redColor,
                            }}
                        >
                            No
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    alignItems: "center",
                }}
            >
                <Text style={{ ...Fonts.blackColor13Medium }}>On Budget</Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor:
                                on_budget == "yes"
                                    ? Colors.greenColor
                                    : Colors.whiteColor,
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            borderColor: Colors.greenColor,
                            borderWidth: 1,
                        }}
                        onPress={() => updateState({ on_budget: "yes" })}
                    >
                        <Text
                            style={{
                                ...Fonts.whiteColor12Medium,
                                color:
                                    on_budget == "yes"
                                        ? Colors.whiteColor
                                        : Colors.greenColor,
                            }}
                        >
                            Yes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor:
                                on_budget == "no"
                                    ? Colors.redColor
                                    : Colors.whiteColor,
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            borderColor: Colors.redColor,
                            borderWidth: 1,
                        }}
                        onPress={() => updateState({ on_budget: "no" })}
                    >
                        <Text
                            style={{
                                ...Fonts.whiteColor12Medium,
                                color:
                                    on_budget == "no"
                                        ? Colors.whiteColor
                                        : Colors.redColor,
                            }}
                        >
                            No
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    alignItems: "center",
                }}
            >
                <Text style={{ ...Fonts.blackColor13Medium }}>On Time</Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor:
                                on_time == "yes"
                                    ? Colors.greenColor
                                    : Colors.whiteColor,
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            borderColor: Colors.greenColor,
                            borderWidth: 1,
                        }}
                        onPress={() => updateState({ on_time: "yes" })}
                    >
                        <Text
                            style={{
                                ...Fonts.whiteColor12Medium,
                                color:
                                    on_time == "yes"
                                        ? Colors.whiteColor
                                        : Colors.greenColor,
                            }}
                        >
                            Yes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor:
                                on_time == "no"
                                    ? Colors.redColor
                                    : Colors.whiteColor,
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            borderColor: Colors.redColor,
                            borderWidth: 1,
                        }}
                        onPress={() => updateState({ on_time: "no" })}
                    >
                        <Text
                            style={{
                                ...Fonts.whiteColor12Medium,
                                color:
                                    on_time == "no"
                                        ? Colors.whiteColor
                                        : Colors.redColor,
                            }}
                        >
                            No
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    marginBottom: 10,
                    borderTopWidth: 0.4,
                    borderColor: Colors.grayColor,
                    marginTop: 20,
                    paddingTop: 10,
                }}
            >
                <Text style={{ ...Fonts.blackColor13Medium }}>Rate</Text>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 15,
                        alignSelf: "center",
                    }}
                >
                    {[1, 2, 3, 4, 5].map((item, i) => (
                        <TouchableOpacity
                            key={i}
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => {
                                updateState({ rating: item });
                            }}
                        >
                            <FontAwesome
                                name={rating >= item ? "star" : "star-o"}
                                size={24}
                                color="#CDDC39"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: Colors.primaryColor,
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    alignSelf: "center",
                    marginTop: 30,
                }}
                onPress={() => onPressSubmit(state)}
            >
                <Text
                    style={{
                        ...Fonts.whiteColor12Medium,
                        color: Colors.whiteColor,
                    }}
                >
                    Submit
                </Text>
            </TouchableOpacity>
        </Dialog>
    );
};
export default FeedbackBox;
