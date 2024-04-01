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
                    className='bg-sky-500 mt-40 '
                    onPress={handleEmergencyAccident}
                >
                    <Text
                        className='text-2xl'
                    >
                        通報緊急事故
                    </Text>
                </TouchableOpacity>
            
                <TouchableOpacity
                    className='bg-sky-500 mt-40 '
                    onPress={handleAccidentRecord}
                >
                    <Text
                        className='text-2xl'
                    >
                        查詢通報紀錄
                    </Text>
                </TouchableOpacity>
            </View> 
            
        </View>
    )
}