import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { DataList, Header, BookItem, BasePage, Icon } from '../../components';
import {getNewRecommend, getBookDetail} from './index.service';
import IconName from '../../constants/IconName';
import { AppColors } from '../../themes';

export default class Recommend extends BasePage {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _headerProps() {
    return {
      title: '最新推荐',
      left: <View />,
    }
  }

  _renderItem = item => <BookItem item={item} onPress={id => this.goDetail(id)} />

  goDetail(id) {
    this.nav.push('BookDetail', {id});
  }
  goDetail(id) {
    this.nav.push('BookDetail', {id});
  }

  _render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <DataList 
          noMoreLoading
          options={{sex: 1}}
          service={getNewRecommend}
          convertData={res => res.booklist}
          renderItem={(item) => this._renderItem(item)}
        />
      </View>
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
  desc: {
    fontSize: 12,
    color: '#888',
  }
})