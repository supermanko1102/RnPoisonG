import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity, View } from "react-native";

import Banner from "../Component/Banner";

export default function EmergencyScreen({navigation}){
    const handleEmergencyAccident = ()=>{
        navigation.navigate('EmergencyAccident')
    }
    const handleAccidentRecord= ()=>{
        navigation.navigate('AccidentRecord')
    }
    return (   
        <View>
        <Banner/>
            <View>
                <TouchableOpacity
                    className='self-center w-10/12 my-10 '
                    onPress={handleEmergencyAccident}
                >
                    <LinearGradient
                    colors={['#d8f5ff','#a6d4ff']}
                    start={[0,1]}
                    end={[1,0]}
                    className='rounded-full h-14'
                    //style={style.buttonGradient}
                    >
                        <Text className="text-black text-xl mx-auto my-auto ">通報緊急事故</Text>
                </LinearGradient>
                </TouchableOpacity>
            
                <TouchableOpacity
                    className='self-center w-10/12 my-10 '
                    onPress={handleAccidentRecord}
                >
               <LinearGradient
                    colors={['#d8f5ff','#a6d4ff']}
                    start={[0,1]}
                    end={[1,0]}
                    className='rounded-full h-14'
                    //style={style.buttonGradient}
                    >
                        <Text className="text-black text-xl mx-auto my-auto ">查詢通報紀錄</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View> 
            
        </View>
    )
}