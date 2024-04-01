import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { useSelector } from 'react-redux';
import Banner from '../Component/Banner';
import Footer from '../Component/Footer';
import SimpleFlatList from './SimpleFlast';

export default function PathTracking({ navigation }) {
    const [data, setData] = useState([]);
    const deviceNumber = useSelector(state => state.login.deviceNumber);
    //設定一個loading狀態
    const[loading,setLoading] = useState(true)
    useEffect(() => {
        const fetchSimpleList = async () => {
            try {
                const res = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx', {
                    params: {
                        Function: 'GetddlistByReturnAlready',
                        ServiceKey: 'V9achV7sd8AK',
                        Plate_no: deviceNumber
                    }
                });
                const reportList = res.data.DTddlist;
                setData(reportList);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSimpleList();
    }, [deviceNumber]);

    const handleTrackResult = (listno) => {
        navigation.navigate('PathTracResult', { listno: listno });
    };

    if(loading){
        return (<View className='flex-1 justify-center items-center'>
           <ActivityIndicator animating={true} size='large' color={MD2Colors.red800} />
           </View>
        )
      }

    return (
        <View className='flex-1'>
            <Banner />
                <Text className='text-2xl self-center'>表單申報</Text>
                <View className=' w-10/12 self-center '>
                <SimpleFlatList data={data} onPressItem={handleTrackResult} />

                <Footer className=''/>

            </View>
        </View>
    );
}
