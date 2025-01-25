
import React, { useState, useEffect,useCallback } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  ImageBackground, 
  StyleSheet, 
  ScrollView, 
  Alert 
} from 'react-native';
import { Fonts, Colors, Sizes, CommonStyles } from "../../constants/styles";
import { __getApiData, __postApiData } from '../../utils/api';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

const Addnewpesent = ({ navigation }) => {
  // State variables
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [bookingNo, setBookingNo] = useState('');
  const [workingDays, setWorkingDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [description, setDescription] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Fetch login data on component mount
  useEffect(() => {
    getLoginData();
  }, []);

  // Retrieve login data from AsyncStorage
  const getLoginData = async () => {
    try {
      const loginData = await AsyncStorage.getItem('login');
      if (loginData !== null) {
        const parsedData = JSON.parse(loginData);
        const id = parsedData.users.id;
        fetchProfileData(id);
      } else {
        console.log("No login data found");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
      setLoading(false);
    }
  };

  // Fetch profile data for the user
  const fetchProfileData = (id) => {
    if (!id) {
      console.log("User ID is missing");
      setLoading(false);
      return;
    }
    __getApiData(`/api/Booking/service_detail/${id}`)
      .then((res) => {
        if (res.response.response_code === "200") {
          const stat=res.data[0];
          setState(stat);
       
        setLoading(false);
        const workingDays = stat.working_days.split(","); // ["Monday", "Tuesday", "Wednesday"]
        setWorkingDays(workingDays);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      });
  };

  // const workingDays = state?.working_days || [];//1
  //   const datesBlacklistFunc = (date) => {
  //     const currentDay = moment(date).format("dddd");
  //     const isPastDate = moment(date).isBefore(moment().startOf("day"), "day"); // Check if the date is before today
  //     return !workingDays.includes(currentDay) || isPastDate; // Disable if it's not a working day or it's a past date
  //   };
    

  // const handleDateChange = useCallback((date) => {
  //   setSelectedDate(date); // Update the selected date
  //   console.log(date, "date");
  // }, []);

  const datesBlacklistFunc = (date) => {
    const dayOfWeek = date.format("dddd");
    const isPastDate = date.isBefore(moment(), 'day');
    return !workingDays.includes(dayOfWeek) || isPastDate;
};

  // Reset form fields after submission
  const resetFormFields = () => {
    setName('');
    setEmail('');
    setAge('');
    setPassword('');
    setPhone('');
    setGender('');
    setAddress('');
    setBookingNo('');
    setDescription('');
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  // Handle form submission
  const handleData = () => {
    // Comprehensive validation
    if (!name) {
      Alert.alert("Please enter patient name");
      return;
    }

    if (!email || !email.includes('@')) {
      Alert.alert("Validation Error", "Please enter a valid email address");
      return;
    }

    
    if (!age) {
      Alert.alert("Validation Error", "Please enter patient age");
      return;
    }

    if (!password || password.length < 5) {
      Alert.alert("Validation Error", "Password must be at least 6 characters long");
      return;
    }

    if (!phone || phone.length < 10) {
      Alert.alert("Validation Error", "Please enter a valid phone phone");
      return;
    }

    if (!gender) {
      Alert.alert("Validation Error", "Please select gender");
      return;
    }

    if (!bookingNo) {
      Alert.alert("Validation Error", "Please select a booking No.");
      return;
    }

    if (!description) {
      Alert.alert("Validation Error", "Please select purpose of appointment");
      return;
    }

    if (!selectedDate) {
      Alert.alert("Validation Error", "Please select a booking date");
      return;
    }

    if (!selectedTimeSlot) {
      Alert.alert("Validation Error", "Please select a time slot");
      return;
    }


    // Prepare data object for API submission
    const data = { 
      name,
      email,
      age,
      password, 
      phone,
      gender,
      address: address || '', 
      booking_no: bookingNo || '', 
      description: description || '', 
      booking_date: selectedDate.format("YYYY-MM-DD"),
      time: selectedTimeSlot
    };

    // Submit data to API
    __postApiData("/api/booking/add_patient_and_appointment", data)
      .then((response) => {
        console.log(response,"ieugfewuifguoeq");
        if (response.response && response.response.response_code === 200 && response.data && response.data.status === "success") {
          Alert.alert("Success", response.data.message || "Data submitted successfully.")
          resetFormFields();
          navigation.goBack(); // Optional: go back to previous screen
        } else {
          Alert.alert("Error", "Error in submitting data.");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "An error occurred while submitting data. Please try again.");
      });
  };
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
          dateNumberStyle={{ color: "black", fontSize: 15.0 }}
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
          onDateSelected={(date) => setSelectedDate(moment(date))} // Update selected date
        />
      </View>
    );
  }
 
  // Render header
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <MaterialIcons
        name="arrow-back-ios"
        size={20}
        color={Colors.whiteColor}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.headerTitle}>Add New Patient</Text>
    </View>
  );

  // Render available time slots
  const renderTimeSlots = () => {
    if (!state) return null;

    const timeSlots = [state.slot_1, state.slot_2, state.slot_3].filter(slot => slot);

    return (
      <View style={styles.timeSlotsContainer}>
        <Text style={styles.inputLabel}>Available Time Slots</Text>
        {timeSlots.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeSlotButton,
              selectedTimeSlot === slot && styles.selectedTimeSlot,
            ]}
            onPress={() => setSelectedTimeSlot(slot)}
          >
            <Text style={styles.timeSlotText}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Main render method
  return (
    <ImageBackground 
      source={require('../../assets/images/greens.png')} 
      style={styles.container}
    >
      {renderHeader()}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Add New Patient</Text>

          {/* Patient Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          </View>

          {/* Age Input */}
            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter age"
              value={age}
              keyboardType="numeric"
              onChangeText={setAge}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Phone phone Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mobile No.</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone"
              keyboardType="numeric"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Gender Picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Gender</Text>
            <Picker
              selectedValue={gender}
              style={styles.picker}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>

          {/* Address Input (Optional) */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter address"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          {/* Booking phone Input (Optional) */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Booking No. </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter booking phone"
               keyboardType="numeric"
              value={bookingNo}
              onChangeText={setBookingNo}
            />
          </View>

          {/* Description Input (Optional) */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Purpose of Appointment</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Purpose of your Appointment"
              multiline
              numberOfLines={3}
              value={description}
              onChangeText={setDescription}
             
            />
          </View>
       {calendar()}

          {/* Time Slots */}
          {renderTimeSlots()}

          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleData}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 19,
    // backgroundColor: 'rgba(0,0,0,0.2)'
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10
  },
  scrollContainer: {
    padding: 20,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center'
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  calendar: {
    height: 100,
    marginTop:5,
    
  },
  submitButton: {
    backgroundColor: "#0ccb8f",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  timeSlotsContainer: {
    marginVertical: 20,
  },
  timeSlotButton: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedTimeSlot: {
    backgroundColor: "#0ccb8f",
  },
  timeSlotText: {
    fontSize: 16,
    color: "black",
  },
});

export default Addnewpesent;