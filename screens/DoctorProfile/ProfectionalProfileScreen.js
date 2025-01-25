
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,ScrollView,ActivityIndicator
} from "react-native";
import { Fonts, Colors, Sizes, CommonStyles } from "../../constants/styles";
// import MapView, { Marker } from "react-native-maps";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import BottomButton from "../../components/BottomButton";
import { __getApiData,__postApiData } from "../../utils/api";
import Loader3 from "../../components/Loader3";

// Call functionality
// const handleCall = (phoneNumber) => {
//   if (phoneNumber) {
//     const phoneUrl = `tel:${phoneNumber}`;
//     Linking.openURL(phoneUrl).catch((err) => console.error("Error opening phone URL", err));
//   } else {
//     alert("Phone number is not available");
//   }
// };

const ProfectionalProfileScreen = ({ navigation, route,client_id = 1}) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  // const [mapUrl,setMapUrl]=useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [state, setState] = useState({
    currentIndex: 1,
    isLoading: false,
    phoneNumber: null,
});

const updateState = (data) => setState((state) => ({ ...state, ...data }));

 
useEffect(() => {
  updateState({ isLoading: true });
  __postApiData(`api/home/actionlog`, {
      client_id: client_id,
      action_type: "Call",
  })
      .then((res) => {
          updateState({ isLoading: false });

          if (res.response.response_code === "200") {
              const fetchedNumber = res.data.number; // Save the fetched number
              updateState({ phoneNumber: fetchedNumber });
          } else {
              Alert.alert("", res.response.response_message);
          }
      })
      .catch((error) => {
          updateState({ isLoading: false });
          console.error(error);
      });
}, [client_id]); // Run effect when client_id changes

