import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';  // Importing Material Icons
import { Colors, Sizes } from '../../constants/styles';  // Assuming these are already defined in your styles

const PesentDatile = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          color={Colors.whiteColor}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Patient Details</Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/greens.png')}  // Adjust path to your image
      style={styles.container}
    >
      {renderHeader()}

      <View style={styles.contentContainer}>
        <Text style={styles.detailsText}>Patient Details will go here</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',  // Keeps content from being centered
    alignItems: 'center',
    paddingTop: Sizes.fixPadding * 4,  // Space for header
    paddingHorizontal: Sizes.fixPadding,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,  // Ensures the header stays on top
  },
  headerTitle: {
    marginLeft: Sizes.fixPadding,
    color: Colors.whiteColor,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',  // Centers the content vertically
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // White background with slight transparency
    padding: Sizes.fixPadding * 2,
    borderRadius: 10,
    marginTop: Sizes.fixPadding * 6,  // Space from header
  },
  detailsText: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PesentDatile;
