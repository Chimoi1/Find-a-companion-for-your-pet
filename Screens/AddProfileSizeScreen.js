import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProfileSizeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { petImage } = route.params;

  const [weight, setWeight] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);

  const handleContinue = async () => {
    try {
      // Lưu trọng lượng và kích thước vào AsyncStorage
      await AsyncStorage.setItem('weight', weight);
      await AsyncStorage.setItem('selectedSize', selectedSize);

      console.log('Cân nặng và kích thước đã lưu:', weight, selectedSize);
      navigation.navigate('AddCharacteristicScreen', { petImage });
    } catch (error) {
      console.error('Lỗi khi lưu thông tin:', error);
    }
  };

  const sizeOptions = [
    { 
      label: 'Nhỏ', 
      subLabel: 'Dưới 14kg', 
      icon: require('../assets/AddProfileScreen/small-icon.png'),
      activeIcon: require('../assets/AddProfileScreen/small-icon-active.png'),
    },
    { 
      label: 'Trung bình', 
      subLabel: '14-25kg', 
      icon: require('../assets/AddProfileScreen/medium-icon.png'),
      activeIcon: require('../assets/AddProfileScreen/medium-icon-active.png'),
    },
    { 
      label: 'Lớn', 
      subLabel: 'Trên 25kg', 
      icon: require('../assets/AddProfileScreen/large-icon.png'),
      activeIcon: require('../assets/AddProfileScreen/large-icon-active.png'),
    },
  ];

  const handleWeightChange = (value) => {
    setWeight(value);

    const weightNum = parseFloat(value);

    if (weightNum < 14) {
      setSelectedSize('Nhỏ');
    } else if (weightNum >= 14 && weightNum <= 25) {
      setSelectedSize('Trung bình');
    } else if (weightNum > 25) {
      setSelectedSize('Lớn');
    } else {
      setSelectedSize(null);
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
            <Text style={styles.subtitleText}>Cân nặng</Text>
          </View>
          <Text style={styles.stepText}>
            <Text style={styles.stepNumber}>Bước 5</Text>
            <Text style={styles.stepTotal}>/8</Text>
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '62.5%' }]} />
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

        <Text style={styles.promptText}>Cân nặng của thú cưng</Text>
        <Text style={styles.subPromptText}>Nếu không chắc chắn, bạn hãy chọn kích cỡ được đề xuất bên dưới</Text>

        <TextInput
          style={styles.input}
          placeholder="Kg"
          placeholderTextColor="#888"
          value={weight}
          onChangeText={handleWeightChange}
          keyboardType="numeric"
        />

        <View style={styles.sizeOptionsContainer}>
          {sizeOptions.map((size, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.sizeOption,
                selectedSize === size.label && styles.selectedSizeOption,
              ]}
              onPress={() => setSelectedSize(size.label)}
            >
              <Image 
                source={selectedSize === size.label ? size.activeIcon : size.icon} 
                style={[styles.sizeIcon, selectedSize === size.label && styles.selectedSizeIcon]} 
              />
              <Text style={[styles.sizeLabel, selectedSize === size.label && styles.selectedSizeLabel]}>
                {size.label}
              </Text>
              <Text style={styles.sizeSubLabel}>{size.subLabel}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.continueButton, !selectedSize && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!selectedSize}
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
    paddingBottom: 200,
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
    marginTop: 20,
  },
  subPromptText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  input: {
    height: 60,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: '100%',
  },
  sizeOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  sizeOption: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedSizeOption: {
    borderColor: '#2196f3',
    borderWidth: 2,
    backgroundColor: '#e0f0ff',
    width: 150,  // Increase width for selected option
    height: 150, // Increase height for selected option
    marginTop: -25, // Adjust margin to create an "upward" effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sizeIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  selectedSizeIcon: {
    width: 70,  // Increase icon size for selected option
    height: 70, // Increase icon size for selected option
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
  selectedSizeLabel: {
    color: '#2196f3',
  },
  sizeSubLabel: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
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

export default AddProfileSizeScreen;
