import { Button, CheckBox, Dialog } from "@rneui/themed";
import axios from "axios";

import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSelector } from "react-redux";

export default function ReportItem({ item ,location,startLocation}) {
    //  console.log('startLocation',startLocation)
    // console.log('從開始申報拿到的item是:',item,location.l1,location.l2)
    // console.log('從開始申報拿到的returnTimes是:',returnTimes)
    //   console.log('從開始申報拿到的經緯度是:',latitude,longitude)
    //!!!!! begin::存經緯度
    // const savelatitudeRef = useRef(latitude);
    // const savelongitudeRef = useRef(longitude); 
    // useEffect(()=>{
    //     savelatitudeRef.current = latitude;
    //     savelongitudeRef.current = longitude;
    // },[latitude,longitude])
    //!!!!! end::存經緯度
    //
    // useEffect(()=>{
    //     const getLocation = async()=>{
    //         let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    //         console.log('現在的經緯度', location);
    //         setStartLocation(location);
    //     }
    //     getLocation()
    // },[]) 
    //

     //get userName and DeviceNumber from Redux
     const carNumber = useSelector(state => state.login.deviceNumber);
     const userName = useSelector(state => state.login.userName);

    //begin::dialog
    const [visibleStart, setVisibleStart] = useState(false);
    const [visibleEnd, setVisibleEnd] = useState(false);
    const [visibleStartCancel,setVisibleStartCancel] = useState(false)
    const [visibleEndCancel,setVisibleEndCancel] = useState(false)
    //end::dialog

    //起點 
    const [startChecked, setStartChecked] = useState(false);
    const [startDisabled, setStartDisabled] = useState(false);
    //迄點
    const [endChecked, setEndChecked] = useState(false);
    const [endDisabled, setEndDisabled] = useState(false);

    //取消起點按鈕顯示
    const [showStartButton,setShowStartButton] = useState(false)
    //取消迄點按鈕顯示
    const [showEndButton,setShowEndButton] = useState(false)
    //當前時間
    const [currentTimeFrom,setCurrentTimeFrom]=useState(item.ReturnTimeFrom)
    const [currentTimeTo,setCurrentTimeTo]=useState(item.ReturnTimeTo)
    const formatTime = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    };

    //給interValid
    const [intervalId, setIntervalId] = useState(0);

    //begin::initial checkbox and disable button
    useEffect(() => {
    switch (true) {
        case currentTimeFrom === "" && currentTimeTo === "":
            // 現在是都還沒開始運送
            console.log('現在是都還沒開始運送')
            setStartChecked(false)
            setStartDisabled(false)
            setEndChecked(false)
            setEndDisabled(true)
            setShowStartButton(false)
            setShowEndButton(false)

            break;
        case currentTimeFrom !== "" && currentTimeTo === "":
            // 現在是都開始運送中
            console.log('現在是都開始運送中')
            setStartChecked(true)
            setStartDisabled(true)
            setEndChecked(false)
            setEndDisabled(false)
            setShowStartButton(true)
            setShowEndButton(false)
            break;
        case currentTimeFrom !== "" && currentTimeTo !== "":
            // 現在是結束運送
            console.log('現在是結束運送')
            setStartChecked(true)
            setStartDisabled(true)
            setEndChecked(true)
            setEndDisabled(true)
            setShowStartButton(false)
            setShowEndButton(true)
            break;
        default:
    }},[])
    //eng::
    //
    
    //
    //


    //
    //begin::申報起迄運API
    const Add_ddlist_GPSByPhone = async (StartorEnd)=>{
        const StartPoint = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx',{
        params: {
          Function: 'Add_ddlist_GPSByPhone',
          ServiceKey: 'V9achV7sd8AK',
          Fac_no:userName,
          Plate_no:carNumber,
          deviceNumber:'',
          WGSLon:startLocation.longitude,
          WGSLat:startLocation.latitude,
          ListNo:item.listno,
          DeclareType:StartorEnd
        }
        });
         const IsProcessOK = StartPoint.data.IsProcessOK

        //  setAlertShow(IsProcessOK)
        //  console.log('我有成功呼叫到api嗎',IsProcessOK,'SetAlertShow',alertShow)
        //要return出去 用useState會抓不到initial status 
         return IsProcessOK;
    }
    //end::申報起迄運API
    

    
    //begin::抓軌跡API
        const AddGPSByPhone = async ()=>{
            await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx',{
            params: {
              Function: 'AddGPSByPhone',
              ServiceKey: 'V9achV7sd8AK',
              Fac_no:userName,
              Plate_no:carNumber,
              deviceNumber:'AAAAAAAA-4444-5555-AAAA-333333333333',
              deviceType:'IOS',
              WGSLon:location.longitude,
              WGSLat:location.latitude,
              ListNo:item.listno,
            }
            });
            //  console.log('我是軌跡api現在經緯度',savelatitudeRef.current,savelongitudeRef.current)
            
        }
    //end::抓軌跡API
    
    //begin::刪除起迄運API
    const Del_ddlist_GPSByPhone = async (StartorEnd)=>{
        const StartPoint = await axios.get('https://toxicgps.moenv.gov.tw/TGOSGisWeb/ToxicGPS/ToxicGPSApp.ashx',{
        params: {
          Function: 'Del_ddlist_GPSByPhone',
          ServiceKey: 'V9achV7sd8AK',
          Fac_no:userName,
          deviceNumber:'',
          ListNo:item.listno,
          DeclareType:StartorEnd
        }
        });
         const IsProcessOK = StartPoint.data.IsProcessOK

        //  setAlertShow(IsProcessOK)
        //  console.log('我有成功呼叫到api嗎',IsProcessOK,'SetAlertShow',alertShow)
        //要return出去 用useState會抓不到initial status 
         return IsProcessOK;
    }



    //end::刪除起迄運API
    //控制開始彈出視窗
    const toggleDialogStart = () => {
        setVisibleStart(!visibleStart);
    };
     //控制結束彈出視窗
    const toggleDialogEnd = () => {
        setVisibleEnd(!visibleEnd);
    };
    //控制起點取消視窗
    const toggleDialogStartCancel = () => {
        setVisibleStartCancel(!visibleStartCancel);
    };
     //控制迄點取消視窗
     const toggleDialogEndCancel = () => {
        setVisibleEndCancel(!visibleEndCancel);
    };

    //end::控制視窗
    //begin:: logic function
    const handleAgreeStart = async () => {
        
        const AlertShow= await Add_ddlist_GPSByPhone('From')
         
        if(AlertShow){
        // 起點反灰
        setStartChecked(true);
        setStartDisabled(true)
        setEndDisabled(false)
        // dialog不見
        toggleDialogStart(false);
        //顯示起點按鈕
        setShowStartButton(true)

        // //begin:: get current date tiem
        let UpdataTime = (new Date())
        setCurrentTimeFrom(formatTime(UpdataTime))
        // //end:: get current date tiem


        // 定時呼叫
        const intervalId = setInterval(()=>{
             AddGPSByPhone()
            // console.log('我要開始申報時的intervalId',intervalId)
            // console.log('在setinterval下經位度',savelatitudeRef,savelongitudeRef)
        },4000)
        setIntervalId(intervalId)
        }else{
            Alert.alert('無法回傳至主機')
        }
    };
    const handleAgreeEnd = async()=>{
        const AlertShow= await Add_ddlist_GPSByPhone('To')
         
        if(AlertShow){
        console.log('我要開始迄點申報拉');
        // 起點反灰
        setEndChecked(true);
        setEndDisabled(true)
        // dialog不見
        toggleDialogEnd(false);
        //顯示迄點按鈕
        setShowEndButton(true)
        //隱藏起點按鈕
        setShowStartButton(false)
        //更新時間
        let UpdataTime = (new Date())
        setCurrentTimeTo(formatTime(UpdataTime))
        // 定時呼叫
        const intervalId = setInterval(()=>{
             AddGPSByPhone()
        },4000)
        setIntervalId(intervalId)
        }else{
            Alert.alert('無法回傳至主機')
        }
    }
    const handleCancelStart = ()=>{
        clearInterval(intervalId)
        // console.log('我要同意取消intervalId',intervalId)

        console.log('我要同意取消起點申報拉');
        Del_ddlist_GPSByPhone('From')
        //dialog 不見
        toggleDialogStartCancel(false)
        //不顯示起點勾勾
        setStartChecked(false)
        setStartDisabled(false)
        setEndDisabled(true)
        // 隱藏取消起點申報
        setShowStartButton(false)
    }

    const handleCancelEnd = ()=>{
        console.log('我要取消迄點申報拉');
        Del_ddlist_GPSByPhone('To')
        //取消後 又要開始抓軌跡API
        const intervalId = setInterval(()=>{
            AddGPSByPhone()
            // console.log('在取消後setinterval下經位度',savelatitudeRef,savelongitudeRef)
        },4000)
        setIntervalId(intervalId)
        //dialog 不見
        toggleDialogEndCancel(false)
        //不顯示迄點勾勾
        setEndChecked(false)
        setEndDisabled(false)
        //把起點的按鈕顯示出來 迄點的按鈕隱藏
        setShowStartButton(true)
        setShowEndButton(false)
    }
    //end:: logic function
    return (
        <View className='flex-row self-center'>
            <View className='self-center'>
                <Text className='text-green-500'>{item.listno}</Text>
                { startChecked && <Text className='text-red-500'>{'開始時間' + currentTimeFrom}</Text>}
               
                {endChecked && <Text className='text-red-500'>{'結束時間' + currentTimeTo}</Text>}
            </View>

            <View>
            <CheckBox 

            checked={startChecked}
            disabled={startDisabled}
            onPress={() => {
                toggleDialogStart()
            }} 
            title="起點"
           />
            <CheckBox 
            checked={endChecked} 
            disabled={endDisabled}
            onPress={() => {
            toggleDialogEnd()
           }} 
           title="迄點" />
            </View>

            <View className=''>
                {showStartButton && (<Button onPress={toggleDialogStartCancel}>
                    <Text>取消起點申報</Text>
                </Button>)}
                {showEndButton &&(<Button onPress={toggleDialogEndCancel}>
                    <Text>取消迄點申報</Text>
                </Button>)}
                

                
            </View>
            <Dialog isVisible={visibleStart}>
                <Dialog.Title title={item.listno + "是否同意要開始申報"}/>
                <Dialog.Actions>
                    <Dialog.Button title="不同意" onPress={toggleDialogStart}/>
                    <Dialog.Button title="同意" onPress={()=>{
                        handleAgreeStart()
                    }}/>
                </Dialog.Actions>
            </Dialog>
            <Dialog isVisible={visibleEnd}>
                <Dialog.Title title={item.listno + "是否同意要結束申報"}/>
                <Dialog.Actions>
                    <Dialog.Button title="不同意" onPress={toggleDialogEnd}/>
                    <Dialog.Button title="同意" onPress={handleAgreeEnd}/>
                </Dialog.Actions>
            </Dialog>
            
            <Dialog isVisible={visibleStartCancel}>
                <Dialog.Title title={item.listno + "是否同意要取消起點申報"}/>
                <Dialog.Actions>
                    <Dialog.Button title="不同意" onPress={toggleDialogStartCancel}/>
                    <Dialog.Button title="同意" onPress={handleCancelStart}/>
                </Dialog.Actions>
            </Dialog>

            <Dialog isVisible={visibleEndCancel}>
                <Dialog.Title title={item.listno + "是否同意要取消迄點申報"}/>
                <Dialog.Actions>
                    <Dialog.Button title="不同意" onPress={toggleDialogEndCancel}/>
                    <Dialog.Button title="同意" onPress={handleCancelEnd}/>
                </Dialog.Actions>
            </Dialog>
            
        </View>
        
    );
}
