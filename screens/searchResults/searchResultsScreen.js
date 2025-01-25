import { MaterialIcons } from "@expo/vector-icons";
import React, { createRef, useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const searchResultsList = [
   
];

const SearchResultsScreen = ({ navigation }) => {
    const [state, setState] = useState({
        search: "Indian breakfast",
        searchResultsData: searchResultsList,
        showSnackBar: false,
        inSave: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { search, searchResultsData, showSnackBar, inSave } = state;

    const textField = createRef();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            <View style={{ flex: 1 }}>
                {header()}
                {searchField()}
                {searchResults()}
            </View>
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => updateState({ showSnackBar: false })}
                style={{
                    backgroundColor: Colors.darkGrayColor,
                    elevation: 0.0,
                }}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    {inSave ? "Added In Saved" : "Removed From Saved"}
                </Text>
            </Snackbar>
        </SafeAreaView>
    );

    function updateSearchResults({ id }) {
        const copyResults = searchResultsData;
        const newResults = copyResults.map((item) => {
            if (item.id == id) {
                updateState({ inSave: !item.inSaved });
                return { ...item, inSaved: !item.inSaved };
            } else {
                return { ...item };
            }
        });
        updateState({ searchResultsData: newResults, showSnackBar: true });
    }

    function searchResults() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push("RecipeDetail")}
                    style={styles.searchResultsWrapStyle}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={item.foodImage}
                            style={{
                                width: 80.0,
                                height: 80.0,
                                resizeMode: "contain",
                            }}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={{ lineHeight: 18.0 }}>
                                <Text style={{ ...Fonts.primaryColor12Bold }}>
                                    | {""}
                                </Text>
                                <Text style={{ ...Fonts.primaryColor12Medium }}>
                                    {item.foodCategory}
                                </Text>
                            </Text>
                            <Text
                                numberOfLines={2}
                                style={{
                                    lineHeight: 20.0,
                                    ...Fonts.blackColor16Medium,
                                }}
                            >
                                {item.foodDish}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={{
                                    lineHeight: 20.0,
                                    marginBottom: Sizes.fixPadding - 8.0,
                                }}
                            >
                                <Text style={{ ...Fonts.grayColor14Regular }}>
                                    {item.ingredientsCount} Ingredients | {""}
                                </Text>
                                <Text
                                    style={{ ...Fonts.primaryColor14Regular }}
                                >
                                    {item.timeToMade}
                                </Text>
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                {rating({ number: item.rating })}
                            </View>
                        </View>
                    </View>
                    <MaterialIcons
                        name={item.inSaved ? "bookmark" : "bookmark-outline"}
                        color={Colors.blackColor}
                        size={20}
                        onPress={() => updateSearchResults({ id: item.id })}
                    />
                </TouchableOpacity>
            );
        };
        return (
            <FlatList
                data={searchResultsData}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
            />
        );
    }

    function rating({ number }) {
        return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                {number == 5.0 ||
                number == 4.0 ||
                number == 3.0 ||
                number == 2.0 ||
                number == 1.0 ? (
                    <MaterialIcons
                        name="star"
                        size={16}
                        color={Colors.orangeColor}
                    />
                ) : null}
                {number == 5.0 ||
                number == 4.0 ||
                number == 3.0 ||
                number == 2.0 ? (
                    <MaterialIcons
                        name="star"
                        size={16}
                        color={Colors.orangeColor}
                    />
                ) : null}
                {number == 5.0 || number == 4.0 || number == 3.0 ? (
                    <MaterialIcons
                        name="star"
                        size={16}
                        color={Colors.orangeColor}
                    />
                ) : null}
                {number == 5.0 || number == 4.0 ? (
                    <MaterialIcons
                        name="star"
                        size={16}
                        color={Colors.orangeColor}
                    />
                ) : null}
                {number == 5.0 ? (
                    <MaterialIcons
                        name="star"
                        size={16}
                        color={Colors.orangeColor}
                    />
                ) : null}
            </View>
        );
    }

    function searchField() {
        return (
            <View style={styles.searchFieldStyle}>
                <TextInput
                    ref={textField}
                    placeholder="Search Here..."
                    placeholderTextColor={Colors.grayColor}
                    value={search}
                    onChangeText={(value) => updateState({ search: value })}
                    style={{
                        marginTop: Sizes.fixPadding - 8.0,
                        ...Fonts.blackColor14Regular,
                        flex: 1,
                        lineHeight: 20.0,
                    }}
                    selectionColor={Colors.primaryColor}
                />
                <MaterialIcons
                    name="close"
                    color={Colors.grayColor}
                    size={20}
                    onPress={() => textField.current.clear()}
                    style={{ marginLeft: Sizes.fixPadding - 5.0 }}
                />
            </View>
        );
    }

    function header() {
        return (
            <MaterialIcons
                name="arrow-back-ios"
                size={20}
                color={Colors.blackColor}
                style={{
                    marginVertical: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding + 5.0,
                    alignSelf: "flex-start",
                }}
                onPress={() => navigation.pop()}
            />
        );
    }
};

const styles = StyleSheet.create({
    searchFieldStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: Colors.whiteColor,
        elevation: 1.0,
        borderColor: Colors.lightGrayColor,
        borderWidth: 0.5,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        paddingLeft: Sizes.fixPadding,
        paddingRight: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    searchResultsWrapStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.whiteColor,
        elevation: 0.5,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        borderColor: Colors.lightGrayColor,
        borderWidth: 0.5,
    },
});

export default SearchResultsScreen;
