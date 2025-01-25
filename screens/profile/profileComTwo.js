// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Colors, Fonts, Sizes } from "../../constants/styles";
// import { __getApiData, __postApiData } from "../../utils/api";
// import CategoryList from "./CategoryList";
// import SubCategory from "./SubCategory";
// import Checkbox from "expo-checkbox";

// const List = [
//   {
//     name: "Chartered Accountant",
//     id: "1",
//   },
//   {
//     name: "Company Secretary",
//     id: "2",
//   },
//   {
//     name: "Cost and Management Accountant",
//     id: "3",
//   },
//   {
//     name: "Lawyer",
//     id: "4",
//   },
// ];

// const ProfileComTwo = ({ navigation, detailstate, parantUpdateState }) => {
//   const {
//     farm_name,
//     farm_registration,
//     about_user,
//     farm_phone_no,
//     farm_address,
//     category,
//     sub_category,
//     slot_1,
//     slot_2,
//     slot_3,
//     working_days,
//   } = detailstate;

//   const [state, setState] = useState({
//     categoryList: [],
//     subCategoryList: [],
//     showCategory: false,
//     showSubCategory: false,
   
//   });
//   const { categoryList, showCategory, subCategoryList, showSubCategory } =
//     state;

//   const updateState = (data) => setState((state) => ({ ...state, ...data }));

//   const __handleGetState = () => {
//     __getApiData(`api/home/category`)
//       .then((res) => {
//         console.log(res.data);
//         updateState({
//           categoryList: res.data,
//         });
//       })
//       .catch((error) => {});
//   };

//   const __handleGetCity = (id) => {
//     updateState({
//       subCategoryList: [],
//     });
//     __getApiData(`api/home/subcategory/` + id)
//       .then((res) => {
//         console.log(res.data);
//         updateState({
//           subCategoryList: res.data,
//         });
//       })
//       .catch((error) => {});
//   };

//   useEffect(() => {
//     __handleGetState();
//   }, []);
//   useEffect(() => {
//     category && __handleGetCity(category);
//   }, [category]);

 
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: Colors.whiteColor,
//         borderRadius: 10,
//         margin: 15,
//       }}
//     >
//       <FlatList
//         ListHeaderComponent={
//           <>
//             {fullNameInfo()}
//             {aboutUser()}
//             {/* {working_daysSection()} */}
//           </>
//         }
//       />
//       <CategoryList
//         showState={showCategory}
//         updateParentState={updateState}
//         parantUpdateState={parantUpdateState}
//         stateList={categoryList}
//         state_id={category}
//       />
//       <SubCategory
//         showState={showSubCategory}
//         updateParentState={updateState}
//         parantUpdateState={parantUpdateState}
//         stateList={subCategoryList}
//         state_id={sub_category}
//       />
//     </SafeAreaView>
//   );

//   function aboutUser() {
//     return (
//       <View
//         style={{
//           marginBottom: Sizes.fixPadding + 5.0,
//           marginHorizontal: Sizes.fixPadding * 2.0,
//         }}
//       >
//         <Text style={{ ...Fonts.grayColor14Regular }}>About Doctor</Text>
//         <TextInput
//           placeholder=" "
//           value={about_user}
//           onChangeText={(value) => parantUpdateState({ about_user: value })}
//           style={{ ...styles.textFieldStyle }}
//           selectionColor={Colors.primaryColor}
//           multiline={true}
//           numberOfLines={6}
//           textAlignVertical={"top"}
//         />
//       </View>
//     );
//   }

// //   function working_daysSection() {
// //     return (
// //       <View
// //         style={{
// //           marginTop: Sizes.fixPadding + 5.0,
// //           marginHorizontal: Sizes.fixPadding * 2.0,
// //         }}
// //       >
// //         <Text style={{ ...Fonts.grayColor14Regular }}>Working Days</Text>
// //         <View style={styles.dayContainer}>
// //           {Object.keys(working_days).map((day) => (
// //             <View key={day} style={styles.dayCheckboxContainer}>
// //               <Checkbox
// //                 style={styles.checkbox}
// //                 value={working_days[day]}
// //                 onValueChange={() => handleDayToggle(day)}
// //               />
// //               <Text>{day}</Text>
// //             </View>
// //           ))}
// //         </View>
// //       </View>
// //     );
// //   }

//   function fullNameInfo() {
//     return (
//       <>
//         <View
//           style={{
//             marginTop: Sizes.fixPadding * 2.0,
//             marginHorizontal: Sizes.fixPadding * 2.0,
//           }}
//         >
//           <Text style={{ ...Fonts.grayColor14Regular }}>
//             Name of the Hospital/Clinic
//           </Text>
//           <TextInput
//             placeholder=" "
//             value={farm_name}
//             onChangeText={(value) => parantUpdateState({ farm_name: value })}
//             style={{ ...styles.textFieldStyle }}
//             selectionColor={Colors.primaryColor}
//           />
//         </View>
//         <View
//           style={{
//             marginTop: Sizes.fixPadding * 2.0,
//             marginHorizontal: Sizes.fixPadding * 2.0,
//           }}
//         >
//           <Text style={{ ...Fonts.grayColor14Regular }}>
//             Hospital/Clinic Phone No
//           </Text>
//           <TextInput
//             placeholder=" "
//             value={farm_phone_no}
//             onChangeText={(value) => parantUpdateState({ farm_phone_no: value })}
//             style={{ ...styles.textFieldStyle }}
//             selectionColor={Colors.primaryColor}
//           />
//         </View>
//         <View
//           style={{
//             marginTop: Sizes.fixPadding * 2.0,
//             marginHorizontal: Sizes.fixPadding * 2.0,
//           }}
//         >
//           <Text style={{ ...Fonts.grayColor14Regular }}>
//             Hospital/Clinic Address
//           </Text>
//           <TextInput
//             placeholder=" "
//             value={farm_address}
//             onChangeText={(value) => parantUpdateState({ farm_address: value })}
//             style={{ ...styles.textFieldStyle }}
//             selectionColor={Colors.primaryColor}
//           />
//         </View>
//       </>
//     );
//   }
// };

