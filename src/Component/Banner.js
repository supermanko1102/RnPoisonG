import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';

export default function Banner(){
    return(
        <View className="mt-[60]">
            <View >
                <Image
                source={require('../../Img/環境部logo.png')}
                resizeMode="contain"
                className="self-center">
                </Image> 
            </View>

            <View className="flex-row pt-10 justify-start ml-10">
                <FontAwesome name="user" size={30} color="black" />
                <Text
                className="text-xl mr-10"
                >林國強</Text>
                <FontAwesome5 name="car" size={30} color="black" />
                <Text
                className="text-xl"
                >ABC-001</Text>
            </View>
        </View>
    )
}