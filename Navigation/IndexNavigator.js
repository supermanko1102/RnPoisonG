import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import IndexScreen from "../src/Home/IndexScreen";
import MemberScreen from "../src/Home/MemberScreen";
import SettingScreen from "../src/Home/SettingScreen";

export default function IndexNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <View className="flex-1 items-center justify-center">
    <Text>我是登入後首頁</Text>
    <TouchableOpacity
  className="bg-red-600 rounded-lg w-10/12 m-3"
  onPress={handleLogout}
  >
  <Text className="text-white text-xl m-3 text-center">登出</Text>
    </TouchableOpacity>
 
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60, paddingBottom: 10 },
      })}
    >
      <Tab.Screen
        name="Member"
        component={MemberScreen}
        options={{
          title: "會員管理",
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) =>
            !focused ? (
              <MaterialIcons name="people" size={size} color={color} />
            ) : (
              <MaterialIcons name="people-outline" size={size} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: "功能表",
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color, size }) =>
            !focused ? (
              <Ionicons name="md-settings" size={size} color={color} />
            ) : (
              <Ionicons name="md-settings-outline" size={size} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
    </View>
  );
}