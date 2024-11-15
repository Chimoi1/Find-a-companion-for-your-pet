import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const VeterinarianScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const clinicData = route.params?.clinicData;

  const scrollRef = useRef(null);
  const scrollStep = 100;

  // State to manage selected date
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false); // State for the heart icon

  // Sample date data
  const dateData = [
    { day: 'Thứ 2', date: 1 },
    { day: 'Thứ 3', date: 2 },
    { day: 'Thứ 4', date: 3 },
    { day: 'Thứ 5', date: 4 },
    { day: 'Thứ 6', date: 5 },
    { day: 'Thứ 7', date: 6 },
    { day: 'CN', date: 7 },
    { day: 'Thứ 2', date: 8 },
    { day: 'Thứ 3', date: 9 },
    { day: 'Thứ 4', date: 10 },
    { day: 'Thứ 5', date: 11 },
    { day: 'Thứ 6', date: 12 },
    { day: 'Thứ 7', date: 13 },
    { day: 'CN', date: 14 },
    { day: 'Thứ 2', date: 15 },
    { day: 'Thứ 3', date: 16 },
    { day: 'Thứ 4', date: 17 },
    { day: 'Thứ 5', date: 18 },
    { day: 'Thứ 6', date: 19 },
    { day: 'Thứ 7', date: 20 },
    { day: 'CN', date: 21 },
    { day: 'Thứ 2', date: 22 },
    { day: 'Thứ 3', date: 23 },
    { day: 'Thứ 4', date: 24 },
    { day: 'Thứ 5', date: 25 },
    { day: 'Thứ 6', date: 26 },
    { day: 'Thứ 7', date: 27 },
    { day: 'CN', date: 28 },
    { day: 'Thứ 2', date: 29 },
  ];

  // Date selection handler
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Heart icon toggle handler
  const handleFavoriteToggle = () => {
    setIsFavorited((prev) => !prev); // Toggle the favorited state
  };

  // Navigate to CalendarBookScreen when "Đặt lịch" is clicked
  const handleBookAppointment = () => {
    // Passing selected date and clinic data to the CalendarBookScreen
    navigation.navigate('CalendarBookScreen', { selectedDate, clinicData });
  };

  // Navigate to CallScreen
  const handleCall = () => {
    navigation.navigate('CallScreen');
  };

  // Navigate to ChatScreen2
  const handleChat = () => {
    navigation.navigate('ChatScreen2');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/CalenderScreen/VeterinarianScreen/veterinarian-image.png')} style={styles.backgroundImage} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}> ← </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.clinicInfoContainer}>
          <Text style={styles.mainTitle}>BS. Đặng Mai Linh</Text>

          {/* Add specialized services under the name */}
          <View style={styles.servicesContainer}>
            <TouchableOpacity style={styles.serviceButton}>
              <Text style={styles.serviceText}>Huấn luyện</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton}>
              <Text style={styles.serviceText}>Dinh dưỡng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceButton}>
              <Text style={styles.serviceText}>Bệnh ngoài da</Text>
            </TouchableOpacity>
          </View>

          {/* Clinic Card */}
          <View style={styles.cardContainer}>
            <Image source={require('../assets/CalenderScreen/VeterinarianScreen/clinic1-image.png')} style={styles.clinicImage} />
            <View style={styles.clinicInfo}>
              <Text style={styles.clinicTitle}>{clinicData?.name || 'Thú y PetPro'}</Text>
              <View style={styles.clinicDetailContainer}>
                <Image source={require('../assets/CalenderScreen/VeterinarianScreen/location-icon.png')} style={styles.icon} />
                <Text style={styles.clinicAddress}>{clinicData?.address || '232 Kim Mã, Ba Đình, Hà Nội'}</Text>
              </View>
              <View style={styles.clinicRatingContainer}>
                <Image source={require('../assets/CalenderScreen/star-icon.png')} style={styles.icon} />
                <Text style={styles.clinicRating}>5.0 (58 đánh giá)</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.favoriteIcon} onPress={handleFavoriteToggle}>
              <Image 
                source={require('../assets/CalenderScreen/VeterinarianScreen/heart-icon.png')} 
                style={[styles.iconHeart, { tintColor: isFavorited ? 'red' : '#d2d4d8' }]} // Change color based on state
                resizeMode="contain" 
              />
            </TouchableOpacity>
          </View>
          
          {/* Date Selection Row */}
          <View style={styles.dateContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dateData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={selectedDate === item.date ? styles.selectedDateCircle : styles.dateCircle}
                  onPress={() => handleDateSelect(item.date)}
                >
                  <Text style={selectedDate === item.date ? styles.selectedDateText : styles.dateText}>{item.day}</Text>
                  <Text style={selectedDate === item.date ? styles.selectedDateNumber : styles.dateNumber}>{item.date}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              BS. Đặng Mai Linh
            </Text>
            <Text style={styles.descriptionText}>
              SĐT: 0976 986 910
            </Text>
            <Text style={styles.descriptionText}>
              Chuyên ngành: Da Liễu
            </Text>
            <Text style={styles.descriptionText}>
             Địa chỉ phòng khám: 232 Kim mã, Ba Đình, Hà Nội
            </Text>
            <Text style={styles.descriptionText}>
             Kinh nghiệm: 11 năm
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleChat}>
          <Image source={require('../assets/CalenderScreen/VeterinarianScreen/message-icon.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
          <Text style={styles.bookButtonText}>Đặt lịch</Text>
          <Image source={require('../assets/CalenderScreen/VeterinarianScreen/continue-icon.png')} style={styles.continueIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCall}>
          <Image source={require('../assets/CalenderScreen/VeterinarianScreen/call-icon.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>

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
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '75%',
    resizeMode: 'cover',
    zIndex: -1,
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  backButton: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 12,
    marginTop: 40,
    marginLeft: 20,
  },
  backIcon: {
    fontSize: 24,
    color: '#444',
  },
  scrollContent: {
    paddingBottom: 200,
  },
  clinicInfoContainer: {
    marginTop: '80%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#0448ab',
    shadowOffset: { width: 0, height: -100, },
    shadowOpacity: 0.4,
    shadowRadius: 50,
    elevation: 5,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0448ab',
    textAlign: 'center',
    marginVertical: 10,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  serviceButton: {
    backgroundColor: '#0448ab',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  serviceText: {
    fontSize: 14,
    color: 'white',
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 0,
    marginHorizontal: 10,
    elevation: 4,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  clinicImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
    borderColor: '#ddd',
  },
  clinicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    borderColor: '#ddd',
    padding: 5,
    borderRadius: 5,
  },
  clinicDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderColor: '#ddd',
    padding: 5,
    borderRadius: 5,
  },
  clinicAddress: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  clinicRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    padding: 5,
    borderRadius: 5,
  },
  clinicRating: {
    fontSize: 14,
    color: '#f5a623',
    marginLeft: 5,
  },
  icon: {
    width: 16,
    height: 16,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 4,
  },
  iconHeart: {
    width: 26,
    height: 26,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: -20,
    marginVertical: 20,
  },
  dateCircle: {
    padding: 10,
    backgroundColor: '#fafafb',
    borderRadius: 50,
    marginHorizontal: 5,
    alignItems: 'center',
    width: 60,
    height: 60,
    justifyContent: 'center',
    marginTop: 10,
  },
  selectedDateCircle: {
    padding: 10,
    backgroundColor: '#0448ab',
    borderRadius: 50,
    marginHorizontal: 5,
    alignItems: 'center',
    width: 60,
    height: 60,
    justifyContent: 'center',
    shadowColor: '#0448ab',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateText: {
    fontSize: 14,
    color: '#fff',
  },
  selectedDateNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: '#808080',
    paddingVertical: 5,
    textAlign: 'left',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#0448ab',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    elevation: 5,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  bookButton: {
    backgroundColor: '#0448ab',
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    height: 60,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  continueIcon: {
    width: 13,
    height: 13,
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 50,
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
    width: '100%',
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

export default VeterinarianScreen;
