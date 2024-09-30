import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Map from './Map'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView from 'react-native-maps';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [location, setLocation] = useState({
    latitude: 65.0000,
    longitude: 25.4676,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
})


useEffect(() => {
  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    try {
      if (status !== 'granted') {
        console.log('Geolocation failed');
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation({
        ...location,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.log(error);
    }
  };
  getUserLocation();
  }, []);

return (
  <PaperProvider>
      <SafeAreaView>
        <Map location={location} />
      </SafeAreaView>
  </PaperProvider>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
