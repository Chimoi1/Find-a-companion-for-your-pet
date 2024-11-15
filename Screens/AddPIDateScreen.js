import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';

const AddPIDateScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { petImage } = route.params;

  const [birthday, setBirthday] = useState(new Date(2019, 10, 3));
  const [adoptionDate, setAdoptionDate] = useState(new Date(2020, 0, 6));
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSelectingBirthday, setIsSelectingBirthday] = useState(true);

  const openCalendar = (isBirthday) => {
    setIsSelectingBirthday(isBirthday);
    setIsCalendarVisible(true);
  };

  const closeCalendar = () => {
    setIsCalendarVisible(false);
  };

  const handleContinue = async () => {
    try {
      // Lưu các ngày vào AsyncStorage
      await AsyncStorage.setItem('birthday', birthday.toISOString());
      await AsyncStorage.setItem('adoptionDate', adoptionDate.toISOString());

      console.log('Birthday saved:', birthday);
      console.log('Adoption Date saved:', adoptionDate);

      // Điều hướng đến màn hình tiếp theo
      navigation.navigate('AddPCaretakersScreen', { petImage });
    } catch (error) {
      console.error('Error saving dates:', error);
    }
  };

  const formatDate = (date) => {
    return date ? `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}` : '';
  };

  const handleDaySelect = (day) => {
    const updatedDate = new Date(selectedDate.setFullYear(day.year, day.month - 1, day.day));
    setSelectedDate(updatedDate);

    if (isSelectingBirthday) {
      setBirthday(updatedDate);
    } else {
      setAdoptionDate(updatedDate);
    }
    closeCalendar();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {isCalendarVisible && (
        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDate}
            markedDates={{
              [selectedDate.toISOString().split('T')[0]]: {
                selected: true,
                selectedColor: 'blue',
                selectedTextColor: 'white',
              },
            }}
            onDayPress={(day) => handleDaySelect(day)}
            monthFormat={'yyyy MM'}
          />
          <TouchableOpacity onPress={closeCalendar}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerText}>Hồ sơ thú cưng</Text>
            <Text style={styles.subtitleText}>Ngày quan trọng</Text>
          </View>
          <Text style={styles.stepText}>
            <Text style={styles.stepNumber}>Bước 7</Text>
            <Text style={styles.stepTotal}>/8</Text>
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '87.5%' }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.petImageContainer}>
          <Image source={require('../assets/AddProfileScreen/circle-image.png')} style={styles.circleImage} />
          <Image source={petImage ? { uri: petImage } : require('../assets/AddProfileScreen/pet-image.png')} style={styles.petImage} />
        </View>

        <Text style={styles.promptText}>Ngày đặc biệt</Text>

        {/* Birthday Section with Icon */}
        <TouchableOpacity style={styles.dateContainer} onPress={() => openCalendar(true)}>
          <Image source={require('../assets/AddProfileScreen/birthday-icon.png')} style={styles.birthdayIcon} />
          <View style={styles.dateTextContainer}>
            <Text style={styles.dateLabel}>Sinh nhật</Text>
            <Text style={styles.dateValue}>{formatDate(birthday)}</Text>
          </View>
          <Text style={styles.dateAge}>{new Date().getFullYear() - birthday.getFullYear()} y.o</Text>
        </TouchableOpacity>

        {/* Adoption Date Section with Icon */}
        <TouchableOpacity style={styles.dateContainer} onPress={() => openCalendar(false)}>
          <Image source={require('../assets/AddProfileScreen/adoption-icon.png')} style={styles.adoptionIcon} />
          <View style={styles.dateTextContainer}>
            <Text style={styles.dateLabel}>Ngày nhận nuôi</Text>
            <Text style={styles.dateValue}>{formatDate(adoptionDate)}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Tiếp tục</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../assets/HomeScreens/home-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('CalendarScreen')}>
          <Image source={require('../assets/HomeScreens/calendar-icon.png')} style={styles.footerImage} />
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 150,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginVertical: 20,
  },
  backButton: {
    fontSize: 30,
    color: '#888',
  },
  titleContainer: {
    alignItems: 'center',
    marginLeft: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitleText: {
    fontSize: 16,
    color: '#888',
  },
  stepText: {
    fontSize: 17,
    color: '#888',
  },
  stepNumber: {
    color: '#000',
  },
  stepTotal: {
    color: '#888',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginVertical: 20,
  },
  progress: {
    height: '100%',
    backgroundColor: '#ffd700',
    borderRadius: 10,
  },
  petImageContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  circleImage: {
    position: 'absolute',
    width: 270,
    height: 270,
    bottom: -10,
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#ddd',
    marginBottom: 50,
  },
  promptText: { 
    textAlign: 'center', 
    fontSize: 18, 
    color: '#333', 
    marginBottom: 20 
  },
  dateContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    marginBottom: 15 
  },
  dateTextContainer: { 
    flex: 1 
  },
  dateLabel: { 
    fontSize: 16, 
    color: '#888' 
  },
  dateValue: { 
    fontSize: 16, 
    color: '#333', 
    fontWeight: 'bold' 
  },
  dateAge: { 
    fontSize: 16,
    color: '#888' 
  },
  birthdayIcon: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  adoptionIcon: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  calendarContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -200 }], // Đặt lịch giữa màn hình
    width: 300,
    height: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, // Đổ bóng cho Android
    zIndex: 1,
  },
  closeButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#f00',
    marginTop: 10,
  },
  continueButton: {
    backgroundColor: '#0448ab',
    paddingVertical: 25,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 122,
    left: 16,
    right: 16,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
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
    fontSize: 12,
    color: '#888',
  },
});

export default AddPIDateScreen;
