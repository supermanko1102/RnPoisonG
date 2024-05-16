import { ScrollView, Text, View } from "react-native";
import Banner from "../Component/Banner";

export default function SimpleForm({route}){
    const FormData = route.params.selectedItem;
        //  console.log('我拿到Data了a',FormData)

    return(
        <View className='flex-1'>
            <Banner/>
                <Text className='text-2xl mx-auto mt-4'>
                表單查詢
                </Text>
                <ScrollView  className='w-11/12 self-center'>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl'>聯 單 編 號:{FormData.listno}</Text>
                    </View>
                    <View className=' mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl'>運 送 日 期:{FormData.MoveDate}</Text>
                    </View>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl'>運 送 物 質:{FormData.GoodsName}</Text>
                    </View>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl'>重           量:{FormData.MoveWt} {FormData.WtUnit}</Text>
                    </View>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl'>運 送 物 質 狀 態:{FormData.Toxic_Type}</Text>
                    </View>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl'>起 運 名 稱:{FormData.StartPTName}</Text>
                    </View>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400 '>
                        <Text className='text-xl'>起 運 地 址:{FormData.StartPTAddr}</Text>
                    </View>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl'>運送人公司名稱:{FormData.GMName}</Text>
                    </View>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl'>運送人車號:{FormData.Plate_no}</Text>
                    </View>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl'>迄 運 名 稱:{FormData.EndPtName}</Text>
                    </View>
                    <View className='flex-row mx-2 p-1'>
                        <Text className='text-xl'>迄 運 地 址:{FormData.EndPtAddr}</Text>
                    </View>
                </ScrollView>
        </View>
    )
}