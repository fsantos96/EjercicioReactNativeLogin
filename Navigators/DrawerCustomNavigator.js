
import React, {Component} from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import {StackNavigator} from "./StackNavigator";
import {DrawerContentScreen} from "../Components/Drawer/DrawerContentScreen";


const Drawer = createDrawerNavigator();

export class DrawerCustomNavigator extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            
            <Drawer.Navigator 
                initialRouteName="Home"
                headerMode={'none'}
                drawerContent={props => <DrawerContentScreen {...props}/>}
            >
                <Drawer.Screen name="Home"  component={StackNavigator } />
            </Drawer.Navigator>
        );
    }
    
}

