import React from "react";
import WebView from "react-native-webview";
const  FormTrackMap =(listno)=>{
    // const location = location.coords
    console.log("listno",listno)
    if(listno.listno==="還沒拿到"){
    return (
        <WebView source={{ uri: `https://toxicgps.moenv.gov.tw/GPSwebU/GMap/TGosMapForApp.aspx?servicekey=V9achV7sd8AK&type=current&lon=121.507656&lat=25.026290` }} ClassName='flex-1' />
    )}else{
    return (

            <WebView source={{ uri: `https://toxicgps.moenv.gov.tw/GPSwebU/GMap/TGosMapForApp.aspx?servicekey=V9achV7sd8AK&type=route&listno=${listno.listno}` }} ClassName='flex-1' />
//http://192.168.1.34:8009/GPSwebU/GMap/TGosMapForApp.aspx?servicekey=V9achV7sd8AK&type=route&listno=A000000000000000000001
    )
}
}
export default FormTrackMap