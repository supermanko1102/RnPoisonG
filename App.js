import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from 'react-redux';
import AppNavigator from './Navigation/AppNavigator';
import store from './src/store/store';

export default function App() {
  return (
    // 記得要把它撐開 不然會沒畫面
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
