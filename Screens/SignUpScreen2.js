//trang đăng kí tài khoản mới phần nhập tên, sinh nhật, địa chỉ
import React, { useState } from 'react'; // Import thư viện React và hook useState
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image, // Import thành phần Image từ React Native
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker từ thư viện @react-native-community

// Định nghĩa component SignUpScreen2
const SignUpScreen2 = ({ navigation }) => {
  // Khai báo các state lưu trữ thông tin của người dùng
  const [displayName, setDisplayName] = useState(''); // Tên hiển thị
  const [fullName, setFullName] = useState(''); // Họ và Tên
  const [birthDate, setBirthDate] = useState(''); // Ngày sinh
  const [address, setAddress] = useState(''); // Địa chỉ
  const [showDatePicker, setShowDatePicker] = useState(false); // Trạng thái hiển thị Date Picker

  // Hàm xử lý khi người dùng nhấn vào nút "Tạo tài khoản"
  const handleSignUp = () => {
    if (!displayName.trim() || !fullName.trim() || !birthDate || !address.trim()) {
      // Kiểm tra xem tất cả các trường có được điền đầy đủ hay không
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ tất cả các trường');
      return;
    }

    // Xử lý đăng ký thành công
    console.log('Đăng ký thành công');
    
    // Điều hướng sang trang SignUpScreen3 và truyền dữ liệu
    navigation.navigate('SignUpScreen3', {
      displayName, // Truyền các thông tin cần thiết sang SignUpScreen3 nếu cần
      fullName,
      birthDate,
      address,
    });
  };

  // Hàm xử lý khi người dùng thay đổi ngày sinh trong DatePicker
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(); // Lấy ngày hiện tại hoặc giá trị mặc định
    setShowDatePicker(false); // Ẩn DatePicker sau khi chọn

    // Định dạng ngày đã chọn thành chuỗi "dd/mm/yyyy" và cập nhật state
    const formattedDate = `${('0' + currentDate.getDate()).slice(-2)}/${('0' + (currentDate.getMonth() + 1)).slice(-2)}/${currentDate.getFullYear()}`;
    setBirthDate(formattedDate);
  };

  // Hàm xử lý nhập liệu cho trường Sinh nhật
  const formatDateInput = (text) => {
    // Chỉ cho phép nhập số
    const cleaned = text.replace(/[^\d]/g, '');

    // Tự động định dạng thành dd/mm/yyyy nếu đủ 8 ký tự số
    if (cleaned.length >= 2 && cleaned.length <= 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else if (cleaned.length > 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }

    return cleaned;
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
              {/* Hiển thị icon người dùng */}
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../assets/user-icon.png')} // Đường dẫn tới ảnh icon người dùng
                  style={styles.userIcon}
                />
              </View>
              <Text style={styles.title}>Tạo tài khoản</Text>
              <Text style={styles.subTitle}>Đăng ký tài khoản Baby Pets</Text>

              {/* Trường nhập Tên hiển thị */}
              <Text style={styles.label}>Tên hiển thị</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Tên" // Placeholder cho trường nhập
                  value={displayName} // Giá trị của state displayName
                  onChangeText={setDisplayName} // Cập nhật state khi người dùng nhập
                />
              </View>

              {/* Trường nhập Họ và Tên */}
              <Text style={styles.label}>Họ và Tên</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Họ và Tên"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              {/* Trường nhập Sinh nhật */}
              <Text style={styles.label}>Sinh nhật</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)} // Mở DatePicker khi người dùng nhấn vào
                style={styles.inputContainer}
              >
                <TextInput
                  style={styles.input}
                  placeholder="dd/mm/yyyy" // Hiển thị dạng ngày tháng
                  value={birthDate} // Hiển thị ngày tháng được định dạng
                  onChangeText={(text) => setBirthDate(formatDateInput(text))} // Định dạng lại ngày khi người dùng nhập
                  keyboardType="numeric" // Chỉ cho phép nhập số
                  editable // Cho phép người dùng nhập
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date()} // Giá trị ngày sinh mặc định
                  mode="date" // Chế độ chọn ngày
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Hiển thị spinner trên iOS
                  onChange={handleDateChange} // Hàm xử lý khi người dùng chọn ngày
                />
              )}

              {/* Trường nhập Địa chỉ */}
              <Text style={styles.label}>Địa chỉ</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Địa chỉ"
                  value={address}
                  onChangeText={setAddress}
                />
              </View>

              {/* Nút đăng ký */}
              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Tạo tài khoản</Text>
              </TouchableOpacity>

              {/* Liên kết quay lại đăng nhập */}
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

