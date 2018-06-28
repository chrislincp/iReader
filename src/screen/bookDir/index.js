import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { BasePage, Text } from '../../components';
import { AppColors, AppSizes } from '../../themes';
import { getBookDir } from './index.service';
import { ifIphoneX } from '../../utils/utils';

export default class BookDir extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      screenState: 'loading',
      bookInfo: this.nav.state.params,
      dirList: [],
      order: false,
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
      right: (
        <TouchableOpacity
          onPress={() => this.sort()}
          style={{
            width: 16, 
            height: 16,
            marginRight: 10,
          }}
          >
          <Image 
            style={{
              width: 16, 
              height: 16,
            }}
            source={order ? require( '../../images/up_dark.png') : require( '../../images/down_dark.png')}
            />
        </TouchableOpacity>
      ),
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
        onPress={() => this.goPage(item)}
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

  goPage(item) {
    console.log(item);
    const {bookInfo, dirList} = this.state;
    const props = {
      dirList,
      bookInfo,
      chapterid: item.chapterid
    };
    this.nav.push('BookPages', props);
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
