
import { useNavigation } from "@react-navigation/native"
import { Text, View } from "react-native"
import { Button } from "react-native-paper"

export default function Footer(){
    const navigation = useNavigation()
    const handleGoBack = () =>{
        navigation.goBack()
    }
    return(
        <View className="mb-10">
            <Button mode="contained"
            onPress={handleGoBack}
            >
                <Text>
                    上一頁    
                </Text>    
            </Button>            

        </View>

    )
}