import React from 'react'
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import ServerAPI from '../api/Server';
import { SliderPicker } from 'react-native-slider-picker';
import ToggleSwitch from 'toggle-switch-react-native'

export default class SliderRGB extends React.Component {
    constructor(props) {
        super(props);
        this.state = { red: 125, green: 25, blue: 25 , isOn: true, currentColor: 'rgb(125,25,25)' };
        ServerAPI.postRGB(this.state.red, this.state.green, this.state.blue);
    }

    private handleSwitch = (isOn) => {
        console.log("Switching lights off");
        this.setState({red: 0, green: 0, blue: 0, isOn: false});
        ServerAPI.postRGB(0, 0, 0);
    }

    private handleColorChange = (red, green, blue) => {
       console.log("Changing color to", red, green, blue);
       currentColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
       this.setState({ red: red, green: green, blue: blue, currentColor: currentColor});
       ServerAPI.postRGB(red, green, blue);
    }

    public render()
    {
        return(
            <View>
                <ToggleSwitch
                    isOn={this.state.isOn}
                    onColor={this.state.currentColor}
                    size="small"
                    onToggle={isOn => this.handleSwitch(isOn)}
                />
                <SliderPicker
                    maxValue={255}
                    callback={position => {
                        this.handleColorChange(position, this.state.green, this.state.blue);
                    }}
                    defaultValue={this.state.red}
                    labelFontColor={"#6c7682"}
                    showFill={true}
                    fillColor={'red'}
                    buttonBackgroundColor={'#f00'}
                    buttonBorderColor={"#6c7682"}
                    buttonBorderWidth={1}
                    buttonDimensionsPercentage={6}
                    heightPercentage={1}
                    widthPercentage={80}
                />
                <SliderPicker
                    maxValue={255}
                    callback={position => {
                        this.handleColorChange(this.state.red, position, this.state.blue);
                    }}
                    defaultValue={this.state.green}
                    labelFontColor={"#6c7682"}
                    showFill={true}
                    fillColor={'green'}
                    buttonBackgroundColor={'#0f0'}
                    buttonBorderColor={"#6c7682"}
                    buttonBorderWidth={1}
                    buttonDimensionsPercentage={6}
                    heightPercentage={1}
                    widthPercentage={80}
                />

                <SliderPicker
                    maxValue={255}
                    callback={position => {
                        this.handleColorChange(this.state.red, this.state.green, position);
                    }}
                    defaultValue={this.state.blue}
                    labelFontColor={"#6c7682"}
                    showFill={true}
                    fillColor={'blue'}
                    buttonBackgroundColor={'#00f'}
                    buttonBorderColor={"#6c7682"}
                    buttonBorderWidth={1}
                    buttonDimensionsPercentage={6}
                    heightPercentage={1}
                    widthPercentage={80}
                />
            </View>
        );
    }
}

