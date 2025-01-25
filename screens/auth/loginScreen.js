import React, { useCallback, useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    BackHandler,
    ImageBackground,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
    __setLogin,
    __setTokenAndUser,
    __setUserType,
} from "../../utils/localization";
import {
    __postApiData,
    __postApiDataFormData,
    __postLoginSigupApiData,
} from "../../utils/api";
import Verification from "./verification";
import Loader from "../../components/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    __registerForPushNotificationsAsync,
    __schedulePushNotification,
} from "../../utils/function";

import { Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
    const [state, setState] = useState({
        phone: "",
        isShowVerify: false,
        otp: "",
        isLoading: false,
        passowrd: "",
        isShowPass: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { phone, isShowVerify, otp, isLoading, passowrd, isShowPass } = state;

    const __handleSubmit = async () => {
        try {
            updateState({ isLoading: true });

            // let data = await __registerForPushNotificationsAsync();

            __postLoginSigupApiData(`api/home/signin`, {
                phone,
                // device_token: data,
            })
                .then((res) => {
                    console.log(res);
                    if (res.response.response_code == "200") {
                        updateState({ isShowVerify: true, isLoading: false });
                    } else {
                        Alert.alert("", res.response.response_message);
                        updateState({ isLoading: false });
                    }
                })
                .catch((error) => {
                    Alert.alert("", "Something went wrong");
                    updateState({ isLoading: false });
                });
        } catch (error) {
            Alert.alert("", error.message);
        }
    };

    const __handleVerify = async () => {
        updateState({ isLoading: true });
        // let data = await __registerForPushNotificationsAsync();
        __postLoginSigupApiData(`api/home/signin`, {
            phone,
            // otp,
            // device_token: data,
            password: passowrd,
        })
            .then((res) => {
                console.log(res);
                if (res.response.response_code == "200") {
                    updateState({ isShowVerify: false, isLoading: false });
                    __setUserType(res.data.users.roleID);
                    __setTokenAndUser(res.data.token, res.data.users);
                    __setLogin(true);
                    navigation.push("AppStack");

                    AsyncStorage.setItem("login", JSON.stringify(res.data))
                        .then(() => {})
                        .catch((error) => {});
                } else {
                    Alert.alert("", res.response.response_message);
                    updateState({ isLoading: false });
                }
            })
            .catch((error) => {
                Alert.alert("", "Something went wrong");
                updateState({ isLoading: false });
            });
    };

    const [backClickCount, setBackClickCount] = useState(0);
    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    backAction
                );
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000);
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
                barStyle={"dark-content"}
            />
            {isShowVerify ? (
                <Verification
                    state={state}
                    updateState={updateState}
                    __handlSubmit={__handleVerify}
                    __handleResendOtp={__handleSubmit}
                />
            ) : null}
            {isLoading ? <Loader /> : null}
            <ImageBackground
                source={require("../../assets/images/greens.png")}
                style={{ flex: 1, justifyContent: "center" }}
            >
                {/* {appLogo()} */}
                {registerTitle()}
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: 'white',
                        backgroundColor: Colors.whiteColor,
                        marginHorizontal: 15,
                        borderRadius: 30,
                        paddingTop: 30,
                    }}
                >
                    {emailTextField()}
                    {signupButton()}
                    {alreadyAccountInfo()}
                </View>
            </ImageBackground>
        </SafeAreaView>
    );

    function alreadyAccountInfo() {
        return (
            <Text
                style={{ textAlign: "center", margin: Sizes.fixPadding * 2.0 }}
            >
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Don't have an account?{" "}
                </Text>
                <Text
                    onPress={() => navigation.push("Register")}
                    style={{ ...Fonts.blackColor16Medium }}
                >
                    Sign Up
                </Text>
            </Text>
        );
    }

    function signupButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    // __handleSubmit();
                    __handleVerify();
                }}
                style={styles.signupButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor15Regular }}>Sign In</Text>
            </TouchableOpacity>
        );
    }

    function emailTextField() {
        return (
            <>
                <View
                    style={{
                        ...styles.textFieldWrapStyle,
                        marginBottom: Sizes.fixPadding * 2.0,
                    }}
                >
                    <Entypo name={"phone"} size={25} color={Colors.grayColor} />

                    <TextInput
                        value={phone}
                        onChangeText={(value) => updateState({ phone: value })}
                        placeholder="Mobile Number/ Email Address"
                        placeholderTextColor={Colors.grayColor}
                        style={{
                            ...Fonts.blackColor14Regular,
                            flex: 1,
                            marginLeft: Sizes.fixPadding + 2.0,
                        }}
                        selectionColor={Colors.primaryColor}
                        keyboardType="email-address"
                        editable={!isShowVerify}
                    />
                </View>
                <View
                    style={{
                        ...styles.textFieldWrapStyle,
                        marginBottom: Sizes.fixPadding * 1.0,
                    }}
                >
                    <Entypo name={"lock"} size={25} color={Colors.grayColor} />
                    <TextInput
                        value={passowrd}
                        onChangeText={(value) =>
                            updateState({ passowrd: value })
                        }
                        placeholder="Password"
                        placeholderTextColor={Colors.grayColor}
                        style={{
                            ...Fonts.blackColor14Regular,
                            flex: 1,
                            marginLeft: Sizes.fixPadding + 2.0,
                        }}
                        selectionColor={Colors.primaryColor}
                        secureTextEntry={!isShowPass}
                    />
                    <Entypo
                        name={isShowPass ? "eye" : "eye-with-line"}
                        size={25}
                        onPress={() => updateState({ isShowPass: !isShowPass })}
                    />
                </View>

                <View
                    style={{
                        paddingHorizontal: 20,
                    }}
                >
                    <Text
                        onPress={() => navigation.push("ForgetPassword")}
                        style={{
                            ...Fonts.primaryColor14Medium,
                            textAlign: "right",
                        }}
                    >
                        Forget Password?
                    </Text>
                </View>
            </>
        );
    }

    function appLogo() {
        return (
            <View style={{ ...styles.appLogosty }}>
                <Image
                    source={require("../../assets/images/dicon.png")}
                    resizeMode="contain"
                    style={{ width: 220, height: 100 }}
                />
            </View>
        );
    }

    function registerTitle() {
        return (
            <View
                style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    marginBottom: Sizes.fixPadding * 2.5,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                <View style={{ marginBottom: 5 }}>
                    <Text
                        style={{
                            ...Fonts.primaryColor16SemiBold,
                            fontSize: 28,
                            color: Colors.whiteColor,
                        }}
                    >
                        WELCOME!!
                    </Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    backArrowWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 8,

        alignItems: "center",
        justifyContent: "center",
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderWidth: 0.3,
        borderColor: Colors.grayColor,
    },
    appLogosty: {
        height: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    textFieldWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.02)",
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderWidth: 0.5,
        borderColor: Colors.lightGray,
    },
    forgetPasswordTextStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        textAlign: "right",
        ...Fonts.primaryColor14Medium,
    },
    signupButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding * 2.0,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: Sizes.fixPadding * 4.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding + 5.0,
    },
    googleAndFacebookButtonWrapStyle: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding + 5.0,
        borderWidth: 0.3,
        borderColor: Colors.grayColor,
    },
    checkBoxStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: Sizes.fixPadding - 8.0,
        borderWidth: 1.0,
        alignItems: "center",
        justifyContent: "center",
    },
    agreeOrNotInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default LoginScreen;

