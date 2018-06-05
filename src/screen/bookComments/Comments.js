import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { BasePage, DataList, CommentItem } from '../../components';
import { AppColors } from '../../themes';
import { getBookComments } from './index.service';

export default class Comments extends BasePage {
  constructor(props) {
    super(props);
    console.log(this.nav.state.params)
    this.state = {
      options: {
        good: 0,
        categoryid: 0,
        order: 0,
        bookid: this.nav.state.params.id,
      },
    };
  }

  _headerProps() {
    return {
      title: `${this.nav.state.params.title}的书评`,
    }
  }

  _renderItem(item) {
    return <CommentItem item={item} onPress={() => this.nav.push('DetailComment',item)} />
  }
  renderHeader() {
    return (
      <View 
        style={{
          flexDirection: 'row', 
          height: 36, 
          alignItems: 'center', 
          paddingLeft: 10, 
          paddingRight: 10,
          backgroundColor: 'white',
        }}>
        <View 
          style={{
            borderLeftWidth: 4, 
            borderColor: AppColors.themeColor, 
            height: 24, 
            paddingLeft: 10,
            justifyContent: 'center'
            }}>
          <Text>{`全部书评 (${this.nav.state.params.total}条)`}</Text>
        </View>
      </View>
    )
  }

  _render() {
    const {loading} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: AppColors.backgroundColor}}>
        <DataList 
          options={this.state.options}
          convertData={res => res.bookcommentlist}
          service={getBookComments}
          renderItem={item => this._renderItem(item)}
          renderHeader={() => this.renderHeader()}
          />
      </View>
    )
  }
}