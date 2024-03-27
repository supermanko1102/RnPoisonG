import { Button, CheckBox, Dialog } from "@rneui/themed";
import React, { useState } from 'react';
import { Text, View } from 'react-native';
export default function ReportItem({ item }) {
    //begin::dialog
    const [visibleStart, setVisibleStart] = useState(false);
    const [visibleEnd, setVisibleEnd] = useState(false);
    const [visibleStartCancel,setVisibleStartCancel] = useState(false)
    const [visibleEndCancel,setVisibleEndCancel] = useState(false)

    //end::dialog
    //起點反灰
    const [startAble, setStartAble] = useState(false);
    //迄點反灰
    const [endAble, setEndtAble] = useState(false);
    //設定是否startchecked
    const [startchecked, setStartChecked] = useState(false);
    //設定是否endchecked
    const [endchecked, setEndChecked] = useState(false);
    //取消起點按鈕顯示
    const [showStartButton,setShowStartButton] = useState(false)
    //取消迄點按鈕顯示
    const [showEndButton,setShowEndButton] = useState(false)
    //開始時間顯示
    const [showStartTime,setShowStartTime]= useState(false)
    //結束時間顯示
    const [showEndTime,setShowEndtTime]= useState(false)
    //begin::控制視窗

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
    const handleAgreeStart = () => {
        console.log('我要開始申報拉');
        //起點反灰
        setStartAble(true);
        //dialog不見
        toggleDialogStart(false);
        //顯示勾勾
        setStartChecked(true)
        //顯示起點按鈕
        setShowStartButton(true)
        //顯示結束時間
        setShowStartTime(true)
    };
    const handleAgreeEnd = ()=>{
        console.log('我要結束申報拉');
        //dialog不見
        toggleDialogEnd(false);
        //顯示勾勾
        setEndChecked(true)
        //隱藏起點按鈕
        setShowStartButton(false)
        //顯示迄點按鈕
        setShowEndButton(true)
        //顯示結束時間
        setShowEndtTime(true)
        //迄點反灰
        setEndtAble(true)
    }
    const handleCancelStart = ()=>{
        console.log('我要取消起點申報拉');

    }

    const handleCancelEnd = ()=>{
        console.log('我要取消迄點申報拉');

    }


    //end:: logic function


    return (
        <View className='flex-row self-center'>
            <View className='self-center'>
                <Text className='text-green-500'>{item.name}</Text>
                {showStartTime && <Text className='text-red-500'>{'開始時間' + item.starttime}</Text>}
                {showEndTime && <Text className='text-red-500'>{'結束時間' + item.endtime}</Text>}
            </View>

            <View>
            <CheckBox 

            checked={startchecked}
            disabled={startAble}
            onPress={() => {
                toggleDialogStart()
            }} 
            title="起點"
           />
            <CheckBox 
            checked={endchecked} 
            disabled={endAble}
            onPress={() => {
            toggleDialogEnd()
           }} 
           title="迄點" />
            </View>

            <View className=''>
                <Button 
                style={{display: showStartButton ?'flex':'none'}}
                onPress={handleCancelStart}
                >
                
                    <Text>取消起點申報</Text>
                </Button>
                <Button 
                style={{display: showEndButton ?'flex':'none'}}
                onPress={handleCancelEnd}
                >
                    <Text>取消迄點申報</Text>
                </Button>
                {/* <Button mode='contained-tonal' onPress={toggleDialogStart} disabled={!able}><Text>起點</Text></Button>
                <Button mode='contained-tonal' onPress={toggleDialogEnd} disabled={able}><Text>迄點</Text></Button> */}
                
            </View>
            <Dialog isVisible={visibleStart}>
                <Dialog.Title title={item.name + "是否同意要開始申報"}/>
                <Dialog.Actions>
                    <Dialog.Button title="不同意" onPress={toggleDialogStart}/>
                    <Dialog.Button title="同意" onPress={handleAgreeStart}/>
                </Dialog.Actions>
            </Dialog>
            <Dialog isVisible={visibleEnd}>
                <Dialog.Title title={item.name + "是否同意要結束申報"}/>
                <Dialog.Actions>
                    <Dialog.Button title="不同意" onPress={toggleDialogEnd}/>
                    <Dialog.Button title="同意" onPress={handleAgreeEnd}/>
                </Dialog.Actions>
            </Dialog>
            
        </View>
    );
}
