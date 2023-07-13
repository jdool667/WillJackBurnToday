import { StyleSheet, Text, View } from "react-native";

import * as Location from "expo-location";
import { useEffect } from "react";
import { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getUV } from "./api/UV";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      const coords = {
        lat: location.coords.latitude,
        long: location.coords.longitude,
      };

      const data = await getUV(coords);
      setData(data);
    })();
  }, []);

  const estimateBurnTime = () => {
    if (data && data.uv) {
      const uvIndex = data.uv;
      let burnTime;

      if (uvIndex < 0.5) {
        burnTime = "2-3 hours";
      } else if (uvIndex >= 0.5 && uvIndex < 1) {
        burnTime = "1.5-2 hours";
      } else if (uvIndex >= 1 && uvIndex < 1.5) {
        burnTime = "1.25-1.5 hours";
      } else if (uvIndex >= 1.5 && uvIndex < 2) {
        burnTime = "1-1.25 hours";
      } else if (uvIndex >= 2 && uvIndex < 2.5) {
        burnTime = "50-60 minutes";
      } else if (uvIndex >= 2.5 && uvIndex < 3) {
        burnTime = "45-50 minutes";
      } else if (uvIndex >= 3 && uvIndex < 3.5) {
        burnTime = "40-45 minutes";
      } else if (uvIndex >= 3.5 && uvIndex < 4) {
        burnTime = "35-40 minutes";
      } else if (uvIndex >= 4 && uvIndex < 4.5) {
        burnTime = "30-35 minutes";
      } else if (uvIndex >= 4.5 && uvIndex < 5) {
        burnTime = "25-30 minutes";
      } else if (uvIndex >= 5 && uvIndex < 5.5) {
        burnTime = "23-25 minutes";
      } else if (uvIndex >= 5.5 && uvIndex < 6) {
        burnTime = "20-23 minutes";
      } else if (uvIndex >= 6 && uvIndex < 6.5) {
        burnTime = "18-20 minutes";
      } else if (uvIndex >= 6.5 && uvIndex < 7) {
        burnTime = "15-18 minutes";
      } else if (uvIndex >= 7 && uvIndex < 7.5) {
        burnTime = "13-15 minutes";
      } else if (uvIndex >= 7.5 && uvIndex < 8) {
        burnTime = "11-13 minutes";
      } else if (uvIndex >= 8 && uvIndex < 8.5) {
        burnTime = "9-11 minutes";
      } else if (uvIndex >= 8.5 && uvIndex < 9) {
        burnTime = "7-9 minutes";
      } else if (uvIndex >= 9 && uvIndex < 9.5) {
        burnTime = "5-7 minutes";
      } else if (uvIndex >= 9.5 && uvIndex < 10) {
        burnTime = "3-5 minutes";
      } else {
        burnTime = "less than 3 minutes";
      }

      return burnTime;
    }

    return null;
  };

  let text = "Getting location...";
  let loc = "Getting location...";
  let burnTime = "Calculating...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    if (data != null) {
      text = JSON.stringify(data.uv);
      loc = data.cityName;
      burnTime = estimateBurnTime();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Will Jack Burn Today?</Text>
      <Text style={styles.paragraph}>Your location is {loc}</Text>
      <Text style={styles.paragraph}>The Current UV is {text}</Text>
      <Text style={styles.paragraph}>
        Estimated burn time: <Text style={styles.bold}>{burnTime}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginBottom: 200,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    fontSize: 26,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
});
