import { Button, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import BottomButton from '../../components/BottomButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import { __postApiData } from '../../utils/api'
import { StatusBar } from 'react-native'
import InfoAlert from '../../components/alert/infoAlert'
import Loader3 from '../../components/Loader3'
const BookAmbulanceScreen = ({ navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [name, setName] = useState('');
  const [from_place, setFrom_place] = useState('');
  const [to_place, setTo_place] = useState('');
  const [date, setDate] = useState(new Date());
  const [about_us, setAbout_Us] = useState('');
  const [phone,setPhone]=useState("");
  const [state, setState] = useState({
    currentIndex: 1,
    isLoading: false,
    showinfo: "",
  });

  const {
   isLoading,
    showinfo,
} = state;
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const [showDatePicker, setShowDatePicker] = useState(false); // To show/hide the date picker

  


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

  // Function to handle form submission
  const bookAppointment = () => {
    if (!date) {
      Alert.alert("Missing Date", "Please select a booking date.", [
        { text: "OK", style: "cancel" },
      ]);
      return;
    }

    if (!name) {
      Alert.alert("Missing name", "Please enter patient name");
      return;
    }

    if (!from_place) {
      Alert.alert("Missing from_place", "Please enter from_place");
      return;
    }

    if (!to_place) {
      Alert.alert("Missing to_place", "Please enter to_place");
      return;
    }

    if (!phone) {
      Alert.alert("Missing phone", "Please enter phone");
      return;
    }

    if (!about_us || about_us.trim() === "") {
      Alert.alert(
        "Missing Description",
        "Please provide a purpose for your appointment.",
        [{ text: "OK", style: "cancel" }]
      );
      return;
    }

    const bookingData = {
      name: name,
      from_place: from_place,
      to_place: to_place,
      booking_date: date,
      about_us: about_us,
      number: phone,
    };

    console.log("Booking data:", bookingData);

    __postApiData("/api/booking/book_ambulance", bookingData)
      .then((response) => {
        console.log("Booking Response:", response);
        if (response?.response?.response_code === 200) {
        //   Alert.alert("Success", response?.response?.response_message || "Appointment booked successfully!");
        return updateState({
            showinfo:"Thank you ambulance booking out team connect with you asap",
         
        },   setName(''),
        setFrom_place(''),
        setTo_place(''),
        setAbout_Us(''),
        setPhone(''),
        setDate(new Date()));
          // Reset form fields
        //   setName('');
        //   setFrom_place('');
        //   setTo_place('');
        //   setAbout_Us('');
        //   setPhone('');
        //   setDate(new Date()); // Reset the date
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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };


  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
          <StatusBar
                        translucent={false}
                        backgroundColor={Colors.primaryColor}
                        barStyle={"light-content"}
                    />
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
     
      {header()}
      
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: isKeyboardVisible ? 20 : 80 }}>
  
        {Ambulance()}
        
      </ScrollView>
      {!isKeyboardVisible && (
        <View style={styles.bottomButtonContainer}>
          <BottomButton navigation={navigation} />
        </View>
      )}
    </View>
  );

  function Ambulance() {
    return (
        <View style={styles.container}>
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter patient name"
            placeholderTextColor="gray"
            value={name}
            onChangeText={setName}
          />
        </View>
  
        {/* From Place Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>From Place</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter from place"
            placeholderTextColor="gray"
            value={from_place}
            onChangeText={setFrom_place}
          />
        </View>
  
        {/* To Place Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>To Place</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter to place"
            placeholderTextColor="gray"
            value={to_place}
            onChangeText={setTo_place}
          />
        </View>
  
        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            placeholderTextColor="gray"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />
        </View>
  
        {/* Date Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.inputText}>
              {date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
  
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>
  
        {/* Purpose of Appointment */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Purpose of Booking</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Enter purpose of your appointment"
            placeholderTextColor="gray"
            multiline
            numberOfLines={4}
            value={about_us}
            onChangeText={setAbout_Us}
          />
        </View>
  
        {/* Book Ambulance Button */}
<View style={styles.centerButtonContainer}>
<TouchableOpacity
  style={styles.centerButton}
  onPress={bookAppointment}
>
  <Text style={styles.centerButtonText}>Book Ambulance</Text>
</TouchableOpacity>
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
        <Text style={styles.headerTitleStyle}>Book Ambulance</Text>
      </View>
    );
  }
  // function renderLoader() {
  //   return state.isLoading ? (
  //     <View style={styles.loadingContainer}>
  //  <Loader3/>
  //     </View>
  //   ) : null;
  // };
  
};

export default BookAmbulanceScreen;

const styles = StyleSheet.create({
  headerTitleStyle: {
    lineHeight: 25.0,
    marginLeft: Sizes.fixPadding - 5.0,
    ...Fonts.blackColor18SemiBold,
    color: Colors.whiteColor,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:10,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  descriptionContainer: {
    marginTop: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
 
  container1: {
    marginTop: 3,
    alignItems: 'center',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: Colors.blackColor,
    marginBottom: 8,
    fontWeight: '600',
    marginHorizontal:10
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
 centerButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    backgroundColor: Colors.primaryColor,
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  centerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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

});


