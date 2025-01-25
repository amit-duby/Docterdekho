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
import { MaterialIcons, Feather } from "@expo/vector-icons";
const { height } = Dimensions.get("window");

const ServiceList = ({ isshow, service, updateParentState }) => {
    const [search, setSearch] = useState("");
    const [state, setState] = useState({
        searchList: [],
    });
    const { searchList } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const __handleGetSearchResult = (value) => {
        __getApiData(`api/home/service?search=${value}`)
            .then((res) => {
                if (res.response.response_code == "200") {
                    updateState({ searchList: res.data });
                }
            })
            .catch((error) => {});
    };
    useEffect(() => {
        __handleGetSearchResult("a");
    }, []);
    return (
        <Overlay
            isVisible={isshow}
            onBackdropPress={() => updateParentState({ isShowService: false })}
            overlayStyle={{ ...styles.fliterSheetStyle }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                {filterSheetTitle()}
                <View
                    style={{
                        ...styles.textFieldWrapStyle,
                    }}
                >
                    <TextInput
                        value={search}
                        onChangeText={(value) => {
                            setSearch(value);
                            __handleGetSearchResult(value);
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
                <View
                    style={{
                        height: 300,
                        flexDirection: "row",
                        paddingHorizontal: 20,
                    }}
                >
                    {cityCom()}
                </View>
            </ScrollView>
        </Overlay>
    );
    function cityCom(params) {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    style={{
                        marginEnd: 5,
                        marginTop: 5,
                        padding: 10,
                        backgroundColor: Colors.whiteColor,
                        elevation: 1,
                        flexDirection: "row",
                    }}
                    onPress={() => {
                        updateParentState({
                            service: item.name,
                            isShowService: false,
                        });
                    }}
                >
                    <Feather
                        name={service == item.name ? "check-square" : "square"}
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
                    data={searchList}
                    keyExtractor={(item) => `${item.city_id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
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
                    Select Service
                </Text>
                <MaterialIcons
                    name="close"
                    size={22}
                    color={Colors.blackColor}
                    onPress={() => updateParentState({ isShowService: false })}
                    style={{
                        padding: 10,
                    }}
                />
            </View>
        );
    }
};

export default ServiceList;
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
