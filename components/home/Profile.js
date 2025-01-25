import React, { useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Text, View } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { __postApiData } from "../../utils/api";
const { width } = Dimensions.get("window");
const Profile = () => {
    const [state, setState] = useState({
        isShow: false,
        percent: 0,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { percent, isShow } = state;

    const __handleGetData = () => {
        __postApiData(`api/user/profile_status`, {})
            .then((res) => {
                if (res.response.response_code == "200") {
                    updateState({
                        percent: res.data.complete,
                        isShow: res.data.complete == 100 ? false : true,
                    });
                }
            })
            .catch((error) => {});
    };

    useEffect(() => {
        __handleGetData();
    }, []);
    return (
        <>
            {isShow ? (
                <View
                    style={{
                        marginBottom: Sizes.fixPadding,
                        marginTop: Sizes.fixPadding * 2.0,
                        height: 100,
                        flex: 1,
                        borderRadius: 10,
                    }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={["#ffdede", "#FFEDD2"]}
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            borderRadius: 10,
                        }}
                    >
                        <Text
                            style={{
                                width: width - 140,
                                height: "100%",
                                paddingVertical: 10,
                                paddingLeft: 15,
                                textAlign: "justify",
                                ...Fonts.orangeColorBold,
                                color: Colors.blackColor,
                                fontSize: 11,
                            }}
                        >
                            Please Update your profile for better service and
                            increase your visibility to client.
                        </Text>
                        <View
                            style={{
                                width: 100,
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <View style={{ alignItems: "center" }}>
                                <Progress.Circle
                                    size={60}
                                    thickness={5}
                                    progress={percent / 100}
                                    unfilledColor="#D5D5D5"
                                    borderWidth={0.0}
                                    color={Colors.primaryColor}
                                />
                                <Text
                                    style={{
                                        position: "absolute",
                                        bottom: 17.0,
                                        ...Fonts.primaryColor16SemiBold,
                                        fontSize: 13,
                                    }}
                                >
                                    {Math.round(percent) + "%"}
                                </Text>
                            </View>
                            <Text
                                style={{
                                    ...Fonts.blackColor13Regular,
                                    fontSize: 10,
                                    marginTop: 5,
                                }}
                            >
                                Complete
                            </Text>
                        </View>
                    </LinearGradient>
                </View>
            ) : null}
        </>
    );
};

export default Profile;
