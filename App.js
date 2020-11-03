import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { Avatar, List, ListItem, SearchBar } from "react-native-elements";

export default class FlatListDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }
  componentDidMount() {
    this.makeRemoteRequest();
  }
  // fetch api
  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log("asdaghdajkgh");

        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };
// seperator
  zzzseperator =() => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />)
  }
  // searchbar
  searchbar = () => {
    return <SearchBar
              placeholder="Don't type here"
              round/>
             
  }
// footer
  chan =() => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 30,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" color="#8376f9"/>
      </View>);
  };

  render() {
    return (
      <FlatList 
        data={this.state.data}
        keyExtractor={item => item.email}
        renderItem={({ item }) => (
          <ListItem>
            <Avatar
              source={{
                uri: item.picture.thumbnail,
              }}
            />
            <ListItem.Content>
              <ListItem.Title>
                {`${item.name.first} ${item.name.last}`}
              </ListItem.Title>
              <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        // declare of searchar , seperator and footer in flatlist tag
        ItemSeparatorComponent={this.zzzseperator}
        ListHeaderComponent={this.searchbar}
        ListFooterComponent={this.chan}
      />
    );
  }
}
