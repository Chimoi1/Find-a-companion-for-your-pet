import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BookingSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDate, selectedTime } = route.params || {}; // Nhận thời gian từ params

  const handleComplete = () => {
    navigation.navigate('HomeScreen'); // Điều hướng về màn hình Trang chủ
  };

  const handleEditBooking = () => {
    navigation.navigate('CalendarBookScreen'); // Điều hướng về màn hình đặt lịch để sửa hẹn
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Đặt lịch khám bệnh</Text>
      </View>

      {/* Success Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.successIcon}>
          <Image source={require('../assets/success-icon.png')} style={styles.iconImage} />
        </View>
      </View>

      {/* Success Message */}
      <Text style={styles.successTitle}>Đặt lịch thành công</Text>
      <Text style={styles.successMessage}>
        Bạn đã đặt lịch tại Bệnh viện Thú y Hà Nội,  BS. Đặng Mai Linh.
      </Text>
      <Text style={styles.appointmentTime}>Thời gian: {selectedTime || '10:00 Sáng'}, {selectedDate || '17/07/2024'}</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
        <Text style={styles.buttonText}>Xong</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton} onPress={handleEditBooking}>
        <Text style={styles.editText}>Sửa lịch hẹn</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../assets/HomeScreens/home-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('CalendarScreen')}>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    fontSize: 20,
    color: '#444',
  },
  title: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 70,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  successIcon: {
    width: 180,
    height: 180,
    borderRadius: 140,
    backgroundColor: '#004AAD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 110,
    height: 110,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004AAD',
    textAlign: 'center',
    marginTop: 20,
  },
  successMessage: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 30,
  },
  appointmentTime: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  completeButton: {
    backgroundColor: '#004AAD',
    paddingVertical: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  editText: {
    color: '#004AAD',
    fontSize: 16,
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
});

export default BookingSuccessScreen;
