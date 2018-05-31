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
import { getBookDetail, getBookHotComment, getSimiarBook } from './index.service';
import { AppColors } from '../../themes';
import IconName from '../../constants/IconName';
import { timeCompare, ifIphoneX } from '../../utils/utils';
export default class BookDetail extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      screenState: 'loading',
      bookInfo: {},
      bookSimilarList: [],
      bookHotCommentList: [],
      noMoreDesc: true,
      showMoreDesc: false,
    }
  }

  componentDidMount() {
    const {id} = this.nav.state.params;
    Promise.all([
      getBookDetail({bookid: id}),
      getBookHotComment({bookid: id}),
    ]).then(res => {
      console.log(res)
      if (res[0].success == 1) {
        this.setState({
          bookInfo: res[0].bookinfo,
        })
        getSimiarBook({categoryid: res[0].bookinfo.sortid}).then(result => {
          console.log(result);
          if (result.success == 1) {
            this.setState({
              bookSimilarList: result.booklist,
              screenState: 'success',
            })
          }
        }).catch(err => {
          console.log(err);
        })
      }
      if (res[1].success == 1) {
        this.setState({
          bookHotCommentList: res[1].bookcommentlist
        })
      }
      // if (res[2].success == 1) {
      //   this.setState({
      //     bookSimilarList: res[2].bookcommentlist
      //   })
      // }
    }).catch(err => {
      console.log(err);
      this.setState({
        screenState: 'error'
      })
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
    const { bookInfo, bookSimilarList, bookHotCommentList, showMoreDesc, noMoreDesc } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: AppColors.backgroundColor}}>
        <ScrollView style={{marginBottom: ifIphoneX(60, 40)}}>
          <View style={styles.header}>
            <Image style={styles.cover} source={{uri: bookInfo.bookimage}} />
            <View style={styles.bookInfo}>
              <View style={styles.title}>
                <Text style={{fontSize: 16}}>{bookInfo.bookname}</Text>
              </View>
              <View style={styles.mainInfo}>
                <Text style={styles.mainInfoText}>{`作者:${bookInfo.author} | ${bookInfo.sortname}`}</Text>
                <Text style={styles.mainInfoText}>{`{状态：${bookInfo.bookprocess}`}</Text>
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
          {bookHotCommentList.length &&
          <View style={styles.bookHotCommentWrap}>
            <View style={styles.bookHotCommentHeader}>
              <Text>热门书评</Text>
              <TouchableOpacity
                onPress={() => console.log('more')}
                >
                <Text>更多</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bookHotCommentList}>
              {bookHotCommentList.map((item, index) => {
                return (
                  <TouchableOpacity 
                    key={item.bookCommentid}
                    style={{
                      flexDirection: 'row', 
                      justifyContent: 'center', 
                      padding: 10,
                      borderColor: AppColors.dividersColor, 
                      borderBottomWidth: index + 1 == bookHotCommentList.length ? 0 : StyleSheet.hairlineWidth
                      }}>
                    <View style={{width: 30, marginRight: 5}}>
                      <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: item.userimage}} />
                    </View>
                    <View style={{flex: 1}}>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 12}}>{item.nickname}</Text>
                        <Text style={{fontSize: 12, color: AppColors.textGreyColor}}>{`${timeCompare(item.posttime)}前更新`}</Text>
                      </View>
                      <Text style={{fontSize: 16, lineHeight: 30}}>{item.title}</Text>
                      <Text style={{fontSize: 12, color: AppColors.textGreyColor, lineHeight: 16}}>{item.content}</Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                        <View style={{flexDirection: 'row'}}>
                          <Icon name={IconName.thumbsUp} size={16} text={item.flowercount + item.eggcount} />
                        </View>
                        <View>
                          <Icon name={IconName.text} size={16} text={item.replycount}/>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>}
          {bookSimilarList.length && 
            <View style={styles.similarBookWrap}>
              <View style={{marginBottom: 10}}>
                <Text>你可能感兴趣</Text>
              </View>
              <ScrollView 
                horizontal
                >
                {bookSimilarList.map((item, index) => {
                  return (
                    <TouchableOpacity 
                      key={item.bookid}
                      style={{
                        width:80,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginRight: index + 1 == bookSimilarList.length ? 0 : 10,
                        alignItems: 'center',
                      }}
                      >
                      <Image style={{width: 60, height: 75, marginBottom: 10}} source={{uri: item.bookimage}} />
                      <Text style={{fontSize: 12}}>{item.bookname.substr(0, 5)}</Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>}
        </ScrollView>
        <View 
          style={{
            width: '100%', 
            height: 40, 
            backgroundColor: 'white',
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            marginBottom: ifIphoneX(20, 0),
            flexDirection: 'row',
          }}
          >
          <View 
            style={{
              width: 100, 
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: AppColors.dividersColor,
              borderRightWidth: StyleSheet.hairlineWidth,
              }}>
            <Text>加入书架</Text>
          </View>
          <View 
            style={{
              flex: 1, 
              height: '100%', 
              backgroundColor: AppColors.themeColor, 
              alignItems: 'center',
              justifyContent: 'center',
              }}>
            <Text style={{color: 'white'}}>立即阅读</Text>
          </View>
          <View></View>
        </View>
      </View>
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
  },
  bookHotCommentWrap: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  bookHotCommentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  similarBookWrap: {
    padding: 10,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
  }
})