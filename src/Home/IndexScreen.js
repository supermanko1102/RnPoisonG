import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/modules/userSlice";
export default function IndexScreen({ navigation }) {
  const dispatch= useDispatch()
  //登出功能
  const handleLogout =()=>{
    dispatch(setLogout())
    navigation.navigate("Login");

  }
  return (
    
    <View className="flex-1 items-center justify-center">
      <Text>我是登入後首頁</Text>
      <TouchableOpacity
    className="bg-red-600 rounded-lg w-10/12 m-3"
    onPress={handleLogout}
    >
    <Text className="text-white text-xl m-3 text-center">登出</Text>
      </TouchableOpacity>
    </View>

  );
}