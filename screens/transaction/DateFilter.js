import { Fontisto } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __formatDate } from "../../utils/function";
import { __getApiData, __postApiData } from "../../utils/api";
import { __getUserType } from "../../utils/localization";
const { width } = Dimensions.get("window");
import DateTimePicker from "@react-native-community/datetimepicker";

const DateFilter = ({
    select_date,
    start_date,
    updateState,
    end_date,
    __handleGetData,
}) => {
    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.1)",
                zIndex: 2,
                justifyContent: "center",
            }}
        >
            {select_date ? (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="date"
                    is24Hour={true}
                    display="calendar"
                    onChange={(event, selectedDate) => {
                        if (event.type) {
                            const date = new Date(selectedDate).toISOString();
                            return updateState({
                                [select_date]: date,
                                select_date: null,
                            });
                        }
                        updateState({ select_date: null });
                    }}
                    onTouchCancel={() => {}}
                />
            ) : null}
            <View
                style={{
                    width: width - 40,
                    backgroundColor: Colors.whiteColor,
                    alignSelf: "center",
                    borderRadius: 20,
                    elevation: 3,
                    overflow: "hidden",
                    padding: 20,
                }}
            >
                <Text style={{ ...Fonts.blackColor13Regular }}>Start Date</Text>

                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: Colors.lightGray,
                        padding: 10,
                        borderRadius: 10,
                        flexDirection: "row",
                    }}
                >
                    <Text style={{ ...Fonts.blackColor13Medium, flex: 1 }}>
                        {start_date ? __formatDate(start_date) : ""}
                    </Text>
                    <Fontisto
                        name="date"
                        size={18}
                        color={Colors.blackColor}
                        onPress={() => {
                            updateState({ select_date: "start_date" });
                        }}
                    />
                </View>
                <Text style={{ ...Fonts.blackColor13Regular }}>End Date</Text>

                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: Colors.lightGray,
                        padding: 10,
                        borderRadius: 10,
                        flexDirection: "row",
                    }}
                >
                    <Text style={{ ...Fonts.blackColor13Medium, flex: 1 }}>
                        {end_date ? __formatDate(end_date) : ""}
                    </Text>
                    <Fontisto
                        name="date"
                        size={18}
                        color={Colors.blackColor}
                        onPress={() => {
                            updateState({ select_date: "end_date" });
                        }}
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            borderWidth: 0.5,
                            borderColor: Colors.lightGray,
                            padding: 10,
                            borderRadius: 10,
                            alignSelf: "center",
                            width: 130,
                            marginTop: 20,
                            backgroundColor: Colors.primaryColor,
                        }}
                        onPress={() => {
                            updateState({
                                start_date: null,
                                end_date: null,
                                show_date: false,
                            });
                            __handleGetData("clean");
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.whiteColor14Medium,
                                textAlign: "center",
                            }}
                        >
                            Clean
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 0.5,
                            borderColor: Colors.lightGray,
                            padding: 10,
                            borderRadius: 10,
                            alignSelf: "center",
                            width: 130,
                            marginTop: 20,
                            backgroundColor: Colors.primaryColor,
                        }}
                        onPress={() => {
                            __handleGetData();
                            updateState({
                                show_date: false,
                            });
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.whiteColor14Medium,
                                textAlign: "center",
                            }}
                        >
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default DateFilter;
