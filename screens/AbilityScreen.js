import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state = {
    dataAPI: []
  };
  componentDidMount = () => {
    fetch(this.props.navigation.state.params, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataAPI: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  typeStyle = function(type) {
    switch (type) {
      case 'normal':
        return {
          backgroundColor: '#A8A77A'
        };
      case 'fire':
        return {
          backgroundColor: '#EE8130'
        };
      case 'water':
        return {
          backgroundColor: '#6390F0'
        };
      case 'electric':
        return {
          backgroundColor: '#F7D02C'
        };
      case 'grass':
        return {
          backgroundColor: '#7AC74C'
        };
      case 'ice':
        return {
          backgroundColor: '#96D9D6'
        };
      case 'fighting':
        return {
          backgroundColor: '#C22E28'
        };
      case 'poison':
        return {
          backgroundColor: '#A33EA1'
        };
      case 'ground':
        return {
          backgroundColor: '#E2BF65'
        };
      case 'flying':
        return {
          backgroundColor: '#A98FF3'
        };
      case 'grass':
        return {
          backgroundColor: '#7AC74C'
        };
      case 'psychic':
        return {
          backgroundColor: '#F95587'
        };
      case 'bug':
        return {
          backgroundColor: '#A6B91A'
        };
      case 'rock':
        return {
          backgroundColor: '#B6A136'
        };
      case 'ghost':
        return {
          backgroundColor: '#735797'
        };
      case 'dragon':
        return {
          backgroundColor: '#6F35FC'
        };
      case 'dark':
        return {
          backgroundColor: '#705746'
        };
      case 'steel':
        return {
          backgroundColor: '#B7B7CE'
        };
      case 'fairy':
        return {
          backgroundColor: '#D685AD'
        };
      default:
        return { backgroundColor: '#68A090' };
    }
  };

  onPressType = item => {
    this.props.navigation.push('Ability', item.url);
    console.log(item);
    this.forceUpdate();
  };

  damage_relations(stats) {
    return (
      <FlatList
        data={stats}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => this.onPressType(item)}
            >
              <View style={[this.typeStyle(item.name), styles.type]}>
                <Text>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  render() {
    if (this.state.dataAPI.name != undefined) {
      return (
        <View>
          <View style={[this.typeStyle(this.state.dataAPI.name), styles.type]}>
            <Text>
              {this.state.dataAPI.name.charAt(0).toUpperCase() +
                this.state.dataAPI.name.slice(1)}
            </Text>
          </View>
          {/* double_damage_from */}
          <Text>Double damage from</Text>
          <View>
            {this.damage_relations(
              this.state.dataAPI.damage_relations.double_damage_from
            )}
          </View>
          {/* half_damage_from */}
          <Text>Half damage from</Text>
          <View>
            {this.damage_relations(
              this.state.dataAPI.damage_relations.half_damage_from
            )}
          </View>
          {/* double_damage_to */}
          <Text>Double damage to</Text>
          <View>
            {this.damage_relations(
              this.state.dataAPI.damage_relations.double_damage_to
            )}
          </View>
          {/* half_damage_to */}
          <Text>Half damage to</Text>
          <View>
            {this.damage_relations(
              this.state.dataAPI.damage_relations.half_damage_to
            )}
          </View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  },
  parentInfo: {
    flexDirection: 'row'
  },
  types: {
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },
  type: {
    paddingHorizontal: 5
  },
  avatarImage: {
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20
  },
  dataName: {
    marginBottom: 20
  },
  dataInfo: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000'
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#424342',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#88A2AA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000'
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff'
  }
});