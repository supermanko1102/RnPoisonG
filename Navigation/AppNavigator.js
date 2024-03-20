import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginScreen from '../src/Home/LoginScreen';
import IndexNavigator from './IndexNavigator';


export default function AppNavigator() {
    const Stack = createNativeStackNavigator();
    //去拿redux中的資訊
    const isLogin = useSelector(state => state.user.profile.isLogin);
    useEffect(() => {
      console.log('Login status changed:', isLogin);
  }, [isLogin]);
    return (
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{
            headerShown: false,
            }}
            initialRouteName={'Login'}>
                {/* {isLogin ? */}
                {/* <Stack.Screen name="Index" component={IndexScreen} />  */}
                {/* : */}
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="MainIndex" component={IndexNavigator} />
                {/* } */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}