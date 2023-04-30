import React from "react";
import { View, Text, StyleSheet } from "react-native";

import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          longitude: 30.486715,
          latitude: 50.487579,
          latitudeDelta: "",
          longitudeDelta: "",
        }}
      >
        <Marker coordinate={{ longitude: 30.486715, latitude: 50.487579 }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    //justifyContent: "center",
  },
});

export default MapScreen;
