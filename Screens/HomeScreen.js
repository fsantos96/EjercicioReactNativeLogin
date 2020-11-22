import React, {Component} from 'react';
import {View, TextInput, Text, Button} from "react-native";
import {StyleSheet} from "react-native";

export class HomeScreen extends Component {

    constructor(props){
        super(props);
        this.state = {text:"Ejemplo"}
    }

    handlerTextInput(valText){
        this.setState({text: valText});

    }

    handlerBtn(){
        this.props.navigation.navigate("Details", {
            text: this.state.text
        });
    }

    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Escribi algo"
                    onChangeText={text => this.handlerTextInput(text)}
                />

                <Button title="Pasar a detalles" onPress={() => this.handlerBtn()}>
                </Button>
            </View>
        );
    }

  }

  const styles = StyleSheet.create({
    textInput: {
        height:50,
        width:"80%",
        backgroundColor:"grey"
    }
  });
