import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPPetScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const petImage = route.params?.petImage;

  // States for pet information
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [petName, setPetName] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [microchip, setMicrochip] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [adoptDate, setAdoptDate] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState('');
  const [characteristics, setCharacteristics] = useState('');

  useEffect(() => {
    const loadPetData = async () => {
      try {
        const savedSpecies = await AsyncStorage.getItem('petSpecies');
        const savedBreed = await AsyncStorage.getItem('selectedBreed');
        const petName = await AsyncStorage.getItem('petName');
        const gender = await AsyncStorage.getItem('gender');
        const weight = await AsyncStorage.getItem('weight');
        const healthCondition = await AsyncStorage.getItem('healthStatus');
        const microchip = await AsyncStorage.getItem('microchipNumber');
        const birthDate = await AsyncStorage.getItem('birthday');
        const adoptDate = await AsyncStorage.getItem('adoptionDate');
        const ownerName = await AsyncStorage.getItem('ownerName');
        const ownerEmail = await AsyncStorage.getItem('ownerEmail');
        const ownerPhoneNumber = await AsyncStorage.getItem('ownerPhoneNumber');
        const savedCharacteristics = await AsyncStorage.getItem('selectedCharacteristics');

        setSpecies(savedSpecies || '');
        setBreed(savedBreed || '');
        setPetName(petName || '');
        setGender(gender || '');
        setWeight(weight || '');
        setHealthCondition(healthCondition || '');
        setMicrochip(microchip || 'Không');
        setBirthDate(birthDate ? formatDate(new Date(birthDate)) : '');
        setAdoptDate(adoptDate ? formatDate(new Date(adoptDate)) : '');
        setOwnerName(ownerName || '');
        setOwnerEmail(ownerEmail || '');
        setOwnerPhoneNumber(ownerPhoneNumber || '');
        setCharacteristics(savedCharacteristics ? JSON.parse(savedCharacteristics).join(', ') : '');
      } catch (error) {
        console.error('Error loading pet data:', error);
      }
    };

    loadPetData();
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleCompleteProfile = async () => {
    try {
      const petData = {
        petImage,  // Store the image URL for later retrieval
        species,
        breed,
        petName,
        gender,
        weight,
        healthCondition,
        microchip,
        birthDate,
        adoptDate,
        ownerName,
        ownerEmail,
        ownerPhoneNumber,
        characteristics,
      };
      
      await AsyncStorage.setItem('petProfile', JSON.stringify(petData));
      console.log('Pet profile data saved:', petData);

      navigation.navigate('ProfileScreen');
    } catch (error) {
      console.error('Error saving pet profile:', error);
      Alert.alert('Lỗi', 'Không thể lưu hồ sơ thú cưng.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Hồ sơ thú cưng</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Pet Profile */}
        <View style={styles.petProfileContainer}>
          <Image source={petImage ? { uri: petImage } : require('../assets/AddProfileScreen/pet-image.png')} style={styles.petImage} />
          <Text style={styles.petName}>{petName}</Text>
          <Text style={styles.petDescription}>Loài: {species} | Giống: {breed}</Text>
        </View>

        {/* Pet Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đặc điểm</Text>
          <Text style={styles.characteristicsText}>{characteristics}</Text>
          <DetailRow label="Giới tính" value={gender} />
          <DetailRow label="Cân nặng" value={`${weight} kg`} />
          <DetailRow label="Tình trạng sức khỏe" value={healthCondition} />
          <DetailRow label="Số vi mạch" value={microchip || 'Không'} />
        </View>

        {/* Important Dates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ngày quan trọng</Text>
          <DetailRow label="Sinh nhật" value={birthDate} icon={require('../assets/AddProfileScreen/birthday-icon.png')} />
          <DetailRow label="Ngày nhận nuôi" value={adoptDate} icon={require('../assets/AddProfileScreen/adoption-icon.png')} />
        </View>

        {/* Caretaker Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Người chăm sóc</Text>
          <View style={styles.caretakerContainer}>
            <Image source={require('../assets/HomeScreens/avatar-image.png')} style={styles.caretakerImage} />
            <View>
              <Text style={styles.caretakerName}>{ownerName}</Text>
              <Text style={styles.caretakerContact}>{ownerEmail}</Text>
              <Text style={styles.caretakerContact}>{ownerPhoneNumber}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Complete Profile Button */}
      <TouchableOpacity style={styles.completeButton} onPress={handleCompleteProfile}>
        <Text style={styles.completeButtonText}>Hoàn tất hồ sơ</Text>
      </TouchableOpacity>

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
    </KeyboardAvoidingView>
  );
};

const DetailRow = ({ label, value, extraInfo, icon }) => (
  <View style={styles.detailRow}>
    {icon && <Image source={icon} style={styles.icon} />}
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
    {extraInfo && <Text style={styles.extraInfo}>{extraInfo}</Text>}
  </View>
);

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
  petProfileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#ddd',
  },
  petName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  petDescription: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
    textAlign: 'center',
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
  characteristicsText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 12,
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
  extraInfo: {
    fontSize: 16,
    color: '#888',
    marginLeft: 8,
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
  completeButton: {
    backgroundColor: '#0448ab',
    paddingVertical: 25,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 122,
    left: 16,
    right: 16,
  },
  completeButtonText: {
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
    marginTop: 5,
  },
});

export default AddPPetScreen;
