import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { DataList, Header, BookItem, BasePage, Icon } from '../../components';
import {getTopList, getOtherList} from './index.service';
import IconName from '../../constants/IconName';
import { AppColors } from '../../themes';

export default class TopList extends BasePage {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      options: {
        sex: 1,
      },
      isOther: this.nav.state.params.isOther ? true : false,
    };
  }

  componentDidMount() {
    const {title, options} = this.nav.state.params;
    let opt = Object.assign({}, this.state.options, options);
    this.setState({
      options: opt,
    })
    setTimeout(() => {
      this.refs.datalist.reload(); 
    });
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
    const {isOther} = this.state;
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <DataList 
          ref="datalist"
          options={this.state.options}
          config={{pageSize: 'size', pageNumber: 'page', size: 20}}
          service={isOther ? getOtherList : getTopList}
          convertData={res => res.booklist}
          renderItem={(item) => this._renderItem(item)}
          disabledMountLoad
          disabledReceiveProps
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
})