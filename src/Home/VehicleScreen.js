import { Text, View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
export default function VehicleScreen(){
    return (<View className='flex-1 justify-center items-center'>
        <Text className='text-4xl'>功能開發中</Text>
    <ActivityIndicator animating={true} size='large' color={MD2Colors.red800} />
    </View>
 )
}