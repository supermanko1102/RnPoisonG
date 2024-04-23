import { View } from "react-native";
import WebView from "react-native-webview";
import Banner from "../Component/Banner";
export default function VehicleScreen(){
    return (
        <View style={{ flex: 1 }}>
            <Banner/>
            <WebView
            source={{ uri: 'https://onestop.moenv.gov.tw/portal/services/84' }}
            style={{ flex: 1 }}
            />
      </View>
 )
}