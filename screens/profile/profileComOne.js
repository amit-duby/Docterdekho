import React, { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
const { width, height } = Dimensions.get("window");
import { Menu, MenuItem } from "react-native-material-menu";
import StateList from "./StateList";
import { __postApiData } from "../../utils/api";
import CityList from "./CityList";
import OtpVerification from "../../components/OtpVerification";
import Loader2 from "../../components/Loader2";
import InfoAlert from "../../components/alert/infoAlert";
import DateTimePicker from "@react-native-community/datetimepicker";
import { __formatDate } from "../../utils/function";
import { __getUserType } from "../../utils/localization";
import {
    MaterialIcons,
    MaterialCommunityIcons,
    Ionicons,
    Foundation,
    Entypo,
} from "@expo/vector-icons";
const ProfileComOne = ({ navigation, detailstate, parantUpdateState }) => {
    const {
        name,
        email,
        phone,
        address,
        gender,
        about_user,
        pincode,
        state_id,
        city_id,
        email_verified_at,
        phone_verified_at,
        dob,
        village,
    } = detailstate;

    const [state, setState] = useState({
        showGenderMenu: false,
        showState: false,
        stateList: [],
        showCity: false,
        cityList: [],
        showOtp: false,
        userid: "",
        type: "",
        otp: "",
        showinfo: "",
        isLoading: false,
        showDatePicker: false,
    });

    const {
        showGenderMenu,
        showState,
        stateList,
        showCity,
        cityList,
        showOtp,
        userid,
        type,
        otp,
        showinfo,
        isLoading,
        showDatePicker,
    } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const __handleGetState = () => {
        __postApiData(`api/home/state/test`, {})
            .then((res) => {
                updateState({
                    stateList: res.data,
                });
            })
            .catch((error) => {});
    };
    const __handleGetCity = (id) => {
        updateState({
            cityList: [],
        });
        __postApiData(`api/home/city/${id}`, {})
            .then((res) => {
                updateState({
                    cityList: res.data,
                });
            })
            .catch((error) => {});
    };

    useEffect(() => {
        __handleGetState();
    }, []);

    useEffect(() => {
        state_id && __handleGetCity(state_id);
    }, [state_id]);

    const __handleVerifyEmailOrMobile = (userid, type) => {
        updateState({
            showOtp: false,
            isLoading: true,
        });
        try {
            __postApiData(`api/home/valid_profile`, { userid, type })
                .then((res) => {
                    if (res.response.response_code == "200") {
                        return updateState({
                            showOtp: true,
                            userid,
                            type,
                            isLoading: false,
                        });
                    }
                    return updateState({
                        showinfo: res.response.response_message,
                        isLoading: false,
                    });
                })
                .catch((error) => {});
        } catch (error) {}
    };
    const __handleVerifyEmailOrMobileOtp = (userid, type, otp) => {
        updateState({
            showOtp: false,
            isLoading: true,
        });
        try {
            __postApiData(`api/home/valid_profile`, { userid, type, otp })
                .then((res) => {
                    if (res.response.response_code == "200") {
                        return updateState({
                            showOtp: false,
                            showinfo: res.response.response_message,
                            isLoading: false,
                        });
                    }

                    return updateState({
                        showOtp: true,
                        isLoading: false,
                        showinfo: res.response.response_message,
                    });
                })
                .catch((error) => {});
        } catch (error) {}
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.whiteColor,
                borderRadius: 10,
                margin: 15,
            }}
        >
            <OtpVerification
                isShow={showOtp}
                __handlSubmit={() => {
                    __handleVerifyEmailOrMobileOtp(userid, type, otp);
                }}
                updateState={updateState}
                __handleResendOtp={() => {
                    __handleVerifyEmailOrMobile(userid, type);
                }}
            />

            {showDatePicker ? (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="datetime"
                    is24Hour={false}
                    display="inline"
                    onChange={(event, selectedDate) => {
                        if (event.type == "set") {
                            updateState({ showDatePicker: false });
                            parantUpdateState({
                                dob: __formatDate(selectedDate),
                            });
                        } else {
                            updateState({ showDatePicker: false });
                        }
                    }}
                />
            ) : null}

            {isLoading ? <Loader2 /> : null}
            {showinfo ? (
                <InfoAlert
                    header2={showinfo}
                    isButton={"Ok"}
                    handleButtonClick={() => {
                        updateState({
                            showinfo: null,
                        });
                    }}
                />
            ) : null}
            <FlatList
                ListHeaderComponent={
                    <>
                        {titile("Contact Details")}
                        {mobileInfo()}
                        {emailInfo()}
                        {titile("General Details")}
                     
                        {fullNameInfo()}
                        {dobAndGender()}
                        {stateInfo()}
                        {cityInfo()}
                        {pinCodeInfo()}
                        <View
                            style={{
                                marginTop: Sizes.fixPadding + 5.0,
                                marginHorizontal: Sizes.fixPadding * 2.0,
                            }}
                        >
                            <Text style={{ ...Fonts.grayColor14Regular }}>
                                Address
                            </Text>
                            <TextInput
                                placeholder=" "
                                value={address}
                                onChangeText={(value) =>
                                    parantUpdateState({ address: value })
                                }
                                style={{ ...styles.textFieldStyle }}
                                selectionColor={Colors.primaryColor}
                            />
                        </View>
                    </>
                }
            />

            <StateList
                showState={showState}
                updateParentState={updateState}
                parantUpdateState={parantUpdateState}
                stateList={stateList}
                state_id={state_id}
            />
            <CityList
                showCity={showCity}
                updateParentState={updateState}
                parantUpdateState={parantUpdateState}
                cityList={cityList}
                city_id={city_id}
                state_id={state_id}
            />
        </SafeAreaView>
    );

    function titile(name) {
        return (
            <View style={{ marginTop: 20 }}>
                <Text
                    style={{
                        ...Fonts.primaryColor14Regular,
                        textAlign: "center",
                        textTransform: "uppercase",
                    }}
                >
                    {name}
                </Text>
            </View>
        );
    }
    function dobAndGender() {
        return (
            <View style={{ flexDirection: "row" }}>
                {/* <TouchableOpacity
                    onPress={() => {
                        updateState({ showDatePicker: true });
                    }}
                    activeOpacity={0.9}
                    style={{
                        marginTop: Sizes.fixPadding + 5.0,
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingRight: Sizes.fixPadding - 5.0,
                        width: width / 2,
                    }}
                >
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Date of Birth
                    </Text>
                    <TextInput
                        placeholder="Select DOB"
                        value={dob}
                        style={{ ...styles.textFieldStyle }}
                        selectionColor={Colors.primaryColor}
                        editable={false}
                    />
                </TouchableOpacity> */}

                <Menu
                    visible={showGenderMenu}
                    style={{}}
                    anchor={
                        <>
                            <TouchableOpacity
                                style={{
                                    marginTop: Sizes.fixPadding + 5.0,
                                    paddingRight: Sizes.fixPadding * 2.0,
                                    paddingLeft: Sizes.fixPadding * 2.0,
                                    width: width,
                                }}
                                onPress={() =>
                                    updateState({ showGenderMenu: true })
                                }
                            >
                                <Text style={{ ...Fonts.grayColor14Regular }}>
                                    Gender
                                </Text>
                                <TextInput
                                    placeholder="Select Gender"
                                    value={gender}
                                    style={{ ...styles.textFieldStyle }}
                                    selectionColor={Colors.primaryColor}
                                    editable={false}
                                />
                            </TouchableOpacity>
                        </>
                    }
                    onRequestClose={() =>
                        updateState({ showGenderMenu: false })
                    }
                >
                    <MenuItem
                        textStyle={{
                            ...Fonts.blackColor16Regular,
                        }}
                        onPress={() => {
                            parantUpdateState({ gender: "male" });
                            updateState({ showGenderMenu: false });
                        }}
                    >
                        male
                    </MenuItem>
                    <MenuItem
                        textStyle={{
                            ...Fonts.blackColor16Regular,
                        }}
                        onPress={() => {
                            parantUpdateState({ gender: "female" });
                            updateState({ showGenderMenu: false });
                        }}
                    >
                        female
                    </MenuItem>
                </Menu>
            </View>
        );
    }

    function stateInfo() {
        return (
            <TouchableOpacity
                onPress={() => {
                    updateState({ showState: true });
                }}
                activeOpacity={1}
                style={{
                    marginTop: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                <Text style={{ ...Fonts.grayColor14Regular }}>State</Text>
                <TextInput
                    placeholder="Select State"
                    value={
                        state_id
                            ? stateList.find(
                                  (data) => data.state_id == state_id
                              )?.state_name
                            : ""
                    }
                    style={{ ...styles.textFieldStyle }}
                    selectionColor={Colors.primaryColor}
                    editable={false}
                />
            </TouchableOpacity>
        );
    }
    function cityInfo() {
        return (
            <TouchableOpacity
                onPress={() => {
                    updateState({ showCity: true });
                }}
                activeOpacity={1}
                style={{
                    marginTop: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                <Text style={{ ...Fonts.grayColor14Regular }}>City</Text>
                <TextInput
                    placeholder="Select City"
                    value={
                        city_id
                            ? cityList.find((data) => data.city_id == city_id)
                                  ?.city_name
                            : ""
                    }
                    style={{ ...styles.textFieldStyle }}
                    selectionColor={Colors.primaryColor}
                    editable={false}
                />
            </TouchableOpacity>
        );
    }
    function pinCodeInfo() {
        return (
            <View
                style={{
                    marginTop: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                <Text style={{ ...Fonts.grayColor14Regular }}>PinCode</Text>
                <TextInput
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChangeText={(value) =>
                        parantUpdateState({ pincode: value })
                    }
                    style={{ ...styles.textFieldStyle }}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        );
    }

    function mobileInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Mobile Number
                </Text>

                <View style={{ flexDirection: "row", gap: 5 }}>
                    <View
                        style={{
                            ...styles.textFieldStyle,
                            flex: 1,
                            flexDirection: "row",
                        }}
                    >
                        <TextInput
                            placeholder="Enter Mobile Number"
                            value={phone}
                            // onChangeText={(value) =>
                            //     parantUpdateState({ phone: value })
                            // }
                            style={{ flex: 1, ...Fonts.blackColor14Medium }}
                            selectionColor={Colors.primaryColor}
                            keyboardType="number-pad"
                        />

                        {phone_verified_at == "1" ? (
                            <MaterialIcons
                                name="verified"
                                size={25}
                                color={Colors.greenColor}
                                style={{}}
                            />
                        ) : null}
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.primaryColor,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() =>
                            __handleVerifyEmailOrMobile(phone, "phone")
                        }
                    >
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Verify
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function emailInfo() {
        return (
            <View
                style={{
                    marginVertical: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Email Address
                </Text>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <View
                        style={{
                            ...styles.textFieldStyle,
                            flex: 1,
                            flexDirection: "row",
                        }}
                    >
                        <TextInput
                            placeholder="Enter EmailAddress"
                            value={email}
                            onChangeText={(value) =>
                                parantUpdateState({ email: value })
                            }
                            style={{ flex: 1, ...Fonts.blackColor14Medium }}
                            selectionColor={Colors.primaryColor}
                            keyboardType="email-address"
                        />
                        {email_verified_at == "1" ? (
                            <MaterialIcons
                                name="verified"
                                size={25}
                                color={Colors.greenColor}
                                style={{}}
                            />
                        ) : null}
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            __handleVerifyEmailOrMobile(email, "email")
                        }
                        style={{
                            backgroundColor: Colors.primaryColor,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Verify
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function fullNameInfo() {
        return (
            <View
                style={{
                    marginTop: Sizes.fixPadding,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                <Text style={{ ...Fonts.grayColor14Regular }}>Full Name</Text>
                <TextInput
                    placeholder="Enter Name"
                    value={name}
                    onChangeText={(value) => parantUpdateState({ name: value })}
                    style={{ ...styles.textFieldStyle }}
                    selectionColor={Colors.primaryColor}
                />
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
    textFieldStyle: {
        ...Fonts.blackColor14Medium,
        lineHeight: 16.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        borderWidth: 1.0,
        borderColor: Colors.lightGrayColor,
        marginBottom:10
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

export default ProfileComOne;
