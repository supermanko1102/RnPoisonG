import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import Banner from "../Component/Banner";
export default function IndexScreen({ navigation }) {
  const Data=[
    {id:1,StartDate:'2021-01-01',subject:'第一行'},
    {id:2,StartDate:'2021-01-01',subject:'第二行'},
    {id:3,StartDate:'2021-01-01',subject:'第三行'},
    {id:4,StartDate:'2021-01-01',subject:'第三行'},
    {id:5,StartDate:'2021-01-01',subject:'第三行'},
    {id:6,StartDate:'2021-01-01',subject:'第三行'},
  ]
  const renderItem=({item})=>(
    <View
    className='flex-row mt-6 mx-10 bg-red-400'
    >
      <Text
      className='text-2xl'
      >
        {item.StartDate}
      </Text>
      <Text
      className='mx-4 text-2xl'
      >
        {item.subject}
      </Text>
    </View>
  )
  return (
    
    <View className="flex-1">
      <Banner/>
      <Text
        className="text-4xl self-center mt-4">
            最新消息
        </Text>
      <View 
      className='bg-blue-300'
      >
        <FlatList
          data={Data} // data
          renderItem={renderItem} // 選染列表的函數
          keyExtractor={item => item.id} // key
          />
      </View>
    </View>

  );
}


