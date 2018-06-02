import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { DataList, Header, BookItem, BasePage, Icon } from '../../components';
import {getTopList} from './index.service';
import IconName from '../../constants/IconName';
import { AppColors } from '../../themes';

export default class TopList extends BasePage {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      options: {
        sex: 1,
        order: this.nav.state.params.order,
      }
    };
  }

  _headerProps() {
    const {title} = this.nav.state.params;
    return {
      title,
    }
  }

  _renderItem = item => <BookItem item={item} onPress={id => this.goDetail(id)} />

  goDetail(id) {
    this.nav.push('BookDetail', {id});
  }
  _render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <DataList 
          options={this.state.options}
          config={{pageSize: 'size', pageNumber: 'page', size: 20}}
          service={getTopList}
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