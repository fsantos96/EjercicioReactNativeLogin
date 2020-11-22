import React, {Component} from 'react';
import {View, Text} from "react-native";

export class DetailsScreen extends Component {

    handlerTextInput(valText){
        this.setState({text: valText});
    }

    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Valor: {this.props.route.params.text}</Text>
            </View>
        );
    }

  }