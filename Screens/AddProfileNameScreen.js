import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const AddProfileNameScreen = () => {
  const navigation = useNavigation();
  const [petName, setPetName] = useState('');
  const [gender, setGender] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleContinue = async () => {
    try {
      // Lưu dữ liệu vào AsyncStorage
      await AsyncStorage.setItem('petName', petName);
      await AsyncStorage.setItem('gender', gender);
      if (petImage) {
        await AsyncStorage.setItem('petImage', petImage);
      }
      
      console.log('Thông tin thú cưng đã lưu:', petName, gender, petImage);
      navigation.navigate('AddProfileStatusScreen', { petImage });
    } catch (error) {
      console.error('Lỗi khi lưu thông tin thú cưng:', error);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Cần có quyền', 'Bạn cần cấp quyền truy cập vào thư viện ảnh của mình để chọn ảnh.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPetImage(result.assets[0].uri);
    }
  };

  const selectGender = (selectedGender) => {
    setGender(selectedGender);
    setModalVisible(false);
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
            <Text style={styles.subtitleText}>Tên</Text>
          </View>
          <Text style={styles.stepText}>
            <Text style={styles.stepNumber}>Bước 3</Text>
            <Text style={styles.stepTotal}>/8</Text>
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '37.5%' }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.petImageContainer}>
          <Image source={require('../assets/AddProfileScreen/circle-image.png')} style={styles.circleImage} />
          <Image 
            source={petImage ? { uri: petImage } : require('../assets/AddProfileScreen/pet-image.png')} 
            style={styles.petImage} 
          />
          <TouchableOpacity style={styles.cameraIconContainer} onPress={pickImage}>
            <Image source={require('../assets/AddProfileScreen/picture-icon.png')} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.promptText}>Tên thú cưng của bạn</Text>

        <TextInput
          style={styles.input}
          placeholder="Tên"
          placeholderTextColor="#888"
          value={petName}
          onChangeText={setPetName}
        />

        <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
          <Text style={{ color: gender ? '#000' : '#888' }}>
            {gender || 'Chọn giới tính'}
          </Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => selectGender('Giống đực')} style={styles.modalOption}>
                <Text style={styles.modalText}>Giống đực</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectGender('Giống cái')} style={styles.modalOption}>
                <Text style={styles.modalText}>Giống cái</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectGender('Khác')} style={styles.modalOption}>
                <Text style={styles.modalText}>Khác</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCancel}>
                <Text style={styles.modalCancelText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>

      <TouchableOpacity
        style={[styles.continueButton, !(petName && gender) && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!petName || !gender}
      >
        <Text style={styles.continueButtonText}>Tiếp tục</Text>
      </TouchableOpacity>
      
      {/* Điều hướng footer */}
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
    paddingBottom: 100,
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
    marginVertical: 70,
  },
  circleImage: {
    position: 'absolute',
    width: 300,
    height: 300,
    bottom: -50,
  },
  petImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#ddd',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: -25,
    backgroundColor: '#fff',
    borderRadius: 17,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 5,
  },
  cameraIcon: {
    width: 24,
    height: 24,
  },
  promptText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalOption: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
  modalCancel: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    color: 'red',
  },
});

export default AddProfileNameScreen;
