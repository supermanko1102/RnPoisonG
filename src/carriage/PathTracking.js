import { FlatList, View } from "react-native"
import { Button, Text } from "react-native-paper"
import Banner from "../Component/Banner"
import Footer from "../Component/Footer"

export default function PathTracking({navigation}){
    const handleTrackResult = ()=>{
        navigation.navigate('PathTracResult')
    }
    const Data=[
        {id:1,name:'A0000000000000001'},
        {id:2,name:'A0000000000000001'},
        {id:3,name:'A0000000000000001'},
        {id:4,name:'A0000000000000001'},
    ]
    //取得渲染函數
    const renderItem= ({item})=>(
        <View
        className='mt-4'
        >
            <Button 
            mode='contained'
            onPress={handleTrackResult}>
            <Text className='text-white'>{item.name}</Text></Button>
        </View>
    )
    return(
        <View className='flex-1'>
            <Banner/>
            <View className='grow'>
                <Text
                variant="headlineMedium"
                className="self-center mt-4"
                >
                    表單申報
                </Text>
                <View
                className='mx-10 mt-4 '
                >
                    <FlatList
                    data={Data} // data
                    renderItem={renderItem} // 選染列表的函數
                    keyExtractor={item => item.id} // key
                    />
                </View>
            </View>
            
            <Footer/>
        </View>
    )
}