
import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    Linking,
    Alert,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Colors, Fonts } from "../constants/styles";
import { __checkLogin } from "../utils/localization";
import { __postApiData } from "../utils/api";
import Loader2 from "./Loader2";

const BottomButton = ({ navigation, admin = false, client_id = 1 }) => {
    const [state, setState] = useState({
        currentIndex: 1,
        isLoading: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { currentIndex, isLoading } = state;
    

        const handleCall = () => {
            if (!__checkLogin()) {
                // If not logged in, show login page
                return navigation.push("Login");
            }

        updateState({ isLoading: true });
        __postApiData(`api/home/actionlog`, {
            client_id: client_id,
            action_type: "Call",
        })
            .then((res) => {
                updateState({ isLoading: false });

                console.log(res);
                if (res.response.response_code == "200"){
                    let phoneUrl = `tel:${res.data.number}`;
                    return Linking.openURL(phoneUrl);
                }

                Alert.alert("", res.response.response_message);
            })
            .catch((error) => {
                updateState({ isLoading: false });

                console.log(error);
            });
    };
    const handleWhatsApp = () => {
        updateState({ isLoading: true });
        __postApiData(`api/home/actionlog`, {
            client_id: client_id,
            action_type: "Whatspp",
        })
            .then((res) => {
                updateState({ isLoading: false });

                console.log(res);
                if (res.response.response_code == "200") {
                    let url = `whatsapp://send?phone=${res.data.number}`;

                    Linking.openURL(url);
                    return;
                }

                Alert.alert("", res.response.response_message);
            })
            .catch((error) => {
                updateState({ isLoading: false });

                console.log(error);
            });
    };

    return (
        <>
            {isLoading && <Loader2 />}
            <View style={styles.bottomTabBarStyle}>
                {bottomTabBarItem({
                    index: 1,
                    title: "Call",
                    onPress: () => handleCall(),
                })}

                {bottomTabBarItem({
                    index: 2,
                    title: "Message",
                    onPress: () => {
                        if (client_id == 1) {
                            return navigation.push("HelpAndSupport");
                        }
                        navigation.push("MessageBox", {
                            client_id: client_id,
                        });
                    },
                })}

                {bottomTabBarItem({
                    index: 3,
                    title: "WhatsApp",
                    onPress: () => handleWhatsApp(),
                })}
            </View>
        </>
    );

    function bottomTabBarItem({ index, title, onPress }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ alignItems: "center", width: "33%" }}
                onPress={() => {
                    !__checkLogin() && navigation.push("Login");
                    onPress && onPress();
                }}
            >
                {index == 1 ? (
                    <MaterialIcons
                        name="call"
                        size={28}
                        color={Colors.whiteColor}
                    />
                ) : [2].includes(index) ? (
                    <>
                        <MaterialIcons
                            name="message"
                            size={28}
                            color={Colors.whiteColor}
                        />
                    </>
                ) : (
                    <>
                        <FontAwesome
                            name="whatsapp"
                            size={28}
                            color={Colors.whiteColor}
                        />
                    </>
                )}
                {title && (
                    <Text
                        style={{
                            ...Fonts.primaryColor12Medium,
                            textAlign: "center",
                            color: Colors.whiteColor,
                        }}
                    >
                        {title}
                    </Text>
                )}
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: "absolute",
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 60.0,
        backgroundColor: Colors.primaryColor,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopColor: "rgba(128, 128, 128, 0.1)",
        borderTopWidth: 1.0,
        elevation: 2.0,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 5,
    },
});

export default BottomButton;
