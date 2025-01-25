import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Image,
    FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { __getApiData, __postApiData } from "../../utils/api";
import RenderHtml from "react-native-render-html";
import FoodCategoryComp from "./foodCategoryComp";
import { Feather } from "@expo/vector-icons";
import Loader3 from "../../components/Loader3";
import SearchListBox from "../../components/home/SearchListBox";
import BannerScreen from "../home/bannerScreen";
const totalProducts = 10;

const SubCategory = ({ navigation, route }) => {
    const [state, setState] = useState({
        showFilterSheet: false,
        list: [],
        isLoading: false,
        serviceslist: ["1"],
        isReachedLimit: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { showFilterSheet, list, isLoading, serviceslist, isReachedLimit } =
        state;

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
    const __handleGetData = () => {
        if (isReachedLimit) return;
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
            advance_search: route.params?.subcategory
                ? {
                      sub_category: route.params.id,
                  }
                : {
                      category: route.params.id,
                  },
        })
            .then((res) => {
                console.log(JSON.stringify(res));

                if (res.response.response_code == "200") {
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

    useEffect(() => {
        __handleGetData();
    }, [filterState]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            <View style={{ flex: 1 }}>
                {header()}

                <ScrollView>
                    <BannerScreen />
                    <FoodCategoryComp
                        categoryId={route.params.id}
                        navigation={navigation}
                    />
                    {doctors()}
                </ScrollView>
            </View>
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
                        <View
                            style={{
                                backgroundColor: Colors.lightGray,
                                height: 0.8,
                                marginTop: Sizes.fixPadding * 1.0,
                                marginHorizontal: Sizes.fixPadding,
                            }}
                        ></View>
                    </>
                }
                renderItem={({ item }) => (
                    <SearchListBox
                        item={item}
                        navigation={navigation}
                        // __handleBookNotification={__handleBookNotification}
                        serviceslist={serviceslist}
                    />
                )}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                contentContainerStyle={{
                    paddingBottom: Sizes.fixPadding * 2.0,
                }}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                onEndReached={() => {
                    if (isReachedLimit || isLoading) return;

                    updateFilterState({
                        skip: Number(filterState.skip) + Number(totalProducts),
                    });
                }}
                onEndReachedThreshold={0.1}
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

    function header() {
        return (
            <View
                style={{
                    padding: Sizes.fixPadding * 2.0,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: Colors.primaryColor,
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
                    {route.params?.name}
                </Text>
            </View>
        );
    }
};

export default SubCategory;
