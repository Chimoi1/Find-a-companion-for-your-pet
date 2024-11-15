// Trang Splash 1
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window'); // Lấy kích thước chiều rộng và chiều cao của màn hình

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Ảnh phía sau phủ toàn màn hình */}
      <Image source={require('../assets/image1.png')} style={styles.image} />

      {/* Nền trắng đặt dưới cùng, chỉ bo góc trên */}
      <View style={styles.contentContainer}>
        {/* Thanh tiến trình */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressDotActive} />  
          {/* Chấm active */}
          <View style={styles.progressDot} />  
          {/* Chấm trống */}      
          <View style={styles.progressDot} />    
          {/* Chấm trống */}
        </View>

        {/* Logo */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        
        {/* Căn chỉnh text vào giữa */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>BabyPets xin chào!</Text>
          <Text style={styles.subtitle}>Cùng bạn chăm sóc</Text>
          <Text style={styles.subtitle}>những người bạn bốn chân ❤️</Text>
        </View>

        {/* Nút tiếp tục */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FeatureScreen')} // Điều hướng tới màn hình FeatureScreen khi nhấn nút
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
          <Ionicons name="chevron-forward" size={24} color="white" style={styles.icon} /> 
          {/* Icon mũi tên */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Cho phép container chiếm toàn bộ chiều cao màn hình
    backgroundColor: '#f8dcd5', // Màu nền hồng
    alignItems: 'center', // Căn giữa theo chiều ngang
    justifyContent: 'flex-end', // Căn nội dung xuống cuối màn hình
  },
  image: {
    position: 'absolute', // Đặt ảnh ở vị trí tuyệt đối, phủ toàn bộ màn hình
    top: 0,  // Bắt đầu từ đỉnh màn hình
    left: 0,
    right: 0,
    bottom: 0, // Phủ tới đáy màn hình
    width: width, // Chiều rộng bằng với chiều rộng của màn hình
    height: height * 0.655, // Chiều cao bằng chiều cao màn hình
    resizeMode: 'cover', // Đảm bảo ảnh không bị méo khi phủ toàn bộ màn hình
  },
  contentContainer: {
    backgroundColor: '#fff', // Nền trắng
    borderTopLeftRadius: 30, // Bo góc phía trên bên trái
    borderTopRightRadius: 30, // Bo góc phía trên bên phải
    paddingHorizontal: 20, // Khoảng cách từ nội dung tới cạnh màn hình ngang
    paddingVertical: 50, // Khoảng cách từ nội dung tới cạnh màn hình dọc
    alignItems: 'center', // Căn giữa nội dung theo chiều ngang
    width: '100%', // Chiếm toàn bộ chiều rộng màn hình
  },
  progressBarContainer: {
    flexDirection: 'row', // Sắp xếp các chấm thành hàng ngang
    justifyContent: 'center', // Căn các chấm vào giữa
    marginBottom: 30, // Khoảng cách từ thanh tiến trình tới các thành phần khác
  },
  progressDot: {
    width: 20,  // Đường kính của chấm tròn
    height: 7,
    borderRadius: 3, // Bo góc tròn
    backgroundColor: '#E0E0E0', // Màu chấm trống
    marginHorizontal: 5, // Khoảng cách giữa các chấm
  },
  progressDotActive: {
    width: 20,  // Đường kính của chấm tròn active
    height: 7,
    borderRadius: 3, // Bo góc tròn
    backgroundColor: '#007bff', // Màu chấm active (xanh dương)
    marginHorizontal: 5, // Khoảng cách giữa các chấm
  },
  logo: {
    width: Platform.OS === 'web' ? '15vw' : width * 0.3, // Chiều rộng logo: 15% chiều rộng màn hình trên web, hoặc 30% trên mobile
    height: undefined, // Chiều cao tự động dựa trên aspectRatio
    aspectRatio: 1, // Giữ tỉ lệ vuông cho logo
    marginBottom: 10, // Khoảng cách giữa logo và văn bản
  },
  textContainer: {
    alignItems: 'center', // Căn giữa văn bản theo chiều ngang
    marginBottom: 48, // Khoảng cách giữa văn bản và nút
  },
  title: {
    fontSize: Platform.OS === 'web' ? 32 : 24, // Kích thước chữ tiêu đề lớn hơn trên web
    fontWeight: 'bold', // Định dạng chữ đậm
    marginBottom: 10, // Khoảng cách giữa tiêu đề và các dòng phụ đề
    textAlign: 'center', // Căn giữa dòng tiêu đề
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 20 : 16, // Kích thước chữ phụ đề
    color: '#888', // Màu chữ phụ đề xám
    textAlign: 'center', // Căn giữa các dòng phụ đề
    paddingHorizontal: 20,  // Khoảng cách văn bản phụ đề với viền màn hình ngang
  },
  button: {
    flexDirection: 'row', // Căn icon và text thành hàng ngang
    alignItems: 'center', // Căn giữa nội dung trong nút theo chiều dọc
    backgroundColor: '#007bff', // Màu nền của nút (xanh dương)
    paddingVertical: 16, // Khoảng cách bên trong nút theo chiều dọc
    width: Platform.OS === 'web' ? '30vw' : width * 0.8, // Chiều rộng nút: 30% màn hình trên web, 80% trên mobile
    borderRadius: 10, // Bo tròn các góc của nút
    justifyContent: 'center', // Căn giữa nội dung trong nút theo chiều ngang
    position: 'relative', // Để đặt icon ở vị trí chính xác trong nút
  },
  buttonText: {
    color: 'white', // Màu chữ trong nút
    fontSize: Platform.OS === 'web' ? 20 : 18, // Kích thước chữ trong nút
    fontWeight: 'bold', // Định dạng chữ đậm
    textAlign: 'center', // Căn giữa chữ trong nút
    flex: 1, // Đảm bảo chữ nằm giữa và không bị icon chiếm chỗ
  },
  icon: {
    position: 'absolute', // Đặt icon ở vị trí cố định trong nút
    right: 20, // Đặt icon cách mép phải của nút 20px
  },
});

export default WelcomeScreen;
