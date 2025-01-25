import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { useState } from "react";
const height = Dimensions.get("window").height;
import { MaterialIcons } from "@expo/vector-icons";
import { Sizes, Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";
import { __getToken } from "../../utils/localization";
import Loader from "../../components/loader";

const WebViewBox = ({ navigation, route }) => {
    const [Loading, setLoader] = useState(true);
    const token = __getToken();

    return (
        <View style={{ flex: 1 }}>
            {header()}
            {Loading && <Loader />}
            <ScrollView style={{ height: height, flex: 1 }}>
                <WebView
                    style={{ height: height, flexGrow: 1 }}
                    source={{
                        uri: `https://todo.xidmet.co.in/common/service_charge?Token=${token}`,
                    }}
                    cacheEnabled={true}
                    onNavigationStateChange={(navState) => {
                        if (
                            !navState.url.includes(
                                `https://todo.xidmet.co.in/common/service_charge?Token=${token}`
                            )
                        ) {
                            navigation.goBack();
                        }
                    }}
                    onLoadEnd={() => setLoader(false)}
                    onLoadStart={() => setLoader(true)}
                />
            </ScrollView>
        </View>
    );
    function header() {
        return (
            <View style={styles.headerBox}>
                <MaterialIcons
                    name="arrow-back-ios"
                    size={20}
                    color={Colors.blackColor}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTextOne}>Import Service</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    noNotificationsWrapStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        height: 300,
    },
    headerBox: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        marginBottom: 2,
        elevation: 0.5,
    },
    headerTextOne: {
        lineHeight: 25.0,
        marginLeft: Sizes.fixPadding - 5.0,
        ...Fonts.blackColor18SemiBold,
    },
});

export default WebViewBox;
