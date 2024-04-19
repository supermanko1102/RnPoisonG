import React from "react";
import WebView from "react-native-webview";
const  CurrentLocalMap =(location)=>{
    // const location = location.coords
    // console.log("CurrentLocalMap",location.location.latitude)
    return (
        
            <WebView source={{ uri: `http://192.168.1.34:8009/GPSwebU/GMap/TGosMapForApp.aspx?servicekey=V9achV7sd8AK&type=current&lon=${location.location.longitude}&lat=${location.location.latitude}` }} ClassName='flex-1' />
//http://192.168.1.34:8009/GPSwebU/GMap/TGosMapForApp.aspx?servicekey=V9achV7sd8AK&type=current&lon=121.507656&lat=25.026290
    )
}
export default CurrentLocalMap