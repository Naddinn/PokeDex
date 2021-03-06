import React from "react";
import {
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  TextInput
} from "react-native";
import { Constants } from "expo";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    dataAPI: null,
    searchTxt: "",
    searchList: [],
    isSearching: false
  };
  componentDidMount = () => {
    this.updateAPI();
  };

  updateAPI() {
    fetch("https://pokeapi.co/api/v2/pokemon/", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataAPI: responseJson.results.slice(0, 802)
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onPress = item => {
    this.props.navigation.navigate("Detail", item.url);
  };

  changeSearch(text) {
    let { dataAPI } = this.state;
    let filteredAPI = [];
    if (text === "") {
      this.setState({
        isSearching: false
      });
      this.updateAPI();
      return;
    }
    for (i = 0; i < dataAPI.length; i++) {
      name = dataAPI[i].name;
      if (name.includes(text.toLowerCase())) {
        filteredAPI.push(dataAPI[i]);
      }
    }
    this.setState({
      searchTxt: text,
      searchList: filteredAPI,
      isSearching: true
    });
  }

  getID(url) {
    let wrds = url.split("/");
    return wrds[wrds.length - 2];
  }

  renderPokemon(pokemon, i) {
    var name = pokemon.name;
    if (pokemon.name === "mimikyu-disguised") {
      name = "mimikyu";
    } else if (pokemon.name === "minior-red-meteor") {
      name = "minior-meteor";
    }
    return (
      <View>
        <TouchableOpacity
          style={styles.pokemonTouchable}
          onPress={() => this.onPress(pokemon)}
        >
          <Text style={styles.selectionListText}>
            <Text style={styles.selectionListId}>
              #{this.getID(pokemon.url) + " "}
            </Text>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>
          <Image
            style={styles.avatarImage}
            source={{
              uri: "https://img.pokemondb.net/artwork/" + name + ".jpg"
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    if (this.state.dataAPI != null) {
      return (
        <View style={styles.container}>
          <View style={styles.topBox}>
            <Image
              style={styles.headingImg}
              source={require("../images/smartphone.png")}
            />
            <Text style={styles.topBoxText}>PokéDex</Text>
          </View>
          <TextInput
            style={styles.searchBar}
            onChangeText={searchTxt => this.changeSearch(searchTxt)}
            value={this.state.searchTxt}
            placeholder="Search"
          />
          <ScrollView style={styles.scroll}>
            <FlatList
              data={
                this.state.isSearching
                  ? this.state.searchList
                  : this.state.dataAPI
              }
              renderItem={({ item, index }) => (
                <View style={styles.infoContainer}>
                  {this.renderPokemon(item, index)}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.appContainer}>
          <ActivityIndicator size="large" color="#CC5500" />
        </View>
      );
    }
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );
      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    width: "100%"
  },
  appContainer: {
    flex: 1,
    backgroundColor: "#424342",
    alignItems: "center",
    justifyContent: "center"
  },
  concertContainer: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 16
  },
  headingImg: {
    height: 30,
    width: 30,
    marginRight: 8
  },
  topBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#111"
  },
  topBoxText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111"
  },
  scroll: {
    flexGrow: 0,
    width: "100%",
    height: "85%",
    backgroundColor: "#fff"
  },
  infoContainer: {
    width: "100%"
  },
  pokemonTouchable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  selectionListText: {
    fontSize: 20,
    color: "#111"
  },
  selectionListId: {
    color: "#aaa"
  },
  avatarImage: {
    flex: 1,
    width: 80,
    height: 80,
    maxWidth: 80,
    resizeMode: "contain"
  },
  searchBar: {
    height: 50,
    width: "100%",
    borderColor: "#eee",
    borderWidth: 1,
    paddingTop: 6,
    paddingHorizontal: 12,
    fontSize: 18
  }
});
