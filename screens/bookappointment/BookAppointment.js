
import React, { useState, useEffect, useCallback } from "react";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { Picker } from '@react-native-picker/picker';
import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,Linking,
  Alert,ActivityIndicator
} from "react-native";
import { Fonts, Colors, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import BottomButton from "../../components/BottomButton";
import { __getApiData, __postApiData } from "../../utils/api";
import Loader from "../../components/loader";
import Loader3 from "../../components/Loader3";
const { width } = Dimensions.get("screen");

const TimeSlotScreen = ({ navigation, route,client_id = 1  }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [time, setTime] = useState("");
  const [book, setBook] = useState(false);
  const [workingDays, setWorkingDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [loder, setloder] = useState(true);
  const { id } = route.params;
  const [state, setState] = useState({
    currentIndex: 1,
    isLoading: false,
   
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
}, [client_id]);

const handleCall = () => {
  if (state.phoneNumber) {
      let phoneUrl = `tel:${state.phoneNumber}`;
      return Linking.openURL(phoneUrl);
  }
};

   useEffect(() => {
     const keyboardDidShowListener = Keyboard.addListener(
       "keyboardDidShow",
       () => setKeyboardVisible(true)
     );
     const keyboardDidHideListener = Keyboard.addListener(
       "keyboardDidHide",
       () => setKeyboardVisible(false)
     );

     return () => {
       keyboardDidShowListener.remove();
       keyboardDidHideListener.remove();
     };
   }, []);


  useEffect(() => {
    fetchProfileData();
    // bookAppointment()
  }, [id]);

  const fetchProfileData = () => {
    __getApiData(`/api/Booking/service_detail/${id}`)
      .then((res) => {
       
        if (res.response.response_code == "200") {
           const profile = res.data[0];
          setProfileData(profile);
          setloder(false)
      
          const workingDays = profile.working_days.split(","); 
        
          setWorkingDays(workingDays);
        }
     
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching profile data:", error);
      });
     };

     const datesBlacklistFunc = (date) => {
      const dayOfWeek = date.format("dddd");
      const isPastDate = date.isBefore(moment(), 'day');
      return !workingDays.includes(dayOfWeek) || isPastDate;
  };

 
  const bookAppointment = () => {
    if (!time) {
      Alert.alert(
        "Missing Time Slot",
        "Please select an available time slot.",
        [{ text: "OK", style: "cancel" }]
      );
      return;
    }

    if (!selectedDate) {
      Alert.alert("Missing Date", "Please select a booking date.", [
        { text: "OK", style: "cancel" },
      ]);
      return;
    }

    if (!name) {
      Alert.alert( "Missing name","Please enter patient name");
      return;
    }

    if (!age) {
      Alert.alert( "Missing age","Please enter age");
      return;
    }

    if (!gender) {
      Alert.alert( "Missing gender","Please enter gender");
      return;
    }

    if (!description || description.trim() === "") {
      Alert.alert(
        "Missing Description",
        "Please provide a purpush of your appointment.",
        [{ text: "OK", style: "cancel" }]
      );
      return;
    }
  

    
    
   const bookingData = {
      provider_id: profileData?.user_id , 
      patient_name:name,
      patient_age:age,
      patient_gender:gender,
      time: time,
      booking_date: selectedDate,
      description: description,
      status: "pending",
    };

    console.log("Booking data:", bookingData);
   __postApiData("/api/Booking/book_appointment", bookingData)
      .then((response) => {
        console.log("Booking Response:", response);
         if (response?.response?.response_code === 200) {
          Alert.alert("Success", response?.response?.response_message || "Appointment booked successfully!");
          setTime(""); 
          setSelectedDate(null); 
          setDescription(""); 
          setAge('')
          setGender('')
          setName('')
         
        } else {
          
          Alert.alert(
            "Error",
            response?.data?.message || "Failed to book the appointment. Please try again later.",
            [{ text: "OK", style: "cancel" }]
          );
        }
      })
      .catch((error) => {
        console.error("Booking Error:", error);
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later.",
          [{ text: "OK", style: "cancel" }]
        );
      });
  };

  const Timeslot = () => {
    const availableSlots = [
      profileData?.slot_1,
      profileData?.slot_2,
      profileData?.slot_3,
    ].filter((slot) => slot && slot.trim() !== "");

    const handleSlotSelection = useCallback(
      (slot) => {
        if (time === slot) {
          setTime("");
        } else {
          setTime(slot);
          setBook(true);
        }
      },
      [time]
    );

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Available Time Slots</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.slotContainer}
        >
          {availableSlots.length > 0 ? (
            availableSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.slot,
                  time === slot && styles.time,
                ]}
                onPress={() => handleSlotSelection(slot)}
              >
                <Text
                  style={[
                    styles.slotText,
                    time === slot && styles.timeText,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noSlotsText}>No time slots available</Text>
          )}
        </ScrollView>
      </View>
    );
  };

  function inputs() {
    return (
      <View style={styles.descriptionContainer}>
         <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter patient name"
          placeholderTextColor={Colors.grayColor}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter patient age"
          placeholderTextColor={Colors.grayColor}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Purpose of Appointment</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter purpose of your appointment"
          placeholderTextColor={Colors.grayColor}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
      </View>
      </View>
    );
  }
  const renderLoader = () => {
    return loder ? (
      <View style={styles.loadingContainer}>
   <Loader3/>
      </View>
    ) : null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <Loader></Loader> */}
       {header()}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {doctorInfo()}
        {calendar()}
        {renderLoader()}
        {divider()}
        {Timeslot()}
        {inputs()}
        {bookingInfo()}
       </ScrollView>
       {!isKeyboardVisible && (
          <View style={styles.bottomButtonContainer}>
           <BottomButton navigation={navigation} admin={true} adminPhoneNumber={profileData?.phone}/>
          </View>
        )}
    </View>
  );


  function bookingInfo() {
    return book ? (
      <View style={styles.bookNowContainerStyle}>
        <TouchableOpacity activeOpacity={0.1} onPress={() => bookAppointment()}>
          <View style={styles.bookButtonStyle}>
            <Text style={styles.bookButtonText}>Book now</Text>
          </View>
        </TouchableOpacity>
      </View>
    ) : null;
  }
  function calendar() {
    return (
      <View>
        <CalendarStrip
          style={{
            height: 100,
            paddingTop: Sizes.fixPadding * 2.0,
            paddingBottom: Sizes.fixPadding,
          }}
          highlightDateContainerStyle={{
            backgroundColor: "#0ccb8f",
            alignItems: "center",
            justifyContent: "center",
          }}
          dateNumberStyle={{ color: "black", fontSize: 17.0 }}
          dateNameStyle={{ color: "black", fontSize: 15.0 }}
          highlightDateNameStyle={{ color: "white", fontSize: 15.0 }}
          highlightDateNumberStyle={{ color: "white", fontSize: 17.0 }}
          datesBlacklist={datesBlacklistFunc}
          disabledDateOpacity={0.6}
          disabledDateNameStyle={{ color: "gray", fontSize: 15.0 }}
          disabledDateNumberStyle={{ color: "gray", fontSize: 17.0 }}
          scrollable
          upperCaseDays={false}
          selectedDate={selectedDate}
          onDateSelected={(date) => setSelectedDate(date.format("YYYY-MM-DD"))} // Update selected date
        />
      </View>
    );
  }

  function divider() {
    return <View style={styles.dividerStyle}></View>;
  }

  function doctorInfo() {
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
            <TouchableOpacity onPress={() => handleCall()}>
              <Image
                source={require("../../assets/images/icons/calls.png")}
                style={{ width: 15.0, height: 15, resizeMode: "contain", marginRight: 3 }}
              />
            </TouchableOpacity>
            <Text style={{ ...Fonts.blackColor12Medium }}>
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

  function header() {
    return (
      <View
        style={{
          padding: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.primaryColor,
          elevation: 0.5,
        }}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitleStyle}>Book Appointment</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: Sizes.fixPadding * 2.0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
  },
  slotContainer: {
    marginLeft: Sizes.fixPadding * 2.0,
    paddingRight: Sizes.fixPadding * 2.0,
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
  time: {
    backgroundColor: "#0ccb8f", // Red background when selected
  },
  slotText: {
    fontSize: 14,
    // fontWeight: "bold",
    color: Colors.primary,
  },
  timeText: {
    color: "white", // White text on red background
  },
  noSlotsText: {
    fontSize: 16,
    color: Colors.primary,
    padding: Sizes.fixPadding * 2.0,
  },
  descriptionContainer: {
    marginTop: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionInput: {
    marginTop: Sizes.fixPadding,
    // padding: Sizes.fixPadding,
    paddingVertical:1,
    paddingHorizontal:10,
    // padding:5,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: Sizes.fixPadding * 2.0,
  },
  bookNowContainerStyle: {
    marginTop: Sizes.marginVertical,
    alignItems: 'center', 
    marginBottom:50
  },

 
  bookButtonStyle: {
    backgroundColor: Colors.primary, 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 30, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },

  
  bookButtonText: {
    fontSize: 16, 
    backgroundColor: "#0ccb8f", 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    color:"white", 
    fontFamily: Fonts.regular, 
    textAlign: "center", 
    borderRadius: 20, 
    overflow: "hidden", 
    fontWeight: "bold", 
  },
  
  dividerStyle: {
    borderWidth: 0.5,
    borderColor: "#e5e5e5",
    // marginTop: Sizes.fixPadding * 2.0,
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  container: {
    padding: Sizes.padding,
  },
  profileName: {
    // fontSize: Fonts.size.medium,
    fontWeight: "bold",
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
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: Colors.blackColor,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor:'#f9f9f9',
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor:  '#ccc',
    borderRadius: 10,
    backgroundColor:'#f9f9f9',
  },
  picker: {
    width: '100%',
    height: 50,
  },
});

export default TimeSlotScreen;



