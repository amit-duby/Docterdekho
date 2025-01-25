import React, { useEffect, useState } from "react";
import {
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import Carousel, { Pagination } from "react-native-snap-carousel-v4";
import { Dimensions } from "react-native";
import { __getApiData, BASE_URL } from "../../utils/api";
const { width, height } = Dimensions.get("window");

const appNoBannerImage = [];
const RenderItem = React.memo(({ item }) => {
    return (
        <Image
            source={{ uri: item.url }}
            style={{
                height: 130,
                resizeMode: "cover",
            }}
        ></Image>
    );
});

const BannerScreen = ({ navigation }) => {
    const [state, setState] = useState({
        bannerList: appNoBannerImage,
        activeSlide: 0,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { bannerList, activeSlide } = state;

    useEffect(() => {
        __getApiData(`api/home/banner`)
            .then((res) => {
                if (res.response.response_code == "200") {
                    return updateState({
                        bannerList: res.data.map((item) => ({
                            url: BASE_URL + item.image,
                        })),
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return <>{bannerSlider()}</>;

    function bannerSlider() {
        return (
            <View
                style={{
                    backgroundColor: Colors.whiteColor,
                    paddingBottom: 20,
                    paddingTop: 5,
                }}
            >
                <Carousel
                    data={bannerList}
                    sliderWidth={width}
                    itemWidth={width}
                    renderItem={({ item }) => <RenderItem item={item} />}
                    showsHorizontalScrollIndicator={false}
                    onSnapToItem={(index) =>
                        updateState({ activeSlide: index })
                    }
                    autoplay={true}
                    loop={true}
                    autoplayInterval={4000}
                />
                {pagination()}
            </View>
        );
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={bannerList.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.sliderPaginationWrapStyle}
                dotStyle={styles.sliderActiveDotStyle}
                inactiveDotStyle={styles.sliderInactiveDotStyle}
            />
        );
    }
};

const styles = StyleSheet.create({
    sliderActiveDotStyle: {
        width: 8,
        height: 8,
        borderRadius: 6.0,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding - 25.0,
    },
    sliderInactiveDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 7.5,
        backgroundColor: Colors.grayColor,
    },
    sliderPaginationWrapStyle: {
        position: "absolute",
        bottom: -22.0,
        left: 0.0,
        right: 0.0,
    },
    bannerSliderInfoWrapStyle: {
        height: 170.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: "rgba(0,0,0,0.25)",
    },
    bannerNewsViewsCommentsDateInfoWrapStyle: {
        marginVertical: Sizes.fixPadding - 5.0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export default BannerScreen;
