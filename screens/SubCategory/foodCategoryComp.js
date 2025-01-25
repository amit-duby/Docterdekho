import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __getApiData, BASE_URL } from "../../utils/api";
import { __getProvider, __getUser } from "../../utils/localization";
import {
    __generateRandomString,
    __splitArrayIntoSubArrays,
} from "../../utils/function";

const RenderItem = React.memo(({ item, navigation }) => {
    const onPressHandler = useCallback(() => {
        navigation.push("SubCategory", {
            ...item,
            subcategory: true,
        });
    }, []);

    return (
        <TouchableOpacity
            activeOpacity={0.99}
            onPress={onPressHandler}
            style={{
                marginRight: Sizes.fixPadding - 6,
                marginBottom: Sizes.fixPadding,
                // justifyContent: "center",
                alignItems: "center",
                width: "32.3%",
                borderWidth: 0.2,
                paddingTop: 10,
                borderColor: Colors.primaryColor,
                borderRadius: 5,
                backgroundColor: Colors.whiteColor,
                padding: 8,
            }}
        >
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: Colors.grayColor,
                    overflow: "hidden",
                }}
            >
                <Image
                    source={{ uri: item.url }}
                    style={{
                        width: 65.0,
                        height: 65,
                        borderRadius: 50.0,
                        resizeMode: "cover",
                        overflow: "hidden",
                    }}
                />
            </View>
            <Text
                style={{
                    marginTop: Sizes.fixPadding - 5.0,
                    ...Fonts.blackColor14Regular,
                    fontSize: 12.5,
                    textAlign: "center",
                }}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );
});

const FoodCategoryComp = ({ navigation, categoryId }) => {
    const [state, setState] = useState({
        category: [],
        isShow: true,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { category, isShow } = state;

    useEffect(() => {
        __getApiData(`api/home/subcategory/` + categoryId)
            .then((res) => {
                if (res.response.response_code == "200") {
                    return updateState({
                        category: res.data
                            .filter((item) => item.count != "0")
                            .map((item) => ({
                                url: BASE_URL + item.picture,
                                ...item,
                            })),
                        isShow: true,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return <>{isShow && foodCategory()}</>;

    function foodCategory() {
        return (
            <>
                <View
                    style={{
                        marginTop: 10,
                    }}
                >
                    <View>
                        <FlatList
                            data={category}
                            keyExtractor={(item) => `${item.id}`}
                            renderItem={({ item }) => (
                                <RenderItem
                                    item={item}
                                    navigation={navigation}
                                />
                            )}
                            contentContainerStyle={{
                                paddingLeft: Sizes.fixPadding,
                                paddingRight: Sizes.fixPadding,
                            }}
                            showsHorizontalScrollIndicator={false}
                            numColumns={3}
                        />
                    </View>
                </View>
            </>
        );
    }
};

export default FoodCategoryComp;