// const styles = StyleSheet.create({
//   textFieldStyle: {
//     ...Fonts.blackColor14Medium,
//     lineHeight: 16.0,
//     paddingHorizontal: Sizes.fixPadding,
//     paddingVertical: Sizes.fixPadding,
//     borderRadius: Sizes.fixPadding - 5.0,
//     borderWidth: 1.0,
//     borderColor: Colors.lightGrayColor,
//   },
//   buttonStyle: {
//     backgroundColor: Colors.primaryColor,
//     borderRadius: Sizes.fixPadding - 5.0,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingBottom: Sizes.fixPadding + 5.0,
//     paddingTop: Sizes.fixPadding + 10.0,
//     margin: Sizes.fixPadding * 2.0,
//   },

//   bottomSheetStyle: {
//     width: "100%",
//     position: "absolute",
//     bottom: 0.0,
//     borderTopLeftRadius: Sizes.fixPadding + 5.0,
//     borderTopRightRadius: Sizes.fixPadding + 5.0,
//     backgroundColor: Colors.whiteColor,
//     paddingHorizontal: 0.0,
//     paddingVertical: 0.0,
//   },
//   checkbox: {
//     marginRight: Sizes.fixPadding,
//   },
//   dayContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   dayCheckboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//     marginRight: 15,
//   },
// });

// export default ProfileComTwo;


// import React, { useEffect, useState } from "react";
// import {
//     FlatList,
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { Colors, Fonts, Sizes } from "../../constants/styles";
// import { Menu, MenuItem } from "react-native-material-menu";
// import { __getApiData, __postApiData } from "../../utils/api";
// import CategoryList from "./CategoryList";
// import SubCategory from "./SubCategory";
// import Checkbox from 'expo-checkbox';
// const List = [
//     {
//         name: "Chartered Accountant",
//         id: "1",
//     },
//     {
//         name: "Company Secretary",
//         id: "2",
//     },
//     {
//         name: "Cost and Management Accountant",
//         id: "3",
//     },
//     {
//         name: "Lawyer",
//         id: "4",
//     },
// ];

// const ProfileComTwo = ({ navigation, detailstate, parantUpdateState }) => {
//     const {
//         farm_name,
//         farm_registration,
//         about_user,
//         farm_phone_no,
//         farm_address,
//         category,
//         sub_category,
//         slot_1,
//         slot_2,
//         slot_3,
        
//     } = detailstate;

//     const [state, setState] = useState({
//         categoryList: [],
//         subCategoryList: [],
//         showCategory: false,
//         showSubCategory: false,
       
//      });
//     const { categoryList, showCategory, subCategoryList, showSubCategory,working_days} =
//         state;
//     const updateState = (data) => setState((state) => ({ ...state, ...data }));

//     const __handleGetState = () => {
//         __getApiData(`api/home/category`)
//             .then((res) => {
//                 console.log(res.data,"category data");
//                 updateState({
//                     categoryList: res.data,
//                 });
//             })
//             .catch((error) => { });
//     };
//     const __handleGetCity = (id) => {
//         updateState({
//             subCategoryList: [],
//         });
//         __getApiData(`api/home/subcategory/` + id)
//             .then((res) => {
//                 console.log(res.data,"subcategory data");
//                 updateState({
//                     subCategoryList: res.data,
//                 });
//             })
//             .catch((error) => { });
//     };

//     useEffect(() => {
//         __handleGetState();
//     }, []);
//     useEffect(() => {
//         category && __handleGetCity(category);
//     }, [category]);

    

//     return (
//         <SafeAreaView
//             style={{
//                 flex: 1,
//                 backgroundColor: Colors.whiteColor,
//                 borderRadius: 10,
//                 margin: 15,
//             }}
//         >
//             <FlatList
//                 ListHeaderComponent={
//                     <>
//                         {fullNameInfo()}
//                         {/* {stateInfo()} */}
//                         {workingDaysSection()}
//                         {aboutUser()}
//                     </>
//                 }
//             />

//             <CategoryList
//                 showState={showCategory}
//                 updateParentState={updateState}
//                 parantUpdateState={parantUpdateState}
//                 stateList={categoryList}
//                 state_id={category}
//             />
//             <SubCategory
//                 showState={showSubCategory}
//                 updateParentState={updateState}
//                 parantUpdateState={parantUpdateState}
//                 stateList={subCategoryList}
//                 state_id={sub_category}
//             />
//         </SafeAreaView>
//     );

   

