import React, { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    ActivityIndicator, 
    StyleSheet, 
    ImageBackground, 
    Dimensions, 
    Modal, 
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert
} from 'react-native';
import { __getApiData, __postApiData } from "../../utils/api";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get("window");

const NewAppointment = ({ navigation }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [status, setStatus] = useState("0");
    const [bookingNumber, setBookingNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const statusOptions = React.useMemo(() => [
        { value: '0', label: 'Pending', color: Colors.orangeColor },
        { value: '1', label: 'Accepted', color: Colors.greenColor },
        { value: '2', label: 'Closed', color: Colors.grayColor },
        { value: '3', label: 'Canceled', color: Colors.redColor }
    ], []);

    const getStatusStyle = useCallback((status) => {
        const option = statusOptions.find(opt => opt.value === status);
        return option 
            ? { text: option.label, color: option.color }
            : { text: 'Unknown', color: Colors.blackColor };
    }, [statusOptions]);

    const fetchBookings = useCallback(() => {
        setLoading(true);
        __getApiData('/api/booking/my_bookings')
            .then((res) => {
                if (res?.response?.response_code === "200" && res?.data?.aaData) {
                    const pendingBookings = res?.data?.aaData.filter(item => item.status === '0');
                    setBookings(pendingBookings);
                    setError(null);
                } else {
                    setError('No bookings found');
                    setBookings([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Fetch Bookings Error:", error);
                setError('Failed to fetch bookings');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const updateBooking = () => {
        if (!bookingNumber.trim()) {
            Alert.alert('Error', 'Please enter a booking number');
            return;
        }

        if (!status) {
            Alert.alert('Error', 'Please select a status');
            return;
        }

        const updatedData = {
            booking_no: bookingNumber.trim(),
            status: status,
            id: selectedBooking?.id,
        };
       
        __postApiData("/api/booking/update_booking_status", updatedData)
        .then((response) => {
            console.log("API Response:", response);  // Log the response for debugging
            if (response.data) {
                Alert.alert('Booking updated successfully');
                fetchBookings(); // Refresh the bookings list after update
                setModalVisible(false); // Close modal only after success
            } else {
                Alert.alert(
                    'Update Failed', 
                    response?.response?.response_message || 'Failed to update booking'
                );
            }
        })
        .catch((error) => {
            console.error("Update Booking Error:", error);
            Alert.alert(
                'Error', 
                error?.response?.data?.message || 'Network or request error'
            );
        });


    };

    const renderBookingItem = useCallback(({ item }) => {
        const statusStyle = getStatusStyle(item.status);
        return (
            <View style={styles.cardContainer}>
                <View style={styles.bookingDetails}>
                    <TouchableOpacity 
                        style={styles.updateButton1} 
                        onPress={() => openUpdateModal(item)}
                    >
                        <Text style={{fontWeight: 'bold'}}>Booking No: {item.booking_no}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.status, { color: statusStyle.color, fontWeight: 'bold' }]}>
                        {statusStyle.text}
                    </Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.infoRow}>
                    <Text style={styles.labelText}>Name:</Text>
                    <Text style={styles.valueText}>{item.customer_name || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.labelText}>Patient Name:</Text>
                    <Text style={styles.valueText}>{item.patient_name || 'N/A'}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.labelText}>Patient Gender:</Text>
                    <Text style={styles.valueText}>{item.patient_gender || 'N/A'}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.labelText}>Patient Age:</Text>
                    <Text style={styles.valueText}>{item.patient_age || 'N/A'}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.labelText}>Date:</Text>
                    <Text style={styles.valueText}>{item.booking_date || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.labelText}>Time:</Text>
                    <Text style={styles.valueText}>{item.time || 'N/A'}</Text>
                </View>
                
            </View>
        );
    }, [getStatusStyle]);

    const openUpdateModal = useCallback((item) => {
        setSelectedBooking(item);
        setBookingNumber(item.booking_no || ""); // Initialize booking number correctly
        setStatus(item.status || '0'); // Default value of status if not provided
        setModalVisible(true); // Open modal explicitly
    }, []);

    const BookingModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // Close modal explicitly
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Update Booking</Text>
                            <TouchableOpacity 
                                onPress={() => setModalVisible(false)} // Close modal explicitly
                                style={styles.modalCloseButton}
                            >
                                <MaterialIcons name="close" size={24} color={Colors.blackColor} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView contentContainerStyle={styles.modalBody} keyboardShouldPersistTaps="handled">
                            <Text style={styles.pickerLabel}>Booking Number</Text>
                            <TextInput
                                style={styles.input}
                                value={bookingNumber}
                                placeholder="Enter Booking Number"
                                onChangeText={setBookingNumber}
                                keyboardType="numeric"
                            />
                            <View style={styles.pickerContainer}>
                                <Text style={styles.pickerLabel}>Select Status</Text>
                                <View style={styles.pickerWrapper}>
                                    <Picker
                                        selectedValue={status}
                                        onValueChange={(itemValue) => setStatus(itemValue)}
                                        style={styles.picker}
                                        mode="dropdown"
                                    >
                                        {statusOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} color={option.color} />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                            <TouchableOpacity 
                                style={styles.updateButton} 
                                onPress={updateBooking}
                            >
                                <Text style={styles.updateButtonText}>Update</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primaryColor} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity 
                    style={styles.retryButton} 
                    onPress={fetchBookings}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <MaterialIcons
                    name="arrow-back-ios"
                    size={20}
                    color={Colors.whiteColor}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTitle}>My Pending Appointment</Text>
            </View>
        );
    };

    return (
        <ImageBackground 
            source={require('../../assets/images/greens.png')} 
            style={styles.backgroundContainer}
        >
            {renderHeader()}
            <FlatList
           data={bookings}
           renderItem={renderBookingItem}
           keyExtractor={(item, index) => {
        // Create a unique key based on multiple fields, including fallback for null values
         return `${item.booking_id || 'fallback'}_${item.customer_name || 'unknown'}_${item.booking_date || 'unknown'}_${index}`;
    }}
    contentContainerStyle={styles.listContainer}
    ListEmptyComponent={
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No new bookings available</Text>
        </View>
    }
/>
 {BookingModal()}
</ImageBackground>
    );
};
// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    headerContainer: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 0.5,
    },
    headerTitle: {
        marginLeft: Sizes.fixPadding - 5.0,
        ...Fonts.blackColor18SemiBold,
        color: Colors.whiteColor,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    listContainer: {
        padding: 10,
    },
    cardContainer: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "white",
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    line: {
        borderBottomWidth: 1,
        borderColor: 'gray',
       margin:3
    },
    bookingDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    patientName: {
        fontSize: 14,
        marginVertical:1,
    },
    status: {
        fontSize: 14,
        marginVertical: 5,
    },
    date: {
        fontSize: 14,
        marginVertical: 5,
    },
    time: {
        fontSize: 14,
        marginVertical: 5,
    },
    updateButton: {
        backgroundColor: Colors.primaryColor,
        padding: 10,
        borderRadius: 5,
        
    },
    updateButton1: {
        backgroundColor: Colors.grayColor,
        padding: 10,
        borderRadius: 5,
    },
    updateButtonText: {
        color: Colors.whiteColor,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    backgroundContainer: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: width - 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalCloseButton: {
        padding: 10,
    },
    modalBody: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    pickerContainer: {
        marginBottom: 20,
    },
    picker: {
        width: '100%',
        height: 50,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: Colors.grayColor,
        marginBottom: 15,
    },
    retryButton: {
        backgroundColor: Colors.primaryColor,
        padding: 10,
        borderRadius: 5,
        width: width * 0.5,
        alignItems: 'center',
    },
    retryButtonText: {
        color: Colors.whiteColor,
        fontWeight: 'bold',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    pickerLabel: {
        fontSize: 14,
        marginBottom: 5,
        color: Colors.blackColor,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    labelText: {
        fontWeight: '600',
        color: '#333',
        width: 120,
        fontSize: 14,
    },
    valueText: {
        color: '#666',
        fontSize: 14,
        flex: 1,
    }
});

export default NewAppointment;