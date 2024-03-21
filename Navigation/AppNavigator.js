import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import LoginScreen from '../src/Home/LoginScreen';
import IndexNavigator from './IndexNavigator';

export default function AppNavigator() {
    const Stack = createNativeStackNavigator();
    //從redux中拿到data
    const isLogin = useSelector(state => state.login.isLogin); // 使用 login slice 中的 isLogin 
   
    // useEffect(()=>{
    //     console.log('登入狀態',isaLogin)
    // },[isLogin])
    return (
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{
            headerShown: false,
            }}
            initialRouteName={'Login'}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="MainIndex" component={IndexNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}