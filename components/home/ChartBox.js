import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { BarChart } from "react-native-chart-kit";
import { AntDesign } from "@expo/vector-icons";
import { __postApiData } from "../../utils/api";
import Loader3 from "../Loader3";
import { __getCurrentFinancialYear } from "../../utils/function";

const { width } = Dimensions.get("window");
const data = {
    labels: [],
    datasets: [
        {
            data: [],
        },
    ],
};

const chartConfig = {
    backgroundGradientFrom: Colors.whiteColor,
    backgroundGradientTo: Colors.whiteColor,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 1,
    barPercentage: 0.4,
    fillShadowGradient: "#4667D5",
    fillShadowGradientOpacity: 1,
    propsForBackgroundLines: {
        strokeWidth: 0,
    },
    decimalPlaces: 0,
};
const ChartBox = () => {
    const [state, setState] = useState({
        isLoading: false,
        showinfo: data,
        year: __getCurrentFinancialYear(),
        total: null,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const { isLoading, showinfo, year, total } = state;
    const __handleUpdateService = () => {
        updateState({
            isLoading: true,
            total: null,
        });
        __postApiData(`api/booking/dashboard`, { year: year })
            .then((res) => {
                if (res.response.response_code == "200") {
                    const total = res.data?.datasets[0]?.data.reduce(
                        (total, count) => total + Number(count),
                        0
                    );
                    updateState({
                        showinfo: res.data,
                        isLoading: false,
                        total: total || 0,
                    });
                } else {
                    updateState({
                        isLoading: false,
                    });
                }
            })
            .catch((error) => {
                updateState({
                    isLoading: false,
                });
            });
    };

    useEffect(() => {
        __handleUpdateService();
    }, [year]);

    return (
        <>
            <View style={styles.chartInfoContentStyle}>
                <View
                    style={{
                        marginBottom: Sizes.fixPadding,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: width - 40,
                    }}
                >
                    <View>
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                            Overview
                        </Text>
                        {total ? (
                            <Text
                                style={{
                                    ...Fonts.blackColor16SemiBold,
                                    marginTop: Sizes.fixPadding - 6.0,
                                }}
                            >
                                {total}
                                <Text
                                    style={{
                                        ...Fonts.grayColor12Regular,
                                        fontSize: 10,
                                    }}
                                >
                                    (booking)
                                </Text>
                            </Text>
                        ) : null}
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "flex-end",
                        }}
                    >
                        <AntDesign
                            name={"leftcircle"}
                            size={25}
                            color={Colors.primaryColor}
                            onPress={() => {
                                updateState({ year: year - 1 });
                            }}
                        />
                        <View style={{ alignItems: "center" }}>
                            <Text
                                style={{
                                    ...Fonts.grayColor12Regular,
                                    fontSize: 12,
                                }}
                            >
                                F.Y.
                            </Text>
                            <Text
                                style={{
                                    ...Fonts.grayColor12Regular,
                                    fontSize: 12,
                                }}
                            >
                                ({year} - {Number(String(year).slice(2, 4)) + 1}
                                )
                            </Text>
                        </View>
                        <AntDesign
                            name={"rightcircle"}
                            size={25}
                            color={Colors.primaryColor}
                            onPress={() => {
                                updateState({ year: year + 1 });
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        width: width - 20.0,
                        alignSelf: "flex-start",
                    }}
                >
                    {isLoading ? (
                        <Loader3 />
                    ) : (
                        <BarChart
                            style={{
                                borderRadius: Sizes.fixPadding,
                            }}
                            data={showinfo}
                            width={width - 25.0}
                            height={250}
                            chartConfig={chartConfig}
                            fromZero={true}
                            verticalLabelRotation={-60}
                            showValuesOnTopOfBars={true}
                        />
                    )}
                </View>
            </View>
        </>
    );
};

export default ChartBox;
const styles = StyleSheet.create({
    chartInfoContentStyle: {
        backgroundColor: Colors.whiteColor,
        marginBottom: Sizes.fixPadding + 5.0,
        alignItems: "center",
        paddingTop: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        borderWidth: 0.5,
        borderColor: Colors.lightGray,
        marginTop: 10,
    },
    chartDetailInfoContentStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 10.0,
    },
});