// import { Text, View, TouchableOpacity, TextInput, ImageBackground, StyleSheet, ScrollView } from 'react-native';
// import React, { useState,useEffect } from 'react';
// import { Fonts, Colors, Sizes, CommonStyles } from "../../constants/styles";
// import {__getApiData, __postApiData } from '../../utils/api';
// import { MaterialIcons } from '@expo/vector-icons';  // Importing Material Icons
// import { Picker } from '@react-native-picker/picker';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import CalendarStrip from "react-native-calendar-strip";

// const Addnewpesent = ({ navigation }) => {
//   const [state, setState] = useState(null);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [number, setNumber] = useState('');
//   const [gender, setGender] = useState('');
//   const [address, setAddress] = useState('');
//   const [bookingNo, setBookingNo] = useState('');
//   const [Timeslot, setTimeslot] = useState('');
//   const [bookingdate, setBookingdate] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     // Trigger the data fetching process when the component mounts
//     getLoginData();
//   }, []);

//   const getLoginData = async () => {
//     try {
//       // Retrieve login data from AsyncStorage
//       const loginData = await AsyncStorage.getItem('login');
      
//       if (loginData !== null) {
//         // Parse the login data to extract user information
//         const parsedData = JSON.parse(loginData);
//         const id = parsedData.users.id;  // Get the user id

//         console.log(id, "my roll id");

