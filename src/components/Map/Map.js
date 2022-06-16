import { View, Text, useWindowDimensions } from "react-native";
import MapView from "react-native-maps";
import React from "react";

const Map = (props) => {
  const { width, height } = useWindowDimensions();

  return (
    <MapView
      showsPointsOfInterest={false}
      showsCompass={false}
      mapType="mutedStandard"
      style={{
        height: height,
        width: width,
      }}
      showsUserLocation
      initialRegion={{
        latitude: props.userLocation?.latitude,
        longitude: props.userLocation?.longitude,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
      }}
    >
      {props.children}
    </MapView>
  );
};

export default Map;
