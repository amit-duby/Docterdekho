import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __formatDate } from "../../utils/function";
import { __getApiData, __postApiData } from "../../utils/api";
import { __getUserType } from "../../utils/localization";
const { width } = Dimensions.get("window");

const LoginTypeBox = ({ status, updateState, tab }) => {
    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.1)",
                zIndex: 2,
                justifyContent: "center",
            }}
        >
            <View
                style={{
                    width: width - 40,
                    backgroundColor: Colors.whiteColor,
                    alignSelf: "center",
                    borderRadius: 20,
                    elevation: 3,
                    overflow: "hidden",
                }}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        height: 60,
                        alignItems: "center",
                        paddingHorizontal: 30,
                        borderBottomWidth: 0.5,
                        borderColor: Colors.lightGrayColor,
                    }}
                    onPress={() => {
                        updateState({
                            tab: "10",
                            isShowType: false,
                        });
                    }}
                    activeOpacity={0.8}
                >
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor:
                                tab == "10"
                                    ? Colors.whiteColor
                                    : Colors.lightGrayColor,
                            marginEnd: 30,
                            backgroundColor:
                                tab == "10"
                                    ? Colors.primaryColor
                                    : Colors.whiteColor,
                            elevation: tab == "10" ? 2 : 0,
                        }}
                    />
                    <Text
                        style={{
                            ...Fonts.whiteColor12SemiBold,
                            color: Colors.grayColor,
                        }}
                    >
                        All
                    </Text>
                </TouchableOpacity>

                {status.map((item, index) => {
                    return (
                        <>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    height: 60,
                                    alignItems: "center",
                                    paddingHorizontal: 30,
                                    borderBottomWidth: 0.5,
                                    borderColor: Colors.lightGrayColor,
                                }}
                                key={index + 1}
                                onPress={() => {
                                    updateState({
                                        tab: index,
                                        isShowType: false,
                                    });
                                }}
                                activeOpacity={0.8}
                            >
                                <View
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 50,
                                        borderWidth: 1,
                                        borderColor:
                                            tab == index
                                                ? Colors.whiteColor
                                                : Colors.lightGrayColor,
                                        marginEnd: 30,
                                        backgroundColor:
                                            tab == index
                                                ? Colors.primaryColor
                                                : Colors.whiteColor,
                                        elevation: tab == index ? 2 : 0,
                                    }}
                                />
                                <Text
                                    style={{
                                        ...Fonts.whiteColor12SemiBold,
                                        color: Colors.grayColor,
                                    }}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        </>
                    );
                })}
            </View>
        </View>
    );
};

export default LoginTypeBox;