//         // Now, call __getApiData using the user id
//         fetchProfileData(id);
//       } else {
//         console.log("No login data found");
//       }
//     } catch (error) {
//       console.error("Error retrieving data from AsyncStorage:", error);
//     }
//   };
// const fetchProfileData = (id) => {
//     // Make sure to check if id is available
//     if (!id) {
//       console.log("User ID is missing");
//       setLoading(false);
//       return;
//     }

//     // Call the API with the id from AsyncStorage
//     __getApiData(`/api/Booking/service_detail/${id}`)
//       .then((res) => {
//         console.log(res.data,"mwfnwogwnignwngienegirnowrw")
//         if (res.response.response_code === "200") {
//           setState(res.data[0]);  // Set the fetched profile data
//           }


//       })
//       .catch((error) => {
//         console.error("Error fetching profile data:", error);
      
//       });
//   };


//   //post api releted data

//   function handleData() {
//     if (!name) {
//       alert("Name is not defined");
//     }

//     if (!email) {
//       alert("Email is not defined");
//     }
//     if (!email.includes('@')) {
//       alert("Please enter a valid email address.");
//       return; 
//     }
  
//     if (!password) {
//       alert("password is not defined");
//     }
//     if (!number) {
//       alert("number is not defined");
//     }
//     if (!gender) {
//       alert("gender is not defined");
//     }
//     if (!address) {
//       alert("address is not defined");
//     }
//     if (!bookingNo) {
//       alert("bookingNo is not defined");
//     }

//     if (!description) {
//       alert("description is not defined");
//     }
//     const dat = { name, email ,password,number,gender,address,bookingNo,description};

//     __postApiData("", dat)//api/booking/add_patient_and_appointment
//       .then((res) => {
//         console.log("Booking Response:", res);
//         if (res) {
//           alert("Data submitted");
//           setName('');
//           setEmail('');
//           setPassword('');
//           setNumber('');
//           setGender('');
//           setAddress('');
//           setBookingNo('');
//           setTimeslot('');
//           setBookingdate('');
//           setDescription('');
//         } else {
//           alert("Wrong data provided");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   const renderHeader = () => {
//     return (
//       <View style={styles.headerContainer}>
//         <MaterialIcons
//           name="arrow-back-ios"
//           size={20}
//           color={Colors.whiteColor}
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}  // Apply style to back button
//         />
//         <Text style={styles.headerTitle}>Add New Patient</Text>
//       </View>
//     );
//   };

//   return (

    
//     <ImageBackground source={require('../../assets/images/greens.png')} style={styles.container}>
//       {renderHeader()}
//       <ScrollView contentContainerStyle={styles.modalBody}>
//         <View style={styles.formContainer}>
//           <Text style={styles.title}>Add New Patient</Text>

//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Enter Patient Name</Text>
//             <TextInput
//               style={styles.nameInput}
//               placeholder="Enter patient name"
//               placeholderTextColor="#aaa"
//               keyboardType='text'
//               value={name}
//               onChangeText={setName}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Enter Patient Email</Text>
//             <TextInput
//               style={styles.nameInput}
//               placeholder="Enter patient email"
//               placeholderTextColor="#aaa"
//               keyboardType='email'
//               value={email}
//               onChangeText={setEmail}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Enter Patient Password</Text>
//             <TextInput
//           style={styles.nameInput}
//           placeholder="Enter patient Password"
//           placeholderTextColor="#aaa"
//           secureTextEntry={true} // Password field with hidden text
//           value={password}
//           onChangeText={setPassword}
//         />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Enter Mobile No.</Text>
//             <TextInput
//               style={styles.nameInput}
//               placeholder="Enter patient mobile No."
//               placeholderTextColor="#aaa"
//               keyboardType='number'
//               value={number}
//               onChangeText={setNumber}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//         <Text style={styles.inputLabel}>Enter Patient Gender</Text>
//         <Picker
//           style={styles.picker}
//           selectedValue={gender}
//           onValueChange={(itemValue) => setGender(itemValue)}
//         >
//           <Picker.Item label="Select Gender" value="" />
//           <Picker.Item label="Male" value="male" />
//           <Picker.Item label="Female" value="female" />
//           <Picker.Item label="Other" value="other" />
//         </Picker>
//       </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Enter Patient Address</Text>
//             <TextInput
//               style={styles.nameInput}
//               placeholder="Enter patient address"
//               placeholderTextColor="#aaa"
//               keyboardType='text'
//               value={address}
//               onChangeText={setAddress}
//             />
//           </View>
//           <View style={styles.horizontalLine} />


