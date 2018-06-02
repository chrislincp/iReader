import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { BasePage, DataList, Icon } from '../../components';
import { AppColors, AppSizes } from '../../themes';
import { getBookDir } from './index.service';
import IconName from '../../constants/IconName';
import { ifIphoneX } from '../../utils/utils';

export default class BookDir extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      screenState: 'loading',
      bookInfo: this.nav.state.params,
      dirList: [],
    }
  }

  componentDidMount() {
    const {bookInfo} = this.state;
    getBookDir(bookInfo.bookid).then(res => {
      console.log(res)
      if (res.success == 1) {
        this.setState({
          dirList: res.chapterlist,
          screenState: 'success',
          order: false,
        })
      }
    }).catch(err => {
      this.setState({
        screenState: 'error'
      })
    })
  }

  _headerProps() {
    const {bookInfo, order} = this.state;
    return {
      title: bookInfo.bookname,
      right: <Icon size={26} color="white" style={{padding: 10}} name={order ? IconName.arrowDropUp : IconName.arrowDropDown} onPress={() => this.sort()} />
    }
  }

  _renderItem(item) {
    return (
      <TouchableOpacity
        style={{
          height: 36,
          alignItems: 'center',
          flexDirection: 'row',
          padding: 15,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: AppColors.dividersColor,
        }}
        >
        <Text style={{fontSize: 12}} numberOfLines={1}>{item.chaptername}</Text>
      </TouchableOpacity>
    )
  }

  sort() {
    let {order, dirList} = this.state;
    order ? this.refs.flatlist.scrollToIndex({index: 0}) :
    this.refs.flatlist.scrollToEnd();
    this.setState({ order: !order});
  }

  _render() {
    const {bookInfo, dirList} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: AppColors.backgroundColor, marginBottom: ifIphoneX(20, 0)}}>
        <FlatList
          style={{backgroundColor: 'white'}}
          ref="flatlist"
          data={dirList}
          getItemLayout={(data, index) => ({length: 36, offset: 36 * index, index})}
          keyExtractor={(item) => item.chapterid.toString()}
          renderItem={({item}) => this._renderItem(item)}
          // ItemSeparatorComponent={() => <View style={{height: StyleSheet.hairlineWidth, backgroundColor: AppColors.dividersColor}} />}
          />
      </View>
    )
  }
}
