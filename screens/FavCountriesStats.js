
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  TouchableOpacity,
} from "react-native";

import { AntDesign } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";


import AsyncStorage from "@react-native-async-storage/async-storage";
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';


import Button from './Button'
const clearAsyncStorage = async() => {
  AsyncStorage.clear();
}

const FavCountriesStats = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [clickedFav , setClickedFav ] = useState(false);
  

  const isFocused = useIsFocused();

  
  React.useEffect(() => {
    getData();
  }, [clickedFav]);


  const getCountryNames = async () => {
    try {
      const users = await AsyncStorage.getItem("Favourites");

      let jsonUsers = JSON.parse(users);

      if (jsonUsers == null) {
        // value previously stored
        console.log("No users! Null");
      } else
      
      
      
     {
       console.log("THISSS is ",jsonUsers.map(function (obj) {return obj.country }))


      setFilteredDataSource(jsonUsers.map(function (obj) {return obj.country }));
      setMasterDataSource(jsonUsers.map(function (obj) {return obj.country }));
       
      console.log("GOT DATA: ",jsonUsers);
}


    } catch (e) {
      // error reading value
      console.log(e);
    }
  }

  useEffect(() => {
  

    getCountryNames()

  }, []);



  const searchFilterFunction = (text) => {

    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item
          ? item.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item , index}) => {
    return (

      MakeButton(item,index)
 
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };


  
  function MakeButton(item, index) {
    return (
      <Button
        index={index} 
        item={item} 
        btnType = {"filled"}
        navigation = {navigation}

      />
    );
  }

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    borderColor: '#E9725A',
    backgroundColor: '#FFFFFF',
    borderRadius:50,
    marginTop:"2%"
  },
});

export default FavCountriesStats;
