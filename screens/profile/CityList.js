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
import { MaterialIcons, Feather, Entypo } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const CityList = ({
    showCity,
    updateParentState,
    cityList,
    city_id,
    parantUpdateState,
    state_id,
}) => {
    const [search, setSearch] = useState("");
    return (
        <Overlay
            isVisible={showCity}
            onBackdropPress={() => updateParentState({ showCity: false })}
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
                        parantUpdateState({ city_id: item.city_id });
                        updateParentState({ showCity: false });
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
                    // data={cityList}
                    data={cityList?.filter(
                        (item) =>
                            item?.city_name
                                ?.toLocaleLowerCase()
                                .search(search?.toLocaleLowerCase()) >= 0
                    )}
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
    function filterSheetTitle() {
        return (
            <View style={{ ...styles.filterSheetTitleWrapStyle }}>
                <Text style={{ ...Fonts.blackColor18SemiBold, fontSize: 22 }}>
                    Select City
                </Text>
                <MaterialIcons
                    name="close"
                    size={22}
                    color={Colors.blackColor}
                    onPress={() => updateParentState({ showCity: false })}
                    style={{
                        padding: 10,
                    }}
                />
            </View>
        );
    }
};

export default CityList;
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
