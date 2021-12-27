import React, { useState } from "react";
import {
  ActivityIndicator,
  View,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Dimensions } from "react-native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";

import { Text, Card, Button, Icon } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";

import axios from "axios";

export default function WorldStats({ route, navigation }) {

  const [confirmedCases, setConfirmedCases] = useState(null);

  const [worldPopulation, setWorldPopulation] = useState(null);
  const [recoveredCases, setRecoveredCases] = useState(null);
  const [criticalCases, setCriticalCases] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [lastUpdate, setLatestUpdate] = useState("0");

  const [loaded, setLoaded] = useState(false);
  const [populationUrl, setPopulationUrl] =
    route.params === undefined
      ? useState("worldpopulation")
      : useState("population");
  const [statsOfWorld, setStatsOfWorld] = useState(true);

  const [country, setCountry] = useState("World");
  const [statisticsUrl, setStatisticsUrl] = useState("totals");

  console.log("thdiss", populationUrl, country);

  const isFocused = useIsFocused();
  
  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }

  
  // clearAsyncStorage()

  React.useEffect(() => {
    if (route.params != undefined) {
      setPopulationUrl("population");
      setCountry(route.params.country);
      setStatsOfWorld(false);
      setStatisticsUrl("country")
    }
  });

  React.useEffect(() => {
    getData();
  }, [isFocused]);

  const world_population = {
    method: "GET",
    url: `https://world-population.p.rapidapi.com/${populationUrl}`,
    params: { country_name: `${country}` },
    headers: {
      "x-rapidapi-host": "world-population.p.rapidapi.com",
      "x-rapidapi-key": "ec6f3942a7mshb76d57ec2b2ea2bp1d12c0jsna5b17c45c58e",
    },
  };

  const statistics = {
    method: "GET",
    url: `https://covid-19-data.p.rapidapi.com/${statisticsUrl}`,

    params: { name: `${country}`, date: "2020-04-01" },
    headers: {
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": "ec6f3942a7mshb76d57ec2b2ea2bp1d12c0jsna5b17c45c58e",
    },
  };

  const getData = async () => {
    await axios
      .request(statistics)
      .then(function (response) {
       


        statsOfWorld == true ?
        setConfirmedCases(response.data[0].confirmed) : setConfirmedCases(response.data[0].confirmed);

        statsOfWorld == true ?
        setRecoveredCases(response.data[0].recovered) : setRecoveredCases(response.data[0].recovered)

        statsOfWorld == true ?
        setCriticalCases(response.data[0].critical) : setCriticalCases(response.data[0].critical);

        statsOfWorld == true ?
        setDeaths(response.data[0].deaths):setDeaths(response.data[0].deaths);
      })
      .catch(function (error) {
        console.error(error);
      });

    await axios
      .request(world_population)
      .then(function (response) {
        
        statsOfWorld == true
          ? setWorldPopulation(response.data.body.world_population)
          : setWorldPopulation(response.data.body.population);

        console.log("Statsof World", statsOfWorld);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const data2 = [
    {
      name: "Confirmed",
      population: Math.round((confirmedCases / worldPopulation) * 100),
      color: "#F7829F",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Recovered",
      population: Math.round((recoveredCases / confirmedCases) * 100),
      color: "#A8D6AF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Deaths",
      population: Math.round((deaths / confirmedCases) * 100),
      color: "#FFE9C4",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Critical",
      population: Math.round((criticalCases / confirmedCases) * 100),
      color: "#92c5fa",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  const screenWidth = Dimensions.get("window").width;

  if (!loaded) {
    return (
      <AppLoading
        startAsync={getData}
        onFinish={() => setLoaded(true)}
        onError={console.warn}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <Image
          style={{ borderRadius: 30, marginTop: "1%" }}
          source={{
            uri: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/blog_posts/public-health/1800x1200_woman-covid-illustration.jpg?resize=800px:*",
            width: "97%",
            height: "20%",
          }}
        />
        <View>
        <PieChart
          data={data2}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,

            color: (opacity = 1) => `rgba(246, 106, 91, ${opacity})`,

            style: {
              borderRadius: 16,
              color: "red",
            },
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[10, 0]}
          absolute
        />
        </View>

        <View style={styles.box}>
          <TouchableOpacity
            style={{
              backgroundColor: "#ffe8ec",
              padding: 15,
              borderRadius: 15,
              width: 200,
              margin: 5,
              fontFamily: "Raleway",
            }}
          >
            <Text
              style={{
                color: "#FC385E",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 30,
                fontFamily: "Raleway",
              }}
            >
              Confirmed{"\n"}Cases -{" "}
              {Math.round((confirmedCases / worldPopulation) * 100)}%
            </Text>

            <Text
              style={{ color: "#FC385E", textAlign: "right", fontSize: 16 }}
            >
              {" "}
              {confirmedCases}{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#ffe9c4",
              padding: 15,
              borderRadius: 15,
              width: 200,
              margin: 5,
            }}
          >
            <Text
              style={{
                color: "#ed9704",
                fontSize: 20,
                fontFamily: "Raleway",
                fontWeight: "bold",
                marginBottom: 30,
              }}
            >
              {country}
              {"\n"}Population
            </Text>
            <Text
              style={{ color: "#ed9704", textAlign: "right", fontSize: 16 }}
            >
              {" "}
              {worldPopulation}{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <TouchableOpacity
            style={{
              backgroundColor: "#eaf6ed",
              padding: 15,
              borderRadius: 15,
              width: 200,
              margin: 5,
            }}
          >
            <Text
              style={{
                color: "#3FAC57",
                fontSize: 20,
                fontFamily: "Raleway",
                fontWeight: "bold",
                marginBottom: 30,
              }}
            >
              Recovered{"\n"}Cases -{" "}
              {Math.round((recoveredCases / confirmedCases) * 100)}%
            </Text>
            <Text
              style={{ color: "#3FAC57", textAlign: "right", fontSize: 16 }}
            >
              {" "}
              {recoveredCases}{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#E8F2FF",
              padding: 15,
              borderRadius: 15,
              width: 200,
              margin: 5,
            }}
          >
            <Text
              style={{
                color: "#308DFB",
                fontSize: 20,
                fontFamily: "Raleway",
                fontWeight: "bold",
                marginBottom: 30,
              }}
            >
              Critical{"\n"}Cases -{" "}
              {Math.round((criticalCases / confirmedCases) * 100)}%
            </Text>
            <Text
              style={{ color: "#308DFB", textAlign: "right", fontSize: 16 }}
            >
              {" "}
              {criticalCases}{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <View
            style={{
              backgroundColor: "#F0F1F2",
              padding: 15,
              borderRadius: 15,
              width: 200,
            }}
          >
            <Text
              style={{
                color: "#8B9297",
                fontSize: 16,
                fontFamily: "Raleway",
                fontWeight: "bold",
                marginBottom: 0,
              }}
            >
              Deaths - {Math.round((deaths / confirmedCases) * 100)}%
            </Text>
            <Text
              style={{ color: "#8B9297", textAlign: "right", fontSize: 16 }}
            >
              {" "}
              {deaths}{" "}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#F0F1F2",
              padding: 15,
              borderRadius: 15,
              width: 200,
            }}
          >
            <Text
              style={{
                color: "#8B9297",
                fontSize: 16,
                fontFamily: "Raleway",
                fontWeight: "bold",
                marginBottom: 0,
              }}
            >
              Last Update -
            </Text>
            <Text
              style={{ color: "#8B9297", textAlign: "right", fontSize: 16 }}
            >
              {lastUpdate.substring(0, 10)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    flexDirection: "row",
  },
  innerBox: {
    borderWidth: 1,
    padding: 10,
    flexDirection: "column",
  },
});
