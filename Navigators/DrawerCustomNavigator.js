
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

    handlerLogout = () =>{
        // no me deja usar this.props
        console.log("Logout2");
        this.props.onLogout();
    }

    render(){
        return(
            
            <Drawer.Navigator 
                initialRouteName="Home"
                headerMode={'none'}
                drawerContent={props => <DrawerContentScreen  onLogoutPress={this.handlerLogout} />}
            >
                <Drawer.Screen name="Home"  component={StackNavigator } />
            </Drawer.Navigator>
        );
    }
    
}

