import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import {HomeScreen} from "../Components/Home/home";
import { CocktailDetail } from "../Components/CocktailDetail/CocktailDetail"

const Stack = createStackNavigator();

export class StackNavigator extends Component {
  
  render(){
    return (
      <>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={CocktailDetail} />
        </Stack.Navigator>
      </>
    );
  }
}
