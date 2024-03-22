import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Banner(){
    // 因為是component function 這邊直接調用navigation會失敗 所以需要用useNavigaton hook去獲取
    const navigation =useNavigation()
    const handleLogout = ()=>{
        // console.log('BannerNavigation',navigation)
        navigation.navigate("Login");
    }
    return(
        <View className="mt-[60]">
            <View >
                <Image
                source={require('../../Img/環境部logo.png')}
                resizeMode="contain"
                className="self-center">
                </Image> 
            </View>

            <View className="flex-row pt-10 justify-start ml-10">
                <FontAwesome name="user" size={30} color="black" />
                <Text
                className="text-xl mr-10"
                >林國強</Text>

                <FontAwesome5 name="car" size={30} color="black" />
                <Text
                className="text-xl"
                >ABC-001</Text>

                <TouchableOpacity
                className="bg-red-600 rounded-lg ml-8"
                onPress={handleLogout}
                >
                    <Text>登出</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}