import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileAbout2 = () => {
  const navigation = useNavigation();
  const [petProfile, setPetProfile] = useState(null);
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const showQrCode = () => setQrModalVisible(true);
  const hideQrCode = () => setQrModalVisible(false);
  
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

    loadPetProfile();
  }, []);

  const goToHome = () => navigation.navigate('HomeScreen');
  const goToCalendar = () => navigation.navigate('CalendarScreen');
  const goToChat = () => navigation.navigate('ChatScreen');
  const goToAccount = () => navigation.navigate('AccountScreen');

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
          <Text style={styles.petButtonText}>{petProfile?.petName || "Tên thú cưng"}</Text>
          <Image source={require('../assets/AddProfileScreen/list-icon.png')} style={styles.petButtonIcon} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {petProfile ? (
          <>
            <View style={styles.tabContainer}>
              <TouchableOpacity style={styles.activeTab}>
                <Text style={styles.tabTextActive}>Thông tin</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('ProfileAboutPet1')}>
                <Text style={styles.tabText}>Tiêm chủng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('ProfileAboutPet2')}>
                <Text style={styles.tabText}>Lịch sử khám</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.profileContainer}>
              <View style={styles.imageWrapper}>
                <Image
                  source={petProfile.petImage ? { uri: petProfile.petImage } : require('../assets/ProfileScreen/pet-placeholder-image.png')}
                  style={styles.petImage}
                />
              </View>
              <View style={styles.petInfo}>
                <View style={styles.petNameRow}>
                  <Text style={styles.petName}>{petProfile.petName}</Text>
                  <TouchableOpacity style={styles.editIconWrapper}>
                    <Image source={require('../assets/AddProfileScreen/edit-icon.png')} style={styles.editIcon} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.petDescription}>{petProfile.species} | {petProfile.breed}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Đặc điểm</Text>
              <Text style={styles.characteristicsText}>{petProfile.characteristics}</Text>
              <DetailRow label="Giới tính" value={petProfile.gender} />
              <DetailRow label="Cân nặng" value={`${petProfile.weight} kg`} />
              <DetailRow label="Tình trạng sức khỏe" value={petProfile.healthCondition} />
              <DetailRow label="Số vi mạch" value={petProfile.microchip || 'Không'} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ngày quan trọng</Text>
              <DetailRow label="Sinh nhật" value={`${petProfile.birthDate} | 8 tuổi`} icon={require('../assets/AddProfileScreen/birthday-icon.png')} />
              <DetailRow label="Ngày nhận nuôi" value={petProfile.adoptDate} icon={require('../assets/AddProfileScreen/adoption-icon.png')} />
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
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.noProfileText}>Chưa có hồ sơ thú cưng</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddPPetScreen')}>
              <Text style={styles.createProfileText}>+ Tạo hồ sơ mới</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Nút QR Code */}
      <TouchableOpacity style={styles.qrButton} onPress={showQrCode}>
        <Text style={styles.qrButtonText}>Hiện mã QR</Text>
      </TouchableOpacity>

      {/* Modal QR */}
      <Modal visible={qrModalVisible} transparent onRequestClose={hideQrCode}>
        <View style={styles.qrModalOverlay}>
          <View style={styles.qrModalContent}>
            <Image
              source={
                petProfile?.petImage
                  ? { uri: petProfile.petImage }
                  : require('../assets/ProfileScreen/pet-placeholder-image.png')
              }
              style={styles.qrPetImage}
            />
            <Text style={styles.petName2}>{petProfile?.petName}</Text>
            <Text style={styles.petBreed}>
              {petProfile?.species} | {petProfile?.breed}
            </Text>
            <Image
              source={require('../assets/qr-code.png')}
              style={styles.qrCodeImage}
            />
            <TouchableOpacity style={styles.closeButton} onPress={hideQrCode}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation Bar */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon} onPress={goToHome}>
          <Image source={require('../assets/HomeScreens/home-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={goToCalendar}>
          <Image source={require('../assets/HomeScreens/calendar-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Đặt lịch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate('ProfileAbout2')}>
          <Image source={require('../assets/HomeScreens/profile-icon-active.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={goToChat}>
          <Image source={require('../assets/HomeScreens/chat-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={goToAccount}>
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
    backgroundColor: '#f8f8f8',
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
    paddingTop: 30, // Adjust to avoid overlap with fixed header
    paddingBottom: 200, // Space for bottom footer
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
    marginBottom: 20,
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
  profileContainer: {
    flexDirection: 'row', // Align image and info horizontally
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 'auto',
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 20, // Space between image and text
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  qrPetImage: {
    width: 250,
    height: 250,
    borderRadius: 200,
    marginBottom: 10,
    marginBottom: 100,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  editIconWrapper: {
    position: 'absolute',
    right: -5,
    bottom: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 2,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  petInfo: {
    flexDirection: 'row',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10, // Space between name and edit icon
  },
  petName2: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8, // Space between name and edit icon
  },
  petBreed: {
    fontSize: 16,
    color: '#888',
  },
  petDescription: {
    fontSize: 16,
    color: '#888',
  },
  section: {
    marginTop: 20,
    marginHorizontal: 30,
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
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  detailLabel: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  caretakerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  caretakerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  caretakerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  caretakerContact: {
    fontSize: 14,
    color: '#666',
  },
  qrButton: {
    backgroundColor: '#0448ab',
    paddingVertical: 25,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 122,
    left: 16,
    right: 16,
  },
  qrButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrModalContent: {
    width: '90%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  qrCodeImage: {
    width: 250,
    height: 250,
    marginVertical: 20,
  },
  closeButton: {
    backgroundColor: '#0448ab',
    paddingVertical: 20,
    paddingHorizontal: 140,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
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

export default ProfileAbout2;
