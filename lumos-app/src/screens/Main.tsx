import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import SliderRGB from '../components/SliderRGB'

export default class Main extends React.Component {
    public render()
    {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Lumos</Text>
                <SliderRGB/>
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
        fontSize: 32,
        paddingTop: 90,
        paddingBottom: 10
    },
});

