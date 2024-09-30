import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map(props) {
    const [markers, setMarkers] = useState([])

    const showMarkers = (e) => {
        const coords = e.nativeEvent.coordinate
        setMarkers((prevMarkers) => [...prevMarkers, coords])
    }

  return (
    <MapView
        style={styles.map}
        region={props.location}
        onLongPress={showMarkers}
    >
        {markers.map((marker, index) => (
           <Marker
            key={index}
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}} 
            /> 
        ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%'
  },
});