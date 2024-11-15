import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [conversationVisible, setConversationVisible] = useState(false);

  // Dữ liệu mẫu cho danh sách chat
  const chats = [
    { id: '1', name: 'David Wayne', message: 'Thanks a bunch! Have a great day! 😊', time: '10:25', newMessages: 5 },
    { id: '2', name: 'Edward Davidson', message: 'Great, thanks so much! 👋', time: '22:20', date: '09/05', newMessages: 12 },
    { id: '3', name: 'Angela Kelly', message: 'Appreciate it! See you soon! 🚀', time: '10:45', date: '08/05', newMessages: 1 },
  ];

  // Dữ liệu mẫu cho cuộc trò chuyện
  const conversationData = [
    { id: '1', sender: 'David Wayne', text: 'Hello! How are you doing today?', time: '10:20' },
    { id: '2', sender: 'You', text: 'I’m doing great! Thanks for asking. 😊', time: '10:22' },
    { id: '3', sender: 'David Wayne', text: 'Glad to hear! Have a great day!', time: '10:25' },
  ];

  // Hàm mở cuộc trò chuyện khi nhấn vào chat
  const openConversation = (chatId) => {
    setSelectedChatId(chatId);
    setConversationVisible(true);
  };

  // Hàm đóng cuộc trò chuyện
  const closeConversation = () => {
    setConversationVisible(false);
    setSelectedChatId(null);
  };

  // Hàm điều hướng cho footer
  const goToHomeScreen = () => navigation.navigate('HomeScreen');
  const goToCalendarScreen = () => navigation.navigate('CalendarScreen');
  const goToProfileScreen = () => navigation.navigate('ProfileScreen');
  const goToChatScreen = () => navigation.navigate('ChatScreen');
  const goToAccountScreen = () => navigation.navigate('AccountScreen');

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        {/* Tiêu đề với thông tin người dùng và các nút icon */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={require('../assets/HomeScreens/avatar-image.png')} style={styles.avatar} />
            <View style={styles.userTextContainer}>
              <Text style={styles.greetingText}>Xin chào,</Text>
              <Text style={styles.emailText}>Thanh</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            {/* Nút tìm kiếm */}
            <TouchableOpacity style={styles.iconContainer}>
              <Image source={require('../assets/ChatScreen/search-icon.png')} style={styles.icon} />
            </TouchableOpacity>
            {/* Nút thông báo với viền */}
            <TouchableOpacity style={styles.notificationIconContainer} onPress={() => navigation.navigate('NotificationScreen')}>
              <Image source={require('../assets/HomeScreens/notifications-image.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Danh sách chat hoặc cuộc trò chuyện */}
      {conversationVisible ? (
        <View style={styles.conversationContainer}>
          {/* Nút quay lại để đóng cuộc trò chuyện */}
          <TouchableOpacity onPress={closeConversation} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Trở về danh sách chat</Text>
          </TouchableOpacity>

          {/* Tin nhắn trong cuộc trò chuyện */}
          <FlatList
            data={conversationData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.messageItem, item.sender === 'You' ? styles.myMessage : styles.otherMessage]}>
                <Text style={styles.messageSender}>{item.sender}</Text>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.messageTime}>{item.time}</Text>
              </View>
            )}
            contentContainerStyle={styles.messageList}
          />
        </View>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openConversation(item.id)}>
              <View style={styles.chatItem}>
                <Image source={require('../assets/HomeScreens/avatar-image.png')} style={styles.chatAvatar} />
                <View style={styles.chatDetails}>
                  <Text style={styles.chatName}>{item.name}</Text>
                  <Text style={styles.chatMessage}>{item.message}</Text>
                </View>
                <View style={styles.chatTimeContainer}>
                  <Text style={styles.chatTime}>{item.time}</Text>
                  {item.newMessages > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.newMessages}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.chatList}
        />
      )}

      {/* Thanh điều hướng dưới cùng (footer) */}
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
          <Image source={require('../assets/HomeScreens/chat-icon-active.png')} style={styles.footerImage} />
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
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
    marginHorizontal: 5,
  },
  notificationIconContainer: {
    padding: 8,                // Điều chỉnh padding để tạo kích thước hình vuông
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 11,           // Giảm borderRadius để tạo góc vuông hơn
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,                 // Đặt chiều rộng cụ thể để tạo hình vuông
    height: 40,
  },
  icon: {
    width: 24,
    height: 24,
  },
  chatList: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatDetails: {
    flex: 1,
    marginLeft: 10,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  chatMessage: {
    fontSize: 14,
    color: '#808080',
    marginTop: 2,
  },
  chatTimeContainer: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: 12,
    color: '#808080',
  },
  badge: {
    backgroundColor: '#2196f3',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#fff',
  },
  conversationContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    marginVertical: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007aff',
  },
  messageList: {
    paddingBottom: 10,
  },
  messageItem: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  myMessage: {
    backgroundColor: '#d1e7ff',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  messageSender: {
    fontSize: 12,
    color: '#555',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  messageTime: {
    fontSize: 10,
    color: '#777',
    alignSelf: 'flex-end',
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

export default ChatScreen;
