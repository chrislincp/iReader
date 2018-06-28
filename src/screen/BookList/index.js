import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { DataList, Header, BookItem, BasePage } from '../../components';
import { AppColors } from '../../themes';

export default class BookList extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        sex: 1,
      },
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
      <View style={{backgroundColor: AppColors.backgroundColor, flex: 1}}>
        <DataList 
          ref="datalist"
          options={this.state.options}
          config={{pageSize: 'size', pageNumber: 'page', size: 20}}
          service={this.nav.state.params.service}
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