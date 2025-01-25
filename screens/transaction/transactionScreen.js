import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    Text,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __formatDate } from "../../utils/function";
import { __getApiData, __postApiData } from "../../utils/api";
import Loader3 from "../../components/Loader3";
import { __getUserType } from "../../utils/localization";
import InfoAlert from "../../components/alert/infoAlert";
import Loader from "../../components/loader";
import DateFilter from "./DateFilter";
import LoginTypeBox from "./LoginTypeBox";
import ListBox from "./ListBox";
import FilterBar from "./FilterBar";
import UserListBox from "./UserListBox";

const TransactionScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);

    const [state, setState] = useState({
        data: [],
        isLoading: false,
        isLoading1: false,
        usertype: __getUserType(),
        tab: "10",
        isShowType: false,
        status: [],
        showinfo: "",
        show_date: false,
        select_date: null,
        start_date: null,
        end_date: null,
        type: "work",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        data,
        isLoading,
        usertype,
        tab,
        isShowType,
        status,
        isLoading1,
        showinfo,
        show_date,
        select_date,
        start_date,
        end_date,
        type,
    } = state;

    const __handleGetData = (isClean) => {
        setRefreshing(false);

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
                start_date: isClean ? "" : start_date,
                end_date: isClean ? "" : end_date,
                status: tab,
                profession: "",
                for: type,
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

    const __handleGetStatus = (statustype) => {
        __getApiData(`api/home/status_type/${statustype}`)
            .then((res) => {
                if (res.response.response_code == "200") {
                    return updateState({ status: res.data });
                }
            })
            .catch((error) => {});
    };

    useEffect(() => {
        __handleGetData();
    }, [tab, type]);

    useEffect(() => {
        __handleGetStatus(usertype == "2" ? "0" : "1");
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
                <FilterBar
                    tab={tab}
                    __handleGetStatus={__handleGetStatus}
                    type={type}
                    updateState={updateState}
                    status={status}
                />
                {groceriesItems()}
                {isLoading ? <Loader3 /> : null}
                {isShowType ? (
                    <LoginTypeBox
                        updateState={updateState}
                        status={status}
                        tab={tab}
                    />
                ) : null}
                {show_date ? (
                    <DateFilter
                        start_date={start_date}
                        end_date={end_date}
                        updateState={updateState}
                        __handleGetData={__handleGetData}
                        select_date={select_date}
                    />
                ) : null}
            </View>
        </SafeAreaView>
    );

    function groceriesItems() {
        return (
            <FlatList
                data={data}
                keyExtractor={(item) => `${item?.sr_no}`}
                renderItem={({ item }) =>
                    usertype == "2" ? (
                        <ListBox
                            item={item}
                            usertype={usertype}
                            __handleUpdateStatus={__handleUpdateStatus}
                        />
                    ) : (
                        <UserListBox
                            item={item}
                            usertype={usertype}
                            __handleUpdateStatus={__handleUpdateStatus}
                        />
                    )
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Sizes.fixPadding,
                    paddingHorizontal: Sizes.fixPadding - 5.0,
                }}
                ListFooterComponent={
                    <>{data?.length == 0 && !isLoading ? notFound() : null}</>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            __handleGetStatus();
                            __handleGetData();
                        }}
                    />
                }
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
                    height: 350,
                }}
            >
                <Text style={{ ...Fonts.grayColor12Regular }}>
                    No Data Found..!
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
                    My Transaction
                </Text>
            </View>
        );
    }
};

export default TransactionScreen;
