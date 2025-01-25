import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { __formatDate } from "../../utils/function";
import { __getApiData, __postApiData } from "../../utils/api";
import { __getUserType } from "../../utils/localization";

const FilterBar = ({ tab, __handleGetStatus, type, updateState, status }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: Colors.whiteColor,
                marginTop: 1,
                elevation: 0.5,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                {__getUserType() == 2 ? (
                    <>
                        <TouchableOpacity
                            onPress={() => {
                                updateState({
                                    type: "work",
                                    usertype: "2",
                                });
                                __handleGetStatus("0");
                            }}
                            style={{
                                padding: 10,
                                flexDirection: "row",
                                alignItems: "center",
                                borderWidth: 0.5,
                                borderColor: "transparent",
                            }}
                        >
                            <View
                                style={{
                                    width: 15,
                                    height: 15,
                                    borderRadius: 50,
                                    borderWidth: 0.5,
                                    borderColor:
                                        type == "work"
                                            ? Colors.primaryColor
                                            : Colors.grayColor,
                                    marginEnd: 5,
                                    backgroundColor:
                                        type == "work"
                                            ? Colors.primaryColor
                                            : Colors.whiteColor,
                                }}
                            ></View>
                            <Text style={{ ...Fonts.blackColor13Medium }}>
                                For Work
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                updateState({
                                    type: "hire",
                                    usertype: "3",
                                });
                                __handleGetStatus("1");
                            }}
                            style={{
                                padding: 10,
                                flexDirection: "row",
                                alignItems: "center",
                                borderWidth: 0.5,
                                borderColor: "transparent",
                                paddingEnd: 0,
                            }}
                        >
                            <View
                                style={{
                                    width: 15,
                                    height: 15,
                                    borderRadius: 50,
                                    borderWidth: 0.5,
                                    borderColor:
                                        type == "hire"
                                            ? Colors.primaryColor
                                            : Colors.grayColor,
                                    marginEnd: 5,
                                    backgroundColor:
                                        type == "hire"
                                            ? Colors.primaryColor
                                            : Colors.whiteColor,
                                }}
                            ></View>
                            <Text style={{ ...Fonts.blackColor13Medium }}>
                                For Hire
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : null}
            </View>

            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        updateState({
                            show_date: true,
                        });
                    }}
                    style={{ padding: 10, flexDirection: "row" }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor13Medium,
                            marginEnd: 10,
                        }}
                    >
                        Date
                    </Text>
                    <Fontisto name="date" size={18} color={Colors.blackColor} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        updateState({
                            isShowType: true,
                        });
                    }}
                    style={{ padding: 10, flexDirection: "row" }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor13Medium,
                            marginEnd: 10,
                        }}
                    >
                        {tab == "10"
                            ? "All"
                            : __getUserType() == 2
                            ? status[tab].slice(0, 5)
                            : status[tab].slice(0, 10)}
                    </Text>
                    <MaterialIcons
                        name="filter-list"
                        size={20}
                        color={Colors.blackColor}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FilterBar;
