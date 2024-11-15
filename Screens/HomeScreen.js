import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation(); // Hook điều hướng

  // Hàm điều hướng sang các màn hình khác
  const goToCalendar = () => navigation.navigate('CalendarScreen');
  const goToProfileScreen = () => navigation.navigate('ProfileScreen');
  const goToChatScreen = () => navigation.navigate('ChatScreen');
  const goToAccountScreen = () => navigation.navigate('AccountScreen');
  const goToNotification = () => navigation.navigate('NotificationScreen');
  const goToProfileAbout = () => navigation.navigate('ProfileAbout'); // Điều hướng tới ProfileAbout

  const doctors = [
    { id: '1', image: require('../assets/HomeScreens/vet1-image.png') },
    { id: '2', image: require('../assets/HomeScreens/vet2-image.png') },
    { id: '3', image: require('../assets/HomeScreens/vet3-image.png') },
    { id: '4', image: require('../assets/HomeScreens/vet4-image.png') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        {/* Phần đầu màn hình, thông tin người dùng */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={require('../assets/HomeScreens/avatar-image.png')} // Thay bằng đường dẫn ảnh đại diện
              style={styles.avatar}
            />
            <View style={styles.userTextContainer}>
              <Text style={styles.greetingText}>Hello,</Text>
              <Text style={styles.emailText}>iumiuthoi@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationIcon} onPress={goToNotification}>
            <Image
              source={require('../assets/HomeScreens/notifications-image.png')} // Thay bằng đường dẫn icon thông báo
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* Hồ sơ thú cưng */}
        <View style={styles.petProfile}>
          <View style={styles.petHeader}>
            <Text style={styles.sectionTitle}>Hồ sơ thú cưng</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>1</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.petCard} onPress={goToProfileAbout}>
            <View style={styles.petInfoContainer}>
              <Text style={styles.petName}>Miu</Text>
              <Text style={styles.petInfo}>Mèo | Mèo ta</Text>
            </View>
            <View style={styles.petImageContainer}>
              <Image
                source={require('../assets/HomeScreens/pet-image.png')} // Thay bằng đường dẫn ảnh thú cưng
                style={styles.petImage}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Dịch vụ */}
        <View style={styles.serviceSection}>
          <Text style={styles.sectionTitle}>Dịch vụ</Text>
          <View style={styles.services}>
            <TouchableOpacity style={styles.serviceIcon}>
              <Image
                source={require('../assets/HomeScreens/medical-icon.png')} // Thay bằng icon Y tế
                style={styles.serviceImage}
              />
              <Text style={styles.serviceText}>Y tế</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceIcon}>
              <Image
                source={require('../assets/HomeScreens/spa-icon.png')} // Thay bằng icon Spa
                style={styles.serviceImage}
              />
              <Text style={styles.serviceText}>Spa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceIcon}>
              <Image
                source={require('../assets/HomeScreens/food-icon.png')} // Thay bằng icon Đồ ăn
                style={styles.serviceImage}
              />
              <Text style={styles.serviceText}>Đồ ăn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceIcon}>
              <Image
                source={require('../assets/HomeScreens/medical-icon.png')} // Thay bằng icon Cấp cứu
                style={styles.serviceImage}
              />
              <Text style={styles.serviceText}>Cấp cứu</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bác sĩ thú y */}
        <View style={styles.vetSection}>
          <Text style={styles.sectionTitle}>Bác sĩ thú y</Text>
          <View style={styles.vetList}>
            {doctors.map((doctor, index) => {
              if (index % 2 === 0) {
                return (
                  <View key={index} style={styles.vetRow}>
                    <View style={styles.vetCard}>
                      <Image source={doctor.image} style={styles.vetImage} />
                      <Text style={styles.vetName}>{doctor.name}</Text>
                    </View>
                    {doctors[index + 1] && (
                      <View style={styles.vetCard}>
                        <Image source={doctors[index + 1].image} style={styles.vetImage} />
                        <Text style={styles.vetName}>{doctors[index + 1].name}</Text>
                      </View>
                    )}
                  </View>
                );
              }
              return null;
            })}
          </View>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        {/* Home */}
        <TouchableOpacity style={styles.footerIcon}>
          <Image
            source={require('../assets/HomeScreens/home-icon-active.png')} // Thay bằng icon Home
            style={styles.footerImage}
          />
          <Text style={styles.footerText}>Trang chủ</Text>
        </TouchableOpacity>

        {/* Đặt lịch */}
        <TouchableOpacity style={styles.footerIcon} onPress={goToCalendar}>
          <Image
            source={require('../assets/HomeScreens/calendar-icon.png')} // Thay bằng icon Đặt lịch
            style={styles.footerImage}
          />
          <Text style={styles.footerText}>Đặt lịch</Text>
        </TouchableOpacity>

        {/* Hồ sơ */}
        <TouchableOpacity style={styles.footerIcon} onPress={goToProfileScreen}>
          <Image
            source={require('../assets/HomeScreens/profile-icon.png')} // Thay bằng icon Hồ sơ
            style={styles.footerImage}
          />
          <Text style={styles.footerText}>Hồ sơ</Text>
        </TouchableOpacity>

        {/* Chat */}
        <TouchableOpacity style={styles.footerIcon} onPress={goToChatScreen}>
          <Image
            source={require('../assets/HomeScreens/chat-icon.png')} // Thay bằng icon Chat
            style={styles.footerImage}
          />
          <Text style={styles.footerText}>Chat</Text>
        </TouchableOpacity>

        {/* Tài khoản */}
        <TouchableOpacity style={styles.footerIcon} onPress={goToAccountScreen}>
          <Image
            source={require('../assets/HomeScreens/account-icon.png')} // Thay bằng icon Tài khoản
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
    backgroundColor: '#f8f8f8',
  },
  scrollContent: {
    flexGrow: 1,
  },
  fixedHeader: {
    backgroundColor: '#fff',
    zIndex: 10,
    width: '100%',
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 33,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userTextContainer: {
    marginLeft: 10,
  },
  greetingText: {
    fontSize: 16,
    color: '#808080',
  },
  emailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationIcon: {
    padding: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginTop: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  petProfile: {
    padding: 20,
  },
  petHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  notificationBadge: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  notificationText: {
    fontSize: 12,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196f3',
    padding: 35,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  petInfoContainer: {
    flex: 1,
  },
  petImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  petImage: {
    width: '90%',
    height: '90%',
    borderRadius: 35,
  },
  petName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  petInfo: {
    color: '#fff',
  },
  serviceSection: {
    padding: 12,
  },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceIcon: {
    alignItems: 'center',
    marginHorizontal: -2,
  },
  serviceImage: {
    width: 105,
    height: 105,
  },
  serviceText: {
    marginTop: 5,
    fontSize: 12,
  },
  vetSection: {
    padding: 20,
  },
  vetList: {
    flexDirection: 'column',
  },
  vetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
  },
  vetCard: {
    alignItems: 'center',
    width: '48%',
  },
  vetImage: {
    width: 190,
    height: 240,
    borderRadius: 20,
  },
  vetName: {
    marginTop: 5,
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
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

export default HomeScreen;
