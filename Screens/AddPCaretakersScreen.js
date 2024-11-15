import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPCaretakersScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { petImage } = route.params;

  // Các trạng thái cho thông tin chủ nuôi
  const [email, setEmail] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleContinue = async () => {
    try {
      // Lưu thông tin vào AsyncStorage
      await AsyncStorage.setItem('ownerEmail', email);
      await AsyncStorage.setItem('ownerName', ownerName);
      await AsyncStorage.setItem('ownerPhoneNumber', phoneNumber);
      await AsyncStorage.setItem('ownerAddress', address);

      console.log('Owner information saved successfully.');

      // Điều hướng đến trang AddPPetScreen
      navigation.navigate('AddPPetScreen', { petImage });
    } catch (error) {
      console.error('Error saving owner information:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Header and Progress */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerText}>Hồ sơ thú cưng</Text>
            <Text style={styles.subtitleText}>Chủ nuôi</Text>
          </View>
          <Text style={styles.stepText}>Bước 8/8</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '100%' }]} />
        </View>
      </View>

      {/* Scrollable Section */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Picture */}
        <View style={styles.petImageContainer}>
          <Image source={require('../assets/AddProfileScreen/circle-image.png')} style={styles.circleImage} />
          <Image source={petImage ? { uri: petImage } : require('../assets/AddProfileScreen/pet-image.png')} style={styles.petImage} />
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <InputField label="Email" placeholder="Nhập địa chỉ email" value={email} onChangeText={setEmail} />
          <InputField label="Tên chủ nuôi*" placeholder="Nhập tên chủ nuôi" value={ownerName} onChangeText={setOwnerName} />
          <InputField label="SĐT*" placeholder="Nhập số điện thoại" value={phoneNumber} onChangeText={setPhoneNumber} />
          <InputField label="Địa Chỉ*" placeholder="Nhập địa chỉ" value={address} onChangeText={setAddress} />
        </View>
      </ScrollView>

      {/* Fixed Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Hoàn tất hồ sơ</Text>
      </TouchableOpacity>

      {/* Footer Navigation */}
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

const InputField = ({ label, value, placeholder, onChangeText }) => (
  <View style={styles.inputField}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputRow}>
      <TextInput
        style={[styles.input, value ? styles.inputWithIcon : null]}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
  </View>
);

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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  inputContainer: {
    marginVertical: 20,
  },
  inputField: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: 65,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputWithIcon: {
    paddingRight: 40, // Leave space for the icon
  },
  editIcon: {
    position: 'absolute',
    right: 10,
    padding: 10,
  },
  iconImage: {
    width: 20,
    height: 20,
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

export default AddPCaretakersScreen;
