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
                    <View className='flex-row mx-2 p-1'>
                        <Text className='text-xl font-bold'>表 單 編 號 ：</Text>
                    </View>
                    <View className='flex-row mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl '>{FormData.listno}</Text>
                    </View>
                    <View className=' mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl font-bold'>運 送 日 期 ：</Text>
                        <Text className='text-xl'>{FormData.MoveDate}</Text>
                    </View>
                    <View className='mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl font-bold'>運 送 物 質 ：</Text>
                        <Text className='text-xl '>{FormData.GoodsName}</Text>
                    </View>
                    <View className='mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl font-bold'>物 質 重 量 ：</Text>
                        <Text className='text-xl '>{FormData.MoveWt} {FormData.WtUnit}</Text>
                    </View>
                    <View className='mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl font-bold'>物 質 相 態 ：</Text>
                        <Text className='text-xl '>{FormData.Toxic_Type}</Text>
                    </View>
                    <View className='mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl font-bold'>起 運 名 稱 ：</Text>
                        <Text className='text-xl '>{FormData.StartPTName}</Text>
                    </View>
                    <View className='mx-2 p-1 border-b border-dashed border-gray-400 '>
                        <Text className='text-xl font-bold'>起 運 地 址 ：</Text>
                        <Text className='text-xl '>{FormData.StartPTAddr}</Text>
                    </View>
                    <View className='mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl font-bold'>運送人公司名稱 ：</Text>
                        <Text className='text-xl '>{FormData.GMName}</Text>

                    </View>
                    <View className='mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl font-bold'>運送人車號 ：</Text>
                        <Text className='text-xl '>{FormData.Plate_no}</Text>

                    </View>
                    <View className='mx-2 p-1 border-b border-dashed border-gray-400'>
                        <Text className='text-xl font-bold'>迄 運 名 稱 ：</Text>
                        <Text className='text-xl '>{FormData.EndPtName}</Text>

                    </View>
                    <View className='mx-2 p-1'>
                        <Text className='text-xl font-bold'>迄 運 地 址 ：</Text>
                        <Text className='text-xl'>{FormData.EndPtAddr}</Text>

                    </View>
                </ScrollView>
        </View>
    )
}