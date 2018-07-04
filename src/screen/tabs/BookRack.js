import React from 'react';
import {
  View,
  FlatList,
  DeviceEventEmitter,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { BasePage, Icon, Text, Tag, Toast, } from '../../components';
import IconName from '../../constants/IconName';
import { AppColors, AppStyles } from '../../themes';
import DeviceStorage from '../../utils/deviceStorage';
import { timeCompare, removeRack } from '../../utils/utils';
import Swipeable from 'react-native-swipeable';
import { getBookDetail } from './index.service';
import { getBookDir } from '../bookDir/index.service';

export default class BookRack extends BasePage {
  static navigationOptions = {
    tabBarLabel: '书架',
    tabBarIcon: ({ focused }) => (
      <Icon name={focused ? IconName.book : IconName.bookOutlie} size={24} color={AppColors.themeColor}/>
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
    // DeviceStorage.delete('rackList');
    this.joinRackEmit = DeviceEventEmitter.addListener('joinRack', () => this.getBookList());
    this.removeRackEmit = DeviceEventEmitter.addListener('removeRack', () => this.getBookList());
    this.updateRackEmit = DeviceEventEmitter.addListener('updateRack', () => this.getBookList());
    this.getBookList(true);
  }

  componentWillUnmount() {
    this.joinRackEmit.remove();
    this.removeRackEmit.remove();
    this.updateRackEmit.remove();
  }

  _headerProps() {
    return {
      title: '书架',
      left: <View />,
    }
  }

  getBookList(mount) {
    DeviceStorage.get('rackList').then(res => {
      let data = [];
      let transData = [];
      if (res) {
        res.forEach(item => {
          if (item) {
            data.push(item);
            transData.push(item);
          }
        })
      }
      transData.reverse();
      this.setState({ data: transData});
      DeviceStorage.save('rackList', data);
      if (mount) this.updateList();
    })
  }

  updateList() {
    let {data} = this.state;
    let bookInfoList = [];
    let dirList = [];
    data.forEach(item => {
      bookInfoList.push(getBookDetail({bookid: item.bookInfo.bookid}));
      if (item.currentDetail) dirList.push(getBookDir(item.bookInfo.bookid));
    })
    Promise.all(bookInfoList).then(res => {
      console.log(res);
      res.forEach((item, index) => {
        data[index].bookInfo = item.bookinfo;
      })
      Promise.all(dirList).then(dirRes => {
        console.log('dirres', dirRes)
        dirRes.forEach(dir => {
          data.forEach((item, i) => {
            if (item.currentDetail && item.dirList[0].chapterid == dir.chapterlist[0].chapterid) data[i].dirList = dir.chapterlist;
          })
        })
        this.setState({ data, loading: false });
        let transData = [];
        data.forEach(item => transData.push(item));
        transData.reverse();
        DeviceStorage.save('rackList', transData);
      })
    }).catch(err => {
      Toast.show('请求失败');
      console.log(err);
    })
  }

  removeBook(item) {
    let {data} = this.state;
    const {bookInfo} = item;
    removeRack(bookInfo.bookid).then(() => {
      data.forEach((book, index) => {
        if (book.bookInfo.bookid == bookInfo.bookid) data.splice(index, 1);
      })
      console.log(this.swipeable)
      this.swipeable.recenter();
      this.setState({ data });
      Toast.showSuccess('删除成功');
    })
  }

  _renderItem(item) {
    console.log(item)
    const {bookInfo, dirList, currentDetail} = item;
    let progress = 0;
    if (currentDetail) {
      let index;
      dirList.forEach((item, i) => {
        if (item.chapterid == currentDetail.chapter.chapterid) index = i;
      })
      progress = (index / (dirList.length - 1)) * 100;
    }
    return (
      <Swipeable
        onRef={ref => this.swipeable = ref}
        rightButtons={[
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: AppColors.danger,
              paddingLeft: 23
            }}
            onPress={() => this.removeBook(item)}
            >
            <Text style={{color: 'white'}}>删除</Text>
          </TouchableOpacity>
        ]}
        >
        <TouchableOpacity style={styles.itemWrap} onPress={() => this.nav.push('BookPages', {bookInfo, from: 'rack'})}>
          <Image style={styles.cover} source={{uri: bookInfo.bookimage}} />
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>{bookInfo.bookname}</Text>
              <Tag type="danger" title={`${timeCompare(bookInfo.updatetime)}前更新`} />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={AppStyles.smallText}>{`${bookInfo.author} | ${progress.toFixed(2)}%`}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={AppStyles.smallText}>{`${bookInfo.lastchaptername}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }

  _render() {
    const {data, loading} = this.state;
    return (
      <FlatList
        data={data}
        refreshing={loading}
        onRefresh={() => {
          this.setState({loading: true})
          this.updateList();
        }}
        renderItem={({item}) => this._renderItem(item)}
        />
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