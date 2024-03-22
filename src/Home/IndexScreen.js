import { View } from "react-native";
import Banner from "../Component/Banner";
export default function IndexScreen({ navigation }) {
  // const dispatch= useDispatch()
  //登出功能
  // const handleLogout =()=>{
  //   dispatch(setLogout())
  //   navigation.navigate("Login");

  // }
  return (
    
    <View className="flex-1">
      <Banner/>
      
    {/* <TouchableOpacity
    className="bg-red-600 rounded-lg w-10/12 m-3"
    onPress={handleLogout}
    >
    <Text className="text-white text-xl m-3 text-center">登出</Text>
      </TouchableOpacity> */}
    </View>

  );
}


