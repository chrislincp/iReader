import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../';

class BasePage extends Component {
  constructor(props) {
    super(props);
    this.nav = this.props.navigation;
    this.state = {};
  }

  _renderHeader() {
    return <Header {...this._headerProps()} />;
  }

  _headerProps() {
    return {};
  }

  _render() {
    return null;
  }

  render() {
    console.disableYellowBox = true;
    return (
      <View style={[styles.container]}>
        {this._renderHeader()}
        {this._render()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default BasePage;
