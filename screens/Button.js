import React, { useState, useEffect } from "react";
import axios from "axios";
import { TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Button(props) {
  const [clickedFav, setClickedFav] = props.btnType == "empty" ? useState(true) : useState(false);

 
  const getData = async () => {
    try {
      const users = await AsyncStorage.getItem("Favourites");

      let jsonUsers = JSON.parse(users);

      if (jsonUsers == null) {
        // value previously stored
        console.log("No users! Null");
      } else console.log("GOT DATA: ",jsonUsers);
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }
  const storeData = async () => {
    try {
      const existingUsers = await AsyncStorage.getItem("Favourites");
      let jsonExistingUsers = JSON.parse(existingUsers);
      if (!jsonExistingUsers) {
        console.log("Null array");
        jsonExistingUsers = [];
      }

      jsonExistingUsers.push({ country: props.item });

      await AsyncStorage.setItem(
        "Favourites",
        JSON.stringify(jsonExistingUsers)
      );

      console.log("This is added",jsonExistingUsers);
      getData()
      console.log("saved");

      
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const removeFav = async () => {
    try {
      const existingUsers = await AsyncStorage.getItem("Favourites");
      let jsonExistingUsers = JSON.parse(existingUsers);
      if (!jsonExistingUsers) {
        console.log("Null array");
        jsonExistingUsers = [];
      }

      console.log("THIS IS ARRAY: ",jsonExistingUsers)

      jsonExistingUsers= jsonExistingUsers.filter(function(obj){ 
        return obj.country != props.item;
    });

      await AsyncStorage.setItem(
        "Favourites",
        JSON.stringify(jsonExistingUsers)
      );

      console.log("This is added",jsonExistingUsers);
      getData()
      console.log("saved");

      
    } catch (e) {
      // saving error
      console.log(e);
    }
  };


  return (
    // Flat List Item
    <View style={{ flex: 1, flexDirection: "row" }}>
      <TouchableOpacity
        style={styles.itemStyle}
        onPress={() =>
          props.navigation.navigate("World Statistics", { country: props.item })
        }
      >
        <Text>{props.item.toUpperCase()}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10, marginLeft: "25%" }}
        onPress={() => {


          if(clickedFav==false){
          setClickedFav(!clickedFav);
          removeFav()

          
          console.log("After delecion: ", getData())
        
        }else{

          setClickedFav(!clickedFav);
         storeData();
        //  clearAsyncStorage();
          getData()
        }
        }}
      >
        <Text>
          <AntDesign
            name={clickedFav == true ? "staro" : "star"}
            size={24}
            color="black"
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
    flex: 1,
    // marginLeft:20
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#E9725A",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    marginTop: "2%",
  },
});
