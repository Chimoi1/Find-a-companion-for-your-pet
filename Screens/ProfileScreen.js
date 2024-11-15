//Trang hồ sơ thú cưng gốc
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [petProfile, setPetProfile] = useState(null);

  useEffect(() => {
    const loadPetProfile = async () => {
      try {
        const savedPetProfile = await AsyncStorage.getItem('petProfile');
        if (savedPetProfile) {
          setPetProfile(JSON.parse(savedPetProfile));
        }
      } catch (error) {
        console.error('Error loading pet profile:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadPetProfile);
    return unsubscribe;
  }, [navigation]);

  const goToAddProfile = () => navigation.navigate('AddProfileScreen');

  const deleteProfile = async () => {
    try {
      await AsyncStorage.removeItem('petProfile');
      setPetProfile(null); // Clear the profile from state
      Alert.alert('Thông báo', 'Hồ sơ thú cưng đã được xóa.');
    } catch (error) {
      console.error('Error deleting pet profile:', error);
      Alert.alert('Lỗi', 'Không thể xóa hồ sơ thú cưng.');
    }
  };

  const confirmDeleteProfile = () => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa hồ sơ thú cưng?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', onPress: deleteProfile },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={require('../assets/HomeScreens/avatar-image.png')}
              style={styles.avatar}
            />
            <View style={styles.userTextContainer}>
              <Text style={styles.greetingText}>Hello,</Text>
              <Text style={styles.emailText}>iumiuthoi@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationIcon} onPress={() => navigation.navigate('NotificationScreen')}>
            <Image
              source={require('../assets/HomeScreens/notifications-image.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {petProfile ? (
          <>
            <TouchableOpacity style={styles.petProfileCard} onPress={() => navigation.navigate('ProfileAbout2')}>
              <View style={styles.profileImageWrapper}>
                <Image
                  source={petProfile.petImage ? { uri: petProfile.petImage } : require('../assets/AddProfileScreen/pet-image.png')}
                  style={styles.petImage}
                />
              </View>
              <View style={styles.petInfo}>
                <Text style={styles.petName}>{petProfile.petName}</Text>
                <Text style={styles.petDescription}>{petProfile.species} | {petProfile.breed}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.addButton} onPress={goToAddProfile}>
                <Text style={styles.addText}>+ Thêm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={confirmDeleteProfile}>
                <Text style={styles.deleteText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Image
              source={require('../assets/ProfileScreen/pet-placeholder-image.png')}
              style={styles.petPlaceholderImage}
              resizeMode="contain"
            />
            <Text style={styles.noPetText}>Chưa có hồ sơ thú cưng</Text>
            <Text style={styles.infoText}>
              Bạn chưa tạo lập hồ sơ thú cưng. Ấn Tiếp tục để cập nhật thông tin của con nhé!
            </Text>
            <TouchableOpacity style={styles.addProfileButton} onPress={goToAddProfile}>
              <Text style={styles.addProfileText}>+ Thêm hồ sơ</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

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
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  fixedHeader: {
    backgroundColor: '#fff',
    zIndex: 10,
    width: '100%',
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 33,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userTextContainer: {
    marginLeft: 10,
  },
  greetingText: {
    fontSize: 16,
    color: '#808080',
  },
  emailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationIcon: {
    padding: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginTop: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  petProfileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 20,
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  profileImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  petImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  petInfo: {
    justifyContent: 'center',
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  petDescription: {
    fontSize: 18,
    color: '#cce7ff',
    marginTop: 5,
  },
  petPlaceholderImage: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  noPetText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#808080',
    marginVertical: 10,
    marginBottom: 120,
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2196f3',
  },
  addText: {
    color: '#2196f3',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  deleteButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff3b30',
    marginLeft: 10,
  },
  deleteText: {
    color: '#ff3b30',
    fontWeight: 'bold',
  },
  addProfileButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2196f3',
  },
  addProfileText: {
    paddingVertical: 15,
    paddingHorizontal: 80,
    color: '#2196f3',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
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

export default ProfileScreen;
