import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, Animated, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileAboutPet1 = () => {
  const navigation = useNavigation();
  const [petProfile, setPetProfile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [vaccineInfo, setVaccineInfo] = useState({
    appointmentDate: '',
    diseaseInfo: '',
    doctorName: '',
    note: '',
  });
  const [vaccines, setVaccines] = useState([]);
  const [activeVaccineIndex, setActiveVaccineIndex] = useState(null); // Track the active vaccine
  const slideAnim = useState(new Animated.Value(0))[0];

  // Function to parse dates in dd/mm/yyyy format
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // JavaScript months are 0-indexed
  };

  let formattedAppointmentDate = '';
  let formattedExpirationDate = '';

  if (activeVaccineIndex !== null && vaccines[activeVaccineIndex]?.appointmentDate) {
    const appointmentDateStr = vaccines[activeVaccineIndex].appointmentDate;

    // Parse the appointment date
    const appointmentDate = parseDate(appointmentDateStr);
    const expirationDate = new Date(appointmentDate);
    expirationDate.setFullYear(appointmentDate.getFullYear() + 1);

    // Format both dates as dd/mm/yyyy
    formattedAppointmentDate = `${String(appointmentDate.getDate()).padStart(2, '0')}/${String(appointmentDate.getMonth() + 1).padStart(2, '0')}/${appointmentDate.getFullYear()}`;
    formattedExpirationDate = `${String(expirationDate.getDate()).padStart(2, '0')}/${String(expirationDate.getMonth() + 1).padStart(2, '0')}/${expirationDate.getFullYear()}`;
  }
  useEffect(() => {
    const loadPetProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('petProfile');
        if (savedProfile) {
          setPetProfile(JSON.parse(savedProfile));
        } else {
          Alert.alert('Thông báo', 'Chưa có hồ sơ thú cưng. Vui lòng tạo hồ sơ.');
        }
      } catch (error) {
        console.error('Error loading pet profile:', error);
        Alert.alert('Lỗi', 'Không thể tải hồ sơ thú cưng.');
      }
    };
  
    const loadVaccines = async () => {
      try {
        const storedVaccines = await AsyncStorage.getItem('vaccines');
        if (storedVaccines) {
          const parsedVaccines = JSON.parse(storedVaccines);
  
          // Sort vaccines by appointmentDate in ascending order
          parsedVaccines.sort((a, b) => {
            const dateA = new Date(a.appointmentDate.split('/').reverse().join('-'));
            const dateB = new Date(b.appointmentDate.split('/').reverse().join('-'));
            return dateB - dateA; // Change to descending order
          });
          
  
          setVaccines(parsedVaccines);
        }
      } catch (error) {
        console.error('Error loading vaccine data:', error);
      }
    };
  
    loadPetProfile();
    loadVaccines();
  }, []);
  


  const handleAddVaccine = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  // Save vaccine information to AsyncStorage
  const handleSaveVaccine = async () => {
    const newVaccine = {
      appointmentDate: vaccineInfo.appointmentDate,
      diseaseInfo: vaccineInfo.diseaseInfo,
      doctorName: vaccineInfo.doctorName,
      note: vaccineInfo.note,
    };

    try {
      let storedVaccines = await AsyncStorage.getItem('vaccines');
      storedVaccines = storedVaccines ? JSON.parse(storedVaccines) : [];
      storedVaccines.push(newVaccine);

      await AsyncStorage.setItem('vaccines', JSON.stringify(storedVaccines));
      setVaccines(storedVaccines);  // Update state to show new vaccine data
      Alert.alert('Thông báo', 'Thông tin Vắc-xin đã được lưu.');
      closeModal();
    } catch (error) {
      console.error('Error saving vaccine info:', error);
      Alert.alert('Lỗi', 'Không thể lưu thông tin Vắc-xin.');
    }
  };

  // Handle deleting a vaccine record
  const handleDeleteVaccine = async (index) => {
    Alert.alert(
      'Xóa hồ sơ',
      'Bạn có chắc chắn muốn xóa hồ sơ vắc-xin này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: async () => {
            const updatedVaccines = vaccines.filter((_, i) => i !== index); // Remove vaccine at the given index
            try {
              await AsyncStorage.setItem('vaccines', JSON.stringify(updatedVaccines));
              setVaccines(updatedVaccines); // Update state to reflect changes
              Alert.alert('Thông báo', 'Hồ sơ vắc-xin đã được xóa.');
            } catch (error) {
              console.error('Error deleting vaccine info:', error);
              Alert.alert('Lỗi', 'Không thể xóa hồ sơ vắc-xin.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Toggle the full details view of a vaccine record
  const toggleVaccineDetails = (index) => {
    if (activeVaccineIndex === index) {
      setActiveVaccineIndex(null); // Close the details
    } else {
      setActiveVaccineIndex(index); // Open the details
    }
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Hồ sơ thú cưng</Text>
        <TouchableOpacity style={styles.petButton}>
          <Image
            source={petProfile?.petImage ? { uri: petProfile.petImage } : require('../assets/ProfileScreen/pet-placeholder-image.png')}
            style={styles.petButtonImage}
          />
          <Text style={styles.petButtonText}>{petProfile?.petName || 'Tên thú cưng'}</Text>
          <Image source={require('../assets/AddProfileScreen/list-icon.png')} style={styles.petButtonIcon} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Content of the ScrollView */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('ProfileAbout2')}>
            <Text style={styles.tabText}>Thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.tabTextActive}>Tiêm chủng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('ProfileAboutPet2')}>
            <Text style={styles.tabText}>Lịch sử khám</Text>
          </TouchableOpacity>
        </View>

        {/* Vaccine List or Empty State */}
        {vaccines.length === 0 ? (
          <View style={styles.emptyContent}>
            <Image source={require('../assets/ProfileScreen/empty-vaccine.png')} style={styles.emptyImage} />
            <Text style={styles.emptyTitle}>Chưa có thông tin Vắc-xin</Text>
            <Text style={styles.emptyDescription}>
              Thông tin về Vắc-xin của thú cưng giúp bác sĩ thú y nắm rõ tình trạng tiêm chủng của chúng.
            </Text>
          </View>
        ) : (
          vaccines.map((vaccine, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.vaccineItem}
                onPress={() => toggleVaccineDetails(index)}
              >
                <Text style={styles.vaccineName}>Vaccine {vaccine.diseaseInfo}</Text>
                <View style={styles.vaccineGroup}>
                  <Image
                    source={require('../assets/calendar-icon.png')}
                    style={styles.calendarIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.vaccineDate}>{vaccine.appointmentDate}</Text>
                  <Text style={styles.vaccineDoctor1}> | </Text>
                  <Text style={styles.vaccineDoctor2}>{vaccine.doctorName}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteVaccine(index)}
                >
                  <Text style={styles.deleteButtonText}>Xóa</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Detailed Vaccine Information - Outside ScrollView */}
      {activeVaccineIndex !== null && (
        <View style={styles.detailContainer}>
          {/* Semi-transparent background overlay for the detail view */}
          <TouchableOpacity style={styles.overlay} onPress={() => setActiveVaccineIndex(null)} />

          <Animated.View
            style={[
              styles.vaccineDetails,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [500, 0], // Slide up from the bottom
                    }),
                  },
                ],
              },
            ]}
          >
            <View>
              {/* Cuộn nội dung */}
              <ScrollView contentContainerStyle={styles.scrollContainer2} showsVerticalScrollIndicator={false}>
                <Image source={require('../assets/home-indicator.png')} style={styles.homeIndicator} />
                <Text style={styles.vaccineTitle}>Vaccine {vaccines[activeVaccineIndex].diseaseInfo}</Text>
                <View style={styles.dateInfo}>
                  <Text style={styles.vaccineDate2}>Ngày tiêm</Text>
                  <Text style={styles.vaccineExpiration}>Có tác dụng tới</Text>
                </View>
                <View style={styles.dateInfo2}>
                  <Text style={styles.vaccineDate3}>{formattedAppointmentDate || 'N/A'}</Text>
                  <Text style={styles.vaccineExpiration2}>{formattedExpirationDate || 'N/A'}</Text>
                </View>
                <Text style={styles.doctorPerformer}>Người thực hiện</Text>
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>BS. {vaccines[activeVaccineIndex].doctorName}</Text>
                  <Image source={require('../assets/signature-image.png')} style={styles.signatureImage} />
                </View>
                <Text style={styles.vaccineNote}>Ghi chú:</Text>
                <Text style={styles.vaccineNote2}>{vaccines[activeVaccineIndex].note}</Text>
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.completeButton} onPress={() => setActiveVaccineIndex(null)}>
              <Text style={styles.completeButtonText}>Xong</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}


      {/* Fixed Add Vaccine Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddVaccine}>
        <Text style={styles.addButtonText}>+ Thêm Vắc-xin</Text>
      </TouchableOpacity>

      {/* Modal for Vaccine Form */}
      {modalVisible && (
        <Modal transparent visible={modalVisible} animationType="none">
          <View style={styles.modalBackground}>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [500, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.modalTitle}>Thông tin Vắc-xin</Text>
              <TextInput
              style={styles.input}
              placeholder="Ngày khám"
              placeholderTextColor="#888"
              value={vaccineInfo.appointmentDate}
              onChangeText={(text) => {
                // Remove non-numeric characters
                let sanitizedText = text.replace(/\D/g, '');

                // Extract day, month, and year parts
                let day = sanitizedText.substring(0, 2);
                let month = sanitizedText.substring(2, 4);
                let year = sanitizedText.substring(4, 8);

                // Validate day (1-31)
                if (day.length === 2) {
                  if (parseInt(day, 10) < 1 || parseInt(day, 10) > 31) {
                    day = ''; // Reset if invalid
                  }
                }

                // Validate month (1-12)
                if (month.length === 2) {
                  if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
                    month = ''; // Reset if invalid
                  }
                }

                // Format date as dd/mm/yyyy
                let formattedText = day;
                if (month) formattedText += '/' + month;
                if (year) formattedText += '/' + year;

                setVaccineInfo({ ...vaccineInfo, appointmentDate: formattedText });
              }}
              keyboardType="numeric" // Open numeric keypad
            />


              <TextInput
                style={styles.input}
                placeholder="Thông tin bệnh"
                placeholderTextColor="#888"
                value={vaccineInfo.diseaseInfo}
                onChangeText={(text) => setVaccineInfo({ ...vaccineInfo, diseaseInfo: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Bác sĩ thực hiện"
                placeholderTextColor="#888"
                value={vaccineInfo.doctorName}
                onChangeText={(text) => setVaccineInfo({ ...vaccineInfo, doctorName: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Ghi chú"
                placeholderTextColor="#888"
                value={vaccineInfo.note}
                onChangeText={(text) => setVaccineInfo({ ...vaccineInfo, note: text })}
              />
              <TouchableOpacity style={styles.completeButton} onPress={handleSaveVaccine}>
                <Text style={styles.completeButtonText}>Hoàn tất</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      )}

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
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('ProfileAboutPet1')}>
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

const styles = StyleSheet.create({
  calendarIcon: {
    width: 15,
    height: 17,
    marginRight: 10,
  },
  deleteButton: {
    position: 'absolute', // Position absolutely within the container
    top: 25, // Distance from the top edge
    right: 10, // Distance from the right edge
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  vaccineItem: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  vaccineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10, 
  },
  vaccineGroup:{
    flexDirection:'row',
  },
  vaccineDate: {
    fontSize: 14,
    marginTop: 2,
  },
  vaccineDoctor1: {
    fontSize: 14,
    marginTop: 1,
  },
  vaccineDoctor2: {
    fontSize: 14,
    marginTop: 2,
  },
  detailContainer: {
    position: 'static',
    top: '50%', // Adjust the top position as needed
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  vaccineDetails: {
    padding: 10,  // Tăng padding để phần chi tiết rộng ra
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -950,
    marginBottom: 500,
    width: '100%', // Đảm bảo chi tiết chiếm toàn bộ chiều rộng màn hình
    maxHeight: 700, // Tăng chiều cao tối đa của chi tiết nếu muốn
    zIndex:10,
  },
  homeIndicator:{
    alignItems: 'center',
    height: 6,
    width: 'auto',
    resizeMode: 'contain',
  },
  vaccineTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 50,
  },
  vaccineDate2:{
    fontSize: 20,
    marginRight: 40,
  },
  vaccineDate3:{
    fontSize: 20,
    marginRight: 40,
    fontWeight: 'bold',
  },
  vaccineExpiration: {
    fontSize: 20,
    marginLeft: 40,
  },
  vaccineExpiration2: {
    fontSize: 20,
    marginLeft: 40,
    fontWeight: 'bold',
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dateInfo2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 10,
  },
  doctorPerformer:{
    fontSize: 20,
    marginBottom: -5,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  doctorName: {
    fontSize: 20,
    marginRight: 50,
    marginLeft: 70,
    fontWeight: 'bold',
  },
  signatureImage: {
    width: 80,
    height: 50,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  vaccineNote: {
    fontSize: 20,
    marginTop: 10,
  },
  vaccineNote2: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 50,
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 16,
    marginTop: 50,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingTop: 10,
    paddingBottom: 120,
    alignItems: 'center',
  },
  scrollContainer2: {
    flexGrow: 1, // Đảm bảo nội dung được kéo dài để cuộn được
    padding: 20, // Thêm khoảng cách cho nội dung
    justifyContent: 'flex-start', // Canh nội dung từ đầu
  },
  petButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e6ec',
  },
  petButtonImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  petButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  petButtonIcon: {
    width: 15,
    height: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  activeTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#fdd835',
    marginHorizontal: 5,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  tabTextActive: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  emptyContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',  
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  addButton: {
    position: 'absolute',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2196f3',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingVertical: 25,
    bottom: 122,
    left: 16,
    right: 16,
  },
  addButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 65,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    color: "gray",
  },
  completeButton: {
    backgroundColor: '#0448ab',
    borderRadius: 10,
    paddingVertical: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  completeButtonText: {
    color: '#ffffff',
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
    marginTop: 5,
    fontSize: 12,
  },
});

export default ProfileAboutPet1;
