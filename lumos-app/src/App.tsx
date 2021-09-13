import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Lobster } from '@expo-google-fonts/lobster';



export default function App() {
    let [fontsLoaded] = useFonts({
        'Lobster': require('../assets/fonts/Lobster-Regular.ttf'),
    });
    const image = require('../assets/img/flashlight_on.png');
    return (
            <View style={styles.container}>
                <Text style={styles.title}>Lumos</Text>
                <Image source={image} style={styles.flashlight} />
            </View>
        );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#272727',
      alignItems: 'center',
  },
    title: {
        color: '#FF9900',
        fontFamily: 'Lobster',
        fontSize: 64,
        paddingTop: 290,
        paddingBottom: 100
    },
    flashlight: {
        width: 100,
        height: 100,
    }
});

