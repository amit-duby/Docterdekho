import React, { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Overlay } from "@rneui/themed";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __getApiData, __postApiData } from "../../utils/api";
import {
    MaterialIcons,
    Feather,
    Entypo,
    FontAwesome,
} from "@expo/vector-icons";
import { Image } from "react-native";

const { width, height } = Dimensions.get("window");

const FilterCom = ({
    showFilterSheet,
    updateParentState,
    __searchServices,
}) => {
    const [state, setState] = useState({
        search: "",
        tab: "1",
        profList: [],
        stateList: [],
        cityList: [],
        searchList: [],

        profession: "",
        state_id: "",
        city_id: "",
        services: ["1"],
        rating: "",
        working_experience: "",
        price: "",
        categoryList: [],
        subCategoryList: [],
        selected_category: "",
        selected_subcategory: "",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        tab,
        profList,
        profession,
        stateList,
        cityList,
        state_id,
        city_id,
        search,
        services,
        searchList,
        rating,
        working_experience,
        price,
        categoryList,
        subCategoryList,
        selected_category,
        selected_subcategory,
    } = state;

    const __handleGetState = () => {
        __postApiData(`api/home/state`, {})
            .then((res) => {
                updateState({
                    stateList: res.data.filter((item) => item.count != "0"),
                    // isLoading: false,
                });
            })
            .catch((error) => {});
    };
    const __handleGetCity = (id) => {
        updateState({
            cityList: [],
        });
        __postApiData(`api/home/city/${id}`, {})
            .then((res) => {
                updateState({
                    cityList: res.data.filter((item) => item.count != "0"),
                });
            })
            .catch((error) => {});
    };

    const __handleGetCategory = () => {
        __getApiData(`api/home/profession`)
            .then((res) => {
                if (res.response.response_code == "200") {
                    updateState({ profList: res.data });
                }
            })
            .catch((error) => {});
    };

    const __handleGetSearchResult = (value) => {
        __getApiData(`api/home/service?search=${value || ""}`)
            .then((res) => {
                if (res.response.response_code == "200") {
                    updateState({ searchList: res.data });
                }
            })
            .catch((error) => {});
    };

    const __handleGetCategoryList = () => {
        __getApiData(`api/home/category`)
            .then((res) => {
                console.log(res.data);
                updateState({
                    categoryList: res.data.filter((item) => item.count != "0"),
                });
            })
            .catch((error) => {});
    };
    const __handleGetSubCategory = (id) => {
        updateState({
            subCategoryList: [],
        });
        __getApiData(`api/home/subcategory/` + id)
            .then((res) => {
                console.log(res.data);
                updateState({
                    subCategoryList: res.data.filter(
                        (item) => item.count != "0"
                    ),
                });
            })
            .catch((error) => {});
    };

    useEffect(() => {
        __handleGetState();
        __handleGetCategory();
        __handleGetSearchResult("General Visiting");
        __handleGetCategoryList();
    }, []);

    return (
        <>
            <Overlay
                isVisible={showFilterSheet}
                onBackdropPress={() =>
                    updateParentState({ showFilterSheet: false })
                }
                overlayStyle={{ ...styles.fliterSheetStyle }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {filterSheetTitle()}
                    <View style={{ height: 300, flexDirection: "row" }}>
                        {leftSide()}
                        {rightSide()}
                    </View>
                    {bottomButton()}
                </ScrollView>
            </Overlay>
        </>
    );

    function bottomButton(params) {
        return (
            <View
                style={{
                    height: 80,
                    borderTopWidth: 0.5,
                    borderColor: Colors.lightGrayColor,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.greenColor,
                        padding: 10,
                        borderRadius: 10,
                        paddingHorizontal: 30,
                        borderWidth: 0.5,
                        borderColor: Colors.lightGrayColor,
                    }}
                    onPress={() => {
                        __searchServices("General Visiting");
                        updateState({
                            search: "",
                            tab: "1",
                            searchList: [],

                            profession: "",
                            state_id: "",
                            city_id: "",
                            services: [],
                            subCategoryList: [],
                            rating: "",
                            working_experience: "",
                            price: "",
                            selected_category: "",
                            selected_subcategory: "",
                        });
                        updateParentState({ showFilterSheet: false });
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor14Medium,
                            color: Colors.whiteColor,
                            paddingTop: 2,
                        }}
                    >
                        Clear
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.primaryColor,
                        padding: 10,
                        borderRadius: 10,
                        elevation: 1,
                        paddingHorizontal: 20,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => {
                        __searchServices({
                            search: search || null,
                            selected_category: selected_category || null,
                            selected_subcategory: selected_subcategory || null,
                            city_id: city_id || null,
                            state_id: state_id || null,
                        });
                        updateParentState({ showFilterSheet: false });
                    }}
                >
                    <Text
                        style={{ ...Fonts.whiteColor14Medium, paddingTop: 2 }}
                    >
                        Search
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function leftSide(params) {
        return (
            <View
                style={{
                    width: 120,
                    borderRightWidth: 0.5,
                    borderColor: Colors.lightGrayColor,
                }}
            >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    backgroundColor:
                                        tab == "1"
                                            ? Colors.lightGrayColor
                                            : Colors.whiteColor,
                                }}
                                onPress={() => updateState({ tab: "1" })}
                            >
                                <View
                                    style={{
                                        width: 5,
                                        backgroundColor:
                                            tab == "1"
                                                ? Colors.primaryColor
                                                : Colors.whiteColor,
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                    }}
                                />

                                <Text
                                    style={{
                                        ...Fonts.blackColor16SemiBold,
                                        padding: 8,
                                        fontSize: 14,
                                    }}
                                >
                                    Search
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    backgroundColor:
                                        tab == "2"
                                            ? Colors.lightGrayColor
                                            : Colors.whiteColor,
                                }}
                                onPress={() => updateState({ tab: "2" })}
                            >
                                <View
                                    style={{
                                        width: 5,
                                        backgroundColor:
                                            tab == "2"
                                                ? Colors.primaryColor
                                                : Colors.whiteColor,
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                    }}
                                />

                                <Text
                                    style={{
                                        ...Fonts.blackColor16SemiBold,
                                        padding: 8,
                                        fontSize: 14,
                                    }}
                                >
                                    Category
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    backgroundColor:
                                        tab == "5"
                                            ? Colors.lightGrayColor
                                            : Colors.whiteColor,
                                }}
                                onPress={() => updateState({ tab: "5" })}
                            >
                                <View
                                    style={{
                                        width: 5,
                                        backgroundColor:
                                            tab == "5"
                                                ? Colors.primaryColor
                                                : Colors.whiteColor,
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                    }}
                                />

                                <Text
                                    style={{
                                        ...Fonts.blackColor16SemiBold,
                                        padding: 8,
                                        fontSize: 14,
                                    }}
                                >
                                    Sub Category
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    backgroundColor:
                                        tab == "3"
                                            ? Colors.lightGrayColor
                                            : Colors.whiteColor,
                                }}
                                onPress={() => updateState({ tab: "3" })}
                            >
                                <View
                                    style={{
                                        width: 5,
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                        backgroundColor:
                                            tab == "3"
                                                ? Colors.primaryColor
                                                : Colors.whiteColor,
                                    }}
                                />

                                <Text
                                    style={{
                                        ...Fonts.blackColor16SemiBold,
                                        padding: 8,
                                        fontSize: 14,
                                    }}
                                >
                                    State
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    backgroundColor:
                                        tab == "4"
                                            ? Colors.lightGrayColor
                                            : Colors.whiteColor,
                                }}
                                onPress={() => updateState({ tab: "4" })}
                            >
                                <View
                                    style={{
                                        width: 5,
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                        backgroundColor:
                                            tab == "4"
                                                ? Colors.primaryColor
                                                : Colors.whiteColor,
                                    }}
                                />

                                <Text
                                    style={{
                                        ...Fonts.blackColor16SemiBold,
                                        padding: 8,
                                        fontSize: 14,
                                    }}
                                >
                                    City
                                </Text>
                            </TouchableOpacity>
                        </>
                    }
                />
            </View>
        );
    }

    function rightSide(params) {
        return (
            <View
                style={{
                    width: width - 120,
                    backgroundColor: Colors.bodyColor,
                }}
            >
                {tab == "1" ? (
                    <View
                        style={{
                            ...styles.textFieldWrapStyle,
                            marginBottom: 1,
                        }}
                    >
                        <TextInput
                            value={search}
                            onChangeText={(value) => {
                                updateState({ search: value });
                                // __handleGetSearchResult(value);
                            }}
                            placeholder="Search..."
                            placeholderTextColor={Colors.grayColor}
                            style={{
                                ...Fonts.blackColor14Regular,
                                flex: 1,
                                marginLeft: Sizes.fixPadding + 2.0,
                            }}
                            selectionColor={Colors.primaryColor}
                            keyboardType="email-address"
                        />
                    </View>
                ) : null}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {/* {tab == "1" ? searchCom() : null} */}
                            {tab == "2" ? categoryCom() : null}
                            {tab == "3" ? stateCom() : null}
                            {tab == "4" ? cityCom() : null}
                            {tab == "5" ? subcategoryCom() : null}
                        </>
                    }
                    contentContainerStyle={{}}
                />
            </View>
        );
    }

    function priceFilter(params) {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    style={{
                        marginEnd: 5,
                        marginBottom: 1,
                        padding: 10,
                        backgroundColor: Colors.whiteColor,
                        elevation: 1,
                        flexDirection: "row",
                    }}
                    onPress={() => {
                        updateState({ price: item.id });
                    }}
                >
                    <Feather
                        name={price == item.id ? "check-square" : "square"}
                        size={18}
                        color={Colors.blackColor}
                        style={{ marginEnd: 10 }}
                    />
                    <Text style={{ ...Fonts.blackColor13Medium }}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            );
        };
        return (
            <>
                <FlatList
                    data={[
                        { name: "Low to High", id: 1 },
                        { name: "High to Low", id: 2 },
                    ]}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    numColumns={1}
                    maxToRenderPerBatch={10}
                />
            </>
        );
    }

    function ratingCom(params) {
        return (
            <View style={{ flexDirection: "row", gap: 1, flexWrap: "wrap" }}>
                {[1, 2, 3, 4, 5].map((item, i) => (
                    <TouchableOpacity
                        key={i}
                        style={{
                            width: "49%",
                            height: 60,
                            backgroundColor: Colors.whiteColor,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: rating == item ? 2 : 0,
                            borderColor: "#CDDC39",
                        }}
                        onPress={() => {
                            updateState({ rating: item });
                        }}
                    >
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {item}
                        </Text>
                        <FontAwesome name="star" size={16} color="#CDDC39" />
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
    function experienceCom(params) {
        return (
            <View style={{ flexDirection: "row", gap: 1, flexWrap: "wrap" }}>
                {[...Array(50)].map((item, i) => (
                    <TouchableOpacity
                        key={i}
                        style={{
                            width: "49%",
                            height: 60,
                            backgroundColor: Colors.whiteColor,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: working_experience == i + 1 ? 2 : 0,
                            borderColor: "#CDDC39",
                        }}
                        onPress={() => {
                            updateState({ working_experience: i + 1 });
                        }}
                    >
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {i + 1}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }

    function cityCom(params) {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    style={{
                        marginEnd: 5,
                        marginBottom: 1,
                        padding: 10,
                        backgroundColor: Colors.whiteColor,
                        elevation: 1,
                        flexDirection: "row",
                    }}
                    onPress={() => {
                        updateState({ city_id: item.city_id });
                    }}
                >
                    <Feather
                        name={
                            city_id == item.city_id ? "check-square" : "square"
                        }
                        size={18}
                        color={Colors.blackColor}
                        style={{ marginEnd: 10 }}
                    />
                    <Text style={{ ...Fonts.blackColor13Medium }}>
                        {item.city_name}
                    </Text>
                </TouchableOpacity>
            );
        };
        return (
            <>
                <FlatList
                    data={cityList}
                    keyExtractor={(item) => `${item.city_id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    numColumns={1}
                    maxToRenderPerBatch={10}
                />
                {state_id ? null : (
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
                            color={Colors.grayColor}
                        />
                        <Text
                            style={{
                                ...Fonts.grayColor12Regular,
                                marginTop: 10,
                            }}
                        >
                            Select State First.!
                        </Text>
                    </View>
                )}
            </>
        );
    }
    function subcategoryCom(params) {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    style={{
                        marginEnd: 5,
                        marginBottom: 1,
                        padding: 10,
                        backgroundColor: Colors.whiteColor,
                        elevation: 1,
                        flexDirection: "row",
                    }}
                    onPress={() => {
                        updateState({ selected_subcategory: item.id });
                    }}
                >
                    <Feather
                        name={
                            selected_subcategory == item.id
                                ? "check-square"
                                : "square"
                        }
                        size={18}
                        color={Colors.blackColor}
                        style={{ marginEnd: 10 }}
                    />
                    <Text style={{ ...Fonts.blackColor13Medium }}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            );
        };
        return (
            <>
                <FlatList
                    data={subCategoryList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    numColumns={1}
                    maxToRenderPerBatch={10}
                />
                {state_id ? null : (
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
                            color={Colors.grayColor}
                        />
                        <Text
                            style={{
                                ...Fonts.grayColor12Regular,
                                marginTop: 10,
                            }}
                        >
                            Select Category First.!
                        </Text>
                    </View>
                )}
            </>
        );
    }

    function categoryCom(params) {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    style={{
                        marginEnd: 5,
                        marginBottom: 1,
                        padding: 10,
                        backgroundColor: Colors.whiteColor,
                        elevation: 1,
                        flexDirection: "row",
                    }}
                    onPress={() => {
                        updateState({ selected_category: item.id });
                        __handleGetSubCategory(item.id);
                    }}
                >
                    <Feather
                        name={
                            selected_category == item.id
                                ? "check-square"
                                : "square"
                        }
                        size={18}
                        color={Colors.blackColor}
                        style={{ marginEnd: 10 }}
                    />
                    <Text style={{ ...Fonts.blackColor13Medium }}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            );
        };
        return (
            <>
                <FlatList
                    data={categoryList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    maxToRenderPerBatch={10}
                />
            </>
        );
    }
    function stateCom(params) {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    style={{
                        marginEnd: 5,
                        marginBottom: 1,
                        padding: 10,
                        backgroundColor: Colors.whiteColor,
                        elevation: 1,
                        flexDirection: "row",
                    }}
                    onPress={() => {
                        updateState({ state_id: item.state_id });
                        __handleGetCity(item.state_id);
                    }}
                >
                    <Feather
                        name={
                            state_id == item.state_id
                                ? "check-square"
                                : "square"
                        }
                        size={18}
                        color={Colors.blackColor}
                        style={{ marginEnd: 10 }}
                    />
                    <Text style={{ ...Fonts.blackColor13Medium }}>
                        {item.state_name}
                    </Text>
                </TouchableOpacity>
            );
        };
        return (
            <>
                <FlatList
                    data={stateList}
                    keyExtractor={(item) => `${item.state_id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    maxToRenderPerBatch={10}
                />
            </>
        );
    }

    function filterSheetTitle() {
        return (
            <View style={{ ...styles.filterSheetTitleWrapStyle }}>
                <Text style={{ ...Fonts.blackColor18SemiBold, fontSize: 22 }}>
                    Filter
                </Text>
                <MaterialIcons
                    name="close"
                    size={22}
                    color={Colors.blackColor}
                    onPress={() =>
                        updateParentState({ showFilterSheet: false })
                    }
                    style={{ padding: 10 }}
                />
            </View>
        );
    }
};

export default FilterCom;

const styles = StyleSheet.create({
    fliterSheetStyle: {
        width: "100%",
        position: "absolute",
        bottom: 0.0,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: 0.0,
        maxHeight: height - 170.0,
        paddingVertical: 0.0,
    },
    filterSheetTitleWrapStyle: {
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 0.5,
        borderColor: Colors.lightGrayColor,
    },
    textFieldWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding,
        marginEnd: Sizes.fixPadding - 5.0,
        borderColor: Colors.lightGrayColor,
        elevation: 0.5,
    },
});