// Định nghĩa các kiểu dáng (styles) cho các thành phần trong SignUpScreen2
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
    borderBottomLeftRadius: 0, // Không bo góc dưới
    borderBottomRightRadius: 0, // Không bo góc dưới
    width: '100%',
    height: '83.7%', // Chiều cao của thẻ
  },
  iconContainer: {
    marginTop: -50, // Đẩy icon lên phía trên thẻ
    padding: 0, // Không thêm khoảng cách bên trong
    backgroundColor: 'white', // Màu nền của container icon
    borderRadius: 50, // Bo tròn các góc
    borderWidth: 3, // Độ dày viền
    borderColor: 'white', // Màu viền
    marginBottom: 10, // Khoảng cách phía dưới icon
  },
  userIcon: {
    width: 90, // Chiều rộng của icon
    height: 90, // Chiều cao của icon
  },
  title: {
    fontSize: 30, // Kích thước chữ tiêu đề
    fontWeight: 'bold', // Độ đậm của chữ
    marginVertical: 20, // Khoảng cách trên và dưới
  },
  subTitle: {
    fontSize: 20, // Kích thước chữ phụ đề
    color: 'gray', // Màu chữ phụ đề
    marginBottom: 20, // Khoảng cách phía dưới
  },
  label: {
    alignSelf: 'flex-start', // Căn tiêu đề theo chiều ngang của bố cục
    marginLeft: 10, // Khoảng cách bên trái
    marginTop: 10, // Khoảng cách phía trên
    marginBottom: 5, // Khoảng cách phía dưới
    fontWeight: 'bold', // Độ đậm của chữ
    color: 'gray', // Màu chữ
  },
  inputContainer: {
    alignItems: 'center', // Căn giữa các thành phần
    borderWidth: 1, // Độ dày của viền
    borderColor: '#ddd', // Màu viền
    borderRadius: 8, // Bo góc
    marginVertical: 5, // Khoảng cách trên dưới
    width: '100%', // Chiều rộng 100%
    backgroundColor: 'white', // Màu nền trắng
    paddingHorizontal: 10, // Khoảng cách hai bên
    height: 60, // Chiều cao của trường nhập
    justifyContent: 'center', // Căn giữa nội dung trong trường nhập
  },
  input: {
    flex: 1, // Chiếm toàn bộ chiều cao của container
    padding: 10, // Khoảng cách bên trong trường nhập
    width: '100%', // Chiều rộng 100%
  },
  button: {
    backgroundColor: '#007bff', // Màu nền của nút
    paddingVertical: 15, // Khoảng cách trên dưới của nút
    width: '100%', // Chiều rộng 100%
    borderRadius: 8, // Bo góc nút
    alignItems: 'center', // Căn giữa nội dung trong nút
    marginVertical: 10, // Khoảng cách trên dưới của nút
    marginTop: 50,
  },
  buttonText: {
    color: 'white', // Màu chữ trên nút
    fontSize: 18, // Kích thước chữ
    fontWeight: 'bold', // Độ đậm của chữ
  },
  loginText: {
    marginTop: 20, // Khoảng cách phía trên của văn bản
    color: 'gray', // Màu chữ
  },
  loginLink: {
    color: '#007bff', // Màu chữ liên kết
    fontWeight: 'bold', // Độ đậm của chữ
  },
});

// Xuất component SignUpScreen2 để sử dụng trong các phần khác
export default SignUpScreen2;
