import { MaterialIcons } from "@expo/vector-icons";
import React, { createRef, useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";

import {
    FlatList,
    Image,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __getApiData, __postApiData } from "../../utils/api";
import SearchListBox from "../../components/home/SearchListBox";
import FilterCom from "./filterCom";
import Loader3 from "../../components/Loader3";
import FoodCategoryComp from "./foodCategoryComp";
import BannerScreen from "./bannerScreen";
import BottomButton from "../../components/BottomButton";
import { __checkLogin, __getUser } from "../../utils/localization";
const totalProducts = 10;

const UserHome = ({ navigation, __handleBookNotification }) => {
    const [state, setState] = useState({
        showFilterSheet: false,
        list: [],
        isLoading: false,
        serviceslist: ["1"],
        isReachedLimit: false,
        customer: 0,
        client: 0,
    });
    const [refreshing, setRefreshing] = useState(false);

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        showFilterSheet,
        list,
        isLoading,
        serviceslist,
        isReachedLimit,
        customer,
        client,
    } = state;

    const textRef = createRef();

    const [filterState, setFilterState] = useState({
        city_id: null,
        state_id: null,
        category: null,
        sub_category: null,
        search: null,
        limit: totalProducts,
        skip: 0,
    });
    const updateFilterState = (data) =>
        setFilterState((state) => ({ ...state, ...data }));

    const __handleGetData = (data) => {
        if (isReachedLimit) return;
        setRefreshing(false);

        updateState({ isLoading: true });

        __postApiData(`api/Booking/service_list`, {
            draw: 1,
            columns: [
                {
                    data: "users.name",
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
                    column: 1,
                    dir: "asc",
                },
            ],
            start: filterState.skip,
            length: filterState.limit,
            search: {
                value: "",
                regex: false,
            },
            advance_search: {
                // city_id: data?.city_id || null,
                // state_id: data?.state_id || null,
                // category: data?.selected_category || null,
                // sub_category: data?.selected_subcategory || null,
                // search: data?.search || null,
                ...filterState,
            },
        })
            .then((res) => {
                // console.log("res", JSON.stringify(res));

                if (res.response.response_code == "200") {
                    console.log(res.data.aaData.length);
                    updateState({
                        list: list.concat(res.data.aaData),
                        isLoading: false,
                        isReachedLimit: totalProducts > res.data.aaData.length,
                    });
                } else {
                    updateState({ list: [], isLoading: false });
                }
            })
            .catch((error) => {
                console.log(error);
                updateState({ list: [], isLoading: false });
            });
    };
    const __handleGetDashboard = (value) => {
        __getApiData(`/api/user/loginpoint`)
            .then((res) => {})
            .catch((error) => {});
    };
    const __handleGetCOunt = (value) => {
        __getApiData(`/api/home/user_count`)
            .then((res) => {
                console.log(res);
                if (res.response.response_code == "200") {
                    updateState({
                        customer: res.data[0].costumer || 0,
                        client: res.data[0].client || 0,
                    });
                }
            })
            .catch((error) => {});
    };

    useEffect(() => {
        __handleGetCOunt();
        __handleGetDashboard();
    }, []);
    useEffect(() => {
        __handleGetData();
    }, [filterState]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <BannerScreen />
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    
                                }}
                             
                            >
                                <Text
                                    style={{
                                        marginHorizontal: Sizes.fixPadding,
                                        ...Fonts.blackColor13Medium,
                                    }}
                                >
                                    Categories:
                                </Text>
                                <View style={styles.container1}>
                                       <TouchableOpacity
                                         style={styles.centerButtonContainer}
                                         onPress={() => {
                                            {__checkLogin()? navigation.navigate("HelpAndSupport"):navigation.push("Login");}
                                          
                                         }}
                                       >
                                         <Text style={styles.centerButtonText}>Enquiry</Text>
                                       </TouchableOpacity>
                                       
                                     </View>
                            </View>
                            <View style={styles.dividerStyle}></View>
                            <FoodCategoryComp navigation={navigation} />

                            {searchField()}

                            {doctors()}
                        </>
                    }
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding * 7,
                    }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                setRefreshing(true);
                                updateState({
                                    isReachedLimit: false,
                                    list: [],
                                });
                                updateFilterState({
                                    skip: 0,
                                });
                            }}
                        />
                    }
                />
                <FilterCom
                    showFilterSheet={showFilterSheet}
                    updateParentState={updateState}
                    __searchServices={(data) => {
                        updateState({
                            isReachedLimit: false,
                            list: [],
                        });
                        updateFilterState({
                            city_id: data?.city_id || null,
                            state_id: data?.state_id || null,
                            category: data?.selected_category || null,
                            sub_category: data?.selected_subcategory || null,
                            search: data?.search || null,
                            limit: totalProducts,
                            skip: 0,
                        });
                    }}
                />
            </View>
            <BottomButton navigation={navigation} admin={true} />
        </SafeAreaView>
    );
    function doctors() {
        return (
            <FlatList
                data={list}
                keyExtractor={(item) => `${item.sr_no}`}
                ListHeaderComponent={
                    <>
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                flex: 1,
                            }}
                        >
                            <Text
                                style={{
                                    marginHorizontal: Sizes.fixPadding,
                                    ...Fonts.blackColor13Medium,
                                }}
                            >
                                Top Results:
                            </Text>
                        </View>
                        <View style={styles.dividerStyle}></View>
                    </>
                }
                renderItem={({ item }) => (
                    <SearchListBox
                        item={item}
                        navigation={navigation}
                        __handleBookNotification={__handleBookNotification}
                        serviceslist={serviceslist}
                    />
                )}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                contentContainerStyle={{
                    paddingBottom: Sizes.fixPadding * 2.0,
                }}
                // initialNumToRender={2}
                // maxToRenderPerBatch={2}
                onEndReached={() => {
                    if (isReachedLimit || isLoading) return;

                    updateFilterState({
                        skip: Number(filterState.skip) + Number(totalProducts),
                    });
                }}
                // onEndReachedThreshold={0.1}
                ListFooterComponent={
                    <>
                        {isLoading ? <Loader3 /> : null}

                        {!isLoading && list.length == 0 ? (
                            <View
                                style={{
                                    justifyContent: "center",
                                    marginTop: 15.0,
                                    borderRadius: 10,
                                    paddingBottom: 10,
                                    height: 180,
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
                                    No Data Found
                                </Text>
                            </View>
                        ) : null}
                    </>
                }
            />
        );
    }

    function searchField() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.searchFieldWrapStyle}
                onPress={() => updateState({ showFilterSheet: true })}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                    <MaterialIcons
                        name="search"
                        size={18}
                        color={Colors.grayColor}
                        onPress={() => textRef.current.focus()}
                    />
                    <TextInput
                        placeholder="Search Service..."
                        placeholderTextColor={Colors.grayColor}
                        selectionColor={Colors.primaryColor}
                        style={{ ...styles.searchFieldStyle }}
                        editable={false}
                    />
                </View>
                <View>
                    <Image
                        source={require("../../assets/images/icons/filter.png")}
                        style={{
                            width: 16.0,
                            height: 16.0,
                            resizeMode: "contain",
                            tintColor: Colors.primaryColor,
                        }}
                    />
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    searchFieldWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 1.0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 2,
        marginBottom: 10,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        marginTop: 20,
        borderWidth: 0.5,
        borderColor: Colors.primaryColor,
    },
    searchFieldStyle: {
        marginTop: Sizes.fixPadding - 8.0,
        flex: 1,
        ...Fonts.blackColor14Regular,
        marginHorizontal: Sizes.fixPadding - 5.0,
    },
    dividerStyle: {
        backgroundColor: Colors.lightGray,
        height: 0.8,
        marginTop: Sizes.fixPadding * 1.0,
        marginHorizontal: Sizes.fixPadding,
    },
    centerButtonContainer: {
        backgroundColor: Colors.primaryColor,
        width: 115,
        height: 40,
        borderRadius: 5,
        // position: 'absolute',
        right: 10,
        // top: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      centerButtonText: {
        color: Colors.whiteColor,
        fontWeight: 'bold',
        fontSize: 12,
      },
      container1: {
        marginTop: -10,
        alignItems: 'center',
      },
});

export default UserHome;
