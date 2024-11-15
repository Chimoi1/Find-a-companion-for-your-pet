import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Navigation functions for footer
  const goToHomeScreen = () => navigation.navigate('HomeScreen');
  const goToCalendarScreen = () => navigation.navigate('CalendarScreen');
  const goToProfileScreen = () => navigation.navigate('ProfileScreen');
  const goToChatScreen = () => navigation.navigate('ChatScreen');
  const goToAccountScreen = () => navigation.navigate('AccountScreen');

  // Function to open modal with selected notification details
  const openNotification = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedNotification(null);
  };

  // Sample notifications data
  const notificationsToday = [
    { id: 1, text: 'Đến lịch tiêm vắc-xin dại. Ấn vào đây để đặt lịch tiêm.', icon: require('../assets/Notification/notification-heart-icon.png') }
  ];
  const notificationsOtherDate = [
    { id: 2, text: 'Xuất viện thành công.', icon: require('../assets/Notification/notification-hospital-icon.png') },
    { id: 3, text: 'Đặt lịch khám thành công.', icon: require('../assets/Notification/notification-check-icon.png') },
    { id: 4, text: 'Tiêm vắc xin dại mũi 1 thành công.', icon: require('../assets/Notification/notification-heart-icon.png') }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông báo</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today's Notifications */}
        <View style={styles.notificationSection}>
          <Text style={styles.dateText}>Hôm nay</Text>
          {notificationsToday.map((notification) => (
            <TouchableOpacity key={notification.id} onPress={() => openNotification(notification)}>
              <View style={styles.notificationCard}>
                <Image source={notification.icon} style={styles.icon} />
                <Text style={styles.notificationText}>{notification.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notifications from another date */}
        <View style={styles.notificationSection}>
          <Text style={styles.dateText}>15/06/2024</Text>
          {notificationsOtherDate.map((notification) => (
            <TouchableOpacity key={notification.id} onPress={() => openNotification(notification)}>
              <View style={styles.notificationCard}>
                <Image source={notification.icon} style={styles.icon} />
                <Text style={styles.notificationText}>{notification.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal for viewing notification details */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none" // Disable animation
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedNotification && (
              <>
                <Image source={selectedNotification.icon} style={styles.modalIcon} />
                <Text style={styles.modalText}>{selectedNotification.text}</Text>
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

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
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  notificationSection: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalIcon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007aff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
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

export default NotificationScreen;
