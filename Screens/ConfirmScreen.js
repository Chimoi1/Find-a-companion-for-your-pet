import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const ConfirmScreen = () => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [petProfile, setPetProfile] = useState(null);
    

  useEffect(() => {
    const loadAppointmentData = async () => {
      try {
        const date = await AsyncStorage.getItem('selectedDate');
        const time = await AsyncStorage.getItem('selectedTime');
        
        if (!date || !time) {
          Alert.alert('Thông báo', 'Vui lòng chọn ngày và giờ trước.');
          navigation.navigate('CalendarBookScreen');
        } else {
          setSelectedDate(date);
          setSelectedTime(time);
        }
      } catch (error) {
        console.error('Error loading appointment data:', error);
      }
    };

    const loadPetProfile = async () => {
        try {
          const savedProfile = await AsyncStorage.getItem('petProfile');
          if (savedProfile) {
            setPetProfile(JSON.parse(savedProfile));
          } else {
            Alert.alert('Thông báo', 'Không tìm thấy hồ sơ thú cưng.');
            navigation.navigate('ProfileAbout2');
          }
        } catch (error) {
          console.error('Error loading pet profile:', error);
        }
      };
  
      loadAppointmentData();
      loadPetProfile();
    }, []);

  const doctorProfile = {
    name: 'BS. Đặng Mai Linh',
    clinic: 'Bệnh viện Thú y Hà Nội',
    rating: '4.8',
    distance: '12 km',
    doctorImage: require('../assets/ConfirmScreen/veterinarian-avatar.png'),
  };

  const handleConfirm = () => {
    navigation.navigate('BookingSuccessScreen', {
      selectedDate,
      selectedTime,
    });
  };
  

  const getSizeCategory = (weight) => {
    if (!weight) return '';
    const parsedWeight = parseFloat(weight);
    if (isNaN(parsedWeight)) return '';

    if (parsedWeight <= 14) {
      return 'Nhỏ';
    } else if (parsedWeight <= 25) {
      return 'Trung bình';
    } else {
      return 'Lớn';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}> ← </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Đặt lịch khám bệnh</Text>
      </View>

      {/* Doctor Information Section */}
      <View style={styles.doctorInfoContainer}>
        <View style={styles.doctorDetailsLeft}>
          <Image source={doctorProfile.doctorImage} style={styles.doctorImage} />
          <View>
            <Text style={styles.doctorName}>{doctorProfile.name}</Text>
            <Text style={styles.doctorClinic}>{doctorProfile.clinic}</Text>
            <View style={styles.appointmentDetails}>
              <Image source={require('../assets/ConfirmScreen/pet-rate.png')} style={styles.icon} />
              <Text style={styles.rating}>{doctorProfile.rating}</Text>
              <Image source={require('../assets/ConfirmScreen/address-tick.png')} style={styles.icon} />
              <Text style={styles.distance}>{doctorProfile.distance}</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Appointment Information */}
        <View style={styles.appointmentInfoRight}>
          <Image source={require('../assets/ConfirmScreen/calendar-icon.png')} style={styles.calendarIcon} />
          <Text style={styles.appointmentDate}>{selectedDate}</Text>
          <Text style={styles.appointmentTime}>{selectedTime}</Text>
        </View>
      </View>

      {/* Scrollable Pet Profile Section */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {petProfile && (
          <View style={styles.petProfileContainer}>
            <View style={styles.petInfoRow}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: petProfile.petImage }} style={styles.petImage} />
              </View>
              <View>
                <Text style={styles.petName}>{petProfile.petName}</Text>
                <Text style={styles.petSpecies}>{`${petProfile.species} | ${petProfile.breed}`}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Đặc điểm</Text>
              <Text style={styles.characteristicsText}>{petProfile.characteristics}</Text>
              <DetailRow label="Giới tính" value={petProfile.gender} />
              <DetailRow label="Kích cỡ" value={getSizeCategory(petProfile.weight)} />
              <DetailRow label="Cân nặng" value={petProfile.weight} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Người chăm sóc</Text>
              <View style={styles.caretakerContainer}>
                <Image source={require('../assets/HomeScreens/avatar-image.png')} style={styles.caretakerImage} />
                <View>
                  <Text style={styles.caretakerName}>{petProfile.ownerName}</Text>
                  <Text style={styles.caretakerContact}>{petProfile.ownerEmail}</Text>
                  <Text style={styles.caretakerContact}>{petProfile.ownerPhoneNumber}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Xác nhận</Text>
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../assets/HomeScreens/home-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('CalendarScreen')}>
          <Image source={require('../assets/HomeScreens/calendar-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Đặt lịch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('ProfileAbout2')}>
          <Image source={require('../assets/HomeScreens/profile-icon-active.png')} style={styles.footerImage} />
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

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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
    textAlign: 'center',
    flex: 1, // Allow the title to take available space
    marginRight: 30,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    resizeMode: 'cover',
    marginRight: 10,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorClinic: {
    fontSize: 14,
    color: '#666',
  },
  appointmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    margin: 5,
  },
  appointmentDate: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  scrollContainer: {
    paddingBottom: 80,
    marginTop: 50,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 20, // Space between image and text
  },
  petInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures equal spacing across the row
    marginBottom: 15,
  },
  petImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  petSpecies: {
    fontSize: 16,
    color: '#666',
  },
  
  petProfileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  section: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  characteristicsText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  caretakerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  caretakerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caretakerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  caretakerContact: {
    fontSize: 14,
    color: '#666',
  },
  confirmButton: {
    backgroundColor: '#0448ab',
    paddingVertical: 25,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 122,
    left: 16,
    right: 16,
  },
  confirmButtonText: {
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
  doctorInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  doctorDetailsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 3,
  },
  rating: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  distance: {
    fontSize: 14,
    color: '#333',
  },
  divider: {
    width: 1,
    height: '80%', // Adjust as needed
    backgroundColor: '#ddd',
    marginHorizontal: 15, // Space between the divider and other sections
  },
  
  appointmentInfoRight: {
    alignItems: 'flex-end',
  },
  calendarIcon: {
    width: 20,
    height: 20,
    marginBottom: 5,
    marginRight: 25,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  
});

export default ConfirmScreen;
