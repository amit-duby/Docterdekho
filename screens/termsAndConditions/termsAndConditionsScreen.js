import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { __getApiData } from "../../utils/api";
import RenderHtml from "react-native-render-html";

const TermsAndConditionsScreen = ({ navigation, route }) => {
    const [content, setcontent] = useState("");

    const __getData = () => {
        __getApiData("api/home/cms/" + route.params?.varable?.id)
            .then((res) => {
                setcontent(res.data?.contant_description);
            })
            .catch((error) => {});
    };
    useEffect(() => {
        __getData();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            <ImageBackground
                source={require("../../assets/images/greens.png")}
                style={{ flex: 1 }}
            >
                {header()}
                <View
                    style={{
                        backgroundColor: Colors.whiteColor,
                        padding: 10,
                        marginHorizontal: 15,
                        borderRadius: 10,
                        marginVertical: 20,
                        overflow: "hidden",
                        flex: 1,
                    }}
                >
                    <ScrollView
                        style={{}}
                        showsHorizontalScrollIndicator={false}
                    >
                        {termsOfUseInfo()}
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );

    function termsOfUseInfo() {
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 1.0,
                    marginVertical: Sizes.fixPadding + 5.0,
                }}
            >
                <RenderHtml
                    contentWidth={300}
                    source={{
                        html: content,
                    }}
                    tagsStyles={{
                        body: {
                            ...Fonts.blackColor13Medium,
                            fontSize: 15,
                        },
                    }}
                />
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
                    {route.params?.varable?.name}
                </Text>
            </View>
        );
    }
};

export default TermsAndConditionsScreen;
