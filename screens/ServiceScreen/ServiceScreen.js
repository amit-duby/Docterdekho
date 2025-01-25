import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Image,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, Entypo, Foundation } from "@expo/vector-icons";
import {
    __getApiData,
    __postApiData,
    __postApiDataFormData,
} from "../../utils/api";
import * as ImagePicker from "expo-image-picker";
import Loader2 from "../../components/Loader2";
import { ImageBackground } from "react-native";
import InfoAlert from "../../components/alert/infoAlert";

const ServiceScreen = ({ navigation, route }) => {
    const [state, setState] = useState({
        isLoading: false,
        serviceImages: null,
        serviceLable: "",
        showinfo: "",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { serviceImages, serviceLable, isLoading, showinfo } = state;

    const __handleGetService = (value) => {
        updateState({ isLoading: true });

        __getApiData(`/api/user/userservice`)
            .then((res) => {
                console.log(res);
                if (res.response.response_code == "200") {
                    updateState({
                        serviceImages: res.data[0]?.picture || "",
                        serviceLable: res.data[0]?.name || "",
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

    const pickLogo = async () => {
        try {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                return alert(
                    "Sorry, we need camera roll permissions to make this work!"
                );
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
            if (!result.canceled) {
                console.log(result.assets);
                updateState({ serviceImages: result.assets[0].uri });
            }
        } catch (error) {}
    };

    const __HandleSave = (uri) => {
        try {
            updateState({ isLoading: true });
            const formData = new FormData();
            formData.append("picture", {
                uri: serviceImages,
                type: "image/jpeg",
                name: "image.jpg",
            });
            formData.append("name", serviceLable);

            __postApiDataFormData("api/user/service_update", formData)
                .then((res) => {
                    updateState({ isLoading: false });

                    // if (res.response.response_code == "200") {
                    //     return updateState({
                    //         showinfo: res.response.response_message,
                    //     });
                    // }
                    updateState({
                        showinfo: res.response.response_message,
                    });
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                    updateState({ isLoading: false });
                    Alert.alert("", "Failed");
                });
        } catch (error) {
            console.log(JSON.stringify(error));
            updateState({ isLoading: false });
            Alert.alert("", "Failed");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            {showinfo ? (
                <InfoAlert
                    header2={showinfo}
                    isButton={"Ok"}
                    handleButtonClick={() => {
                        updateState({
                            showinfo: null,
                        });
                        navigation.push("MainDrawer");
                    }}
                />
            ) : null}
            <ImageBackground
                source={require("../../assets/images/bg_img.png")}
                style={{ flex: 1 }}
            >
                {header()}
                {isLoading && <Loader2 />}

                <ScrollView>
                    <View
                        style={{
                            margin: 15,
                            backgroundColor: Colors.whiteColor,
                            borderRadius: 10,
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.blackColor13Medium,
                                fontSize: 13,
                                paddingHorizontal: 20,
                                marginTop: 15,
                            }}
                        >
                            Ads Title
                        </Text>
                        <View
                            style={{
                                ...styles.textFieldWrapStyle,
                                marginBottom: Sizes.fixPadding * 1.0,
                                marginTop: 10,
                            }}
                        >
                            <Foundation
                                name={"clipboard-notes"}
                                size={25}
                                color={Colors.grayColor}
                            />
                            <TextInput
                                value={serviceLable}
                                onChangeText={(value) =>
                                    updateState({ serviceLable: value })
                                }
                                placeholder="Enter Ads Title"
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
                        <Text
                            style={{
                                ...Fonts.blackColor13Medium,
                                fontSize: 13,
                                paddingHorizontal: 20,
                            }}
                        >
                            Ads Image
                        </Text>
                        <TouchableOpacity
                            onPress={pickLogo}
                            activeOpacity={0.9}
                            style={{
                                ...styles.textFieldWrapStyle,
                                marginBottom: Sizes.fixPadding * 1.0,
                                marginTop: 10,
                                height: 450,
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
                                        Click here
                                    </Text>
                                    <Text
                                        style={{
                                            ...Fonts.gray17Regular,
                                            fontSize: 14,
                                        }}
                                    >
                                        To update Ads Image
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        {serviceImages && (
                            <TouchableOpacity
                                onPress={pickLogo}
                                activeOpacity={0.9}
                                style={{
                                    backgroundColor: Colors.greenColor,
                                    marginHorizontal: 20,
                                    borderRadius: 10,
                                    padding: 15,
                                    marginBottom: 20,
                                    alignSelf: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        ...Fonts.whiteColor12SemiBold,
                                        textAlign: "center",
                                    }}
                                >
                                    Change Service Image
                                </Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            onPress={__HandleSave}
                            activeOpacity={0.9}
                            style={{
                                backgroundColor: Colors.primaryColor,
                                marginHorizontal: 20,
                                borderRadius: 10,
                                padding: 15,
                                marginBottom: 60,
                            }}
                        >
                            <Text
                                style={{
                                    ...Fonts.whiteColor12SemiBold,
                                    textAlign: "center",
                                }}
                            >
                                Save
                            </Text>
                        </TouchableOpacity>
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
                    Update Ads
                </Text>
            </View>
        );
    }
};

export default ServiceScreen;

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
