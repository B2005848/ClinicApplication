import React from "react";
import { View, Image, Text } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import styles from "./style";

// Import các ảnh từ thư mục assets
import image1 from "@assets/banner/1.png";
import image2 from "@assets/banner/2.png";
import image3 from "@assets/banner/3.png";

const BannerCustomer = () => {
  const images = [image1, image2, image3];

  // Component Pagination tùy chỉnh
  const CustomPagination = ({ paginationIndex }) => {
    return (
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <Text
            key={index}
            style={[
              styles.paginationDash,
              paginationIndex === index && styles.paginationActiveDash,
            ]}
          >
            {"-"}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={3}
        autoplayLoop
        index={0}
        showPagination
        PaginationComponent={CustomPagination} // Sử dụng pagination tùy chỉnh với dấu gạch
        data={images}
        renderItem={({ item }) => (
          <View style={styles.child}>
            <Image source={item} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

export default BannerCustomer;
