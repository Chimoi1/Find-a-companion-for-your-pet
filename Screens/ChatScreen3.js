import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ChatScreen3 = ({ navigation }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Background Image */}
      <Image source={require('../assets/ChatScreen/clinic-image.png')} style={styles.backgroundImage} />

      {/* Top Header with Back and Menu Icons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}> ← </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Doctor Information Container */}
      <View style={styles.infoContainer}>
        <Text style={styles.clinicName}>Phòng khám thú y PetPro</Text>
        <View style={styles.clinicAdd}>
            <Image source={require('../assets/CallScreen/add-icon.png')} style={styles.addIcon} resizeMode="contain" />
             <Text style={styles.clinicSpecialty}> 1 Giảng Võ, Ba ĐÌnh, Hà Nội</Text>
        </View>
        <View style={styles.clinicRate}>
                <Image source={require('../assets/CalenderScreen/VeterinarianScreen/pet-rate.png')} style={styles.clinicIcon} resizeMode="contain" />
                <Text style={styles.clinicSpecialtys}>4.8       </Text>
                <Image source={require('../assets/CalenderScreen/VeterinarianScreen/address-tick.png')} style={styles.clinicIcon} resizeMode="contain" />
                <Text style={styles.clinicSpecialtys}>12 km</Text>
        </View>

        {/* Chat Messages */}
        <ScrollView style={styles.chatContainer}>
          <View style={styles.userMessageContainer}>
            <Text style={styles.userMessageText}>Tôi muốn đặt lịch khám da cho mèo của mình.</Text>
          </View>
          <View style={styles.doctorMessageContainer}>
            <Image source={require('../assets/ChatScreen/clinic-image.png')} style={styles.avatar} />
            <Text style={styles.doctorMessageText}>
              Phòng khám trống lịch vào thứ 3, 4 tuần này. Bạn có thể đặt lịch nhé!
            </Text>
          </View>
          <View style={styles.userMessageContainer}>
            {/* Appointment Button */}
            <TouchableOpacity style={styles.appointmentButton}>
              <Text style={styles.buttonText}>Đặt lịch</Text>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Bottom Input Area */}
      <View style={[styles.inputContainer, keyboardVisible && { marginBottom: 10 }]}>
        <TouchableOpacity style={{ marginTop: 7 }}>
          <Ionicons name="add-outline" size={28} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 10, marginTop: 7 }}>
          <Ionicons name="camera-outline" size={28} color="#808080" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 10, marginTop: 7 }}>
          <Ionicons name="image-outline" size={28} color="#808080" />
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Aa" />
        <TouchableOpacity style={{ marginTop: 7 }}>
          <Ionicons name="mic-outline" size={28} color="#808080" />
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
  backgroundImage: {
    width: '100%',
    height: '45%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
  },
  backButton: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 12,
    marginTop: 40,
    marginLeft: 20,
  },
  backIcon: {
    fontSize: 24,
    color: '#444',
  },
  header: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  iconButton: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 12,
    marginTop: 40,
    marginLeft: 20,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: height * 0.4,
    height: height * 0.6,
    zIndex: 1,
  },
  clinicName: {
    fontSize: 24,
    color: '#0448ab',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clinicAdd: {
    flexDirection: 'row',
  },
  addIcon: {
    width: 15,
    height:  15,
    marginTop: 2,
  },
  clinicSpecialty: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 10,
  },
  clinicSpecialtys: {
    fontSize: 24,
    color: '#0448ab',
    marginBottom: 10,
  },
  clinicRate: {
    flexDirection: 'row',
    fontSize: 24,
    color: '#0448ab',
  },
  clinicIcon: {
    width: 20,
    height: 20,
    marginBottom: 10,
  },
  ratingText: {
    color: '#0448ab',
    fontSize: 16,
    marginRight: 12,
  },
  distanceText: {
    color: '#0448ab',
    fontSize: 16,
  },
  chatContainer: {
    flex: 1,
    paddingTop: 10,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 50,
    maxWidth: '80%',
  },
  userMessageText: {
    color: 'white',
    fontSize: 16,
  },
  doctorMessageContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 20,
    maxWidth: '80%',
    marginBottom: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  doctorMessageText: {
    fontSize: 16,
    color: '#333',
    width: '80%',
  },
  appointmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: '100%',
    zIndex: 10,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    fontSize: 16,
  },
});

export default ChatScreen3;