//     function aboutUser() {
//         return (
//             <>
//                 <View
//                     style={{
//                         marginBottom: Sizes.fixPadding + 5.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         About Doctor
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={about_user}
//                         onChangeText={(value) =>
//                             parantUpdateState({ about_user: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                         multiline={true}
//                         numberOfLines={6}
//                         textAlignVertical={"top"}
//                     />
//                 </View>
//                 {/* <View
//                     style={{
//                         marginBottom: Sizes.fixPadding + 5.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Discount
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={discount}
//                         onChangeText={(value) =>
//                             parantUpdateState({ discount: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View> */}
//             </>
//         );
//     }
//     function stateInfo() {
//         return (
//             <View
//                 style={{
//                     marginTop: Sizes.fixPadding + 5.0,
//                     marginHorizontal: Sizes.fixPadding * 2.0,
//                 }}
//             >
//                 <Text style={{ ...Fonts.grayColor14Regular }}>Location</Text>
//                 <TextInput
//                     placeholder=" "
//                     value={farm_registration}
//                     onChangeText={(value) =>
//                         parantUpdateState({ farm_registration: value })
//                     }
//                     style={{ ...styles.textFieldStyle }}
//                     selectionColor={Colors.primaryColor}
//                 />
//             </View>
//         );
//     }

//     function fullNameInfo() {
//         return (
//             <>
//                 <View
//                     style={{
//                         marginTop: Sizes.fixPadding * 2.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Name of the Hospital/Clinic
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={farm_name}
//                         onChangeText={(value) =>
//                             parantUpdateState({ farm_name: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>
//                 <View
//                     style={{
//                         marginTop: Sizes.fixPadding * 2.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Hospital/Clinic Phone No
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={farm_phone_no}
//                         onChangeText={(value) =>
//                             parantUpdateState({ farm_phone_no: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>
//                 <View
//                     style={{
//                         marginTop: Sizes.fixPadding * 2.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Hospital/Clinic Address
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={farm_address}
//                         onChangeText={(value) =>
//                             parantUpdateState({ farm_address: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>
            
//                 <View
//                     style={{
//                         marginTop: Sizes.fixPadding * 2.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Time Slot-1(Example-10: 00 AM - 6:00 PM) 
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={slot_1}
//                         onChangeText={(value) =>
//                             parantUpdateState({ slot_1: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>

//                 <View
//                     style={{
//                         marginTop: Sizes.fixPadding * 2.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Time Slot-2(Example-10: 00 AM - 6:00 PM)
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={slot_2}
//                         onChangeText={(value) =>
//                             parantUpdateState({ slot_2: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>

//                 <View
//                     style={{
//                         marginTop: Sizes.fixPadding * 2.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Time Slot-3(Example-10: 00 AM - 6:00 PM)
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={slot_3}
//                         onChangeText={(value) =>
//                             parantUpdateState({slot_3: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>

       

//                 <TouchableOpacity
//                     onPress={() => {
//                         updateState({ showCategory: true });
//                     }}
//                     activeOpacity={1}
//                     style={{
//                         marginTop: Sizes.fixPadding + 5.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Category
//                     </Text>
//                     <TextInput
//                         placeholder="Select Category"
//                         value={
//                             category
//                                 ? categoryList.find(
//                                     (data) => data.id == category
//                                 )?.name
//                                 : ""
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                         editable={false}
//                     />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={() => {
//                         updateState({ showSubCategory: true });
//                     }}
//                     activeOpacity={1}
//                     style={{
//                         marginTop: Sizes.fixPadding + 5.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Sub Category
//                     </Text>
//                     <TextInput
//                         placeholder="Select Sub Category"
//                         value={
//                             sub_category
//                                 ? subCategoryList.find(
//                                     (data) => data.id == sub_category
//                                 )?.name
//                                 : ""
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                         editable={false}
//                     />
//                 </TouchableOpacity>
//             </>
//         );
//     }
// };

// const styles = StyleSheet.create({
//     textFieldStyle: {
//         ...Fonts.blackColor14Medium,
//         lineHeight: 16.0,
//         paddingHorizontal: Sizes.fixPadding,
//         paddingVertical: Sizes.fixPadding,
//         borderRadius: Sizes.fixPadding - 5.0,
//         borderWidth: 1.0,
//         borderColor: Colors.lightGrayColor,
//     },
//     buttonStyle: {
//         backgroundColor: Colors.primaryColor,
//         borderRadius: Sizes.fixPadding - 5.0,
//         alignItems: "center",
//         justifyContent: "center",
//         paddingBottom: Sizes.fixPadding + 5.0,
//         paddingTop: Sizes.fixPadding + 10.0,
//         margin: Sizes.fixPadding * 2.0,
//     },

//     bottomSheetStyle: {
//         width: "100%",
//         position: "absolute",
//         bottom: 0.0,
//         borderTopLeftRadius: Sizes.fixPadding + 5.0,
//         borderTopRightRadius: Sizes.fixPadding + 5.0,
//         backgroundColor: Colors.whiteColor,
//         paddingHorizontal: 0.0,
//         paddingVertical: 0.0,
//     },
//     checkbox: {
//         marginRight: Sizes.fixPadding,
//     },
//     dayContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     dayCheckboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//         marginRight: 15,
//     },
// });

// export default ProfileComTwo;


// import React, { useEffect, useState } from "react";
// import {
//     FlatList,
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { Colors, Fonts, Sizes } from "../../constants/styles";
// import { __getApiData, __postApiData } from "../../utils/api";
// import CategoryList from "./CategoryList";
// import SubCategory from "./SubCategory";
// import Checkbox from 'expo-checkbox'; // Import the Checkbox component

