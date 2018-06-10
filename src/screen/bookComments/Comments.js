import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { BasePage, DataList, CommentItem, TitleBar } from '../../components';
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
    return <TitleBar style={{backgroundColor: 'white'}} right={<View />} title={`全部书评 (${this.nav.state.params.total}条)`} />
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