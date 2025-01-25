import { MaterialIcons } from "@expo/vector-icons";
import React, { Suspense, useEffect, useState } from "react";
import {
    FlatList,
    Image,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useIsFocused } from "@react-navigation/native";
import { __formatDate, __formatDate2 } from "../../utils/function";
import Loader2 from "../../components/Loader2";
import Loader from "../../components/loader";
import { __getApiData } from "../../utils/api";

const RenderItem = React.memo(({ item, navigation }) => (
    <View
        style={{
            backgroundColor: Colors.whiteColor,
            marginTop: 2,
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
        }}
    >
        <View
            style={{
                width: 40,
                height: 40,
                marginEnd: 10,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 0.3,
                borderColor: Colors.grayColor,
                borderRadius: 30,
            }}
        >
            <Image
                source={require("../../assets/images/notification.png")}
                style={{
                    width: 30,
                    height: 30,
                    resizeMode: "contain",
                    borderWidth: 1,
                }}
            />
        </View>
        <View style={{ flex: 1 }}>
            <Text
                style={{
                    ...Fonts.grayColor13Regular,
                    fontSize: 12,
                    textAlign: "justify",
                    color: Colors.blackColor,
                }}
            >
                {item.message}
            </Text>
            <Text
                numberOfLines={1}
                style={{
                    lineHeight: 16.0,
                    marginBottom: Sizes.fixPadding - 8.0,
                    ...Fonts.grayColor14Regular,
                    fontSize: 12,
                    textAlign: "right",
                }}
            >
                {__formatDate2(item?.created_at)}
            </Text>
        </View>
    </View>
));

const NotificationsScreen = ({ navigation }) => {
    const [state, setState] = useState({
        listData: [],
        todayList: [],
        isLoading: false,
    });
    const { todayList, isLoading } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const focused = useIsFocused();

    const __handleGetData = () => {
        updateState({ isLoading: true });

        __getApiData("api/booking/notification")
            .then((res) => {
                if (res.response.response_code == "200") {
                    return updateState({
                        todayList: res.data,
                        isLoading: false,
                    });
                }
                updateState({ isLoading: false });
            })
            .catch((error) => {});

        __getApiData("api/booking/notification_state")
            .then((res) => {})
            .catch((error) => {});
    };

    useEffect(() => {
        focused && __handleGetData();
        return () => {
            updateState({ todayList: null, isLoading: true });
        };
    }, []);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.bodyColor,
            }}
        >
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            {isLoading ? (
                <Loader />
            ) : (
                <View style={{ flex: 1 }}>
                    {header()}

                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={() => {
                                    __handleGetData();
                                }}
                            />
                        }
                        ListHeaderComponent={
                            <>
                                {todayList?.length == 0 ? (
                                    noNotificationInfo()
                                ) : (
                                    <FlatList
                                        data={todayList}
                                        renderItem={({ item }) => (
                                            <RenderItem
                                                item={item}
                                                navigation={navigation}
                                            />
                                        )}
                                        scrollEnabled={false}
                                        keyExtractor={(item) => `${item._id}`}
                                        showsVerticalScrollIndicator={false}
                                    />
                                )}
                            </>
                        }
                    />
                </View>
            )}
        </SafeAreaView>
    );

    function noNotificationInfo() {
        return (
            <View style={{ ...styles.noNotificationsWrapStyle }}>
                <MaterialIcons
                    name="notifications-off"
                    size={25}
                    color={Colors.grayColor}
                />
                <Text
                    style={{
                        ...Fonts.grayColor14Regular,
                        marginTop: Sizes.fixPadding,
                    }}
                >
                    No Notifications yet!
                </Text>
            </View>
        );
    }

    function header() {
        return (
            <View style={styles.headerBox}>
                <MaterialIcons
                    name="arrow-back-ios"
                    size={20}
                    color={Colors.blackColor}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTextOne}>Notifications</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    noNotificationsWrapStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        height: 300,
    },
    headerBox: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        marginBottom: 2,
        elevation: 0.5,
    },
    headerTextOne: {
        lineHeight: 25.0,
        marginLeft: Sizes.fixPadding - 5.0,
        ...Fonts.blackColor18SemiBold,
    },
});

export default NotificationsScreen;