// const List = [
//     {
//         name: "Chartered Accountant",
//         id: "1",
//     },
//     {
//         name: "Company Secretary",
//         id: "2",
//     },
//     {
//         name: "Cost and Management Accountant",
//         id: "3",
//     },
//     {
//         name: "Lawyer",
//         id: "4",
//     },
// ];

// const ProfileComTwo = ({ navigation, detailstate, parantUpdateState }) => {
//     const {
//         farm_name,
//         farm_registration,
//         about_user,
//         farm_phone_no,
//         farm_address,
//         working_days,
//         working_time,
//         discount,
//         category,
//         sub_category,
//     } = detailstate;

//     const [state, setState] = useState({
//         categoryList: [],
//         subCategoryList: [],
//         showCategory: false,
//         showSubCategory: false,
//     });

//     const [isChecked, setChecked] = useState(false); // State for general checkbox
//     const [selectedDays, setSelectedDays] = useState({
//         sunday: false,
//         monday: false,
//         tuesday: false,
//         wednesday: false,
//         thursday: false,
//         friday: false,
//         saturday: false,
//     }); // State for week days checkboxes

//     const { categoryList, showCategory, subCategoryList, showSubCategory } =
//         state;

//     const updateState = (data) => setState((state) => ({ ...state, ...data }));

//     const __handleGetState = () => {
//         __getApiData(`api/home/category`)
//             .then((res) => {
//                 console.log(res.data);
//                 updateState({
//                     categoryList: res.data,
//                 });
//             })
//             .catch((error) => {});
//     };

//     const __handleGetCity = (id) => {
//         updateState({
//             subCategoryList: [],
//         });
//         __getApiData(`api/home/subcategory/` + id)
//             .then((res) => {
//                 console.log(res.data);
//                 updateState({
//                     subCategoryList: res.data,
//                 });
//             })
//             .catch((error) => {});
//     };

//     useEffect(() => {
//         __handleGetState();
//     }, []);

//     useEffect(() => {
//         category && __handleGetCity(category);
//     }, [category]);

//     const handleDayChange = (day) => {
//         setSelectedDays((prev) => ({
//             ...prev,
//             [day]: !prev[day],
//         }));
//     };

//     return (
//         <SafeAreaView
//             style={{
//                 flex: 1,
//                 backgroundColor: Colors.whiteColor,
//                 borderRadius: 10,
//                 margin: 15,
//             }}
//         >
//             <FlatList
//                 ListHeaderComponent={
//                     <>
//                         {fullNameInfo()}
//                         {aboutUser()}
//                     </>
//                 }
//             />

//             {/* Adding Category and SubCategory Component */}
//             <CategoryList
//                 showState={showCategory}
//                 updateParentState={updateState}
//                 parantUpdateState={parantUpdateState}
//                 stateList={categoryList}
//                 state_id={category}
//             />
//             <SubCategory
//                 showState={showSubCategory}
//                 updateParentState={updateState}
//                 parantUpdateState={parantUpdateState}
//                 stateList={subCategoryList}
//                 state_id={sub_category}
//             />

//             {/* Days Selection with Checkboxes */}
//             <View
//                 style={{
//                     marginTop: Sizes.fixPadding * 2.0,
//                     marginHorizontal: Sizes.fixPadding * 2.0,
//                     flexDirection: 'column',
//                 }}
//             >
//                 <Text style={{ ...Fonts.grayColor14Regular, marginBottom: 10 }}>
//                     Select Working Days
//                 </Text>
//                 <View style={styles.dayContainer}>
//                     {Object.keys(selectedDays).map((day) => (
//                         <View key={day} style={styles.dayCheckboxContainer}>
//                             <Checkbox
//                                 style={styles.checkbox}
//                                 value={selectedDays[day]}
//                                 onValueChange={() => handleDayChange(day)}
//                             />
//                             <Text style={{ ...Fonts.grayColor14Regular }}>
//                                 {day.charAt(0).toUpperCase() + day.slice(1)}
//                             </Text>
//                         </View>
//                     ))}
//                 </View>
//             </View>
//         </SafeAreaView>
//     );

//     function aboutUser() {
//         return (
//             <>
//                 <View
//                     style={{
//                         marginBottom: Sizes.fixPadding + 5.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>About Doctor</Text>
//                     <TextInput
//                         placeholder=" "
//                         value={about_user}
//                         onChangeText={(value) =>
//                             parantUpdateState({ about_user: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                         multiline={true}
//                         numberOfLines={6}
//                         textAlignVertical={"top"}
//                     />
//                 </View>
//                 <View
//                     style={{
//                         marginBottom: Sizes.fixPadding + 5.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>Discount</Text>
//                     <TextInput
//                         placeholder=" "
//                         value={discount}
//                         onChangeText={(value) =>
//                             parantUpdateState({ discount: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>
//             </>
//         );
//     }

