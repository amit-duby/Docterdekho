import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Overlay } from "@rneui/themed";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import ProfileComOne from "./profileComOne";
import ProfileComTwo from "./profileComTwo";
import { __getUserType, __setUser } from "../../utils/localization";
import ProfileComThree from "./profileComThree";
import {
    __getApiData,
    __postApiData,
    __postApiDataFormData,
    __postApiMultiFileData,
    BASE_URL,
} from "../../utils/api";
import Loader from "../../components/loader";
import Loader2 from "../../components/Loader2";
const { width, height } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";
import AddService from "./AddService";
import InfoAlert from "../../components/alert/infoAlert";

const ProfileScreen = ({ navigation, route }) => {
    const [detailstate, setState] = useState({
        showBottomSheet: false,
        tab: route?.params?.tab || 1,
        isLoading: false,
        isLoading1: false,
        isShowAdd: false,

        isRefress: false,
        showinfo: "",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        isLoading1,
        tab,
        isLoading,
        profile,
        logo,
        name,
        gender,
        state_id,
        city_id,
        pincode,
        farm_name,
        farm_registration,
        isShowAdd,
        isRefress,
        about_user,
        farm_phone_no,
        farm_address,
        working_days,
        working_time,
        discount,
        category,
        sub_category,
        showinfo,
    } = detailstate;

    const __handleGetProfile = () => {
        updateState({ isLoading1: true });

        __getApiData("api/user")
            .then((res) => {
                console.log(res);
                if (res.response.response_code == "200") {
                    updateState({
                        ...res.data.user,
                        isLoading1: false,
                    });
                    __setUser({ ...res.data.user });
                } else {
                    updateState({ isLoading1: false });
                }
            })
            .catch((error) => {
                updateState({ isLoading1: false });
            });
    };

    useEffect(() => {
        __handleGetProfile();
    }, []);

    const __hanldeSaveProfile = () => {
        updateState({ isLoading: true });

        __postApiData("api/user/update_profile", {
            ...detailstate,
        })
            .then((res) => {
                console.log(res);
                if (res.response.response_code == "200") {
                    updateState({ isLoading: false });
                    return updateState({
                        showinfo: res.response.response_message,
                    });
                } else {
                    updateState({ isLoading: false });
                    Alert.alert("", res.response.response_message);
                }
            })
            .catch((error) => {
                console.log(error);
                updateState({ isLoading: false });
            });
    };
    const pickImage = async () => {
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
                aspect: [4, 4],
                quality: 1,
            });
            if (!result.canceled) {
                HandleUloadImage(result.assets[0].uri);
            }
        } catch (error) {}
    };
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
                aspect: [4, 4],
                quality: 1,
            });
            if (!result.canceled) {
                HandleUloadLogo(result.assets[0].uri);
            }
        } catch (error) {}
    };

    const HandleUloadLogo = (uri) => {
        try {
            console.log(uri);
            updateState({ isLoading: true });

            const formData = new FormData();
            formData.append("logo", {
                uri,
                type: "image/jpeg",
                name: "image.jpg",
            });

            __postApiDataFormData("api/user/update_logo", formData)
                .then((res) => {
                    console.log(res);
                    __handleGetProfile();
                    updateState({ isLoading: false });
                })
                .catch((error) => {
                    console.log(error);
                    updateState({ isLoading: false });
                });
        } catch (error) {
            console.log(error);
            updateState({ isLoading: false });
        }
    };
    const HandleUloadImage = (uri) => {
        try {
            console.log(uri);
            updateState({ isLoading: true });

            const formData = new FormData();
            formData.append("profile", {
                uri,
                type: "image/jpeg",
                name: "image.jpg",
            });

            __postApiDataFormData("api/user/update_image", formData)
                .then((res) => {
                    console.log(res);
                    __handleGetProfile();
                    updateState({ isLoading: false });
                })
                .catch((error) => {
                    console.log(error);
                    updateState({ isLoading: false });
                });
        } catch (error) {
            console.log(error);
            updateState({ isLoading: false });
        }
    };

    useEffect(() => {
        isRefress && updateState({ isRefress: false });
    }, [isRefress]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
                barStyle={"light-content"}
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
            {isLoading1 ? <Loader /> : null}
            {isLoading ? <Loader2 /> : null}
            {isShowAdd ? <AddService updateParentState={updateState} /> : null}

            <ImageBackground
                source={require("../../assets/images/greens.png")}
                style={{ flex: 1 }}
            >
                {header()}
                {profilePic()}

                {__getUserType() == "2" && tabs()}
                {tab == 1 && (
                    <ProfileComOne
                        detailstate={detailstate}
                        parantUpdateState={updateState}
                    />
                )}
                {tab == 2 && (
                    <ProfileComTwo
                        detailstate={detailstate}
                        parantUpdateState={updateState}
                    />
                )}
                {/* {tab == 3 && !isRefress && (
                    <ProfileComThree
                        navigation={navigation}
                        updateLoading={(value) =>
                            updateState({ isLoading: value })
                        }
                        showMessage={(value) =>
                            updateState({ showinfo: value })
                        }
                    />
                )} */}
            </ImageBackground>
        </SafeAreaView>
    );

    function tabs(params) {
        return (
            <View
                style={{
                    borderWidth: 0.5,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    height: 45,
                    marginTop: Sizes.fixPadding * 2.0,
                    flexDirection: "row",
                    borderRadius: 5,
                    overflow: "hidden",
                }}
            >
                <TouchableOpacity
                    style={{
                        height: "100%",
                        width: "50%",
                        borderRightWidth: 0.5,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                            tab == 1 ? Colors.primaryColor : Colors.whiteColor,
                    }}
                    onPress={() => updateState({ tab: 1 })}
                    activeOpacity={0.7}
                >
                    <Text
                        style={
                            tab == 1
                                ? { ...Fonts.whiteColor12SemiBold }
                                : {
                                      ...Fonts.whiteColor12SemiBold,
                                      color: Colors.blackColor,
                                  }
                        }
                    >
                        Basic
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        height: "100%",
                        width: "50%",
                        borderRightWidth: 0.5,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                            tab == 2 ? Colors.primaryColor : Colors.whiteColor,
                    }}
                    onPress={() => updateState({ tab: 2 })}
                    activeOpacity={0.7}
                >
                    <Text
                        style={
                            tab == 2
                                ? { ...Fonts.whiteColor12SemiBold }
                                : {
                                      ...Fonts.whiteColor12SemiBold,
                                      color: Colors.blackColor,
                                  }
                        }
                    >
                        Professional
                    </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    style={{
                        height: "100%",
                        width: "33.4%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                            tab == 3 ? Colors.primaryColor : Colors.whiteColor,
                    }}
                    onPress={() => updateState({ tab: 3 })}
                    activeOpacity={0.7}
                >
                    <Text
                        style={
                            tab == 3
                                ? { ...Fonts.whiteColor12SemiBold }
                                : {
                                      ...Fonts.whiteColor12SemiBold,
                                      color: Colors.blackColor,
                                  }
                        }
                    >
                        Plans
                    </Text>
                </TouchableOpacity> */}
            </View>
        );
    }

    function profilePic() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                }}
            >
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={
                            profile
                                ? {
                                      uri: BASE_URL + profile,
                                  }
                                : require("../../assets/images/user.png")
                        }
                        style={{
                            width: 100.0,
                            height: 100.0,
                            borderRadius: 50.0,
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.99}
                        onPress={() => pickImage()}
                        style={styles.changeProfilePicButtonStyle}
                    >
                        <MaterialIcons
                            name="camera-alt"
                            color={Colors.whiteColor}
                            size={14}
                        />
                        <Text
                            style={{
                                lineHeight: 14.0,
                                marginLeft: Sizes.fixPadding - 5.0,
                                ...Fonts.whiteColor12Medium,
                                textAlign: "center",
                            }}
                        >
                            Change profile
                        </Text>
                    </TouchableOpacity>
                </View>
                {__getUserType() == "2" && (
                    <View style={{ alignItems: "center" }}>
                        <Image
                            source={
                                logo
                                    ? {
                                          uri: BASE_URL + logo,
                                      }
                                    : require("../../assets/images/user.png")
                            }
                            style={{
                                width: 100.0,
                                height: 100.0,
                                borderRadius: 50.0,
                            }}
                        />
                        <TouchableOpacity
                            activeOpacity={0.99}
                            onPress={() => pickLogo()}
                            style={styles.changeProfilePicButtonStyle}
                        >
                            <MaterialIcons
                                name="camera-alt"
                                color={Colors.whiteColor}
                                size={14}
                            />
                            <Text
                                style={{
                                    lineHeight: 14.0,
                                    marginLeft: Sizes.fixPadding - 5.0,
                                    ...Fonts.whiteColor12Medium,
                                }}
                            >
                                Change{"\n"}logo
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }

    function header() {
        return (
            <View
                style={{
                    margin: Sizes.fixPadding * 2.0,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {route.params?.isShowDashboard ? (
                    <></>
                ) : (
                    <MaterialIcons
                        name="arrow-back-ios"
                        size={20}
                        color={Colors.whiteColor}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                )}
                <Text
                    style={{
                        lineHeight: 25.0,
                        marginLeft: Sizes.fixPadding - 5.0,
                        ...Fonts.blackColor18SemiBold,
                        color: Colors.whiteColor,
                    }}
                >
                    Edit Profile
                </Text>

                {tab != 3 ? (
                    <TouchableOpacity
                        onPress={() => {
                            if (tab == 1) {
                                __hanldeSaveProfile({
                                    name,
                                    gender,
                                    state_id,
                                    city_id,
                                    pincode,
                                });
                            } else if (tab == 2) {
                                __hanldeSaveProfile({
                                    farm_name,
                                    farm_registration,
                                    about_user,
                                    farm_phone_no,
                                    farm_address,
                                    working_days,
                                    working_time,
                                    discount,
                                    category,
                                    sub_category,
                                });
                            }
                        }}
                        style={{
                            position: "absolute",
                            right: 10,
                            backgroundColor: Colors.primaryColor,
                            padding: 5,
                            borderRadius: 10,
                            paddingHorizontal: 20,
                        }}
                    >
                        <Text
                            style={{
                                lineHeight: 25.0,
                                ...Fonts.primaryColor16SemiBold,
                                color: Colors.whiteColor,
                            }}
                        >
                            Save Now
                        </Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    changeProfilePicButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 2.0,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1.0,
        borderColor: Colors.whiteColor,
        elevation: 0.5,
        position: "absolute",
        bottom: 0.0,
        paddingHorizontal: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 8.0,
    },

    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: Sizes.fixPadding + 5.0,
        paddingTop: Sizes.fixPadding + 10.0,
        margin: Sizes.fixPadding * 2.0,
    },
    changeProfilePicBottomSheetStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding + 5.0,
    },
    changeProfilePicOptionsIconWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomSheetStyle: {
        width: "100%",
        position: "absolute",
        bottom: 0.0,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: 0.0,
        paddingVertical: 0.0,
    },
});

export default ProfileScreen;
