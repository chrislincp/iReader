import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { AppColors, AppStyles, AppSizes } from '../../themes';
import Text from '../Text';

export default class CollectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {item, onPress} = this.props;
    console.log(item);
    return (
      <TouchableOpacity 
        style={styles.itemWrap}
        onPress={() => onPress()}
        >
        <Image style={styles.cover} source={{uri: item.booklist.length ? item.booklist[0].bookimage || '' : ''}} />
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text numberOfLines={1}>{item.title}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{justifyContent: 'center', flex: 1}}>
            <Text style={AppStyles.smallText} numberOfLines={1}>{item.nickname}</Text>
            <Text style={AppStyles.smallText} numberOfLines={1}>{item.description}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Text style={[AppStyles.smallText, {alignItems: 'flex-end'}]}>{`共${item.bookcount}本 | ${item.collectcount}人收藏`}</Text>
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
    borderBottomWidth: AppSizes.hairLineWidth,
    borderColor: '#D8D8D8',
    backgroundColor: 'white',
  },
  cover: {
    width: 60,
    height: 75,
    marginRight: 5,
  },
})
