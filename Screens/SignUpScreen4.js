//trang đăng kí tài khoản mới phần thành công
import React from 'react'; // Import thư viện React
import { View,Text, StyleSheet, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, Platform, ScrollView,TouchableWithoutFeedback,Keyboard,} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Định nghĩa component SignUpScreen4
const SignUpScreen4 = ({ navigation }) => {

  // Hàm xử lý khi người dùng nhấn "trang Tạo hồ sơ thú cưng"
  const handleGoToProfile = () => {
    console.log('Đi tới trang Tạo hồ sơ thú cưng');
    navigation.navigate('ProfileScreen'); // Điều hướng tới màn hình trang chủ
  };

  // Hàm xử lý khi người dùng nhấn "Tới trang chủ"
  const handleGoToHome = () => {
    console.log('Đi tới trang chủ');
    navigation.navigate('HomeScreen'); // Điều hướng tới màn hình trang chủ
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('../assets/image4.png')} // Đặt ảnh nền cho màn hình
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.card}>
              {/* Hiển thị biểu tượng xác minh */}
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../assets/verification-icon.png')} // Đường dẫn tới biểu tượng xác minh
                  style={styles.verificationIcon}
                />
              </View>

              {/* Tiêu đề "Thành công" */}
              <Text style={styles.title}>Thành công!</Text>
              <Text style={styles.subTitle}>
                Xác minh thành công. Chào mừng bạn tới Baby Pest 💖
              </Text>

              {/* Nút "Tạo hồ sơ thú cưng" */}
              <TouchableOpacity style={styles.button} onPress={handleGoToProfile}>
                <Text style={styles.buttonText}>Tạo hồ sơ thú cưng</Text>
              </TouchableOpacity>

              {/* Nút "Tới trang chủ" */}
              <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={handleGoToHome}>
                <Text style={styles.homeButtonText}>Tới trang chủ</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Định nghĩa các kiểu dáng (styles) cho các thành phần trong SignUpScreen4
const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ chiều cao của màn hình
  },
  backgroundImage: {
    flex: 1, // Chiếm toàn bộ diện tích
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1, // Cho phép nội dung cuộn
    justifyContent: 'flex-end', // Căn cuối màn hình
  },
  card: {
    backgroundColor: 'white', // Màu nền của thẻ
    borderTopLeftRadius: 40, // Bo góc trên trái
    borderTopRightRadius: 40, // Bo góc trên phải
    padding: 20, // Khoảng cách bên trong thẻ
    alignItems: 'center', // Căn giữa các nội dung
    width: '100%',
    height: '43%' // Đặt chiều cao của thẻ
  },
  iconContainer: {
    marginTop: -50, // Đẩy icon lên phía trên thẻ
    padding: 0, // Không thêm khoảng cách bên trong
    backgroundColor: 'white', // Màu nền của container icon
    borderRadius: 50, // Bo tròn các góc
    borderWidth: 12, // Độ dày viền
    borderColor: 'white', // Màu viền
    marginBottom: 10, // Khoảng cách phía dưới icon
  },
  verificationIcon: {
    width: 75, // Chiều rộng của icon
    height: 75, // Chiều cao của icon
  },
  title: {
    fontSize: 30, // Kích thước chữ tiêu đề
    fontWeight: 'bold', // Độ đậm của chữ
    marginVertical: 10, // Khoảng cách trên và dưới
  },
  subTitle: {
    fontSize: 20, // Kích thước chữ phụ đề
    color: 'gray', // Màu chữ phụ đề
    textAlign: 'center', // Căn giữa chữ phụ đề
    marginBottom: 20, // Khoảng cách phía dưới
    paddingHorizontal: 20, // Khoảng cách hai bên cho chữ
  },
  button: {
    backgroundColor: '#007bff', // Màu nền của nút
    paddingVertical: 20, // Khoảng cách trên dưới của nút
    width: '100%', // Chiều rộng 100% của thẻ
    borderRadius: 8, // Bo góc nút
    alignItems: 'center', // Căn giữa nội dung trong nút
    marginVertical: 10, // Khoảng cách trên dưới của nút
  },
  buttonText: {
    color: 'white', // Màu chữ trên nút "Tạo hồ sơ thú cưng"
    fontSize: 18, // Kích thước chữ
    fontWeight: 'bold', // Độ đậm của chữ
  },
  homeButton: {
    backgroundColor: 'white', // Màu nền trắng cho nút "Tới trang chủ"
    borderWidth: 1, // Độ dày viền
    borderColor: '#007bff', // Màu viền giống như màu chính
  },
  homeButtonText: {
    color: '#007bff', // Màu chữ trên nút "Tới trang chủ"
    fontSize: 18, // Kích thước chữ
    fontWeight: 'bold', // Độ đậm của chữ
  },
});

// Xuất component SignUpScreen4 để sử dụng trong các phần khác
export default SignUpScreen4; 
