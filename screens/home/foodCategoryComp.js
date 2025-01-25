import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __getApiData, BASE_URL } from "../../utils/api";
import {
    __checkLogin,
    __getProvider,
    __getUser,
} from "../../utils/localization";
import {
    __generateRandomString,
    __splitArrayIntoSubArrays,
} from "../../utils/function";

const RenderItem = React.memo(({ item, navigation }) => {
    const onPressHandler = useCallback(() => {
        __checkLogin()
            ? navigation.push("SubCategory", {
                  ...item,
              })
            : navigation.push("Login");
    }, []);

    return (
        <TouchableOpacity
            activeOpacity={0.99}
            onPress={onPressHandler}
            style={{
                marginBottom: Sizes.fixPadding,
                alignItems: "center",
                width: 95,
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
                        width: 55.0,
                        height: 55,
                        borderRadius: 25.0,
                        resizeMode: "cover",
                    }}
                />
            </View>
            <Text
                style={{
                    marginTop: Sizes.fixPadding - 5.0,
                    ...Fonts.blackColor14Regular,
                    fontSize: 11.5,
                    textAlign: "center",
                }}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );
});

const FoodCategoryComp = ({ navigation }) => {
    const [state, setState] = useState({
        category: [],
        isShow: true,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { category, isShow } = state;

    useEffect(() => {
        __getApiData(`api/home/category`)
            .then((res) => {
                console.log(res);
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
                        backgroundColor: Colors.whiteColor,
                        marginTop: 10,
                    }}
                >
                    <View>
                        <FlatList
                            horizontal
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
                        />
                    </View>
                </View>
            </>
        );
    }
};

export default FoodCategoryComp;
