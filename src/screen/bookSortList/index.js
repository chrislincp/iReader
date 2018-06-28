import React from 'react';
import {
  View,
} from 'react-native';
import { DataList, BookItem, BasePage, ScrollableTabView } from '../../components';
import { AppColors } from '../../themes';
import { getBookSort } from './index.service';

export default class BookSortList extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      navProps: this.nav.state.params,
    };
  }


  _headerProps() {
    const {title} = this.nav.state.params;
    return {
      title,
    }
  }

  _renderItem = item => <BookItem item={item} onPress={id => this.nav.push('BookDetail', {id})} />

  _render() {
    const {navProps} = this.state;
    return (
      <View style={{backgroundColor: AppColors.backgroundColor, flex: 1}}>
        <ScrollableTabView
          style={{backgroundColor: 'white'}}
          contentStyle={{flex: 1}}
          >
          <View tabLabel="热门排序">
            <DataList 
              options={{sort: navProps.sort, order: 1}}
              service={getBookSort}
              convertData={res => res.booklist}
              renderItem={(item) => this._renderItem(item)}
          />
          </View>
          <View tabLabel="新书排序">
          <DataList 
              options={{sort: navProps.sort, order: 2}}
              service={getBookSort}
              convertData={res => res.booklist}
              renderItem={(item) => this._renderItem(item)}
          />
          </View>
          <View tabLabel="追书排序">
            <DataList 
              options={{sort: navProps.sort, order: 3}}
              service={getBookSort}
              convertData={res => res.booklist}
              renderItem={(item) => this._renderItem(item)}
            />
          </View>
        </ScrollableTabView>
      </View>
    )
  }
}