import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Image,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
    __getApiData,
    __postApiData,
    __postApiDataFormData,
} from "../../utils/api";
import * as ImagePicker from "expo-image-picker";
import Loader2 from "../../components/Loader2";
import {
    Feather,
    FontAwesome,
    MaterialIcons,
    Entypo,
    AntDesign,
} from "@expo/vector-icons";
import { __generateRandomString } from "../../utils/function";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { __getUser } from "../../utils/localization";
import { ImageBackground } from "react-native";

const MyTransaction = ({ navigation, route }) => {
    const [state, setState] = useState({
        isLoading: false,
        list: [],
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isLoading, list } = state;

    const __handleGetDashboard = (value) => {
        updateState({ isLoading: true });
        __getApiData(`/api/User/transactionhistory`)
            .then((res) => {
                console.log(res);
                updateState({ isLoading: false });

                if (res.response.response_code == "200") {
                    updateState({
                        list: res.data?.history || [],
                    });
                }
            })
            .catch((error) => {
                updateState({ isLoading: false });
            });
    };

    useEffect(() => {
        __handleGetDashboard();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            <ImageBackground
                source={require("../../assets/images/bg_img.png")}
                style={{ flex: 1 }}
            >
                {header()}
                {isLoading && <Loader2 />}
                <ScrollView style={{}}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={
                            <>
                                <View
                                    style={{
                                        marginTop: 5,
                                        overflow: "hidden",
                                        borderRadius: 10,
                                        margin: 10,
                                        backgroundColor: Colors.whiteColor,
                                        elevation: 2,
                                        marginBottom: 50,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                        }}
                                    >
                                        {titleBox("S. No.", true, true, 60)}
                                        {titleBox("Type", true, true, 100)}
                                        {titleBox(
                                            "Total Points",
                                            true,
                                            true,
                                            120
                                        )}
                                        {titleBox(
                                            "Description",
                                            true,
                                            true,
                                            250
                                        )}
                                    </View>
                                    {list

                                        .map((item, i) => ({
                                            ...item,
                                            sr_no: i + 1,
                                            bottom:
                                                i + 1 == list.length
                                                    ? true
                                                    : false,
                                        }))
                                        .map((item, i) => (
                                            <ListBox
                                                key={i + 1}
                                                data={item}
                                                navigation={navigation}
                                            />
                                        ))}
                                </View>
                            </>
                        }
                    />
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
    function titleBox(text1, right, bottom, width) {
        return (
            <View
                style={{
                    width: width,
                    backgroundColor: Colors.lightGrayColor,
                }}
            >
                <View
                    style={{
                        borderRightWidth: right ? 0.5 : 0,
                        borderBottomWidth: bottom ? 0.5 : 0,
                        borderColor: Colors.grayColor,
                        height: 32,
                        justifyContent: "center",
                        paddingHorizontal: 10,
                    }}
                >
                    <Text style={{ ...Fonts.blackColor14Medium, fontSize: 12 }}>
                        {text1}
                    </Text>
                </View>
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
                    elevation: 0.5,
                }}
            >
                <MaterialIcons
                    name="arrow-back-ios"
                    size={20}
                    color={Colors.whiteColor}
                    onPress={() => navigation.goBack()}
                />
                <Text
                    style={{
                        lineHeight: 25.0,
                        marginLeft: Sizes.fixPadding - 5.0,
                        ...Fonts.blackColor18SemiBold,
                        color: Colors.whiteColor,
                    }}
                >
                    My Transaction History
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },

    servicesWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        flex: 1,
        paddingVertical: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: Sizes.fixPadding - 3.0,
    },
    servicesIconWrapStyle: {
        borderRadius: 50.0,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default MyTransaction;
const ListBox = ({ data, navigation }) => {
    const { sr_no, bottom, type, total_points, description } = data;

    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    borderBottomWidth: bottom ? 0 : 0.5,
                    borderColor: Colors.grayColor,
                    // backgroundColor: Colors.lightPrimaryColor,
                }}
            >
                {listText(sr_no, 0, 60)}
                {listText(type, 0, 100)}
                {listText(total_points, 0, 120)}
                {listText(description, 0, 250)}
            </View>
        </>
    );

    function listText(text, flexGrow, width) {
        return (
            <View
                style={{
                    borderRightWidth: 0.5,
                    width: width || "auto",
                    borderColor: Colors.grayColor,
                    height: 32,
                    justifyContent: "center",
                    flexGrow: flexGrow,
                    paddingHorizontal: 10,
                }}
            >
                <Text
                    style={{
                        ...Fonts.whiteColor15Regular,
                        color: Colors.darkGrayColor,
                        fontSize: 13,
                    }}
                >
                    {text}
                </Text>
            </View>
        );
    }
};
