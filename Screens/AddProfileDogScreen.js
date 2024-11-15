import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProfileDogScreen = () => {
  const navigation = useNavigation();
  const [selectedBreed, setSelectedBreed] = useState(null);

  const selectBreed = (breed) => {
    setSelectedBreed(breed);
  };

  const handleContinue = async () => {
    if (!selectedBreed) {
      Alert.alert('Lỗi', 'Vui lòng chọn giống thú cưng.');
      return;
    }
    try {
      // Lưu giống thú cưng đã chọn vào AsyncStorage
      await AsyncStorage.setItem('selectedBreed', selectedBreed);
      console.log('Đã lưu giống thú cưng:', selectedBreed);

      // Điều hướng tới trang tiếp theo
      navigation.navigate('AddProfileNameScreen');
    } catch (error) {
      console.error('Lỗi khi lưu giống thú cưng:', error);
      Alert.alert('Lỗi', 'Không thể lưu giống thú cưng.');
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
      {/* Thanh tiêu đề và tiến độ */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerText}>Hồ sơ thú cưng</Text>
            <Text style={styles.subtitleText}>Giống</Text>
          </View>
          <Text style={styles.stepText}>
            <Text style={styles.stepNumber}>Bước 2</Text>
            <Text style={styles.stepTotal}>/8</Text>
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '25%' }]} />
        </View>
      </View>

      {/* Chọn giống thú cưng và thanh tìm kiếm */}
      <ScrollView contentContainerStyle={styles.breedSelectionContainer}>
        {/* Thanh tìm kiếm */}
        <View style={styles.searchContainer}>
          <Image source={require('../assets/search-icon.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm theo giống thú cưng"
            placeholderTextColor="#888"
          />
        </View>

        {/* Tùy chọn giống thú cưng */}
        <View style={styles.breedOptions}>
          {[
            { name: 'Mixed Breed', image: require('../assets/AddProfileScreen/DogBreeds/mixed-breed-dog.png') },
            { name: 'Afghan Hound', image: require('../assets/AddProfileScreen/DogBreeds/afghan-hound-dog.png') },
            { name: 'Chó Akita', image: require('../assets/AddProfileScreen/DogBreeds/akita-dog.png') },
            { name: 'Chó săn thỏ', image: require('../assets/AddProfileScreen/DogBreeds/beagle-dog.png') },
            { name: 'Chó ta', image: require('../assets/AddProfileScreen/DogBreeds/native-dog.png') },
            { name: 'Border Collie', image: require('../assets/AddProfileScreen/DogBreeds/collie-dog.png') },
            { name: 'Boxer', image: require('../assets/AddProfileScreen/DogBreeds/boxer-dog.png') },
            { name: 'Chow Chow', image: require('../assets/AddProfileScreen/DogBreeds/chowchow-dog.png') },
            { name: 'Dalmatian', image: require('../assets/AddProfileScreen/DogBreeds/dalmatian-dog.png') },
            { name: 'Samoyed', image: require('../assets/AddProfileScreen/DogBreeds/samoyed-dog.png') },
          ].map((breed, index) => (
            <View key={index} style={styles.breedOptionWrapper}>
              <TouchableOpacity
                style={[
                  styles.breedOption,
                  selectedBreed === breed.name && styles.selectedBreedOption,
                ]}
                onPress={() => selectBreed(breed.name)}
              >
                <Text style={styles.breedText}>{breed.name}</Text>
                <Image source={breed.image} style={styles.breedImage} resizeMode="contain" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Nút tiếp tục */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Tiếp tục</Text>
      </TouchableOpacity>

      {/* Footer Navigation */}
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
  // giữ nguyên các styles hiện có của bạn
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#888',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    color: '#333',
  },
  breedSelectionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  breedOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  breedOptionWrapper: {
    width: '45%',
    margin: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  breedOption: {
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectedBreedOption: {
    borderColor: '#2196f3',
    borderWidth: 2,
  },
  breedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 30,
  },
  breedImage: {
    width: '100%',
    height: 120,
    marginTop: 0,
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

export default AddProfileDogScreen;
