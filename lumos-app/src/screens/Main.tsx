import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading, Font } from 'expo'
import ServerAPI from '../api/Server';

export default class Main extends React.Component {
    /* private [fontsLoaded] = useFonts({
     *     'Lobster': require('../assets/fonts/Lobster-Regular.ttf'),
     * }); */
    private handleClick = () => {
        ServerAPI.postRGB();
        console.log('Button pressed');
    };

    public render()
    {
        let image = require('../../assets/img/flashlight_on.png');
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Lumos</Text>
                <Image source={image} style={styles.flashlight} />
                <Button title="boo" onPress={this.handleClick}/>
            </View>
        );
    }
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
//        fontFamily: 'Lobster',
        fontSize: 64,
        paddingTop: 290,
        paddingBottom: 100
    },
    flashlight: {
        width: 100,
        height: 100,
    }
});

