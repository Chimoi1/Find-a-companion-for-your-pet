//trang đăng kí tài khoản mới phần mã xác nhận
import React, { useRef, useState } from 'react'; // Import thêm useRef
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

// Định nghĩa component SignUpScreen3
const SignUpScreen3 = ({ navigation }) => {
  // Khai báo state để lưu trữ mã xác minh
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']); // Mỗi ô nhập mã là một phần tử của mảng

  // Khai báo các tham chiếu tới mỗi ô nhập
  const inputRefs = useRef([]);

  // Hàm xử lý khi người dùng nhấn nút "Xác nhận"
  const handleConfirm = () => {
    const code = verificationCode.join(''); // Kết hợp các phần tử thành một chuỗi mã

    if (code.length !== 4) {
      Alert.alert('Lỗi', 'Vui lòng nhập đủ mã xác minh');
      return;
    }

    // Điều hướng sang SignUpScreen4 sau khi mã xác minh thành công
    navigation.navigate('SignUpScreen4');
    console.log('Xác minh thành công với mã:', code);
  };

  // Hàm cập nhật giá trị của mỗi ô mã xác minh và chuyển con trỏ tới ô tiếp theo
  const updateCode = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Nếu người dùng nhập xong và không phải ô cuối cùng, chuyển sang ô tiếp theo
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
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

              <Text style={styles.title}>Xác minh tài khoản</Text>
              <Text style={styles.subTitle}>
                Một mã xác minh đã được gửi tới email của bạn. Vui lòng kiểm tra và nhập mã để tiếp tục.
              </Text>

              {/* Trường nhập mã xác minh */}
              <View style={styles.codeContainer}>
                {verificationCode.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.codeInput}
                    maxLength={1}
                    keyboardType="numeric"
                    value={digit}
                    onChangeText={(value) => updateCode(index, value)}
                    ref={(ref) => inputRefs.current[index] = ref} // Gán tham chiếu cho từng ô nhập
                  />
                ))}
              </View>

              {/* Nút xác nhận */}
              <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Xác nhận</Text>
              </TouchableOpacity>

              {/* Liên kết gửi lại email xác minh */}
              <Text style={styles.resendText}>
                Không nhận được email xác minh?{' '}
                <Text style={styles.resendLink} onPress={() => Alert.alert('Thông báo', 'Đã gửi lại mã xác minh')}>
                  Gửi lại
                </Text>
              </Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Định nghĩa các kiểu dáng (styles) cho các thành phần trong SignUpScreen3
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
    height: '46%', // Chiều cao của thẻ
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
  codeContainer: {
    flexDirection: 'row', // Hiển thị các ô mã theo hàng ngang
    justifyContent: 'space-between', // Căn giữa các ô mã
    width: '80%', // Chiều rộng của hàng chứa ô mã
    marginBottom: 20, // Khoảng cách phía dưới
  },
  codeInput: {
    width: 50, // Chiều rộng của ô mã
    height: 60, // Chiều cao của ô mã
    borderWidth: 1, // Độ dày của viền ô
    borderColor: '#ddd', // Màu viền ô
    textAlign: 'center', // Căn giữa nội dung trong ô
    fontSize: 18, // Kích thước chữ
    borderRadius: 8, // Bo góc ô
  },
  button: {
    backgroundColor: '#007bff', // Màu nền của nút
    paddingVertical: 15, // Khoảng cách trên dưới của nút
    width: '100%', // Chiều rộng 80% của thẻ
    borderRadius: 8, // Bo góc nút
    alignItems: 'center', // Căn giữa nội dung trong nút
    marginVertical: 10, // Khoảng cách trên dưới của nút
  },
  buttonText: {
    color: 'white', // Màu chữ trên nút
    fontSize: 18, // Kích thước chữ
    fontWeight: 'bold', // Độ đậm của chữ
  },
  resendText: {
    marginTop: 20, // Khoảng cách phía trên của văn bản
    color: 'gray', // Màu chữ
  },
  resendLink: {
    color: '#007bff', // Màu chữ liên kết
    fontWeight: 'bold', // Độ đậm của chữ
  },
});

// Xuất component SignUpScreen3 để sử dụng trong các phần khác
export default SignUpScreen3;
