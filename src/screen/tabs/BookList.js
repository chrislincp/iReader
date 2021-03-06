import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { DataList, BasePage, Text, } from '../../components';
import { getBookList } from './index.service';
import { AppStyles } from '../../themes';
export default class BookList extends BasePage {
  static navigationOptions = {
    tabBarLabel: '主题书单',
    // tabBarIcon: ({ focused }) => (
    //   <Image
    //     style={{ width: 24, height: 24 }}
    //     source={
    //       focused
    //         ? require('../../images/tabHouseActive.png')
    //         : require('../../images/tabHouseInactive.png')
    //     }
    //   />
    // ),
  };
  constructor(props) {
    super(props);
    this.state = {
      options: {
        order: 0,
        good: 0,
      }
    };
  }

  _headerProps() {
    return {
      title: '主题书单',
      left: <View />,
    }
  }

  goDetail(id) {
    this.nav.push('BookDetail', {id});
  }

  _renderItem(item) {
    return (
      <TouchableOpacity style={styles.itemWrap} onPress={() => this.goDetail(item.bookid)}>
        <Image style={styles.cover} source={{uri: item.booklist[0].bookimage || ''}} />
        <View style={{flex: 1}}>
          <Text>{item.title}</Text>
          <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{justifyContent: 'center', flex: 1}}>
            <Text style={AppStyles.smallText}>{item.nickname}</Text>
            <Text style={AppStyles.smallText}>{item.description}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Text style={[AppStyles.smallText, {alignItems: 'flex-end'}]}>{`共${item.bookcount}本 | ${item.collectcount}人收藏`}</Text>
          </View>
        </View>
        </View>
      </TouchableOpacity>
    )
  }

  _render() {
    return (
      <DataList 
        service={getBookList}
        convertData={res => res.booklistlist}
        renderItem={item => this._renderItem(item)}
        />
    )
  }
}

const styles = StyleSheet.create({
  itemWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#D8D8D8',
  },
  cover: {
    width: 60,
    height: 75,
    marginRight: 5,
  },
})