//     function fullNameInfo() {
//         return (
//             <>
//                 <View
//                     style={{
//                         marginTop: Sizes.fixPadding * 2.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Name of the Hospital/Clinic
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={farm_name}
//                         onChangeText={(value) =>
//                             parantUpdateState({ farm_name: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>
//                 <View
//                     style={{
//                         marginTop: Sizes.fixPadding * 2.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Hospital/Clinic Phone No
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={farm_phone_no}
//                         onChangeText={(value) =>
//                             parantUpdateState({ farm_phone_no: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>
//                 <View
//                 style={{
//                     marginTop: Sizes.fixPadding * 2.0,
//                     marginHorizontal: Sizes.fixPadding * 2.0,
//                     flexDirection: 'column',
//                 }}
//             >
//                 <Text style={{ ...Fonts.grayColor14Regular, marginBottom: 10 }}>
//                     Select Working Days
//                 </Text>
//                 <View style={styles.dayContainer}>
//                     {Object.keys(selectedDays).map((day) => (
//                         <View key={day} style={styles.dayCheckboxContainer}>
//                             <Checkbox
//                                 style={styles.checkbox}
//                                 value={selectedDays[day]}
//                                 onValueChange={() => handleDayChange(day)}
//                             />
//                             <Text style={{ ...Fonts.grayColor14Regular }}>
//                                 {day.charAt(0).toUpperCase() + day.slice(1)}
//                             </Text>
//                         </View>
//                     ))}
//                 </View>
//             </View>
//             </>
//         );
//     }
// };

// const styles = StyleSheet.create({
//     textFieldStyle: {
//         ...Fonts.blackColor14Medium,
//         lineHeight: 16.0,
//         paddingHorizontal: Sizes.fixPadding,
//         paddingVertical: Sizes.fixPadding,
//         borderRadius: Sizes.fixPadding - 5.0,
//         borderWidth: 1.0,
//         borderColor: Colors.lightGrayColor,
//     },
//     buttonStyle: {
//         backgroundColor: Colors.primaryColor,
//         borderRadius: Sizes.fixPadding - 5.0,
//         alignItems: "center",
//         justifyContent: "center",
//         paddingBottom: Sizes.fixPadding + 5.0,
//         paddingTop: Sizes.fixPadding + 10.0,
//         margin: Sizes.fixPadding * 2.0,
//     },
//     checkbox: {
//         marginRight: Sizes.fixPadding,
//     },
//     dayContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     dayCheckboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//         marginRight: 15,
//     },
// });

// export default ProfileComTwo;


// import React, { useEffect, useState } from "react";
// import {
//     FlatList,
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { Colors, Fonts, Sizes } from "../../constants/styles";
// import { Menu, MenuItem } from "react-native-material-menu";
// import { __getApiData, __postApiData } from "../../utils/api";
// import CategoryList from "./CategoryList";
// import SubCategory from "./SubCategory";
// import Checkbox from 'expo-checkbox';

// const ProfileComTwo = ({ navigation, detailstate, parantUpdateState }) => {
//     const {
//         farm_name,
//         farm_registration,
//         about_user,
//         farm_phone_no,
//         farm_address,
//         category,
//         sub_category,
//         slot_1,
//         slot_2,
//         slot_3,
//         working_days
//     } = detailstate;

//     const [state, setState] = useState({
//         categoryList: [],
//         subCategoryList: [],
//         showCategory: false,
//         showSubCategory: false,
//     });

//     const [workingDays, setWorkingDays] = useState({
//         sunday:sunday,
//         monday: monday,
//         tuesday: tuesday,
//         wednesday: wednesday,
//         thursday: thursday,
//         friday: friday,
//         saturday: saturday
//     });

//     const { categoryList, showCategory, subCategoryList, showSubCategory } = state;
    
//     const updateState = (data) => setState((state) => ({ ...state, ...data }));

//     // Initialize working days from props
//     useEffect(() => {
//         if (working_days) {
//             try {
//                 const parsedDays = JSON.parse(working_days);
//                 setWorkingDays(prevDays => ({
//                     ...prevDays,
//                     ...parsedDays
//                 }));
//             } catch (e) {
//                 console.log("Error parsing working days:", e);
//             }
//         }
//     }, [working_days]);

//     const handleDayChange = (day) => {
//         const updatedDays = {
//             ...workingDays,
//             [day]: !workingDays[day]
//         };
//         setWorkingDays(updatedDays);
//         parantUpdateState({ working_days: JSON.stringify(updatedDays) });
//     };

//     const __handleGetState = () => {
//         __getApiData(`api/home/category`)
//             .then((res) => {
//                 console.log(res.data, "category data");
//                 updateState({
//                     categoryList: res.data,
//                 });
//             })
//             .catch((error) => { });
//     };

//     const __handleGetCity = (id) => {
//         updateState({
//             subCategoryList: [],
//         });
//         __getApiData(`api/home/subcategory/` + id)
//             .then((res) => {
//                 console.log(res.data, "subcategory data");
//                 updateState({
//                     subCategoryList: res.data,
//                 });
//             })
//             .catch((error) => { });
//     };

//     useEffect(() => {
//         __handleGetState();
//     }, []);

//     useEffect(() => {
//         category && __handleGetCity(category);
//     }, [category]);

//     function workingDaysSection() {
//         const days = [
//             { key: 'sunday', label: 'Sunday' },
//             { key: 'monday', label: 'Monday' },
//             { key: 'tuesday', label: 'Tuesday' },
//             { key: 'wednesday', label: 'Wednesday' },
//             { key: 'thursday', label: 'Thursday' },
//             { key: 'friday', label: 'Friday' },
//             { key: 'saturday', label: 'Saturday' }
//         ];

