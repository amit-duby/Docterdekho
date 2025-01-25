import React, { useState } from "react";
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

const SubCategory = ({
    showState,
    updateParentState,
    stateList,
    state_id,
    parantUpdateState,
}) => {
    const [search, setSearch] = useState("");
    return (
        <Overlay
            isVisible={showState}
            onBackdropPress={() =>
                updateParentState({ showSubCategory: false })
            }
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
                    {stateCom()}
                </View>
            </ScrollView>
        </Overlay>
    );
    function stateCom(params) {
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
                        parantUpdateState({ sub_category: item.id });
                        // __handleGetCity(item.state_id);
                        updateParentState({ showSubCategory: false });
                    }}
                >
                    <Feather
                        name={state_id == item.id ? "check-square" : "square"}
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
                    data={stateList?.filter(
                        (item) =>
                            item?.name
                                ?.toLocaleLowerCase()
                                .search(search?.toLocaleLowerCase()) >= 0
                    )}
                    keyExtractor={(item) => `${item.id}`}
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
                    Select Sub-category
                </Text>
                <MaterialIcons
                    name="close"
                    size={22}
                    color={Colors.blackColor}
                    onPress={() =>
                        updateParentState({ showSubCategory: false })
                    }
                    style={{
                        padding: 10,
                    }}
                />
            </View>
        );
    }
};

export default SubCategory;
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
