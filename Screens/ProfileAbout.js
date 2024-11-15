import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileAbout = () => {
  const navigation = useNavigation();
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const showQrCode = () => setQrModalVisible(true);
  const hideQrCode = () => setQrModalVisible(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Hồ sơ thú cưng</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Pet Info Section */}
        <View style={styles.petInfoContainer}>
          <Image source={require('../assets/HomeScreens/pet-image.png')}  style={styles.petImage} />
          <View style={styles.petDetails}>
            <Text style={styles.petName}>Miu</Text>
            <Text style={styles.petBreed}>Mèo | Mèo ta</Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đặc điểm</Text>
          <Text style={styles.detailText}>Mèo bỡ sữa, đã triệt sản</Text>
          <DetailRow label="Giới tính" value="Đực" />
          <DetailRow label="Cân nặng" value="5,5kg" />
          <DetailRow label="Tình trạng sức khỏe" value="Tốt" />
          <DetailRow label="Số vi mạch" value="Không" />
        </View>

        {/* Important Dates Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ngày quan trọng</Text>
          <TouchableOpacity style={styles.qrButton} onPress={showQrCode}>
            <Text style={styles.qrButtonText}>Hiện mã QR</Text>
          </TouchableOpacity>
          <DetailRow label="Ngày nhận nuôi" value="10/10/2017" />
        </View>
      </ScrollView>

      {/* QR Code Full-Screen Overlay Modal */}
      <Modal
        visible={qrModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={hideQrCode}
      >
        <View style={styles.qrModalOverlay}>
          <View style={styles.qrModalContent}>
            <Image source={require('../assets/HomeScreens/pet-image.png')} resizeMode="contain" style={styles.qrPetImage} />
            <Text style={styles.petName2}>Miu</Text>
            <Text style={styles.petBreed}>Mèo | Mèo ta</Text>
            {/* Replace with a dynamic QR code image if necessary */}
            <Image source={require('../assets/qr-code.png')} style={styles.qrCodeImage} />
            <TouchableOpacity style={styles.closeButton} onPress={hideQrCode}>
              <Text style={styles.closeButtonText}>Thoát</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  backButton: {
    fontSize: 24,
    color: '#888',
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  petInfoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  petDetails: {
    alignItems: 'center',
  },
  petName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  petName2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10, // Space between name and edit icon
  },
  petBreed: {
    fontSize: 16,
    color: '#888',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  detailLabel: {
    flex: 1,
    fontSize: 16,
    color: '#888',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  qrButton: {
    backgroundColor: '#0448ab',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
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
  qrPetImage: {
    width: 250,
    height: 250,
    borderRadius: 200,
    marginBottom: 10,
    marginBottom: 100,
    borderWidth: 3,
    borderColor: '#ddd',
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
    marginTop: 5,
  },
});

export default ProfileAbout;
