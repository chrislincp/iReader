import React from 'react';
import { BasePage, ScrollableTabView, DataList, CollectItem } from '../../components';
import { AppStyles } from '../../themes';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import { getMyBookList, getMyCollectBookList } from './index.service';

export default class MyBookList extends BasePage {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  _headerProps() {
    return {
      title: '我的书单',
    }
  }

  _renderItem(item) {
    return <CollectItem key={item.key} item={item} onPress={() => this.nav.push('CollectDetail', item)} />
  }

  _render() {
    return (
      <View style={AppStyles.appContainer}>
        <ScrollableTabView
            style={{backgroundColor: 'white'}}
            contentStyle={{flex: 1}}
            >
          <View style={{ backgroundColor: 'white', flex: 1}} tabLabel="草稿箱">
          </View>
          <View style={{ backgroundColor: 'white', flex: 1}} tabLabel="已发布">
            <DataList 
              service={getMyBookList}
              options={{good: 0, order: 1}}
              convertData={res => res.booklistlist}
              renderItem={(item) => this._renderItem(item)}
            />
          </View>
          <View style={{ backgroundColor: 'white', flex: 1}} tabLabel="收藏夹">
            <DataList 
              service={getMyCollectBookList}
              convertData={res => res.bookListList}
              renderItem={(item) => this._renderItem(item)}
            />
          </View>
        </ScrollableTabView>
      </View>
    )
  }
}