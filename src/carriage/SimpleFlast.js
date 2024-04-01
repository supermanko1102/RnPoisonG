import React from 'react';
import { FlatList, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

function SimpleFlatList({ data, onPressItem }) {
    const renderItem = ({ item }) => (
        <View className='mt-4'>
            <Button 
                mode='contained'
                onPress={() => onPressItem(item.listno)}>
                <Text className='text-white'>{item.listno}</Text>
            </Button>
        </View>
    );

    return (
        <View className='bg-red-400 h-4/5'>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.listno}
            />
        </View>
    );
}

export default SimpleFlatList;
