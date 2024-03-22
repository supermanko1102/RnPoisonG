import { View } from "react-native"
import { Button, Text } from "react-native-paper"
import Banner from "../Component/Banner"
import Footer from "../Component/Footer"
export default function PathTracking({navigation}){
    const handleTrackResult = ()=>{
        navigation.navigate('PathTracResult')
    }
    return(
        <View className='flex-1'>
        <Banner/>
        <View className='grow'>
        <Text
        variant="headlineMedium"
        className="self-center mt-4"
        >表單申報</Text>

        <Button onPress={handleTrackResult}><Text>表單1</Text></Button>
        <Button><Text>表單2</Text></Button>
        <Button><Text>表單3</Text></Button>
        <Button><Text>表單4</Text></Button>
        </View>
        <Footer/>
        </View>
    )
}