const handleCall = () => {
  if (state.phoneNumber) {
      let phoneUrl = `tel:${state.phoneNumber}`;
      return Linking.openURL(phoneUrl);
  }
};


 
  useEffect(() => {
    fetchProfileData();
  }, [id]);

  const fetchProfileData = () => {
    __getApiData(`/api/Booking/service_detail/${id}`)
      .then((res) => {
        if (res.response.response_code === "200") {
          setProfileData(res.data[0]);
          setLoading(false);
  
          // Check if working_days exists and set it
          if (res.data[0]?.working_days) {
            const days = res.data[0]?.working_days.split(",");
            setAvailableDays(days);
          }
          const mapUrl = res.data[0]?.map_url;
          console.log(mapUrl,'how mapUrl');
          
          if (mapUrl) {
            const coordinates = extractCoordinatesFromUrl(mapUrl);
            console.log(coordinates,"corrdinates")
            if (coordinates) {
              setLatitude(coordinates.latitude);
              setLongitude(coordinates.longitude);
            }
          }
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const extractCoordinatesFromUrl = (url) => {
    const coordinatesPattern = /@([-+]?\d+\.\d+),([-+]?\d+\.\d+)/;
    const match = url.match(coordinatesPattern);
  
    if (match) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
  
      return { latitude, longitude };
    }
   return null;
  };

  //ActivityIndicator
  // if (loading) {
  //   return (
  //     <View >
  //      <Loader3/>
  //     </View>
  //   );
  // }


  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          ...styles.facilitiesContainerStyle,
          marginTop: item.id == "1" ? Sizes.fixPadding + 5.0 : 0.0,
        }}
      >
        <Feather name="check" size={17} color="black" />
        <Text style={{ ...Fonts.blackRegular, marginLeft: Sizes.fixPadding }}>
          {item.facility}
        </Text>
      </View>
    );
  };

  // Header Section
  function header() {
    return (
      <View style={styles.headerStyle}>
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          color={Colors.whiteColor}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitleStyle}>Doctor Profile</Text>
      </View>
    );
  }

  // Profile Information Section
  function labInfo() {
    return (
      <View style={styles.labInfoContainerStyle}>
        <Image
         source={
          profileData?.profile?{
            uri: `https://cloudvpsserver.com/doctordekho${profileData?.profile}`,
          }
         :require("../../assets/images/user.png")
        }
          style={styles.profileImage}
          resizeMode="cover"
        />
        <View style={styles.profileInfoContainer}>
          <Text style={styles.doctorName}>
            {profileData?.name}
          </Text>
          <Text style={styles.specialityText}>
            {profileData?.category} ({profileData?.sub_category})
          </Text>
          <View style={{ flexDirection: "row", gap: 15, marginTop: 3, marginBottom: -4 }}>
            {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => handleCall(profileData?.farm_phone_no)}>
                <Image
                  source={require("../../assets/images/icons/calls.png")}
                  style={{ width: 15.0, height: 15, resizeMode: "contain", marginRight: 3 }}
                />
              </TouchableOpacity>
              <Text style={{ ...Fonts.blackColor12Medium }}>
                {profileData?.farm_phone_no}
              </Text>
            </View> */}

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => handleCall(profileData?.phone)}>
                <Image
                  source={require("../../assets/images/icons/calls.png")}
                  style={{ width: 15.0, height: 15, resizeMode: "contain", marginRight: 3 }}
                />
              </TouchableOpacity>
              <Text style={{ ...Fonts.blackColor12Medium }}>
                {/* {profileData?.phone} */}
                {state.phoneNumber
                                    ? state.phoneNumber
                                    : "Fetching number..."}
              </Text>
            </View>
          </View>
          <Text style={styles.specialityText}>{profileData?.email}</Text>
        </View>
      </View>
    );
  }

  // Divider
  function divider() {
    return <View style={styles.divider}></View>;
  }

  // Timeslot Section
  function Timeslot() {
    const availableSlots = [
      profileData?.slot_1,
      profileData?.slot_2,
      profileData?.slot_3,
    ].filter((slot) => slot && slot.trim() !== "");

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Available Times</Text>
        <View style={styles.slotContainer}>
          {availableSlots.map((slot, index) => (
            <View key={index} style={styles.slot}>
              <Text style={styles.slotText}>{slot}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  // Working Days Section
  function workingday() {
    if (!availableDays || availableDays.length === 0) {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Available Days</Text>
          <Text style={styles.sectionContent}>No available days yet</Text>
        </View>
      );
    }

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Available Days</Text>
        <View style={styles.daysContainer}>
          {availableDays.map((day, index) => (
            <View key={index} style={styles.dayRow}>
              <View style={styles.checkboxContainer}>
                <View style={styles.checkedBox}>
                  <Feather name="check" size={14} color="white" />
                </View>
              </View>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  // Address Information Section
  function addressInfo() {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Address</Text>
        <Text numberOfLines={2} style={styles.sectionContent}>
          {profileData?.address}
        </Text>
      </View>
    );
  }

  
  // Book Appointment Button
  function BookAppointment() {
    return (
      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.centerButtonContainer}
          onPress={() => {
            navigation.navigate("TimeSloats", { id:id });
          }}
        >
          <Text style={styles.centerButtonText}>Book Appointment</Text>
        </TouchableOpacity>
        
      </View>
    );
  }

  // Map Section
  function mapInfo() {
    
    if(latitude && longitude) {
      return (
        <View style={styles.mapContainerStyle}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker coordinate={{ latitude: latitude, longitude: longitude }} pinColor={"red"} />
          </MapView>
        </View>
      );
    } else {
      return <Text>No map data available.</Text>;
    }
  }
  const renderLoader = () => {
    return loading ? (
      <View style={styles.loadingContainer}>
     <Loader3/>
      </View>
    ) : null;
  };
  return (
    <View style={styles.container}>
      {header()}
      <FlatList
        ListHeaderComponent={
          <>
            {labInfo()}
            {divider()}
            {renderLoader()}
            {BookAppointment()}
            {Timeslot()}
            
            {workingday()}
            {addressInfo()}
            {/* {mapInfo()} */}
          </>
        }
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.bottomButtonContainer}>
        {/* <BottomButton
          navigation={navigation}
          client_id={route.params?.id || null}
        /> */}
          <BottomButton navigation={navigation} admin={true} adminPhoneNumber={profileData?.phone}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 9999, 
  },
  headerStyle: {
    padding: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    elevation: 0.5,
  },
  headerTitleStyle: {
    lineHeight: 25.0,
    marginLeft: Sizes.fixPadding - 5.0,
    ...Fonts.blackColor18SemiBold,
    color: Colors.whiteColor,
  },
  labInfoContainerStyle: {
    flexDirection: "row",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  profileImage: {
    height: 100.0,
    width: 90.0,
    borderRadius: Sizes.fixPadding + 5.0,
  },
  profileInfoContainer: {
    flex: 1,
    marginLeft: Sizes.fixPadding,
    marginRight: Sizes.fixPadding * 2,
  },
  doctorName: {
    ...Fonts.blackColor16SemiBold,
    marginBottom: Sizes.fixPadding - 18.0,
  },
  specialityText: {
    ...Fonts.blackRegular,
    marginTop: Sizes.fixPadding - 4.0,
  },
  divider: {
    backgroundColor: Colors.lightGray,
    height: 1.0,
    elevation: 2.0,
    ...CommonStyles.shadow,
  },
  sectionContainer: {
    padding: 10,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  slot: {
    padding: 8,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  slotText: {
    ...Fonts.blackRegular,
  },
  mapContainerStyle: {
    borderRadius: Sizes.fixPadding + 5.0,
    marginTop: 5,
    overflow: "hidden",
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  map: {
    height: 270.0,
  },
  flatListContent: {
    paddingBottom: Sizes.fixPadding * 9.0,
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingVertical: Sizes.fixPadding,
    borderTopColor: Colors.lightGray,
    borderTopWidth: 0.5,
    ...CommonStyles.shadow,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 10,
  },
  checkboxContainer: {
    marginRight: 8,
  },
  checkedBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grayColor,
  },
  dayText: {
    ...Fonts.blackRegular,
  },
  facilitiesContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding - 3.0,
  },
  centerButtonContainer: {
    backgroundColor: Colors.primaryColor,
    width: 115,
    height: 40,
    borderRadius: 5,
    position: 'absolute',
    right: 18,
    // bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtonText: {
    color: Colors.whiteColor,
    fontWeight: 'bold',
    fontSize: 12,
  },
  container1: {
    marginTop: 5,
    alignItems: 'center',
  },
});

export default ProfectionalProfileScreen;
