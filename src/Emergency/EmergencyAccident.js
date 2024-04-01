
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Switch } from "react-native-paper"
import Banner from "../Component/Banner"
import Footer from "../Component/Footer"
import MyMapScreen from "../Component/MyMapScreen"


export default function EmergencyAccident(){
    const [carSwitch,SetCarSwitch] = useState(false)
    const [accidentSwitch,SetAccidentSwitch] = useState(false)
    const [itemSwitch,SetItemSwitch] = useState(false)
    const [toxicSwitch,SetToxicSwitch] = useState(false)
    const onToggleCarSwitch = () => SetCarSwitch(!carSwitch);    
    const onToggleAccidentSwitch = () => SetAccidentSwitch(!accidentSwitch);    
    const onToggleItemSwitch = () => SetItemSwitch(!itemSwitch);    
    const onToggleToxicSwitch = () => SetToxicSwitch(!toxicSwitch);    
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

                <TouchableOpacity className='self-center my-20 bg-sky-500 '>
                    <Text className='text-2xl'>
                        申報
                    </Text>
                </TouchableOpacity>

                <View className='w-11/12 self-center mt-2 mb-2' style={{flex:1}}>
                    <MyMapScreen/>
                </View>
        </View>
        <Footer/>
    </View>
    )
}