//         return (
//             <View style={{
//                 marginTop: Sizes.fixPadding * 2.0,
//                 marginHorizontal: Sizes.fixPadding * 2.0,
//             }}>
//                 <Text style={{ ...Fonts.grayColor14Regular, marginBottom: Sizes.fixPadding }}>
//                     Working Days
//                 </Text>
//                 <View style={styles.dayContainer}>
//                     {days.map((day) => (
//                         <View key={day.key} style={styles.dayCheckboxContainer}>
//                             <Checkbox
//                                 style={styles.checkbox}
//                                 value={workingDays[day.key]}
//                                 onValueChange={() => handleDayChange(day.key)}
//                                 color={workingDays[day.key] ? Colors.primaryColor : undefined}
//                             />
//                             <Text style={{ ...Fonts.blackColor14Medium }}>
//                                 {day.label}
//                             </Text>
//                         </View>
//                     ))}
//                 </View>
//             </View>
//         );
//     }

//     function aboutUser() {
//         return (
//             <View style={{
//                 marginBottom: Sizes.fixPadding + 5.0,
//                 marginHorizontal: Sizes.fixPadding * 2.0,
//             }}>
//                 <Text style={{ ...Fonts.grayColor14Regular }}>
//                     About Doctor
//                 </Text>
//                 <TextInput
//                     placeholder=" "
//                     value={about_user}
//                     onChangeText={(value) =>
//                         parantUpdateState({ about_user: value })
//                     }
//                     style={{ ...styles.textFieldStyle }}
//                     selectionColor={Colors.primaryColor}
//                     multiline={true}
//                     numberOfLines={6}
//                     textAlignVertical={"top"}
//                 />
//             </View>
//         );
//     }

//     function fullNameInfo() {
//         return (
//             <>
//                 <View style={{
//                     marginTop: Sizes.fixPadding * 2.0,
//                     marginHorizontal: Sizes.fixPadding * 2.0,
//                 }}>
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Name of the Hospital/Clinic
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={farm_name}
//                         onChangeText={(value) =>
//                             parantUpdateState({ farm_name: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>

//                 <View style={{
//                     marginTop: Sizes.fixPadding * 2.0,
//                     marginHorizontal: Sizes.fixPadding * 2.0,
//                 }}>
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Hospital/Clinic Phone No
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={farm_phone_no}
//                         onChangeText={(value) =>
//                             parantUpdateState({ farm_phone_no: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>

//                 <View style={{
//                     marginTop: Sizes.fixPadding * 2.0,
//                     marginHorizontal: Sizes.fixPadding * 2.0,
//                 }}>
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Hospital/Clinic Address
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={farm_address}
//                         onChangeText={(value) =>
//                             parantUpdateState({ farm_address: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>



//                 <View style={{
//                     marginTop: Sizes.fixPadding * 2.0,
//                     marginHorizontal: Sizes.fixPadding * 2.0,
//                 }}>
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Time Slot-1(Example-10: 00 AM - 6:00 PM)
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={slot_1}
//                         onChangeText={(value) =>
//                             parantUpdateState({ slot_1: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>

//                 <View style={{
//                     marginTop: Sizes.fixPadding * 2.0,
//                     marginHorizontal: Sizes.fixPadding * 2.0,
//                 }}>
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Time Slot-2(Example-10: 00 AM - 6:00 PM)
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={slot_2}
//                         onChangeText={(value) =>
//                             parantUpdateState({ slot_2: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>

//                 <View style={{
//                     marginTop: Sizes.fixPadding * 2.0,
//                     marginHorizontal: Sizes.fixPadding * 2.0,
//                 }}>
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Time Slot-3(Example-10: 00 AM - 6:00 PM)
//                     </Text>
//                     <TextInput
//                         placeholder=" "
//                         value={slot_3}
//                         onChangeText={(value) =>
//                             parantUpdateState({ slot_3: value })
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                     />
//                 </View>

//                 <TouchableOpacity
//                     onPress={() => {
//                         updateState({ showCategory: true });
//                     }}
//                     activeOpacity={1}
//                     style={{
//                         marginTop: Sizes.fixPadding + 5.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Category
//                     </Text>
//                     <TextInput
//                         placeholder="Select Category"
//                         value={
//                             category
//                                 ? categoryList.find(
//                                     (data) => data.id == category
//                                 )?.name
//                                 : ""
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                         editable={false}
//                     />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     onPress={() => {
//                         updateState({ showSubCategory: true });
//                     }}
//                     activeOpacity={1}
//                     style={{
//                         marginTop: Sizes.fixPadding + 5.0,
//                         marginHorizontal: Sizes.fixPadding * 2.0,
//                     }}
//                 >
//                     <Text style={{ ...Fonts.grayColor14Regular }}>
//                         Sub Category
//                     </Text>
//                     <TextInput
//                         placeholder="Select Sub Category"
//                         value={
//                             sub_category
//                                 ? subCategoryList.find(
//                                     (data) => data.id == sub_category
//                                 )?.name
//                                 : ""
//                         }
//                         style={{ ...styles.textFieldStyle }}
//                         selectionColor={Colors.primaryColor}
//                         editable={false}
//                     />
//                 </TouchableOpacity>
//             </>
//         );
//     }

//     return (
//         <SafeAreaView style={{
//             flex: 1,
//             backgroundColor: Colors.whiteColor,
//             borderRadius: 10,
//             margin: 15,
//         }}>
//             <FlatList
//                 ListHeaderComponent={
//                     <>
                       

//                         {fullNameInfo()}
                       
