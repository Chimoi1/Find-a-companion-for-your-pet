import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Lấy tài khoản đã lưu từ AsyncStorage
      const storedAccount = await AsyncStorage.getItem('userAccount');
      const parsedAccount = storedAccount ? JSON.parse(storedAccount) : null;

      if (parsedAccount && parsedAccount.email === email && parsedAccount.password === password) {
        Alert.alert('Thành công', 'Đăng nhập thành công!');
        navigation.navigate('HomeScreen', { email });
      } else {
        Alert.alert('Đăng nhập thất bại', 'Email hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Lỗi', 'Đăng nhập không thành công. Vui lòng thử lại.');
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Đăng nhập bằng ${provider}`);
    navigation.navigate('HomeScreen', { email: `${provider}@example.com` });
  };

  return (
    <View style={styles.container}>
      {/* Ảnh ở góc phải trên */}
      <View style={styles.topRightContainer}>
        <Image source={require('../assets/anhgoc.png')} style={styles.firstImage} />
        <Image source={require('../assets/anhgoc2.png')} style={styles.secondImage} />
      </View>

      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Nhập email */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Nhập mật khẩu */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Đăng nhập bằng số điện thoại & Quên mật khẩu */}
      <View style={styles.rowContainer}>
        <Text style={styles.phoneLogin} onPress={() => {}}>
          Đăng nhập bằng số điện thoại
        </Text>
        <Text style={styles.forgotPassword} onPress={() => {}}>
          Quên mật khẩu?
        </Text>
      </View>

      {/* Nút Đăng nhập */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <Text style={styles.socialText}>Hoặc kết nối với:</Text>

      {/* Nút đăng nhập bằng mạng xã hội */}
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Google')}>
          <Ionicons name="logo-google" size={24} color="white" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Đăng nhập với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Facebook')}>
          <Ionicons name="logo-facebook" size={24} color="white" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Đăng nhập với Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Apple')}>
          <Ionicons name="logo-apple" size={24} color="white" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Đăng nhập với Apple</Text>
        </TouchableOpacity>
      </View>

      {/* Điều hướng đến màn hình đăng ký */}
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.registerText}>Đăng ký tài khoản mới</Text>
      </TouchableOpacity>

      {/* Ảnh nền */}
      <Image source={require('../assets/nen.png')} style={styles.backgroundImage} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
  },
  logo: {
    width: 185,
    height: 185,
    marginBottom: -10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    backgroundColor: 'white',
    height: 60,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  icon: {
    paddingHorizontal: 10,
  },
  socialText: {
    textAlign: 'left',
    marginVertical: 20,
    with: '100%'
  },
  socialButtons: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
    marginBottom: 20,
  },
  phoneLogin: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'left',
    flex: 1,
  },
  forgotPassword: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'right',
    flex: 1,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingLeft: 90,
    width: '100%',
    borderRadius: 5,
    marginVertical: 5,
    justifyContent: 'flex-start',
  },
  socialButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  socialIcon: {
    marginRight: 10,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: -196,
    left: -120,
    width: '124%',
    height: '124%',
    opacity: 5.5,
    zIndex: -1,
  },
  topRightContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 5000,  // Kích thước container chứa hai hình ảnh
    height: 5000, // Kích thước container chứa hai hình ảnh
    overflow: 'hidden',
  },
  firstImage: {
    position: 'absolute',
    width: 500, // Điều chỉnh kích thước của ảnh lớn
    height: 500, 
    top: -350, // Căn chỉnh vị trí ảnh
    right: -190,
  },
  secondImage: {
    position: 'absolute',
    width: 300, // Điều chỉnh kích thước của ảnh nhỏ
    height: 300, 
    top: -120, // Điều chỉnh vị trí đè lên ảnh lớn
    right: -240,
  },
});

export default LoginScreen;
