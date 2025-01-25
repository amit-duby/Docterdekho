import React, { useState } from "react";
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __formatDate, __setColor } from "../../utils/function";
import { __getApiData, __postApiData } from "../../utils/api";
import { __getUserType } from "../../utils/localization";
const { width } = Dimensions.get("window");
import { Dialog } from "@rneui/themed";
import ServiceList from "./ServiceList";
const AddService = ({ updateParentState }) => {
    const [state, setState] = useState({
        service: "",
        fees: "",
        isShowService: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { service, isShowService, fees } = state;

    const __handleSumit = () => {
        __postApiData("api/service/updateservice", [
            {
                name: service,
                fees: fees,
            },
        ])
            .then((res) => {
                if (res.response.response_code == "200") {
                    updateParentState({ isShowAdd: false, isRefress: true });
                }
                Alert.alert("", res.response.response_message);
            })
            .catch((error) => {});
    };
    return (
        <>
            <Dialog
                isVisible={true}
                onBackdropPress={() => {
                    updateParentState({ isShowAdd: false });
                }}
                animationType="fade"
                backdropStyle={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                }}
                overlayStyle={{
                    width: width - 40,
                    backgroundColor: Colors.whiteColor,
                    alignSelf: "center",
                    borderRadius: 20,
                    position: "relative",
                    maxHeight: 400,
                    minHeight: 100,
                    elevation: 0,
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        ...Fonts.blackColor16Medium,
                        textAlign: "center",
                        borderBottomWidth: 0.4,
                        marginBottom: 20,
                        borderColor: Colors.grayColor,
                        paddingBottom: 5,
                    }}
                >
                    Add & Update Service
                </Text>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        updateState({ isShowService: true });
                    }}
                    style={{
                        marginTop: Sizes.fixPadding,
                    }}
                >
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Service Name
                    </Text>
                    <TextInput
                        placeholder="Select Service"
                        value={service}
                        style={{ ...styles.textFieldStyle }}
                        selectionColor={Colors.primaryColor}
                        editable={false}
                        multiline={true}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        marginTop: Sizes.fixPadding,
                    }}
                >
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Service Fees
                    </Text>
                    <TextInput
                        placeholder="₹"
                        value={fees}
                        onChangeText={(value) => updateState({ fees: value })}
                        style={{ ...styles.textFieldStyle }}
                        selectionColor={Colors.primaryColor}
                        keyboardType="decimal-pad"
                    />
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.primaryColor,
                        padding: 5,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        alignSelf: "center",
                        marginTop: 30,
                    }}
                    onPress={() => __handleSumit()}
                >
                    <Text
                        style={{
                            ...Fonts.whiteColor12Medium,
                            color: Colors.whiteColor,
                            padding: 5,
                        }}
                    >
                        Add
                    </Text>
                </TouchableOpacity>
            </Dialog>
            <ServiceList
                isshow={isShowService}
                updateParentState={updateState}
                service={service}
            />
        </>
    );
};

export default AddService;

const styles = StyleSheet.create({
    textFieldStyle: {
        ...Fonts.blackColor14Medium,
        lineHeight: 16.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        borderWidth: 1.0,
        borderColor: Colors.lightGrayColor,
    },
});
