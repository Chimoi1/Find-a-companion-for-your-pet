// Trang Splash 3
import React from 'react'; // Import thư viện React
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native'; // Import các thành phần cần thiết từ React Native
import { Ionicons } from '@expo/vector-icons'; // Import biểu tượng Ionicons từ thư viện Expo

const { width, height } = Dimensions.get('window'); // Lấy kích thước chiều rộng và chiều cao của màn hình

// Khai báo component UserTypeScreen
const UserTypeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* View chính chứa toàn bộ nội dung */}
      {/* Ảnh nền phủ toàn màn hình */}
      <Image source={require('../assets/image3.png')} style={styles.image} />

      {/* Nền trắng bo góc trên, chứa nội dung chính */}
      <View style={styles.contentContainer}>
        {/* Thanh tiến trình */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressDot} />  
          {/* Chấm màu xanh (chưa hoàn thành) */}
          <View style={styles.progressDot} />        
          {/* Chấm màu xám (chưa hoàn thành) */}
          <View style={styles.progressDotActive} />  
          {/* Chấm màu xanh (đã hoàn thành) */}
        </View>

        {/* Logo */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        
        {/* Tiêu đề */}
        <Text style={styles.title}>Bạn là</Text>

        {/* 2 ô Chủ nuôi và Phòng khám */}
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionBox} onPress={() => navigation.navigate('LoginScreen')}>
            <Image source={require('../assets/anh1.png')} style={styles.iconImage} />
            <Text style={styles.optionText}>Chủ nuôi</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionBox} onPress={() => navigation.navigate('LoginScreen')}>
            <Image source={require('../assets/anh2.png')} style={styles.iconImage} />
            <Text style={styles.optionText}>Phòng khám</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Định nghĩa các kiểu dáng cho các thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1, // Cho phép container chiếm toàn bộ chiều cao màn hình
    backgroundColor: '#f8dcd5', // Màu nền hồng nhạt
    alignItems: 'center', // Căn giữa theo chiều ngang
    justifyContent: 'flex-end', // Căn nội dung xuống cuối màn hình
  },
  image: {
    position: 'absolute', // Đặt ảnh ở vị trí tuyệt đối, phủ toàn bộ màn hình
    top: 0,  
    left: 0,
    right: 0,
    bottom: 0, // Phủ tới đáy màn hình
    width: width, // Chiều rộng ảnh bằng chiều rộng màn hình
    height: height * 0.655, // Ảnh chiếm 65.5% chiều cao màn hình
    resizeMode: 'cover', // Đặt chế độ thay đổi kích thước ảnh
  },
  contentContainer: {
    backgroundColor: '#fff', // Nền trắng
    borderTopLeftRadius: 30, // Bo góc trên bên trái
    borderTopRightRadius: 30, // Bo góc trên bên phải
    paddingHorizontal: 20, // Khoảng cách bên trái và bên phải
    paddingVertical: 47, // Khoảng cách bên trên và bên dưới
    alignItems: 'center', // Căn giữa theo chiều ngang
    width: '100%', // Chiếm toàn bộ chiều rộng màn hình
  },
  progressBarContainer: {
    flexDirection: 'row', // Sắp xếp các chấm thành hàng ngang
    justifyContent: 'center', // Căn giữa các chấm
    marginBottom: 30, // Khoảng cách phía dưới thanh tiến trình
  },
  progressDot: {
    width: 20, // Chiều rộng của chấm
    height: 7, // Chiều cao của chấm
    borderRadius: 3, // Bo góc của chấm
    backgroundColor: '#E0E0E0', // Màu chấm chưa hoàn thành
    marginHorizontal: 5, // Khoảng cách giữa các chấm
  },
  progressDotActive: {
    width: 20, // Chiều rộng của chấm
    height: 7, // Chiều cao của chấm
    borderRadius: 3, // Bo góc của chấm
    backgroundColor: '#007bff', // Màu chấm đã hoàn thành
    marginHorizontal: 5, // Khoảng cách giữa các chấm
  },
  logo: {
    width: Platform.OS === 'web' ? '15vw' : width * 0.3, // Chiều rộng logo dựa trên nền tảng (web hoặc di động)
    height: undefined, // Chiều cao tự động
    aspectRatio: 1, // Tỉ lệ khung hình 1:1
    marginBottom: 0, // Khoảng cách phía dưới logo
  },
  title: {
    fontSize: Platform.OS === 'web' ? 32 : 24, // Kích thước font chữ tiêu đề dựa trên nền tảng
    fontWeight: 'bold', // Đậm
    marginBottom: 20, // Khoảng cách phía dưới tiêu đề
    textAlign: 'center', // Căn giữa tiêu đề
  },
  optionContainer: {
    flexDirection: 'row', // Sắp xếp các ô thành hàng ngang
    justifyContent: 'space-between', // Căn giữa các ô
    width: '80%', // Chiếm 80% chiều rộng màn hình
    marginBottom: 20, // Khoảng cách phía dưới các ô
  },
  optionBox: {
    width: '45%', // Chiếm 45% chiều rộng của container
    height: 120, // Chiều cao của ô
    backgroundColor: '#f0f0f0', // Màu nền của ô
    borderRadius: 10, // Bo góc của ô
    justifyContent: 'center', // Căn giữa nội dung trong ô
    alignItems: 'center', // Căn giữa theo chiều ngang
    padding: 10, // Khoảng cách bên trong ô
    borderWidth: 1, // Đường viền của ô
    borderColor: '#ccc', // Màu đường viền của ô
  },
  iconImage: {
    width: 30, // Chiều rộng của hình ảnh trong ô
    height: 30, // Chiều cao của hình ảnh trong ô
    marginBottom: 10,  // Khoảng cách phía dưới hình ảnh
  },
  optionText: {
    fontSize: 16, // Kích thước font chữ của văn bản trong ô
    fontWeight: 'bold', // Đậm
    textAlign: 'center', // Căn giữa văn bản
  },
});

// Xuất component UserTypeScreen để sử dụng ở nơi khác
export default UserTypeScreen;
