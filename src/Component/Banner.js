import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
export default function Banner(){


    // 因為是component function 這邊直接調用navigation會失敗 所以需要用useNavigaton hook去獲取
    const navigation =useNavigation()

    const deviceNumber = useSelector(state => state.login.deviceNumber);
    const userName = useSelector(state => state.login.userName);

    //  console.log('使用者名稱',userName)

    const handleLogout = ()=>{
        // console.log('BannerNavigation',navigation)
        navigation.navigate("Login");
    }
    const handleGoBack = () =>{
        navigation.goBack()
    }
    return(
        <ImageBackground
        source={require('../../Img/inner-bg.png')}
        resizeMode="cover"
        >   
            <View className='flex-row  '>
                <TouchableOpacity
                    onPress={handleGoBack}
                    style={styles.bannerLogout}
                    className='left-2 top-2 w-1/5'
                >
                        <Image
                        source={require('../../Img/Previous-w.png')}
                        style={styles.BannerLogo}
                        ></Image>
                </TouchableOpacity>
                <Image
                    source={require('../../Img/Enlogo.png')}
                    resizeMode="contain"
                    className='w-4/5 mx-auto'
                >
                </Image> 
            </View>


            <View
            style={styles.BannerDetail} 
            className="flex-row py-2 justify-between w-11/12 self-center top-4 ">
                {/* <FontAwesome name="user" size={30} color="black" /> */}
                <View className='flex-row pt-4'>
                <Image
                style={styles.BannerLogo}
                source={require('../../Img/user-w.png')}
                className='bottom-3 left-2 '
                ></Image>
                <Text
                className="text-xl text-white left-3 bottom-1"
                >{userName}</Text>
                </View>
                
                <View className='flex-row mt-auto'>
                <Image
                style={styles.BannerLogo}
                source={require('../../Img/carplate-w.png')}
                className='bottom-3 '
                ></Image>
                <Text
                className="text-xl text-white left-3 bottom-1"
                >{deviceNumber}
                </Text>
                </View>
                {/* <FontAwesome5 name="car" size={30} color="black" /> */}
                
                <TouchableOpacity
                onPress={handleLogout}
                className='mt-auto bottom-3 right-4'
                >
                    <Image
                    style={styles.BannerLogo}
                    source={require('../../Img/Signout-w.png')}
                    ></Image>   
                    {/* <Text className='text-xl text-red-600'>登出</Text> */}
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}
const styles = StyleSheet.create(
    {
        BannerDetail:{
            backgroundColor:'#496289',
            borderRadius:20,
        },
        BannerLogo:{
            width: 40,
            height: 40,
        },
        bannerLogout:{
            width: 40,
            height: 40,
        }

    }
)
