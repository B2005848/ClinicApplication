import React, { useRef, useState, useEffect } from "react";
import { ScrollView, View, Image, Animated, Dimensions } from "react-native";
import styles from "./style";

const BannerCustomer = () => {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  ); // Khởi tạo với width từ Dimensions
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Lấy giá trị width từ Dimensions và cập nhật khi component mount
  useEffect(() => {
    const updateWindowWidth = () => {
      const { width } = Dimensions.get("window");
      setWindowWidth(width);
    };

    // Đăng ký lắng nghe sự thay đổi của kích thước màn hình
    const dimensionChangeListener = Dimensions.addEventListener(
      "change",
      updateWindowWidth
    );

    let position = 0;
    const intervalId = setInterval(() => {
      // Chỉ cuộn nếu windowWidth hợp lệ
      if (windowWidth > 0) {
        position = (position + 1) % images.length;
        scrollViewRef.current?.scrollTo({
          x: position * windowWidth,
          animated: true,
        });
      }
    }, 3000); // Mỗi 3 giây chuyển sang hình ảnh tiếp theo

    return () => {
      clearInterval(intervalId);
      dimensionChangeListener?.remove(); // Xoá listener khi component bị huỷ
    };
  }, [windowWidth]); // Chỉ chạy lại khi windowWidth thay đổi

  const images = [
    require("../../../assets/banner/1.png"), // Đường dẫn tương đối
    require("../../../assets/banner/2.png"),
    require("../../../assets/banner/3.png"),
  ];

  // Chỉ render ScrollView nếu windowWidth đã được thiết lập
  return (
    <View style={styles.container}>
      {windowWidth > 0 && (
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={[styles.image, { width: windowWidth }]} // Sử dụng windowWidth
            />
          ))}
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default BannerCustomer;
