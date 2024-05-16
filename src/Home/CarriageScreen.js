import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Banner from "../Component/Banner";
export default function CarriageScreen({navigation}){
    const handleStartReport = ()=>{
        navigation.navigate('StartReport')
    }
    const handlePathTracking = ()=>{
        navigation.navigate('PathTracking')
    }
return (   
    <View>
        <Banner/> 
        <TouchableOpacity
        className="self-center w-10/12 my-10 " 
        onPress={handleStartReport}
        >        
            <LinearGradient
            colors={['#d8f5ff','#a6d4ff']}
            start={[0,1]}
            end={[1,0]}
            className='rounded-full h-14'
            //style={style.buttonGradient}
            >
                <Text className="text-black text-xl mx-auto my-auto ">開始申報</Text>
            </LinearGradient>
        </TouchableOpacity>    
        <TouchableOpacity 
        className="self-center w-10/12 top-4" 
        onPress={handlePathTracking}
        >   
            <LinearGradient
            colors={['#d8f5ff','#a6d4ff']}
            start={[0,1]}
            end={[1,0]}
            className='rounded-full h-14'
            //style={style.buttonGradient}
            >
                <Text className="text-black text-xl mx-auto my-auto ">今日已申報軌跡查詢</Text>            
            </LinearGradient>
        </TouchableOpacity>    
            
    </View>
)
}

const style = StyleSheet.create({
    buttonStyle:{
        padding: 15,
    // alignItems: 'center',
    borderRadius: 5,
    },
    buttonGradient: {
        padding: 15,
        // alignItems: '',
        borderRadius: 5,
      },
})