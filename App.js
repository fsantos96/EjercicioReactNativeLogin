import React, {Component} from 'react';
import { AppLoading } from 'expo';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {DrawerCustomNavigator} from './Navigators/DrawerCustomNavigator';
import * as loginService from './Services/loginService';
import * as storageService from './Services/storageService';
import { Container, Content, Text } from 'native-base';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      error: false,
      isReady: false
    };
  }
  async componentDidMount() {  
    var token = await storageService.getItem("accessToken");

    if(token) {
      this.setState({ isLogin: true });
    } else {
        token = await loginService.signInWithGoogleAsync();
        console.log(token);
        if(token && (token.error || token.cancelled)) {
            this.setState({ error: true});
        } else {
            //await storageService.setItem("accessToken", token);
            this.setState({ isLogin: true });
        }
    }

    this.setState({ isReady: true });
  }

  render(){
    
    if(this.state.isLogin) {
       return (
         <NavigationContainer>
           <DrawerCustomNavigator/>
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
