import { View } from "react-native";
import { Button, Text } from 'react-native-paper';
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import MyMapScreen from "../Component/MyMapScreen";

export default function StartReport({navigation}){
    const handleReportForm = ()=>{
        navigation.navigate('ReportForm')
    }

    return (        
        <View 
        className="flex-1" >
            <Banner/>
            <View
            className="grow">
                <Text 
                variant="headlineMedium"
                className="self-center mt-4"
                >請選擇要申報的簡易報表
                </Text>

                <View className='flex-row self-center mt-4'>
                    <Text
                    variant="titleLarge"
                    className='self-center '>
                        起點申報: 4張表單
                    </Text>
                    <Button
                    mode='contained-tonal'
                    className='ml-10'
                    onPress={handleReportForm}>
                        選取
                    </Button>
                </View>

                <View className='flex-row self-center mt-4'>
                    <Text
                    variant="titleLarge"
                    className='self-center'>
                        迄點申報: 4張表單
                    </Text>
                    <Button
                    mode='contained-tonal'
                    className='ml-10'
                    onPress={handleReportForm}>
                        選取
                    </Button>
                </View>
                {/* Begin::MapView */}
                <View 
                className='w-11/12 self-center mt-2 mb-2'
                style={{flex:1}}>
                    <MyMapScreen/>
                </View>
                {/* End:MapView */}
            </View>
            <Footer/>
        </View>
    )
}