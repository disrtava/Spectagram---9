import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import Profile from "../screens/Profile";
import StackNavigator from "./StackNavigator";

const Drawer = createDrawerNavigator();


export default class DrawerNavigator extends Component {
componentDidMount(){
  let theme;
  firebase
    .database()
    .ref("/users/" + firebase.auth().currentUser.uid)
    .on("value", snapshot => {
      theme = snapshot.val().current_theme;
      this.setState({ light_theme: theme === "light" });
    });
}
render(){
  let props = this.props;
  return (
    <Drawer.Navigator
    drawerContentOptions = {{
      activeTintColor : "#E91E63",
      inactiveTintColor : this.state.light_theme?"black":"white",
      itemStyle : {marginVertical : 5}
    }}
    drawerContent = {
      props =>{
        <CustomSideBarMenu {...props}/>
      }
    }>
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{ unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  )
}
}

