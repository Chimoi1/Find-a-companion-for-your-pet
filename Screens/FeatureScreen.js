// Trang Splash 2
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const FeatureScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Ảnh phía trên chiếm 1/3 màn hình */}
      <Image source={require('../assets/image2.png')} style={styles.image} />
      
      {/* Nền trắng và các thành phần bên trong */}
      <View style={styles.contentContainer}>
        
        {/* Thanh tiến trình */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressDot} />
          {/* Chấm trống */}
          <View style={styles.progressDotActive} />
          {/* Chấm active */}
          <View style={styles.progressDot} />
          {/* Chấm trống */}
        </View>

        {/* Logo */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        {/* Text căn giữa */}
        <View style={styles.textContainer}>
          
          {/* Căn chỉnh biểu tượng dấu tích và văn bản */}
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletIcon}>✔️</Text>
            <Text style={styles.bulletText}>Hỗ trợ sức khoẻ thú cưng</Text>
          </View>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletIcon}>✔️</Text>
            <Text style={styles.bulletText}>Nhắc lịch tiêm và lịch trình</Text>
          </View>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletIcon}>✔️</Text>
            <Text style={styles.bulletText}>Trò chuyện 1-1 với bác sĩ</Text>
          </View>
        </View>

        {/* Nút tiếp tục */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserTypeScreen')}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
          <Ionicons name="chevron-forward" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8dcd5', // Nền màu hồng nhạt
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.655, // Chiều cao ảnh chiếm 1/3 màn hình
    width: width,
    resizeMode: 'cover', // Ảnh không bị méo
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: 'center',
    width: '100%',
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  progressDot: {
    width: 20,
    height: 7,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  progressDotActive: {
    width: 20,
    height: 7,
    borderRadius: 3,
    backgroundColor: '#007bff',
    marginHorizontal: 5,
  },
  logo: {
    width: Platform.OS === 'web' ? '15vw' : width * 0.3,
    height: undefined,
    aspectRatio: 1,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bulletIcon: {
    fontSize: Platform.OS === 'web' ? 20 : 18,
    marginRight: 10,
  },
  bulletText: {
    fontSize: Platform.OS === 'web' ? 20 : 16,
    color: '#888',
    textAlign: 'left',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 16,
    width: Platform.OS === 'web' ? '30vw' : width * 0.8,
    borderRadius: 10,
    justifyContent: 'center',
    position: 'relative',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: Platform.OS === 'web' ? 20 : 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  icon: {
    position: 'absolute',
    right: 20,
  },
});

export default FeatureScreen;
