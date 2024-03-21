import { AntDesign, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import IndexScreen from "../src/Home/IndexScreen";
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
       tabBarActiveTintColor: "tomato",
       tabBarInactiveTintColor: "gray",
       tabBarStyle: { height: 60, paddingBottom: 10 },
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
            <Ionicons name="home" size={24} color="black" />
           ) : (
             <Ionicons name="home-outline" size={size} color={color} />
           ),
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
            <Ionicons name="car" size={24} color="black" />
           ) : (
            <Ionicons name="car-outline" size={24} color="black" />
           ),
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
            <MaterialCommunityIcons name="format-align-justify" size={24} color="black" />
           ) : (
            <AntDesign name="form" size={24} color="black" />
           ),
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
            <MaterialIcons name="contact-emergency" size={24} color="black" />
           ) : (
            <MaterialIcons name="emergency" size={24} color="black" />
           ),
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
            <MaterialIcons name="rate-review" size={24} color="black" />
           ) : (
            <Fontisto name="preview" size={24} color="black" />
           ),
       }}
     />
   </Tab.Navigator>
  );
}