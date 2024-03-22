import { View } from "react-native"
import { Text } from "react-native-paper"
import Banner from "../Component/Banner"
import Footer from "../Component/Footer"
export default function PathTrackResult(){

    return(
        <View className='flex-1'>
        <Banner/>
        <View className='grow'>
        <Text
        variant="headlineMedium"
        className="self-center mt-4"
        >軌跡申報結果</Text>

        <View className='flex-row self-start mt-4 ml-10'>
            <Text variant="titleLarge">
                表單號碼: A00000000000
            </Text>
        </View>
        <View className='flex-row self-start mt-4 ml-10'>
            <Text variant="titleLarge">
                運送車號: ABC-001
            </Text>
        </View>
        <View className='flex-row self-start mt-4 ml-10'>
            <Text variant="titleLarge">
                起運申報座標: 25.0257,121.508
            </Text>
        </View>
        <View className='flex-row self-start mt-4 ml-10'>
            <Text variant="titleLarge">
                起運申報時間: 2024/01/01 14:04:02
            </Text>
        </View>
        <View className='flex-row self-start mt-4 ml-10'>
            <Text variant="titleLarge">
                迄運申報座標: 25.0257,121.508
            </Text>
        </View>
        <View className='flex-row self-start mt-4 ml-10'>
            <Text variant="titleLarge">
                迄運申報時間: 2024/01/01 14:04:02
            </Text>
        </View>
        </View>
        <Footer/>
        </View>
    )
}