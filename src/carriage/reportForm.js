import { FlatList, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
export default function ReportForm(){
    const Data=[
        {id: 1,name:'A00000000000001',time:'2022/01/07 14:02:01'},
        {id: 2,name:'A00000000000002',time:'2022/01/07 14:02:01'},
        {id: 3,name:'A00000000000003',time:'2022/01/07 14:02:01'},
        {id: 4,name:'A00000000000004',time:'2022/01/07 14:02:01'},
    ];
    // 選染列表的函數
  const renderItem = ({ item }) => (
    <View className='flex-row mt-4'>
        <View>
            <Text
            variant="titleMedium"
            >
                {item.name}
            </Text>
            <Text>
            {item.time}
            </Text>
        </View>
        <View
        className='mx-6'
        >
            <Button
            mode='elevated'
            onPress={handleCancel}
            >
                <Text
                className='text-red-500'>
                    取消申報
                </Text>
            </Button>
        </View>
    </View>
  );

    //取消申報
    const handleCancel= ()=>{
        console.log('cancel')
    }
    return(
        <View className='flex-1'>
            <Banner/>
            <View className='grow'>
                <Text
                variant="headlineMedium"
                className="self-center mt-4">
                    表單申報
                </Text>
                <View
                className='mx-10 mt-4 bg-zinc-400'
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