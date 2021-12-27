import "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";


import WorldStats from "./screens/WorldStats";

import CountryStats from "./screens/CountryStats";

import FavCountriesStats from "./screens/FavCountriesStats";



const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{
      drawerStyle: {
        backgroundColor: '#fff2ea',
      },
      
      drawerActiveBackgroundColor:'#E9725A',
      drawerActiveTintColor:'#fff2ea'
    }}>
      <Drawer.Screen
        name="World Statistics"
        component={WorldStats}
        options={{
          title: "World Statistics",
          headerStyle: {
            backgroundColor: "#E9725A",
          },
          headerTitleStyle: {
            color: "white",
            fontFamily: "Raleway",
          },
        }}
        
      />
      <Drawer.Screen 
      name="CountryStats" 
      component={CountryStats}      
      options={{
          title: "All Countries",
          headerStyle: {
            backgroundColor: "#E9725A",
          },
          headerTitleStyle: {
            color: "white",
            fontFamily: "Raleway",
          },
        }}/>
      <Drawer.Screen name="FavCountriesStats" component={FavCountriesStats}
        options={{
          title: "Favourites",
          headerStyle: {
            backgroundColor: "#E9725A",
          },
          headerTitleStyle: {
            color: "white",
            fontFamily: "Raleway",
          },
        }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
