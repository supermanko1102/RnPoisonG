// import * as Location from 'expo-location';
// import React, { useEffect, useState } from 'react';
// import { View } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// const MyMapScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   let initialRegion = {
//     latitude: 25.02592,
//     longitude: 121.50889,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   };

//   if (location) {
//     initialRegion = {
//       ...initialRegion,
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//     };
//   }

//   let text = 'Waiting...';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         style={{ flex: 1 }}
//         initialRegion={initialRegion}
//         showsUserLocation={true} // 显示用户当前位置
//       >
//         {location && (
//           <Marker
//             coordinate={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             }}
//             title="Your Location"
//             description="You are here"
//           />
//         )}
//       </MapView>
//       {/* <Text>{text}</Text> */}
//     </View>
//   );
// };

// export default MyMapScreen;