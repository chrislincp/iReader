import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

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
            <Text>{item.score}</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text numberOfLines={2} style={styles.desc}>{item.description}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Text style={{fontSize: 12}}>{item.author} | {item.usercount}</Text>
            <Text style={{fontSize: 12}}>{item.sortname} | {item.bookprocess}</Text>
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
  },
  cover: {
    width: 60,
    height: 75,
    marginRight: 5,
  },
  desc: {
    fontSize: 12,
    lineHeight: 16,
    color: '#888',
  }
})