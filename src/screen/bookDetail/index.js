import React from 'react';
import { BasePage, StarScore, Icon } from '../../components';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import LoadingStatus from '../../components/LoadingStatus';
import { getBookDetail, getBookHotComment } from './index.service';
import { AppColors } from '../../themes';
import IconName from '../../constants/IconName';
export default class BookDetail extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      screenState: 'loading',
      bookInfo: {},
      bookCommonList: [],
      noMoreDesc: true,
      showMoreDesc: false,
    }
  }

  componentDidMount() {
    const {id} = this.nav.state.params;
    Promise.all([
      getBookDetail({bookid: id}),
      getBookHotComment({bookid: id})
    ]).then(res => {
      console.log(res)
      if (res[0].success == 1) {
        this.setState({
          bookInfo: res[0].bookinfo,
        })
      }
      if (res[1].success == 1) {
        this.setState({
          bookCommonList: res[1].bookcommentlist
        })
      }
      this.setState({
        screenState: 'success',
      });
    }).catch(err => {
      console.log(err);
    })
  }

  toggoleDesc() {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      showMoreDesc: !this.state.showMoreDesc,
    })
  }

  onLayoutDesc(e) {
    const layout = e.nativeEvent.layout;
    const {height} = layout;
    if (height < 55) {
      this.setState({
        noMoreDesc: true,
      })
    } else {
      this.setState({
        noMoreDesc: false,
      })
    }
    
  }

  _headerProps() {
    return {
      title: '书籍详情',
    }
  }

  _render() {
    const { bookInfo, bookCommonList, showMoreDesc, noMoreDesc } = this.state;
    console.log(bookInfo);
    return (
      <ScrollView style={{flex: 1, backgroundColor: AppColors.backgroundColor}}>
        <View style={styles.header}>
          <Image style={styles.cover} source={{uri: bookInfo.bookimage}} />
          <View style={styles.bookInfo}>
            <View style={styles.title}>
              <Text style={{fontSize: 16}}>{bookInfo.bookname}</Text>
            </View>
            <View style={styles.mainInfo}>
              <Text style={styles.mainInfoText}>{`作者:${bookInfo.author} | ${bookInfo.sortname}`}</Text>
              <Text style={styles.mainInfoText}>状态：<Text style={{color: bookInfo.bookprocess == '连载' ? AppColors.red : AppColors.green}}>{bookInfo.bookprocess}</Text></Text>
              <Text style={styles.mainInfoText}>{`时间:${bookInfo.updatetime}`}</Text>
              <Text style={styles.mainInfoText} numberOfLines={1}>{`更新:${bookInfo.lastchaptername}`}</Text>
            </View>
            <View style={styles.star}>
              <StarScore score={bookInfo.score} />
            </View>
          </View>
        </View>
        <View style={styles.numberInfo}>
          <View style={styles.numberInfoItem}>
            <Text style={styles.numberInfoItemText}>追书人数</Text>
            <Text style={styles.numberInfoItemText}>{bookInfo.usercount}</Text>
          </View>
          <View style={styles.numberInfoItem}>
            <Text style={styles.numberInfoItemText}>读者留存率</Text>
            <Text style={styles.numberInfoItemText}>{`${bookInfo.retention}%`}</Text>
          </View>
          <View style={styles.numberInfoItem}>
            <Text style={styles.numberInfoItemText}>评分人数</Text>
            <Text style={styles.numberInfoItemText}>{bookInfo.scoreall}</Text>
          </View>
        </View>
        <View style={styles.descWrap}>
          <Text>简介</Text>
          <View style={styles.desc}>
            <Text 
              ref="desc"
              onLayout={(e) => this.onLayoutDesc(e)}
              numberOfLines={showMoreDesc ? null : 3} 
              style={styles.descText}
              >
              {bookInfo.description}
            </Text>
            {!noMoreDesc && <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}} />
              <Icon name={showMoreDesc ? IconName.topArrow : IconName.downArrow} style={{paddingLeft: 5, paddingRight: 5}} size={20} onPress={() => this.toggoleDesc()} />
            </View>}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: AppColors.dividersColor,
  },
  cover: {
    width: 96,
    height: 120,
    marginRight: 5,
  },
  bookInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  mainInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  mainInfoText: {
    flex: 1,
    fontSize: 12,
    color: AppColors.textGreyColor,
    justifyContent: 'center',
  },
  star: {
    justifyContent: 'flex-end',
  },
  numberInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
  },
  numberInfoItem: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  numberInfoItemText: {
    lineHeight: 20,
  },
  descWrap: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  desc: {
    marginTop: 10,
    marginBottom: 5,
  },
  descText: {
    fontSize: 12,
    color: AppColors.textGreyColor,
    lineHeight: 18,
  }
})