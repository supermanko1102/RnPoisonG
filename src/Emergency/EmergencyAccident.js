import { Dialog } from "@rneui/themed";
import axios from "axios";
import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, MD2Colors, Switch } from "react-native-paper";
import { useSelector } from "react-redux";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import MyMapScreen from "../Component/MyMapScreen";

export default function EmergencyAccident(){
    const [carSwitch,SetCarSwitch] = useState(false)
    const [accidentSwitch,SetAccidentSwitch] = useState(false)
    const [itemSwitch,SetItemSwitch] = useState(false)
    const [toxicSwitch,SetToxicSwitch] = useState(false)
    const [noteCar,SetNoteCar] = useState('')
    const [noteAccident,SetNoteAccident] = useState('')
    const [noteItem,SetNoteItem] = useState('')
    const [noteToxic,SetNoteToxic] = useState('')
    const [visible, setVisible] = useState(false);
    //設定一個loading狀態
    const[loading,setLoading] = useState(true)  

    //控制開始彈出視窗
    const toggleDialog = () => {
        setVisible(!visible);
    };


    //設定目前拿到的經緯度
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    //being::拿經緯度
    useEffect(()=>{
        (async()=>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }      
        let location = await Location.getCurrentPositionAsync({});
        //   console.log('現在的經緯度',location.coords.longitude)
        setLocation(location);
        setLoading(false)
        })()
    },[location])
    //end::拿經緯度
    
    const onToggleCarSwitch = () => SetCarSwitch(!carSwitch);
    useEffect(()=>{
        if(carSwitch){
            SetNoteCar('車輛故障 ')
        }else{
            SetNoteCar('')
        }
    },[carSwitch])

    const onToggleAccidentSwitch = () => SetAccidentSwitch(!accidentSwitch);
    useEffect(()=>{
        if(accidentSwitch){
            SetNoteAccident(prevData => prevData + '發生車禍 ')
        }else{
            SetNoteAccident('')
        }
    },[accidentSwitch])

    const onToggleItemSwitch = () => SetItemSwitch(!itemSwitch);
    useEffect(()=>{
        if(itemSwitch){
            SetNoteItem(prevData => prevData + '貨物掉落 ')
        }else{
            SetNoteItem('')
        }
    },[itemSwitch])
        
    const onToggleToxicSwitch = () => SetToxicSwitch(!toxicSwitch);
    useEffect(()=>{
        if(toxicSwitch){
            SetNoteToxic(prevData => prevData + '毒化物外洩')
        }else{
            SetNoteToxic('')
        }
    },[toxicSwitch])

    
    //begin::緊急通報API
    //get userName and DeviceNumber from Redux
    const carNumber = useSelector(state => state.login.deviceNumber);
    const facNumber = useSelector(state=>state.login.account)
    // console.log('facNumber',facNumber)
    const Add_Emergency_GPSByPhone = async ()=>{
        try{   console.log('noteCar',noteCar,noteAccident,noteItem,noteToxic)
            await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx',{
                params: {
                  Function: 'Add_Emergency_GPSByPhone',
                  ServiceKey: 'V9achV7sd8AK',
                  Fac_no:facNumber,
                  Plate_no:carNumber,
                  deviceNumber:'AAAAAAAA-4444-5555-AAAA-333333333333',
                  deviceType:'IOS',
                  WGSLon:location.coords.longitude,
                  WGSLat:location.coords.latitude,
                  Note:`${noteCar,noteAccident,noteItem,noteToxic}`
                }
                });
                
            }catch(error){
                    console.error(error);
                }
      
    }
    //end::緊急通報API

    //begin::loading
    if(loading){
        return (<View className='flex-1 justify-center items-center'>
        <ActivityIndicator animating={true} size='large' color={MD2Colors.red800} />
        <Text>獲取經緯度中</Text>
        </View>
        )
    }
    //end::loading
    return(    
    <View className='flex-1'>
        <Banner/>
        <View className='grow'>
            <Text className='text-2xl text-red-600 self-center'>
                運送過程中若發生緊急事故,請勾選事故樣態並按下通報鍵
            </Text>

                <View className='flex-row  self-center'>
                    <Switch value={carSwitch} onValueChange={onToggleCarSwitch} />
                    <Text>車輛故障</Text>
                    <Switch value={accidentSwitch} onValueChange={onToggleAccidentSwitch} />
                    <Text>發生車禍</Text>
                </View>
                
                <View className='flex-row self-center mt-20'>
                    <Switch value={itemSwitch} onValueChange={onToggleItemSwitch} />
                    <Text>貨物掉落</Text>
                    <Switch value={toxicSwitch} onValueChange={onToggleToxicSwitch} />
                    <Text>毒化物外洩</Text>
                </View>

                <TouchableOpacity className='self-center my-20 bg-sky-500 '
                onPress={()=>{
                    // Add_Emergency_GPSByPhone()
                    toggleDialog()
                }}
                >
                    <Text className='text-2xl'>
                        申報
                    </Text>
                </TouchableOpacity>

                <View className='w-11/12 self-center mt-2 mb-2' style={{flex:1}}>
                    <MyMapScreen/>
                </View>

                <Dialog isVisible={visible}>
                <Dialog.Title title={"是否同意要緊急申報"}/>
                <Dialog.Actions>
                    <Dialog.Button title="不同意" onPress={toggleDialog}/>
                    <Dialog.Button title="同意" onPress={()=>{
                        toggleDialog()
                        Add_Emergency_GPSByPhone()
                    }}/>
                </Dialog.Actions>
                </Dialog>
        </View>
        <Footer/>
    </View>
    )
}