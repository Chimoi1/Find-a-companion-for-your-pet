import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarBookScreen = () => {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const defaultTimes = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'];

  const handleDateSelect = async (date) => {
    const chosenDate = date.dateString;
    const [year, month, day] = chosenDate.split('-'); // Tách các phần của ngày tháng
    const formattedDate = `${day}/${month}/${year}`; // Định dạng lại thành dd/mm/yyyy

    setSelectedDate(chosenDate);
    setSelectedTime(null); // Reset time when selecting a new date

    // Lưu selectedDate vào AsyncStorage
    try {
      await AsyncStorage.setItem('selectedDate', formattedDate);
    } catch (error) {
      console.error('Error saving date to AsyncStorage:', error);
    }
  };

  const handleTimeSelect = async (time) => {
    setSelectedTime(time);

    // Lưu selectedTime vào AsyncStorage
    try {
      await AsyncStorage.setItem('selectedTime', time);
    } catch (error) {
      console.error('Error saving time to AsyncStorage:', error);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Thông báo', 'Vui lòng chọn ngày và thời gian để đặt lịch.');
      return;
    }
    // Điều hướng sang trang tiếp theo
    navigation.navigate('ConfirmScreen');
  };

  return (
    <View style={styles.container}>
      {/* Header with Title, Back Button, and Image Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}> ← </Text>
        </TouchableOpacity>

        <Text style={styles.title}>Đặt lịch khám thú y</Text>

        <TouchableOpacity style={styles.additionalButton}>
          <Image source={require('../assets/CalenderScreen/VeterinarianScreen/your-image.png')} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* Doctor Info Section */}
      <View style={styles.doctorInfo}>
        <Image source={require('../assets/CalenderScreen/VeterinarianScreen/veterinarian-avatar.png')} style={styles.doctorAvatar} />
        <View style={styles.doctorTextContainer}>
          <Text style={styles.doctorName}>BS. Đặng Mai Linh</Text>
          <Text style={styles.doctorSpecialty}>Bệnh viện Thú y Hà Nội</Text>
          <View style={styles.doctorRate}>
            <Image source={require('../assets/CalenderScreen/VeterinarianScreen/pet-rate.png')} style={styles.doctorIcon} resizeMode="contain" />
            <Text style={styles.doctorSpecialty}>4.8</Text>
            <Image source={require('../assets/CalenderScreen/VeterinarianScreen/address-tick.png')} style={styles.doctorIcon} resizeMode="contain" />
            <Text style={styles.doctorSpecialty}>12 km</Text>
          </View>
        </View>
        <View style={styles.contactIconsContainer}>
          <TouchableOpacity style={styles.contactIcon} onPress={() => navigation.navigate('CallScreen')}>
            <Image source={require('../assets/CalenderScreen/VeterinarianScreen/call-icon.png')} style={styles.contactIconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactIcon} onPress={() => navigation.navigate('ChatScreen2')}>
            <Image source={require('../assets/CalenderScreen/VeterinarianScreen/message-icon.png')} style={styles.contactIconImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ScrollView for Calendar and Time Selection */}
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.timeTitle}>Chọn ngày:</Text>
        <View style={styles.calendarWrapper}>
          <Calendar
            current={new Date().toISOString().split('T')[0]}
            minDate={new Date().toISOString().split('T')[0]}
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#1c2a3a', selectedTextColor: '#fff' },
            }}
          />
        </View>

        {/* Time Selection */}
        {selectedDate && (
          <View style={styles.timeContainer}>
            <Text style={styles.timeTitle}>Chọn thời gian:</Text>
            <View style={styles.timeRow}>
              {defaultTimes.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[styles.timeButton, selectedTime === time && styles.selectedTimeButton]}
                  onPress={() => handleTimeSelect(time)}
                >
                  <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Book Appointment Button */}
      <TouchableOpacity
        style={[
          styles.bookButton,
          selectedDate && selectedTime ? styles.activeBookButton : styles.inactiveBookButton,
        ]}
        onPress={handleBookAppointment}
        disabled={!selectedDate || !selectedTime} // Disable nếu chưa chọn ngày hoặc thời gian
      >
        <Text style={styles.bookButtonText}>Đặt lịch</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../assets/HomeScreens/home-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Image source={require('../assets/HomeScreens/calendar-icon-active.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Đặt lịch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('ProfileScreen')}>
          <Image source={require('../assets/HomeScreens/profile-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('ChatScreen')}>
          <Image source={require('../assets/HomeScreens/chat-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('AccountScreen')}>
          <Image source={require('../assets/HomeScreens/account-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Tài khoản</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    width: '100%', // Ensure it uses the full width of the screen
  },
  backButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 12,
  },
  backIcon: {
    fontSize: 30,
    color: '#444',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0448ab',
    textAlign: 'center',
    flex: 1, // Allow the title to take available space
  },
  additionalButton: {
    padding: 1,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  icon: {
    width: 27,
    height: 26,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 2,
  },
  doctorAvatar: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  doctorTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  doctorName: {
    fontSize: 17,
    color: '#0448ab',
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#0448ab',
  },
  doctorRate: {
    flexDirection: 'row',
    fontSize: 16,
    color: '#0448ab',
  },
  doctorIcon: {
    width: 16,
    height: 16,
  },
  contactIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  contactIcon: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#0448ab',
    borderRadius: 10,
  },
  contactIconImage: {
    width: 24,
    height: 24,
  },
  timeContainer: {
    marginBottom: 50,
  },
  timeTitle: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  timeButton: {
    backgroundColor: '#fafafb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    width: '30%', // Adjust width to take 1/3 of the screen width
    marginBottom: 10, // Space between rows
  },
  selectedTimeButton: {
    backgroundColor: '#1c2a3a',
  },
  timeText: {
    fontSize: 16,
    color: '#666',
  },
  selectedTimeText: {
    color: '#fff',
  },
  bookButton: {
    paddingVertical: 22,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
    left: 10,
    right: 10,
    marginHorizontal: 20,
  },
  activeBookButton: {
    backgroundColor: '#0448ab',
  },
  bookButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '110%',
  },
  footerIcon: {
    alignItems: 'center',
  },
  footerImage: {
    width: 24,
    height: 24,
  },
  footerText: {
    marginTop: 5,
    fontSize: 12,
  },
  calendarWrapper: {
    padding: 10,
    marginTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginHorizontal: 7,
    borderRadius: 20, // Rounded corners for calendar container
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Adding shadow effect
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100, // Add space at the bottom to prevent overlap
  },
  timeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default CalendarBookScreen;
