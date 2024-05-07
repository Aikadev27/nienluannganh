import { View, Text } from "react-native";
import React from "react";

export default function AboutAppScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <View className="w-[380] h-[650] bg-slate-100 mx-2 px-2 rounded-md">
        <View className="mb-3">
          <Text className="font-bold text-2xl text-black text-center uppercase my-3">
            Giới thiệu về ứng dụng
          </Text>
          <Text>
            Ứng dụng "AIKA MACHINE" là ứng dụng về lĩnh vực nhận dạng và phân
            loại các bệnh trên cây trồng, với cốt lõi là mô hình MobileNetV2.
            Hiện tại ứng dụng chỉ mới đáp ứng được các tính năng phân loại và
            nhận dạng sâu bệnh trên cây lúa gồm hai mục chính đó là phân loại và
            nhận dạng các loại bệnh dựa trên các biểu hiện trên lá lúa và nhận
            dạng các loại bệnh dựa trên các phát hiện về sâu bệnh trên lúa
          </Text>
        </View>
        <View>
          <Text className="font-bold text-2xl text-blue-600 text-center uppercase my-3">
            Cách sử dụng
          </Text>
          <Text>
            1. Chọn danh mục (Bệnh Trên Lúa hoặc Côn Trùng Gây Hại trên lúa)
          </Text>
          <Text>2. Ứng dụng điều hướng bạn đến màn hình chi tiết</Text>
          <Text>
            3. Để nhận dạng - dự đoán hình ảnh mà bạn muốn, bạn có thể chọn ảnh
            có sẵn từ thư viện ảnh trên máy hoặc chụp ảnh ngay
          </Text>
          <Text>
            4.Sau khi chọn ảnh xong, ứng dụng sẽ hiển thị ảnh bạn vừa chọn.Nhấn
            "Dự đoán ảnh này"
          </Text>
          <Text>
            5.Sau khi dự đoán xong, ứng dụng sẽ hiển thị kết quả dự đoán cho ảnh
            mà bạn vừa chọn. Bạn có thể lưu kết quả dự đoán hoặc dự đoán một ảnh
            khác
          </Text>
          <Text className="text-blue-800">
            (*Note): Để có trải nghiệm nhiều hơn về ứng dụng, bạn vui lòng đăng
            nhập vào ứng dụng hoặc đăng ký tài khoản ứng dụng nhé!
          </Text>
        </View>
      </View>
    </View>
  );
}
