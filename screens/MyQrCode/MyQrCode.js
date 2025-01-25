import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Image,
    StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import {
    __getApiData,
    __postApiData,
    __postApiDataFormData,
} from "../../utils/api";
import Loader2 from "../../components/Loader2";
import { ImageBackground } from "react-native";

const MyQrCode = ({ navigation, route }) => {
    const [state, setState] = useState({
        isLoading: false,
        serviceImages: null,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { serviceImages, isLoading } = state;

    const __handleGetService = (value) => {
        updateState({ isLoading: true });

        __getApiData(`/api/User/myqr`)
            .then((res) => {
                console.log(res);
                if (res.response.response_code == "200") {
                    updateState({
                        serviceImages: res.data || "",
                    });
                }
                updateState({ isLoading: false });
            })
            .catch((error) => {
                updateState({ isLoading: false });
            });
    };
    useEffect(() => {
        __handleGetService();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            <ImageBackground
                source={require("../../assets/images/bg_img.png")}
                style={{ flex: 1 }}
            >
                {header()}
                {isLoading && <Loader2 />}

                <ScrollView>
                    <View
                        style={{
                            borderWidth: 2,
                            borderColor: Colors.lightGray,
                            margin: 20,
                            paddingTop: 40,
                            backgroundColor: Colors.whiteColor,
                            borderRadius: 10,
                        }}
                    >
                        <Image
                            source={require("../../assets/images/logo2.png")}
                            resizeMode="contain"
                            style={{
                                width: 280,
                                height: 130,
                                alignSelf: "center",
                            }}
                        />
                        <View
                            activeOpacity={0.9}
                            style={{
                                margin: Sizes.fixPadding * 1.0,
                                marginTop: 10,
                                height: 350,
                                justifyContent: "center",
                            }}
                        >
                            {serviceImages ? (
                                <>
                                    <Image
                                        source={{ uri: serviceImages }}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            resizeMode: "contain",
                                        }}
                                    />
                                </>
                            ) : (
                                <View style={{ alignItems: "center" }}>
                                    <Text
                                        style={{
                                            ...Fonts.gray17Regular,
                                            fontSize: 14,
                                        }}
                                    >
                                        Qr Not Found
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );

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
                    My QR Code
                </Text>
            </View>
        );
    }
};

export default MyQrCode;

const styles = StyleSheet.create({
    textFieldWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.02)",
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderWidth: 0.5,
        borderColor: Colors.lightGray,
    },
});
