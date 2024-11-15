import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedPet, setSelectedPet] = useState(null);

  const selectPetType = async (type) => {
    setSelectedPet(type);
    try {
      await AsyncStorage.setItem('petSpecies', type === 'dog' ? 'Chó' : 'Mèo'); // Lưu loài vào AsyncStorage
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu loài thú cưng.');
      console.error('Error saving pet species:', error);
    }
  };

  const handleContinue = () => {
    if (selectedPet === 'cat') {
      navigation.navigate('AddProfileCatScreen');
    } else if (selectedPet === 'dog') {
      navigation.navigate('AddProfileDogScreen');
    } else {
      Alert.alert('Vui lòng chọn loại thú cưng trước khi tiếp tục.');
    }
  };

  // Hàm điều hướng của thanh footer
  const goToHomeScreen = () => navigation.navigate('HomeScreen');
  const goToCalendarScreen = () => navigation.navigate('CalendarScreen');
  const goToProfileScreen = () => navigation.navigate('ProfileScreen');
  const goToChatScreen = () => navigation.navigate('ChatScreen');
  const goToAccountScreen = () => navigation.navigate('AccountScreen');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerText}>Hồ sơ thú cưng</Text>
            <Text style={styles.subtitleText}>Loài</Text>
          </View>
          <Text style={styles.stepText}>
            <Text style={styles.stepNumber}>Bước 1</Text>
            <Text style={styles.stepTotal}>/8</Text>
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
      </View>

      <View style={styles.petSelectionContainer}>
        <Text style={styles.title}>Chọn loại thú cưng</Text>

        <View style={styles.petOptions}>
          <TouchableOpacity
            style={[
              styles.petOption,
              selectedPet === 'cat' && styles.selectedPetOption,
            ]}
            onPress={() => selectPetType('cat')}
          >
            <Image source={require('../assets/AddProfileScreen/cat-icon.png')} style={styles.petImage} resizeMode="contain" />
            <Text style={styles.petText}>Mèo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.petOption,
              selectedPet === 'dog' && styles.selectedPetOption,
            ]}
            onPress={() => selectPetType('dog')}
          >
            <Image source={require('../assets/AddProfileScreen/dog-icon.png')} style={styles.petImage} resizeMode="contain" />
            <Text style={styles.petText}>Chó</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon} onPress={goToHomeScreen}>
          <Image source={require('../assets/HomeScreens/home-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={goToCalendarScreen}>
          <Image source={require('../assets/HomeScreens/calendar-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Đặt lịch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={goToProfileScreen}>
          <Image source={require('../assets/HomeScreens/profile-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={goToChatScreen}>
          <Image source={require('../assets/HomeScreens/chat-icon.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={goToAccountScreen}>
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
    marginLeft: 38,
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
    width: '12.5%',
    height: '100%',
    backgroundColor: '#ffd700',
    borderRadius: 10,
  },
  petSelectionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  petOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  petOption: {
    width: 160,
    height: 128,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  selectedPetOption: {
    borderColor: '#2196f3',
    borderWidth: 2,
  },
  petImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  petText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#0448ab',
    paddingVertical: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 22,
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

export default AddProfileScreen;