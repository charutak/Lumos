import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading, Font } from 'expo'
import Main from './screens/Main'
import Splash from './screens/Splash'

export default class App extends React.Component {
    constructor()
    {
        super();
        this.state = { isVisible : true }
    }


    private hideSplashScreen = () => {
        this.setState({
            isVisible : false
        });
    }

    componentDidMount() {
        var that = this;
        setTimeout( function() {
            that.hideSplashScreen();
        }, 2000);
    }

    public render()
    {
        let splashScreen = <Splash />;
        let mainScreen = <Main />;
        return(
            (this.state.isVisible === true) ? splashScreen : mainScreen
        );
    }
}

