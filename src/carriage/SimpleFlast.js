import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
function SimpleFlatList({ data, onPressItem }) {
    const renderItem = ({ item }) => (
        <View>
            <TouchableOpacity
            className="self-center w-10/12 my-4 " 
            onPress={() => onPressItem(item.listno)}
            >
                <LinearGradient
                colors={['#d8f5ff','#a6d4ff']}
                start={[0,1]}
                end={[1,0]}
                className='rounded-full h-10'
                >
                    <Text className="text-black text-xl mx-auto my-auto">{item.listno}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.listno}
            />
        </View>
    );
}

export default SimpleFlatList;
