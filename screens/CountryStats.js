
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  TouchableOpacity,
} from "react-native";

import { AntDesign } from '@expo/vector-icons';

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

const CountryStats = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [clickedFav , setClickedFav ] = useState(false);
  const options = {
    method: 'GET',
    url: 'https://world-population.p.rapidapi.com/allcountriesname',
    headers: {
      'x-rapidapi-host': 'world-population.p.rapidapi.com',
      'x-rapidapi-key': 'ec6f3942a7mshb76d57ec2b2ea2bp1d12c0jsna5b17c45c58e'
    }
  };
  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }
  const getCountryNames = async () => {

   await 
   axios.request(options)
   
    .then((responseJson) => {

      
      console.log("THISSS is fyukkk",responseJson.data.body.countries)
     
      setFilteredDataSource(responseJson.data.body.countries);
      setMasterDataSource(responseJson.data.body.countries);
    })
    .catch((error) => {
      console.error(error);
    });
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

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  
  function MakeButton(item, index) {
    return (
      <Button
        index={index} 
        item={item} 
        btnType={"empty"}
        navigation = {navigation}
      />
    );
  }

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

export default CountryStats;
