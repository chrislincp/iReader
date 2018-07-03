import React from 'react';
import {
  View,
} from 'react-native';
import { DataList, BookItem, BasePage } from '../../components';
import {getNewRecommend} from './index.service';

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
          service={getNewRecommend}
          convertData={res => res.booklist}
          renderItem={(item) => this._renderItem(item)}
        />
      </View>
    )
  }
}