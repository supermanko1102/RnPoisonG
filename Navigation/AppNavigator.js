import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Banner from '../src/Component/Banner';
import Footer from '../src/Component/Footer';
import AccidentRecord from '../src/Emergency/AccidentRecord';
import EmergencyAccident from '../src/Emergency/EmergencyAccident';
import EmergencyResult from '../src/Emergency/EmergencyResult';
import SimpleForm from '../src/Form/SimpleForm';
import LoginScreen from '../src/Home/LoginScreen';
import PathTracResult from '../src/carriage/PathTrackResult';
import PathTracking from '../src/carriage/PathTracking';
import StartReport from '../src/carriage/startReport';
import IndexNavigator from './IndexNavigator';
export default function AppNavigator() {
    const Stack = createNativeStackNavigator();
    //從redux中拿到data
    const isLogin = useSelector(state => state.login.isLogin); // 使用 login slice 中的 isLogin 
    console.log('登入狀態',isLogin)
    // useEffect(()=>{
    //     console.log('登入狀態',isLogin)
    // },[isLogin])
    return (
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{
            headerShown: false,
            }}
            initialRouteName={'Login'}>
                <Stack.Screen name="Banner" component={Banner}/>
                <Stack.Screen name="Footer" component={Footer} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="MainIndex" component={IndexNavigator} />
                <Stack.Screen name="StartReport" component={StartReport} />
                <Stack.Screen name="PathTracking" component={PathTracking} />
                <Stack.Screen name="PathTracResult" component={PathTracResult} />
                <Stack.Screen name="SimpleForm" component={SimpleForm} />
                <Stack.Screen name="EmergencyAccident" component={EmergencyAccident} />
                <Stack.Screen name="AccidentRecord" component={AccidentRecord} />
                <Stack.Screen name="EmergencyResult" component={EmergencyResult} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}