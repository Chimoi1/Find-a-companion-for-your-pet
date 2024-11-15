import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CallScreen2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require('../assets/CallScreen/clinic-image.png')} style={styles.backgroundImage} />

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
        <View style={styles.clinicInfo}>
            <Text style={styles.clinicName}>Phòng Khám Thú Y PetPro</Text>
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
        </View>
        <View style={styles.timeInfo}>
          <Text style={styles.timeCall}>12:09</Text>
          <TouchableOpacity style={styles.noteButton}>
            <Image source={require('../assets/CallScreen/notes-icon.png')} style={styles.noteIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.microButton}>
          <Image source={require('../assets/CallScreen/microphone-icon.png')} style={styles.callIcon} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.endcallButton}>
          <Image source={require('../assets/CallScreen/call-icon.png')} style={styles.callIcon} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.videoButton}>
          <Image source={require('../assets/CallScreen/video-icon.png')} style={styles.callIcon} resizeMode="contain" />
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
  backgroundImage: {
    width: '100%',
    height: '80%',
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
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    height: 220, 
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 2,
  },
  clinicInfo: {
    marginTop: 60,
    marginLeft: 20
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
  timeInfo: {
    marginTop: 50,
    marginLeft: 30
  },
  timeCall:{
    fontSize: 40,
    marginBottom:  20,
  },
  noteButton: {
    alignItems: 'center',
    marginLeft: 25,
    padding: 10,
    backgroundColor: '#0448ab',
    borderRadius: 10,
  },
  noteIcon: {
    height: 35,
    width: 24,
  },
  notesButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    marginLeft: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 70,
    marginTop: 640,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 2,
  },
  microButton: {
    backgroundColor: '#fafafb',
    padding: 20,
    borderRadius: 50,
    elevation: 5,
  },
  videoButton: {
    backgroundColor: '#fafafb',
    padding: 20,
    borderRadius: 50,
    elevation: 5,
  },
  endcallButton: {
    backgroundColor: '#ff4d4d',
    padding: 20,
    borderRadius: 50,
    elevation: 5,
  },
  callIcon: {
    width: 24,
    height: 24,
  },
});

export default CallScreen2;
