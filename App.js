import React, {Component} from 'react';
import { AppLoading } from 'expo';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {DrawerCustomNavigator} from './Navigators/DrawerCustomNavigator';
import * as loginService from './Services/loginService';
import * as storageService from './Services/storageService';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Container, Content, Text, Button } from 'native-base';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      error: false,
      isReady: false
    };
  }

  handlerLogout = () => {
    this.setState({ isLogin: false });
    storageService.removeItem("accessToken");
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  handlerPressButton = async () => {
    var token = await storageService.getItem("accessToken");

    if(token) {
      this.setState({ isLogin: true });
    } else {
        token = await loginService.signInWithGoogleAsync();
        if(token && (token.error || token.cancelled)) {
            this.setState({ error: true});
        } else {
            await storageService.setItem("accessToken", token);
            this.setState({ isLogin: true });
        }
    }

    this.setState({ isReady: true });
  }

  render(){
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    if(this.state.isLogin) {
       return (
         <NavigationContainer>
           <DrawerCustomNavigator onLogout={this.handlerLogout}/>
        </NavigationContainer>
      );
    }

    if(this.state.isReady && this.state.error) {
      return (
        <Container>
          <Content contentContainerStyle={{flexGrow : 1, justifyContent : 'center', alignItems: 'center'}}>              
            <Text>Ocurrio un error al intentar iniciar sesion</Text>
          </Content>
        </Container>
      );
    }

    if(!this.state.isLogin) {
      return (
        <Container>
          <Content contentContainerStyle={{width:"100%",flexGrow: 1, justifyContent : 'center', alignItems: 'center'}}>
          <Text> Bienvenido a Cocktail!</Text>         
          <Button full style={{marginTop:40,position: "relative", textAlign : 'center',  alignItems: 'center'}} onPress={this.handlerPressButton} primary><Text> Entrar </Text></Button>
          </Content>
        </Container>
      );
    }

    return <></>
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
