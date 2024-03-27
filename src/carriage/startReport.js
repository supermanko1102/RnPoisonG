import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import MyMapScreen from "../Component/MyMapScreen";
import ReportItem from './ReportItem';

export default function StartReport({navigation}) {
    const Data = [
        {id:1,name:'A0000000000000001',starttime:'2024/01/01 14:02:02',endtime:'2024/02/03 14:02:02',SerNo:'7'},
        {id:2,name:'A0000000000000002',starttime:'2024/01/01 14:02:02',endtime:'2024/02/03 14:02:02',SerNo:'8'},
        {id:3,name:'A0000000000000003',starttime:'2024/01/01 14:02:02',endtime:'2024/02/03 14:02:02',SerNo:'9'},
        {id:4,name:'A0000000000000004',starttime:'2024/01/01 14:02:02',endtime:'2024/02/03 14:02:02',SerNo:'10'},
    ];

    const renderItem = ({ item }) => <ReportItem item={item} />; // 把每一個datalist 做component

    return (        
        <View className="flex-1">
            <Banner/>
            <View className="grow">
                <Text variant="headlineMedium" className="self-center mt-4">
                    請選擇要申報的簡易報表
                </Text>
                <View>
                    <FlatList
                        data={Data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View className='w-11/12 self-center mt-2 mb-2' style={{flex:1}}>
                    <MyMapScreen/>
                </View>
            </View>
            <Footer/>
        </View>
    );
}
