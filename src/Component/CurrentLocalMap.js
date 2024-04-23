import React from "react";
import WebView from "react-native-webview";
const  CurrentLocalMap =({latitude,longitude})=>{
    //  const location = {latitude,longitude}
    //   console.log("CurrentLocalMapLatitude",latitude)
    //  console.log("CurrentLocalMapLogitude",longitude)
    //  console.log('12312312',location)
    return (
        
            <WebView source={{ uri: `http://192.168.1.34:8009/GPSwebU/GMap/TGosMapForApp.aspx?servicekey=V9achV7sd8AK&type=current&lon=${longitude}&lat=${latitude}` }} ClassName='flex-1' />
//http://192.168.1.34:8009/GPSwebU/GMap/TGosMapForApp.aspx?servicekey=V9achV7sd8AK&type=current&lon=121.507656&lat=25.026290
    )
}
export default CurrentLocalMap