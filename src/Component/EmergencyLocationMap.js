import React from "react";
import WebView from "react-native-webview";
const  EmergencyLocationMap =({WGSLon, WGSLat})=>{
    // const location = location.coords
     console.log("CurrentLocalMapLatitude",WGSLon)
     console.log("CurrentLocalMapLogitude",WGSLat)
    return (
        
            <WebView source={{ uri: `http://192.168.1.34:8009/GPSwebU/GMap/TGosMapForApp.aspx?servicekey=V9achV7sd8AK&type=current&lon=${WGSLon}&lat=${WGSLat}` }} ClassName='flex-1' />
//http://192.168.1.34:8009/GPSwebU/GMap/TGosMapForApp.aspx?servicekey=V9achV7sd8AK&type=current&lon=121.507656&lat=25.026290
    )
}
export default EmergencyLocationMap