import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';

 export default function Splash() {
      const image = require('../../assets/img/flashlight_on.png');
      return (
          <View style={styles.container}>
              <Text style={styles.title}>Lumos</Text>
              <Image source={image} style={styles.flashlight} />
          </View>
      );
 };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#272727',
        alignItems: 'center',
    },
    title: {
        color: '#FF9900',
        fontSize: 64,
        paddingTop: 290,
        paddingBottom: 100
    },
    flashlight: {
        width: 100,
        height: 100,
    }
});

