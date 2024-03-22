import { View } from "react-native"
import { Text } from "react-native-paper"
import Banner from "../Component/Banner"
import Footer from "../Component/Footer"
export default function ReportForm(){

    return(
        <View className='flex-1'>
            <Banner/>
            <View className='grow'>
                <Text
                variant="headlineMedium"
                className="self-center mt-4">
                    表單申報
                </Text>
            </View>
            
            <Footer/>
        </View>
    )
}