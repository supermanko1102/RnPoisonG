import { Ionicons } from "@expo/vector-icons";
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
            <Ionicons name="people" size={24} color="black" />
           ) : (
             <Ionicons name="people-outline" size={size} color={color} />
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
             <Ionicons name="people" size={size} color={color} />
           ) : (
             <Ionicons name="people-outline" size={size} color={color} />
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
             <Ionicons name="people" size={size} color={color} />
           ) : (
             <Ionicons name="people-outline" size={size} color={color} />
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
             <Ionicons name="people" size={size} color={color} />
           ) : (
             <Ionicons name="people-outline" size={size} color={color} />
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
             <Ionicons name="people" size={size} color={color} />
           ) : (
             <Ionicons name="people-outline" size={size} color={color} />
           ),
       }}
     />
   </Tab.Navigator>
  );
}