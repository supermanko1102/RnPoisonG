import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function Banner(){


    // 因為是component function 這邊直接調用navigation會失敗 所以需要用useNavigaton hook去獲取
    const navigation =useNavigation()

    const deviceNumber = useSelector(state => state.login.deviceNumber);
    const userName = useSelector(state => state.login.userName);

    //  console.log('使用者名稱',userName)

    const handleLogout = ()=>{
        // console.log('BannerNavigation',navigation)
        navigation.navigate("Login");
    }
    return(
        <View className="mt-[60]">
            <View >
                <Image
                source={require('../../Img/Enlogo.png')}
                resizeMode="contain"
                className="self-center">
                </Image> 
            </View>

            <View className="flex-row pt-10 justify-start ml-10">
                <FontAwesome name="user" size={30} color="black" />
                <Text
                className="text-xl mr-10"
                >{userName}</Text>

                <FontAwesome5 name="car" size={30} color="black" />
                <Text
                className="text-xl"
                >{deviceNumber}</Text>

                <TouchableOpacity
                className="bg-gray-300 rounded-lg ml-8"
                onPress={handleLogout}
                >
                    <Text className='text-xl text-red-600'>登出</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}