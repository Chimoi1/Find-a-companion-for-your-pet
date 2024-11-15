import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCharacteristicScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { petImage } = route.params;

  const characteristicsOptions = [
    'Đã triệt sản', 'Đuôi cụp', 'Mắt hai màu',
    'Lông xoăn', 'Lông thẳng', 'Lông ngắn',
    'Lông dài', 'Có sẹo', 'Răng khểnh'
  ];
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);

  const handleSelectCharacteristic = (characteristic) => {
    setSelectedCharacteristics(prevState =>
      prevState.includes(characteristic)
        ? prevState.filter(item => item !== characteristic)
        : [...prevState, characteristic]
    );
  };

  const handleContinue = async () => {
    try {
      // Lưu đặc điểm đã chọn vào AsyncStorage
      await AsyncStorage.setItem('selectedCharacteristics', JSON.stringify(selectedCharacteristics));

      console.log('Selected Characteristics saved:', selectedCharacteristics);
      navigation.navigate('AddPIDateScreen', { petImage });
    } catch (error) {
      console.error('Error saving selected characteristics:', error);
    }
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
            <Text style={styles.subtitleText}>Đặc điểm nhận dạng</Text>
          </View>
          <Text style={styles.stepText}>
            <Text style={styles.stepNumber}>Bước 6</Text>
            <Text style={styles.stepTotal}>/8</Text>
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '75%' }]} />
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

        <Text style={styles.promptText}>Đặc điểm đặc biệt của thú cưng</Text>
        <Text style={styles.subPromptText}>Hãy điền một vài nhận dạng đặc biệt của thú cưng nhé</Text>

        <View style={styles.characteristicsContainer}>
          {characteristicsOptions.map((characteristic, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.characteristicOption,
                selectedCharacteristics.includes(characteristic) && styles.selectedOption
              ]}
              onPress={() => handleSelectCharacteristic(characteristic)}
            >
              <Text style={[
                styles.characteristicText,
                selectedCharacteristics.includes(characteristic) && styles.selectedText
              ]}>
                {characteristic}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedCharacteristics.length === 0 && styles.disabledButton
        ]}
        onPress={handleContinue}
        disabled={selectedCharacteristics.length === 0}
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
    paddingBottom: 150,
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
  promptText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  subPromptText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  characteristicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  characteristicOption: {
    backgroundColor: '#fff',
    paddingVertical: 22,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  selectedOption: {
    backgroundColor: '#e0f0ff',
    borderColor: '#2196f3',
    borderWidth: 1,
  },
  characteristicText: {
    fontSize: 14,
    color: '#888',
  },
  selectedText: {
    color: '#2196f3',
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

export default AddCharacteristicScreen;