//                         {workingDaysSection()}
//                         {aboutUser()}
//                     </>
//                 }
//             />

//             <CategoryList
//                 showState={showCategory}
//                 updateParentState={updateState}
//                 parantUpdateState={parantUpdateState}
//                 stateList={categoryList}
//                 state_id={category}
//             />
//             <SubCategory
//                 showState={showSubCategory}
//                 updateParentState={updateState}
//                 parantUpdateState={parantUpdateState}
//                 stateList={subCategoryList}
//                 state_id={sub_category}
//             />
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     textFieldStyle: {
//         ...Fonts.blackColor14Medium,
//         lineHeight: 16.0,
//         paddingHorizontal: Sizes.fixPadding,
//         paddingVertical: Sizes.fixPadding,
//         borderRadius: Sizes.fixPadding - 5.0,
//         borderWidth: 1.0,
//         borderColor: Colors.lightGrayColor,
//     },
//     buttonStyle: {
//         backgroundColor: Colors.primaryColor,
//         borderRadius: Sizes.fixPadding - 5.0,
//         alignItems: "center",
//         justifyContent: "center",
//         paddingBottom: Sizes.fixPadding + 5.0,
//         paddingTop: Sizes.fixPadding + 10.0,
//         margin: Sizes.fixPadding * 2.0,
//     },
//     bottomSheetStyle: {
//         width: "100%",
//         position: "absolute",
//         bottom: 0.0,
//         borderTopLeftRadius: Sizes.fixPadding + 5.0,
//         borderTopRightRadius: Sizes.fixPadding + 5.0,
//         backgroundColor: Colors.whiteColor,
//         paddingHorizontal: 0.0,
//         paddingVertical: 0.0,
//     },
//     checkbox: {
//         marginRight: Sizes.fixPadding,
//     },
//     dayContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     dayCheckboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//         marginRight: 15,
//     },
// });

// export default ProfileComTwo;



import React, { useEffect, useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __getApiData, __postApiData } from "../../utils/api";
import CategoryList from "./CategoryList";
import SubCategory from "./SubCategory";
import Checkbox from 'expo-checkbox';

const ProfileComTwo = ({ navigation, detailstate, parantUpdateState }) => {
    const {
        farm_name,
        farm_registration,
        about_user,
        farm_phone_no,
        farm_address,
        category,
        sub_category,
        slot_1,
        slot_2,
        slot_3,
        working_days
    } = detailstate;

    const [state, setState] = useState({
        categoryList: [],
        subCategoryList: [],
        showCategory: false,
        showSubCategory: false,
    });

    const [workingDays, setWorkingDays] = useState({
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false
    });

    const { categoryList, showCategory, subCategoryList, showSubCategory } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    // Initialize working days from props
    useEffect(() => {
        if (working_days) {
            try {
                const parsedDays = working_days.split(','); // Split the string by commas
                const daysState = {
                    Sunday: parsedDays.includes('Sunday'),
                    Monday: parsedDays.includes('Monday'),
                    Tuesday: parsedDays.includes('Tuesday'),
                    Wednesday: parsedDays.includes('Wednesday'),
                    Thursday: parsedDays.includes('Thursday'),
                    Friday: parsedDays.includes('Friday'),
                    Saturday: parsedDays.includes('Saturday'),
                };
                setWorkingDays(daysState);
            } catch (e) {
                console.log("Error parsing working days:", e);
            }
        }
    }, [working_days]);

    const handleDayChange = (day) => {
        const updatedDays = {
            ...workingDays,
            [day]: !workingDays[day]
        };

        // Get the selected days as a comma-separated string
        const selectedDays = Object.keys(updatedDays)
            .filter((key) => updatedDays[key]) // Get days with true value
            .join(","); // Join them into a string, e.g., "sunday,monday"

        setWorkingDays(updatedDays); // Update the workingDays state with the new object
        parantUpdateState({ working_days: selectedDays }); // Send the selected days to the parent as a string
    };

    const __handleGetState = () => {
        __getApiData(`api/home/category`)
            .then((res) => {
                console.log(res.data, "category data");
                updateState({
                    categoryList: res.data,
                });
            })
            .catch((error) => { });
    };

    const __handleGetCity = (id) => {
        updateState({
            subCategoryList: [],
        });
        __getApiData(`api/home/subcategory/` + id)
            .then((res) => {
                console.log(res.data, "subcategory data");
                updateState({
                    subCategoryList: res.data,
                });
            })
            .catch((error) => { });
    };

    useEffect(() => {
        __handleGetState();
    }, []);

    useEffect(() => {
        category && __handleGetCity(category);
    }, [category]);

    function workingDaysSection() {
        const days = [
            { key: 'Sunday', label: 'Sunday' },
            { key: 'Monday', label: 'Monday' },
            { key: 'Tuesday', label: 'Tuesday' },
            { key: 'Wednesday', label: 'Wednesday' },
            { key: 'Thursday', label: 'Thursday' },
            { key: 'Friday', label: 'Friday' },
            { key: 'Saturday', label: 'Saturday' }
        ];

        return (
            <View style={{
                marginTop: Sizes.fixPadding * 2.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <Text style={{ ...Fonts.grayColor14Regular, marginBottom: Sizes.fixPadding }}>
                    Working Days
                </Text>
                <View style={styles.dayContainer}>
                    {days.map((day) => (
                        <View key={day.key} style={styles.dayCheckboxContainer}>
                            <Checkbox
                                style={styles.checkbox}
                                value={workingDays[day.key]}
                                onValueChange={() => handleDayChange(day.key)}
                                color={workingDays[day.key] ? Colors.primaryColor : undefined}
                            />
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                {day.label}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    }

    function aboutUser() {
        return (
            <View style={{
                marginBottom: Sizes.fixPadding + 5.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    About Doctor
                </Text>
                <TextInput
                    placeholder=" "
                    value={about_user}
                    onChangeText={(value) =>
                        parantUpdateState({ about_user: value })
                    }
                    style={{ ...styles.textFieldStyle }}
                    selectionColor={Colors.primaryColor}
                    multiline={true}
                    numberOfLines={6}
                    textAlignVertical={"top"}
                />
            </View>
        );
    }

    function fullNameInfo() {
        return (
            <>
                <View style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Name of the Hospital/Clinic
                    </Text>
                    <TextInput
                        placeholder=" "
                        value={farm_name}
                        onChangeText={(value) =>
                            parantUpdateState({ farm_name: value })
                        }
                        style={{ ...styles.textFieldStyle }}
                        selectionColor={Colors.primaryColor}
                    />
                </View>

                <View style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Hospital/Clinic Phone No
                    </Text>
                    <TextInput
                        placeholder=" "
                        value={farm_phone_no}
                        onChangeText={(value) =>
                            parantUpdateState({ farm_phone_no: value })
                        }
                        style={{ ...styles.textFieldStyle }}
                        selectionColor={Colors.primaryColor}
                    />
                </View>

                <View style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Hospital/Clinic Address
                    </Text>
                    <TextInput
                        placeholder=" "
                        value={farm_address}
                        onChangeText={(value) =>
                            parantUpdateState({ farm_address: value })
                        }
                        style={{ ...styles.textFieldStyle }}
                        selectionColor={Colors.primaryColor}
                    />
                </View>

                <View style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Time Slot-1(Example-10: 00 AM - 6:00 PM)
                    </Text>
                    <TextInput
                        placeholder=" "
                        value={slot_1}
                        onChangeText={(value) =>
                            parantUpdateState({ slot_1: value })
                        }
                        style={{ ...styles.textFieldStyle }}
                        selectionColor={Colors.primaryColor}
                    />
                </View>

                <View style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Time Slot-2(Example-10: 00 AM - 6:00 PM)
                    </Text>
                    <TextInput
                        placeholder=" "
                        value={slot_2}
                        onChangeText={(value) =>
                            parantUpdateState({ slot_2: value })
                        }
                        style={{ ...styles.textFieldStyle }}
                        selectionColor={Colors.primaryColor}
                    />
                </View>

                <View style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Time Slot-3(Example-10: 00 AM - 6:00 PM)
                    </Text>
                    <TextInput
                        placeholder=" "
                        value={slot_3}
                        onChangeText={(value) =>
                            parantUpdateState({ slot_3: value })
                        }
                        style={{ ...styles.textFieldStyle }}
                        selectionColor={Colors.primaryColor}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        updateState({ showCategory: true });
                    }}
                    activeOpacity={1}
                    style={{
                        marginTop: Sizes.fixPadding + 5.0,
                        marginHorizontal: Sizes.fixPadding * 2.0,
                    }}
                >
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Category
                    </Text>
                    <TextInput
                        placeholder="Select Category"
                        value={category
                            ? categoryList.find(
                                (data) => data.id == category
                            )?.name
                            : ""}
                        style={{ ...styles.textFieldStyle }}
                        selectionColor={Colors.primaryColor}
                        editable={false}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        updateState({ showSubCategory: true });
                    }}
                    activeOpacity={1}
                    style={{
                        marginTop: Sizes.fixPadding + 5.0,
                        marginHorizontal: Sizes.fixPadding * 2.0,
                    }}
                >
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Sub Category
                    </Text>
                    <TextInput
                        placeholder="Select Sub Category"
                        value={sub_category
                            ? subCategoryList.find(
                                (data) => data.id == sub_category
                            )?.name
                            : ""}
                        style={{ ...styles.textFieldStyle }}
                        selectionColor={Colors.primaryColor}
                        editable={false}
                    />
                </TouchableOpacity>
            </>
        );
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Colors.whiteColor,
            borderRadius: 10,
            margin: 15,
        }}>
            <FlatList
                ListHeaderComponent={
                    <>
                        {fullNameInfo()}
                        {workingDaysSection()}
                        {aboutUser()}
                    </>
                }
            />

            <CategoryList
                showState={showCategory}
                updateParentState={updateState}
                parantUpdateState={parantUpdateState}
                stateList={categoryList}
                state_id={category}
            />
            <SubCategory
                showState={showSubCategory}
                updateParentState={updateState}
                parantUpdateState={parantUpdateState}
                stateList={subCategoryList}
                state_id={sub_category}
            />
        </SafeAreaView>
    );
};

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
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: Sizes.fixPadding + 5.0,
        paddingTop: Sizes.fixPadding + 10.0,
        margin: Sizes.fixPadding * 2.0,
    },
    bottomSheetStyle: {
        width: "100%",
        position: "absolute",
        bottom: 0.0,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: 0.0,
        paddingVertical: 0.0,
    },
    checkbox: {
        marginRight: Sizes.fixPadding,
    },
    dayContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCheckboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 15,
    },
});

export default ProfileComTwo;
