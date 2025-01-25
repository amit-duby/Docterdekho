import React, { useEffect, useState } from "react";
import { __getUser } from "../../utils/localization";
import { __getApiData } from "../../utils/api";
import axios from "axios";
import { Text, TouchableOpacity, View } from "react-native";
import RenderHtml from "react-native-render-html";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const OfferDetails = ({ navigation, route }) => {
    const [state, setState] = useState({ content: "", isLoading: false });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isLoading, content } = state;
    const __handleGetDashboard = async (value) => {
        updateState({ isLoading: true });

        const response = await axios.get(
            route.params?.url + "?id=" + __getUser().id
        );
        updateState({ isLoading: false, content: response.data });
    };
    useEffect(() => {
        __handleGetDashboard();
    }, [route.params?.url]);

    return (
        <View>
            <View style={{}}>
                <RenderHtml
                    contentWidth={400}
                    source={{
                        html: content,
                    }}
                    tagsStyles={{
                        body: {
                            ...Fonts.blackColor14Regular,
                        },
                    }}
                />
            </View>
            <TouchableOpacity
                onPress={() => navigation.push("MainDrawer")}
                style={{
                    backgroundColor: Colors.primaryColor,
                    padding: 15,
                    margin: 10,
                    borderRadius: 10,
                    marginTop: 60,
                }}
            >
                <Text
                    style={{ ...Fonts.whiteColor14Medium, textAlign: "center" }}
                >
                    Go to Home
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default OfferDetails;
