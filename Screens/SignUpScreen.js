import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);

  const handleEmailChange = (text) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail(text);
    setIsEmailValid(emailRegex.test(text));
  };

  const handleSignUp = async () => {
    if (!isEmailValid || email.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }

    if (password.trim() === '' || password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (!isPolicyChecked) {
      Alert.alert('Lỗi', 'Vui lòng đồng ý với chính sách của Baby Pets');
      return;
    }

    try {
      // Lưu tài khoản vào AsyncStorage
      const userAccount = { email, password };
      await AsyncStorage.setItem('userAccount', JSON.stringify(userAccount));

      navigation.navigate('SignUpScreen2', { email }); // Quay lại trang đăng nhập
    } catch (error) {
      console.error('Error saving user account:', error);
      Alert.alert('Lỗi', 'Không thể tạo tài khoản. Vui lòng thử lại.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('../assets/image4.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../assets/user-icon.png')}
                  style={styles.userIcon}
                />
              </View>
              <Text style={styles.title}>Tạo tài khoản</Text>
              <Text style={styles.subTitle}>Đăng ký tài khoản Baby Pets</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, !isEmailValid && { borderColor: 'red' }]}
                  placeholder="Email"
                  value={email}
                  onChangeText={handleEmailChange}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu (ít nhất 6 ký tự)"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setIsPolicyChecked(!isPolicyChecked)}
              >
                <Ionicons
                  name={isPolicyChecked ? 'checkbox-outline' : 'square-outline'}
                  size={24}
                  color="gray"
                />
                <Text style={styles.checkboxText}>Tôi đồng ý với chính sách của Baby Pets</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Tạo tài khoản</Text>
              </TouchableOpacity>

              <Text style={styles.loginText}>
                Đã có tài khoản?{' '}
                <Text style={styles.loginLink} onPress={() => navigation.navigate('LoginScreen')}>
                  Đăng nhập ngay!
                </Text>
              </Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    height: 508,
  },
  iconContainer: {
    marginTop: -50,
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 10,
  },
  userIcon: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    height: 60,
  },
  input: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
  },
  checkboxText: {
    marginLeft: 8,
    color: 'gray',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 20,
    color: 'gray',
  },
  loginLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
