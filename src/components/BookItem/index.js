import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { Tag, Text, } from '..';
import { AppColors, AppStyles } from '../../themes';

export default class BookItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goDetail(id) {
    this.props.onPress(id);
  }

  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity style={styles.itemWrap} onPress={() => this.goDetail(item.bookid)}>
        <Image style={styles.cover} source={{uri: item.bookimage}} />
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{item.bookname}</Text>
            <Text style={{color: AppColors.themeColor, fontSize: 16}}>{item.score}</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text numberOfLines={2} style={AppStyles.smallText}>{item.description}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Text style={AppStyles.smallText}>{item.author} | {item.usercount}</Text>
            <View style={{flexDirection: 'row'}}>
              <Tag title={item.sortname} />
              <Tag style={{marginLeft: 5}} type={item.bookprocess == '连载' ? 'danger' : 'success'} title={item.bookprocess} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
    backgroundColor:'white',
  },
  cover: {
    width: 60,
    height: 75,
    marginRight: 10,
  },
})