import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import axios from "../../services/axios.service";
import { useNavigation } from "@react-navigation/native";

// import axios from "axios";

const placeHolderImage =
  "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg";

export default function ModelDetail({ route }) {
  const { modelName, desc, api_route } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);
  const navigation = useNavigation();

  console.log(api_route, modelName, desc);

  // handle

  const saveImage = async (image) => {
    try {
      setPickedImage(image);
      setIsModalVisible(false);
    } catch (error) {
      throw error;
    }
  };

  const handleOpenCameraAndPickImage = async () => {
    // console.log("open camera");
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploading image" + error.message);
      setIsModalVisible(false);
    }
  };

  const handleOpenPhotoLibAndPickImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploading image" + error.message);
      setIsModalVisible(false);
    }
  };

  // predict
  const Prediction = async () => {
    if (!pickedImage) {
      alert(
        "Bạn Chưa chọn ảnh, vui lòng chọn ảnh bằng cách chụp ảnh hoặc chọn từ thư viện của bạn"
      );
      return;
    }
    try {
      const formData = new FormData();
      const uriParts = pickedImage.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formData.append("file", {
        uri: pickedImage,
        type: `image/${fileType}`,
        name: `image.${fileType}`,
      });
      // TRUYỀN API CỦA MODEL VÀO ĐÂY ĐỂ DỰ ĐOÁN (/benhtrenlua or /contrunghailua)
      const response = await axios.post(`/${api_route}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const label = response.data.result.label;
      const acc = response.data.result.accuracy;
      // console.log("Server Response:", response.data);

      navigation.navigate("resultScreen", {
        label: label,
        accuracy: acc,
        imageUri: pickedImage,
        modelName: modelName,
      });
    } catch (error) {
      console.error("Error sending image to server:", error);
    }
  };

  return (
    <SafeAreaView className="p-1 mb-[60] bg-black px-2">
      <ScrollView>
        <View className="relative">
          <View className="w-full bg-slate-400 h-[300] my-2">
            {pickedImage !== null ? (
              <Image
                source={{ uri: `${pickedImage}` }}
                className="w-full h-full"
              />
            ) : (
              <Image
                source={{ uri: `${placeHolderImage}` }}
                className="w-full h-full opacity-50"
              />
            )}
          </View>
          {/* press to open model => select option to pick img => pass state */}
          <Text className="absolute top-2 right-0 mt-1 mr-1">
            <Icon.Button
              name="image"
              size={18}
              color="white"
              backgroundColor="#fb5607"
              onPress={() => setIsModalVisible(true)}
            >
              Chọn Ảnh
            </Icon.Button>
          </Text>
        </View>

        <View className="w-full  h-[180] my-2 flex flex-row justify-center items-center">
          {/* handle predict here */}
          <TouchableOpacity
            className="w-[80%] h-[50] bg-green-700 rounded-lg "
            onPress={Prediction}
          >
            <Text className="text-xl text-center h-full mt-2 font-bold text-white">
              Dự đoán ảnh này
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full h-[200] my-2 border-t border-gray-100 p-2">
          <Text className="text-cyan-300 text-center uppercase font-bold mb-2 text-xl">
            Thông tin về mô hình
          </Text>
          <View>
            <Text className="text-orange-600 uppercase text-sm mt-3 mx-2">
              Phân Loại:
              <Text className="lowercase text-sm text-white text-wrap">
                {" "}
                {modelName}
              </Text>
            </Text>
          </View>
          <View>
            <Text className="text-orange-600 uppercase text-sm mt-3 mx-2">
              Chức Năng:
              <Text className="lowercase text-sm text-white text-wrap">
                {" "}
                {desc}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View className="flex justify-center items-center flex-1 ">
          <View className="bg-white h-[150] w-[350] mt-8 rounded-md flex flex-row justify-around items-center relative">
            <TouchableOpacity
              className="absolute top-1 right-1 mr-1"
              onPress={() => setIsModalVisible(false)}
            >
              <Text>
                <Icon name="close" size={30} color={"gray"} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-500 p-2 rounded-lg"
              onPress={handleOpenCameraAndPickImage}
            >
              <Text>
                <Icon name="camera" size={60} color={"white"} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-green-500 p-2 rounded-lg"
              onPress={handleOpenPhotoLibAndPickImage}
            >
              <Text>
                <Icon name="upload" size={60} color={"white"} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
