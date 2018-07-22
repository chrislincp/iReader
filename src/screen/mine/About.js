import React from 'react';
import { BasePage } from '../../components';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

export default class About extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      data: '0.0.1',
    }
  }

  _headerProps() {
    return {
      title: '关于爱阅读'
    }
  }
  _render() {
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <View style={styles.aboutCon}>
          <View style={styles.logo}>
            <Image source={require('../../images/logo.png')} style={{width: 80, height: 80}} />
          </View>
          <Text style={styles.aboutApp}>爱阅读</Text>
          <Text style={styles.aboutVersion}>版本v{this.state.data}</Text>
        </View>
        {/* <Text style={styles.aboutConText}>知客户，连未来</Text> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    // overflow: 'hidden',
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  aboutApp: {
    color: "#262A2F",
    fontSize: 23,
    marginBottom: 18
  },
  aboutVersion: {
    color: "#969FA9",
    fontSize: 12,
  },
  aboutCon: {
    marginTop: '30%',
    justifyContent: "center",
    alignItems: "center"
  },
  aboutConText: {
    position: "absolute",
    bottom: 15,
    color: "#969FA9",
    fontSize: 12,
    textAlign: "center",
    width: "100%"

  }
})