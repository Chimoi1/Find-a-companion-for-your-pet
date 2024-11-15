import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CalendarScreen2 = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  // Navigation functions
  const goToHome = () => navigation.navigate('HomeScreen');
  const goToProfile = () => navigation.navigate('ProfileScreen');
  const goToChat = () => navigation.navigate('ChatScreen');
  const goToAccount = () => navigation.navigate('AccountScreen');
  const goToVeterinarianScreen = () => navigation.navigate('VeterinarianScreen');

  const goToClinicScreen = (clinicData) => {
    // Navigate to ClinicScreen and pass clinicData if needed
    navigation.navigate('ClinicScreen', { clinicData });
  };

  return (
    <View style={styles.container}>
      {/* Background map image */}
      <Image
        source={require('../assets/CalenderScreen/map-background.png')}
        style={styles.fullScreenImage}
      />

      {/* Header */}
      <View style={styles.fixedHeader}>
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Địa điểm</Text>
            <View style={styles.locationRow}>
              <Image
                source={require('../assets/CalenderScreen/tick-icon.png')}
                style={styles.tickIcon}
              />
              <Text style={styles.locationValue}>Đống Đa, Hà Nội</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationIcon} onPress={() => navigation.navigate('NotificationScreen')}>
            <Image
              source={require('../assets/HomeScreens/notifications-image.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          {searchText === '' && (
            <Image
              source={require('../assets/CalenderScreen/search-icon.png')}
              style={styles.searchIcon}
            />
          )}
          <TextInput
            placeholder="Tìm phòng khám, bác sĩ thú y"
            style={styles.searchInput}
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
        </View>
      </View>

      {/* Map markers with images */}
      <View style={styles.markerContainer}>
        <TouchableOpacity onPress={goToVeterinarianScreen}>
          <Image source={require('../assets/CalenderScreen/tick-doctor1.png')} style={[styles.markerImage, { top: '-450%', left: '-290%' }]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToVeterinarianScreen}>
          <Image source={require('../assets/CalenderScreen/tick-doctor2.png')} style={[styles.markerImage, { top: '-350%', left: '-10%' }]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToVeterinarianScreen}>
          <Image source={require('../assets/CalenderScreen/tick-doctor3.png')} style={[styles.markerImage, { top: '-140%', left: '-10%' }]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToVeterinarianScreen}>
          <Image source={require('../assets/CalenderScreen/tick-doctor4.png')} style={[styles.markerImage, { top: '-20%', left: '-570%' }]} />
        </TouchableOpacity>
      </View>

      {/* Nearest clinics section */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phòng khám gần nhất</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Clinic Card 1 */}
            <TouchableOpacity onPress={() => goToClinicScreen({ name: 'Thú y PetPro', address: '232 Kim Mã, Ba Đình, Hà Nội' })}>
              <View style={styles.clinicCard}>
                <Image source={require('../assets/CalenderScreen/clinic1-image.png')} style={styles.clinicImage} />
                <View style={styles.clinicInfo}>
                  <Text style={styles.clinicName}>Thú y PetPro</Text>
                  <Text style={styles.clinicAddress}>232 Kim Mã, Ba Đình, Hà Nội</Text>
                  <View style={styles.clinicRating}>
                    <Image source={require('../assets/star-icon.png')} style={styles.icon} />
                    <Text style={styles.clinicRatingText}>5.0 (58 đánh giá)</Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <View style={styles.detailsText}>
                      <Image source={require('../assets/distance-icon.png')} style={styles.icon} />
                      <Text>2.5 km/40 phút</Text>
                    </View>
                    <View style={styles.detailsText}>
                      <Image source={require('../assets/hospital-icon.png')} style={styles.icon} />
                      <Text>Bệnh viện</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Clinic Card 2 */}
            <TouchableOpacity onPress={() => goToClinicScreen({ name: 'Thú y PetVN', address: '1096 Đường Láng, Hà Nội' })}>
              <View style={styles.clinicCard}>
                <Image source={require('../assets/CalenderScreen/clinic2-image.png')} style={styles.clinicImage} />
                <View style={styles.clinicInfo}>
                  <Text style={styles.clinicName}>Thú y PetVN</Text>
                  <Text style={styles.clinicAddress}>1096 Đường Láng, Hà Nội</Text>
                  <View style={styles.clinicRating}>
                    <Image source={require('../assets/star-icon.png')} style={styles.icon} />
                    <Text style={styles.clinicRatingText}>4.9 (45 đánh giá)</Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <View style={styles.detailsText}>
                      <Image source={require('../assets/distance-icon.png')} style={styles.icon} />
                      <Text>2.5 km/40 phút</Text>
                    </View>
                    <View style={styles.detailsText}>
                      <Image source={require('../assets/hospital-icon.png')} style={styles.icon} />
                      <Text>Bệnh viện</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon} onPress={goToHome}>
          <Image
            source={require('../assets/HomeScreens/home-icon.png')}
            style={styles.footerImage}
          />
          <Text style={styles.footerText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => {}}>
          <Image
            source={require('../assets/HomeScreens/calendar-icon-active.png')}
            style={styles.footerImage}
          />
          <Text style={styles.footerText}>Đặt lịch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={goToProfile}>
          <Image
            source={require('../assets/HomeScreens/profile-icon.png')}
            style={styles.footerImage}
          />
          <Text style={styles.footerText}>Hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={goToChat}>
          <Image
            source={require('../assets/HomeScreens/chat-icon.png')}
            style={styles.footerImage}
          />
          <Text style={styles.footerText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={goToAccount}>
          <Image
            source={require('../assets/HomeScreens/account-icon.png')}
            style={styles.footerImage}
          />
          <Text style={styles.footerText}>Tài khoản</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
    zIndex: -5,
  },
  fixedHeader: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 33,
  },
  locationContainer: {
    flexDirection: 'column',
  },
  locationText: {
    color: '#888',
    fontSize: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickIcon: {
    width: 16,
    height: 18,
    marginRight: 4,
  },
  locationValue: {
    fontSize: 26,
  },
  notificationIcon: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  icon: {
    width: 24,
    height: 24,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 12,
    borderColor: '#f3f4f6',
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  markerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  markerImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain', // Ensures the image retains its aspect ratio
  },
  scrollContent: {
    flexGrow: 1,
    zIndex: -1,
  },
  section: {
    paddingHorizontal: 0,
    paddingVertical: 10,
    marginTop: 381,
    shadowColor: '#000',
    shadowOffset: 4,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  clinicCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    width: 250,
    overflow: 'hidden',
    marginLeft: 10,
  },
  clinicImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  clinicInfo: {
    padding: 10,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clinicAddress: {
    color: '#666',
    fontSize: 14,
  },
  clinicRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clinicRatingText: {
    fontSize: 14,
    color: '#f5a623',
    marginLeft: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailsText: {
    fontSize: 12,
    color: '#999',
    flexDirection: 'row',
    alignItems: 'center',
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

export default CalendarScreen2;
