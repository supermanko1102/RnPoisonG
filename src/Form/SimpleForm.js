import { ScrollView, Text, View } from "react-native";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";

export default function SimpleForm(){
    const FormData=
    {
        listno: "01F0506289061011130165",
        MoveDate: "2024/03/28",
        GoodsName: "環氧乙烷",
        MoveWt: 25.000000,
        WtUnit: "公斤",
        Toxic_Type: "氣體",
        StartPTName: "賀本企業有限公司",
        StartPTAddr: "新北市新店區寶高路一七之二號",
        GMName: "賀本企業有限公司",
        Plate_no: "AKX-9353",
        EndPtName: "廣鎬企業有限公司宜蘭二廠",
        EndPtAddr: "宜蘭縣五結鄉成興村利工一路二段一二六巷三號"
    }
    return(
        <View className='flex-1'>
            <Banner/>
                    <ScrollView  className='h-4/6 mb-2'>
                    <View className='mt-2 self-center w-full'>
                        <Text className='text-2xl text-center'>聯單編號</Text>
                        <View className='rounded-full bg-slate-200  '>
                        <Text className='text-2xl text-center px-4 '>{FormData.listno}</Text>
                        </View>
                    </View>
                    <View className='mt-2 self-center w-full'>
                        <Text className='text-2xl text-center'>運送日期</Text>
                        <View className='rounded-full bg-slate-200 '>
                        <Text className='text-2xl text-center px-4 '>{FormData.MoveDate}</Text>
                        </View>
                    </View>
                    <View className='mt-2 self-center w-full'>
                        <Text className='text-2xl text-center'>毒化物</Text>
                        <View className='rounded-full bg-slate-200 '>
                        <Text className='text-2xl text-center px-4'>{FormData.GoodsName}</Text>
                        </View>
                    </View>
                        
                    <View className='mt-2 self-center w-full '>
                        <Text className='text-2xl text-center'>重量</Text>
                        <View className='rounded-full bg-slate-200 '>
                        <Text className='text-2xl text-center px-4'>{FormData.MoveWt}{FormData.WtUnit}</Text>
                        </View>
                    </View>
                    <View className='mt-2 self-center w-full'>
                        <Text className='text-2xl text-center'>運送物質狀態</Text>
                        <View className='rounded-full bg-slate-200 '>
                        <Text className='text-2xl text-center px-4'>{FormData.Toxic_Type}</Text>
                        </View>
                    </View>
                    <View className='mt-2 self-center w-full '>
                        <Text className='text-2xl text-center'>起運名稱</Text>
                        <View className='rounded-full bg-slate-200 '>
                        <Text className='text-2xl text-center px-4'>{FormData.StartPTName}</Text>
                        </View>
                    </View>
                    <View className='mt-2 self-center w-full '>
                        <Text className='text-2xl text-center'>起運地址</Text>
                        <View className='rounded-full bg-slate-200 '>
                        <Text className='text-2xl text-center px-4'>{FormData.StartPTAddr}</Text>
                        </View>
                    </View>
                    <View className='mt-2 self-center  w-full'>
                        <Text className='text-2xl text-center'>運送人公司名稱</Text>
                        <View className='rounded-full bg-slate-200 '>
                        <Text className='text-2xl text-center px-4'>{FormData.GMName}</Text>
                        </View>
                    </View>
                    <View className='mt-2 self-center  w-full'>
                        <Text className='text-2xl text-center'>運送人車號</Text>
                        <View className='rounded-full bg-slate-200 '>
                        <Text className='text-2xl text-center px-4'>{FormData.Plate_no}</Text>
                        </View>
                    </View>
                    <View className='mt-2 self-center w-full '>
                        <Text className='text-2xl text-center'>迄運名稱</Text>
                        <View className='rounded-full bg-slate-200 '>
                        <Text className='text-2xl text-center px-4'>{FormData.EndPtName}</Text>
                        </View>
                    </View>
                    <View className='mt-2 self-center w-full '>
                        <Text className='text-2xl text-center'>迄運地址</Text>
                        <View className='rounded-full bg-slate-200 '>
                        <Text className='text-2xl text-center px-4'>{FormData.EndPtAddr}</Text>
                        </View>
                    </View>

                    </ScrollView>
            <Footer/>
        </View>
    )
}