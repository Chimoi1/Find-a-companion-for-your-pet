import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatDetailScreen = ({ route }) => {
  const { chat } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.chatName}>{chat.name}</Text>
      <Text style={styles.chatMessage}>{chat.message}</Text>
      <Text style={styles.chatTime}>Sent at: {chat.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  chatName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatMessage: {
    fontSize: 16,
    marginBottom: 10,
  },
  chatTime: {
    fontSize: 14,
    color: '#808080',
  },
});

export default ChatDetailScreen;
