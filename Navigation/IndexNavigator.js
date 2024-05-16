import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
// import IndexScreen from "../src/Home/IndexScreen";
import { StyleSheet } from "react-native";
import CarriageScreen from "../src/Home/CarriageScreen";
import EmergencyScreen from "../src/Home/EmergencyScreen";
import FormScreen from "../src/Home/FormScreen";
import IndexScreen from "../src/Home/IndexScreen";
import VehiclecyScreen from "../src/Home/VehicleScreen";
export default function IndexNavigator({navigation}) {
  // const dispatch= useDispatch()
  const Tab = createBottomTabNavigator();
  // const handleLogout =()=>{
  //   dispatch(setLogout())
  //   navigation.navigate("Login");
  // }
  return (
     <Tab.Navigator
     screenOptions={({ route }) => ({
       headerShown: false,
       tabBarActiveTintColor: "#399584",
       tabBarInactiveTintColor: "#4EA091",
       tabBarStyle: { height: '10%', paddingBottom: '1%' ,backgroundColor:'#f9f9f9'},
     })}
   >
    <Tab.Screen
       name="Index"
       component={IndexScreen}
       options={{
         title: "首頁",
         unmountOnBlur: true,
         tabBarIcon: ({ focused, color, size }) =>
           !focused ? (
            <Image style={style.navigatorlogo} source={require('../Img/Navigator/home-1.png')}/>
            // <Ionicons name="home" size={24} color="black" />
           ) : (
            //  <Ionicons name="home-outline" size={size} color={color} />
            <Image style={style.navigatorlogo} source={require('../Img/Navigator/home-2.png')}/>
           ),
           tabBarLabelStyle :{
            fontSize: 16, 
           }
       }}
     />
     <Tab.Screen
       name="Carriage"
       component={CarriageScreen}
       options={{
         title: "運送通報",
         unmountOnBlur: true,
         tabBarIcon: ({ focused, color, size }) =>
           !focused ? (
            <Image style={style.navigatorlogo} source={require('../Img/Navigator/transport-1.png')}/>
            // <Ionicons name="car" size={24} color="black" />
           ) : (
            <Image style={style.navigatorlogo} source={require('../Img/Navigator/transport-2.png')}/>
            // <Ionicons name="car-outline" size={24} color="black" />
           ),
           tabBarLabelStyle :{
            fontSize: 16, 
           }
       }}
     />
     <Tab.Screen
       name="Form"
       component={FormScreen}
       options={{
         title: "表單查詢",
         unmountOnBlur: true,
         tabBarIcon: ({ focused, color, size }) =>
           !focused ? (
            <Image style={style.navigatorlogo} source={require('../Img/Navigator/list-1.png')}/>
            //<MaterialCommunityIcons name="format-align-justify" size={24} color="black" />
           ) : (
            <Image style={style.navigatorlogo} source={require('../Img/Navigator/list-2.png')}/>
            //<AntDesign name="form" size={24} color="black" />
           ),
           tabBarLabelStyle :{
            fontSize: 16, 
           }
       }}
     />
     <Tab.Screen
       name="Emergency"
       component={EmergencyScreen}
       options={{
         title: "緊急通報",
         unmountOnBlur: true,
         tabBarIcon: ({ focused, color, size }) =>
           !focused ? (
            <Image style={style.navigatorlogo} source={require('../Img/Navigator/urgent-1.png')}/>
            //<MaterialIcons name="contact-emergency" size={24} color="black" />
           ) : (
            <Image style={style.navigatorlogo} source={require('../Img/Navigator/urgent-2.png')}/>
            //<MaterialIcons name="emergency" size={24} color="black" />
           ),
           tabBarLabelStyle :{
            fontSize: 16, 
           }
       }}
     />
     <Tab.Screen
       name="Vehicle"
       component={VehiclecyScreen}
       options={{
         title: "車輛初審",
         unmountOnBlur: true,
         tabBarIcon: ({ focused, color, size }) =>
           !focused ? (
            <Image style={style.navigatorlogo} source={require('../Img/Navigator/inspection-1.png')}/>
            //<MaterialIcons name="rate-review" size={24} color="black" />
           ) : (
            <Image style={style.navigatorlogo} source={require('../Img/Navigator/inspection-2.png')}/>
            //<Fontisto name="preview" size={24} color="black" />
           ),
           tabBarLabelStyle :{
            fontSize: 16, 
           }
       }}
     />
   </Tab.Navigator>
  );
}

const style= StyleSheet.create({
  navigatorlogo:{
    width:47,
    height:47
  },
  navigatorBackground:{
    backgroundColor:'#4EA091'
  }
})