import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProfileStatusScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { petImage } = route.params; // Lấy URI của ảnh thú cưng từ màn hình trước

  const [healthStatus, setHealthStatus] = useState('');
  const [lastCheckupDate, setLastCheckupDate] = useState('');
  const [microchipNumber, setMicrochipNumber] = useState('');

  const handleContinue = async () => {
    try {
      // Lưu dữ liệu vào AsyncStorage
      await AsyncStorage.setItem('healthStatus', healthStatus);
      await AsyncStorage.setItem('lastCheckupDate', lastCheckupDate);
      await AsyncStorage.setItem('microchipNumber', microchipNumber);

      console.log('Thông tin sức khỏe đã lưu:', healthStatus, lastCheckupDate, microchipNumber);
      navigation.navigate('AddProfileSizeScreen', { petImage });
    } catch (error) {
      console.error('Lỗi khi lưu thông tin sức khỏe:', error);
    }
  };

  const formatCheckupDate = (text) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length >= 5) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    } else if (cleaned.length >= 3) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    setLastCheckupDate(cleaned);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerText}>Hồ sơ thú cưng</Text>
            <Text style={styles.subtitleText}>Tình trạng sức khỏe</Text>
          </View>
          <Text style={styles.stepText}>
            <Text style={styles.stepNumber}>Bước 4</Text>
            <Text style={styles.stepTotal}>/8</Text>
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '50%' }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.petImageContainer}>
          <Image source={require('../assets/AddProfileScreen/circle-image.png')} style={styles.circleImage} />
          <Image 
            source={petImage ? { uri: petImage } : require('../assets/AddProfileScreen/pet-image.png')} 
            style={styles.petImage} 
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tình trạng</Text>
          <TextInput
            style={styles.input}
            placeholder="Sức khoẻ"
            placeholderTextColor="#888"
            value={healthStatus}
            onChangeText={setHealthStatus}
          />

          <Text style={styles.label}>Lần kiểm tra gần nhất</Text>
          <TextInput
            style={styles.input}
            placeholder="dd/mm/yyyy"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={lastCheckupDate}
            onChangeText={formatCheckupDate}
            maxLength={10}
          />

          <Text style={styles.label}>Số vi mạch (nếu có)</Text>
          <TextInput
            style={styles.input}
            placeholder="Số vi mạch"
            placeholderTextColor="#888"
            value={microchipNumber}
            onChangeText={setMicrochipNumber}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.continueButton, !(healthStatus && lastCheckupDate) && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!healthStatus || !lastCheckupDate}
      >
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
    paddingBottom: 200, // Ensure space for the button and footer
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
    marginVertical: 10,
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
    marginTop: 0,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    height: 65,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 15,
    marginHorizontal: -16,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
  disabledButton: {
    backgroundColor: '#b0c4de',
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
    marginTop: 5,
    fontSize: 12,
    color: '#888',
  },
});

export default AddProfileStatusScreen;
