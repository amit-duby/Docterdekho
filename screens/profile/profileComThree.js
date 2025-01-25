import React, { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Linking,
    StyleSheet,
    View,
    TouchableOpacity,
    RefreshControl,
    Alert,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Text } from "react-native";
import {
    __getApiData,
    __postApiData,
    __postApiDataFormData,
} from "../../utils/api";
import { __generateRandomString } from "../../utils/function";
import { __getUser } from "../../utils/localization";
const { width } = Dimensions.get("window");
import RenderHtml from "react-native-render-html";
import Loader from "../../components/loader";
import Loader2 from "../../components/Loader2";
import InfoAlert from "../../components/alert/infoAlert";

const ProfileComThree = ({ navigation, updateLoading, showMessage }) => {
    const [arrayState, setArrayState] = useState([]);

    const [refreshing, setRefreshing] = useState(false);
    const [state, setState] = useState({
        showinfo: "",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { showinfo } = state;
    const __handleGet = () => {
        updateLoading(true);
        __getApiData("api/home/packages")
            .then((res) => {
                if (res.response.response_code == "200") {
                    setArrayState(res.data);
                }
                updateLoading(false);
            })
            .catch((error) => {
                updateLoading(false);
            });
    };
    const __handleUpdatePlan = (id) => {
        try {
            console.log("first", id);
            updateLoading(true);
            __postApiData("api/User/update_package", {
                package: id,
                update_plan: "yes",
            })
                .then((res) => {
                    console.log(res);
                    updateLoading(false);

                    if (res.response.response_code == "200") {
                        return showMessage(res.response.response_message);
                    }
                    Alert.alert("", res.response.response_message);
                })
                .catch((error) => {
                    updateLoading(false);
                });
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        __handleGet();
    }, []);

    const RenderBox = React.memo(({ item }) => {
        return (
            <View
                style={{
                    gap: 5,
                    borderWidth: 1,
                    marginHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                    borderColor: Colors.lightGrayColor,
                }}
            >
                <Text
                    style={{
                        ...Fonts.blackColor13Medium,
                        paddingHorizontal: 10,
                    }}
                >
                    {item.name}
                </Text>
                <Text
                    style={{
                        ...Fonts.primaryColor16SemiBold,
                        fontSize: 20,
                        paddingHorizontal: 10,
                    }}
                >
                    ₹ {item.price}
                </Text>
                <RenderHtml
                    contentWidth={100}
                    source={{
                        html: item.description,
                    }}
                    tagsStyles={{
                        body: {
                            ...Fonts.blackColor14Regular,
                        },
                    }}
                />

                <TouchableOpacity
                    onPress={() => __handleUpdatePlan(item.id)}
                    style={{
                        width: "80%",
                        backgroundColor: Colors.primaryColor,
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 8,
                        borderRadius: 10,
                    }}
                >
                    <Text style={{ ...Fonts.whiteColor12Medium }}>
                        Select Plan
                    </Text>
                </TouchableOpacity>
            </View>
        );
    });

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.whiteColor,
                borderRadius: 10,
                margin: 15,
            }}
        >
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
            {refreshing ? <Loader2 /> : null}
            <FlatList
                data={arrayState}
                keyExtractor={(item) => `${item.name}`}
                renderItem={({ item, index }) => <RenderBox item={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    paddingTop: 10,
                    paddingBottom: 80,
                }}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,
                }}
                initialNumToRender={2}
                maxToRenderPerBatch={2}
                windowSize={1}
                scrollEnabled={true}
            />
        </View>
    );
};

export default ProfileComThree;
