import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";
import { LogBox } from "react-native";
import CustomDrawer from "./components/drawerContent";
import LoginScreen from "./screens/auth/loginScreen";
import RegisterScreen from "./screens/auth/registerScreen";
import HeplAndSupportScreen from "./screens/helpAndSupport/heplAndSupportScreen";
import HomeScreen from "./screens/home/homeScreen";
import NotificationsScreen from "./screens/notifications/notificationsScreen";
import ProfileScreen from "./screens/profile/profileScreen";
import SearchResultsScreen from "./screens/searchResults/searchResultsScreen";
import TermsAndConditionsScreen from "./screens/termsAndConditions/termsAndConditionsScreen";
import ProfectionalProfileScreen from "./screens/DoctorProfile/ProfectionalProfileScreen";
import PendingRequestScreen from "./screens/pendingRequest/pendingRequestScreen";
import UpCommingCallScreen from "./screens/upCommingCall/upCommingCallScreen";
import TransactionScreen from "./screens/transaction/transactionScreen";
import SplashScreen from "./screens/splashScreen";
import WebViewBox from "./screens/profile/webViewBox";
import PendingForPaymentScreen from "./screens/pendingForPayment/pendingForPaymentScreen";
import Myappoiment from './screens/Appoiment/Myappoiment';
import TimeSloats from './screens/bookappointment/BookAppointment'
import { useRef } from "react";
import { __postApiData } from "./utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

LogBox.ignoreAllLogs();
import * as Notifications from "expo-notifications";
import SubCategory from "./screens/SubCategory/SubCategory";
import PlanPage from "./screens/auth/planPage";
import ServiceScreen from "./screens/ServiceScreen/ServiceScreen";
import MyQrCode from "./screens/MyQrCode/MyQrCode";
import ChangePassword from "./screens/ChangePassword/ChangePassword";
import DoctorAppointment from "./screens/doctorappointment/DoctorAppointment";
import NewAppointment from "./screens/doctorappointment/NewAppointment";
import CloseAppointment from "./screens/doctorappointment/CloseAppointment";
import AcceptedAppointment from "./screens/doctorappointment/AcceptedAppointment";
import CancelAppointment from "./screens/doctorappointment/CancelAppointment";
import UserDashBoard from "./screens/UserDashBoard/UserDashBoard";
import MyTransaction from "./screens/myTransaction/MyTransaction";
import MessageBox from "./screens/MessageBox/MessageBox";
import EnquiryList from "./screens/EnquiryList/EnquiryList";
import ScanQrCode from "./screens/ScanQrCode/ScanQrCode";
import OfferDetails from "./screens/OfferDetails/OfferDetails";
import ForgetPassword from "./screens/forgetPassword/ForgetPassword";
import WhatsAppList from "./screens/EnquiryList/WhatsAppList";
import CallList from "./screens/EnquiryList/CallList";
import Addnewpesent from "./screens/Adminpesents/Addnewpesent";
import PesentDatile from "./screens/ViewpesentName/PesentDatile";
import BookAmbulanceScreen from "./screens/bookAmbulance/BookAmbulanceScreen";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{ ...TransitionPresets.DefaultTransition }}
            />
        </Drawer.Navigator>
    );
};

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
    );
};

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="MainDrawer" component={DrawerNavigation} />
            <Stack.Screen
                name="SearchResults"
                component={SearchResultsScreen}
            />
            <Stack.Screen
                name="HelpAndSupport"
                component={HeplAndSupportScreen}
                // options={{ swipeEnabled: false }}
            />
<Stack.Screen name="ambulance" component={BookAmbulanceScreen} />
            <Stack.Screen
                name="Notifications"
                component={NotificationsScreen}
            />
            <Stack.Screen name="OfferDetails" component={OfferDetails} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ ...TransitionPresets.DefaultTransition }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="EnquiryList" component={EnquiryList} />
            <Stack.Screen name="WhatsAppList" component={WhatsAppList} />
            <Stack.Screen name="CallList" component={CallList} />
            <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
            <Stack.Screen name="Myappoiment" component={Myappoiment} />
            <Stack.Screen name="MyQrCode" component={MyQrCode} />
            <Stack.Screen name="ScanQrCode" component={ScanQrCode} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="DoctorAppointment" component={DoctorAppointment} />
            <Stack.Screen name="NewAppointment" component={NewAppointment} />
            <Stack.Screen name="CloseAppointment" component={CloseAppointment} />
            <Stack.Screen name="AcceptedAppointment" component={AcceptedAppointment} />
            <Stack.Screen name="CancelAppointment" component={CancelAppointment} />
            <Stack.Screen name="MyTransaction" component={MyTransaction} />
            <Stack.Screen name="UserDashBoard" component={UserDashBoard} />
            <Stack.Screen name="MessageBox" component={MessageBox} />
            <Stack.Screen name="TimeSloats" component={TimeSloats} />
            <Stack.Screen name="Addnewpesent" component={Addnewpesent} />
            <Stack.Screen name="PesentDatile" component={PesentDatile} />

            <Stack.Screen name="SubCategory" component={SubCategory} />
            <Stack.Screen name="PlanPage" component={PlanPage} />

            <Stack.Screen
                name="profectional"
                component={ProfectionalProfileScreen}
            />
            <Stack.Screen
                name="pendingRequest"
                component={PendingRequestScreen}
            />
            <Stack.Screen
                name="upcommingcall"
                component={UpCommingCallScreen}
            />
            <Stack.Screen
                name="TermsAndConditions"
                component={TermsAndConditionsScreen}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ swipeEnabled: false }}
            />
            <Stack.Screen
                name="transition"
                component={TransactionScreen}
                options={{ swipeEnabled: false }}
            />
            <Stack.Screen
                name="WebViewBox"
                component={WebViewBox}
                options={{ swipeEnabled: false }}
            />
            <Stack.Screen
                name="pendingForPayment"
                component={PendingForPaymentScreen}
                options={{ swipeEnabled: false }}
            />
        </Stack.Navigator>
    );
};

function MyApp() {
    const navigationRef = useRef();
    const routeNameRef = useRef();

    const onStateChange = (state) => {
        // const currentRouteName =
        //     navigationRef.current.getCurrentRoute().name || "Loading";
        // if (
        //     !["Loading", "Splash", "Login", "Register"].includes(
        //         currentRouteName
        //     )
        // ) {
        //     __postApiData(`api/home/valid_user`)
        //         .then((res) => {
        //             if (res.response.response_code == "500") {
        //                 navigationRef.current.navigate("Login");
        //                 AsyncStorage.clear().then().catch();
        //             }
        //         })
        //         .catch((error) => {});
        // }
        // routeNameRef.current = currentRouteName;
    };
    return (
        <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen
                    name="AuthStack"
                    component={AuthStack}
                    options={{ ...TransitionPresets.DefaultTransition }}
                />
                <Stack.Screen
                    name="AppStack"
                    component={AppStack}
                    options={{ ...TransitionPresets.DefaultTransition }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyApp;

//#0ccb8f