import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { Alert } from "react-native";

//手機GPS座標定位相關功能
const GPSLocation = {
  VaildGPSPremission: async function () {
    let { status } = await Location.requestForegroundPermissionsAsync();
    //TODO:要做一綠允許時才使用BackGround
    // let resb =
    //   Platform.OS === "android"
    //     ? await Location.requestBackgroundPermissionsAsync()
    //     : { status: "granted" };
    if (status !== "granted") {
      Alert.alert("尚未打開手機GPS定位及背景追蹤功能");
      return false;
    } else {
      this.UseBackGroundGPS();
      return true;
    }
  },

  UseBackGroundGPS: function () {
    //啟用背景定位功能
    const value = async () => {
      return await Location.getForegroundPermissionsAsync();
    };
    return value;
  },

  //取得手機經緯度
  GetLocation: async function () {
    //格式
    // {"coords":
    // {"altitude":21.195085525512695,"altitud
    // eAccuracy":2.2917959690093994,"latit
    // ude:25.02579835865695,"accuracy":3
    // 5,"longitude":121.50828483818138,"hea
    // ding":-1," speed":-13,"timestamp":165871
    // 7013053.115}
    try {
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced});
      return location;
    } catch (e) {
      console.log(e);
    } finally {
      // return {
      //   //TODO:上線後刪除
      //   coords: {
      //     latitude: 25.02579835865695,
      //     longitude: 121.50828483818138,
      //   },
      // };
    }
  },
};

const GPSTrackLocation = () => {
  const LOCATION_TRACKING = "location-tracking";
  return {
    //背景運送紀錄經緯度
    StartLocationTracking: async function () {
      await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        deferredUpdatesInterval: 10000,
        deferredUpdatesDistance: 0,
        distanceInterval: 0,
        foregroundService: {
          notificationTitle: "GPS",
          notificationBody: "body",
          notificationColor: "#0000FF",
        },
      });
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TRACKING
      );

      console.log("tracking started?", hasStarted);

      TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
        console.log("GPS", "defineTask called");
        if (error) {
          console.log("LOCATION_TRACKING task ERROR:", error);
          return;
        }
        if (data) {
          const { locations } = data;
          let lat = locations[0].coords.latitude;
          let long = locations[0].coords.longitude;
          console.log(
            `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
          );
          const gpsobject = {
            lat: lat,
            lon: long,
            datetime: new Date(Date.now()).toLocaleString(),
          };
        //   AsyncStorage.setItem("gpsUserData", JSON.stringify(gpsobject));
        } else {
          console.log("no gps data");
        }
      });
    },
    //背景運停止紀錄經緯度
    StopLocationTracking: function () {
      TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((tracking) => {
        if (tracking) {
          Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
        }
      });
    },
  };
};

export { GPSLocation, GPSTrackLocation };