//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Enter Booking No.</Text>
//             <TextInput
//               style={styles.nameInput}
//               placeholder="Enter patient booking No."
//               placeholderTextColor="#aaa"
//               keyboardType='text'
//               value={bookingNo}
//               onChangeText={setBookingNo}
//             />
//           </View>
        
//           <View style={{ flex: 1 }}>
//   <CalendarStrip
//     style={{
//       height: 100,
//       paddingTop: Sizes.fixPadding * 2.0,
//       paddingBottom: Sizes.fixPadding,
//     }}
//     highlightDateContainerStyle={{
//       backgroundColor: "blue", // Highlight selected date with red
//       alignItems: "center",
//       justifyContent: "center",
//     }}
//     dateNumberStyle={{ color: "black", fontSize: 17.0 }}
//     dateNameStyle={{ color: "black", fontSize: 15.0 }}
//     highlightDateNameStyle={{ color: "red", fontSize: 15.0 }}
//     highlightDateNumberStyle={{ color: "red", fontSize: 17.0 }}
//     disabledDateOpacity={0.6}
//     disabledDateNameStyle={{ color: "gray", fontSize: 15.0 }}
//     disabledDateNumberStyle={{ color: "gray", fontSize: 17.0 }}
//     useIsoWeekday={false}
//     scrollable={true}
//     upperCaseDays={false}
//     styleWeekend={true}
//   />
// </View>

         

//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Purpush of Appointment</Text>
//             <TextInput
//               style={styles.nameInput}
//               placeholder="Enter patient Description"
//               placeholderTextColor="#aaa"
//               keyboardType='text'
//               value={description}
//               onChangeText={setDescription}
//             />
//           </View>
    

//           <TouchableOpacity style={styles.submitButton} onPress={handleData}>
//             <Text style={styles.submitButtonText}>Submit</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//      flex: 1,
//       backgroundColor: '#f7f7f7',
//       padding: Sizes.fixPadding,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop:10,
//     padding:10
//   },
//   headerTitle: {
//     marginLeft: Sizes.fixPadding,
//     color: Colors.whiteColor,
//     fontSize: 18,
//     fontWeight: 'bold',
//     letterSpacing: 0.5,
//   },
//   backButton: {
//     backgroundColor: 'transparent', 
//     padding: Sizes.fixPadding,  
//     borderRadius: 50,  
//   },
//   modalBody: {
//     marginTop: 10,
//   },
//   formContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.9)', 
//     padding: Sizes.fixPadding * 2,
//     borderRadius: 12,
//     alignItems: 'center',
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: Sizes.fixPadding * 2,
//     color: Colors.primary,
//     letterSpacing: 0.8,
//   },
//   inputContainer: {
//     width: '100%',
//     marginBottom: Sizes.fixPadding * 2,
//   },
//   inputLabel: {
//     fontSize: 16,
//     color: Colors.primary,
//     marginBottom: Sizes.fixPadding / 2,
//     fontWeight: '600',
//   },
//   nameInput: {
//     width: '100%',
//     padding: Sizes.fixPadding,
//     paddingHorizontal: 15,
//     borderWidth: 1,
//     borderColor: Colors.primary,
//     borderRadius: 8,
//     fontSize: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   submitButton: {
//     backgroundColor: "#0ccb8f", // Button color
//     paddingVertical: Sizes.fixPadding,  // Vertical padding
//     paddingHorizontal: Sizes.fixPadding * 4, // Horizontal padding to make the button wider
//     borderRadius: 8,  // Rounded corners for the button
//     marginTop: Sizes.fixPadding * 2,  // Margin for spacing
//     shadowOpacity: 0.15,  // Slight opacity for the shadow
//     shadowRadius: 8,  // Shadow blur
//     elevation: 5,  // Elevation for Android devices (shadow effect)
//   },
//   submitButtonText: {
//     color: 'white',  // White text color for visibility
//     fontSize: 15,  // Font size for the text
//     fontWeight: 'bold',  // Bold text for emphasis
//     textAlign: 'center',  // Center align the text
//     textTransform: 'uppercase',  // Capitalize the text
//   },
//   horizontalLine: {
//     borderBottomWidth: 4,  
//     borderBottomColor: '#0ccb8f', 
//     marginVertical: 10, 
//     width: '100%',  
//   },
// });

// export default Addnewpesent;

