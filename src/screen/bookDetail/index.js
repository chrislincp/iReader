import React from 'react';
import { BasePage, StarRate, Icon, Header, Tag, CommentItem } from '../../components';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Animated,
} from 'react-native';
import LoadingStatus from '../../components/LoadingStatus';
import { getBookDetail, getBookHotComment, getSimiarBook, getBookDir } from './index.service';
import { AppColors, AppStyles } from '../../themes';
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
      opacity: 0,
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

  _headerProps() {
    return {
      title: '书籍详情',
    }
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
    console.log(height);
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

  goToPages(bookInfo) {
    console.log(bookInfo);
    const props = {
      bookInfo,
      from: 'book'
    }
    this.nav.push('BookPages', props);
  }
  
  _render() {
    const { opacity, bookInfo, bookSimilarList, bookHotCommentList, showMoreDesc, noMoreDesc } = this.state;
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
                <Text style={[AppStyles.smallText,styles.mainInfoText]}>{`作者:${bookInfo.author}`}</Text>
                <Text style={[AppStyles.smallText,styles.mainInfoText]}>{`状态:${bookInfo.bookprocess} | ${bookInfo.sortname}`}</Text>
                <Text style={[AppStyles.smallText,styles.mainInfoText]}>{`${timeCompare(bookInfo.updatetime)}前更新`}</Text>
                {/* <Text style={styles.mainInfoText} numberOfLines={1}>{`更新:${bookInfo.lastchaptername}`}</Text> */}
              </View>
              <View style={styles.star}>
                <StarRate score={bookInfo.score} />
              </View>
            </View>
          </View>
          <TouchableOpacity 
            onPress={() => console.log('go last')}
            style={{
              height: 40, 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: 'white',
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: AppColors.dividersColor,
            }}>
            <View style={{justifyContent: 'center', marginRight: 20}}>
              <Tag title="更新" type="danger" />
            </View>
            <View style={{flex: 1, justifyContent: 'center', }}>
              <Text style={{textAlign: 'right'}} numberOfLines={1}>{bookInfo.lastchaptername}{bookInfo.lastchaptername}</Text>
            </View>
          </TouchableOpacity>
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
          <View style={[styles.descWrap, {paddingBottom: noMoreDesc ? 10 : 0}]}>
            <Text>简介</Text>
            <Animated.View style={[styles.desc]}>
              <Text 
                ref="desc"
                onLayout={(e) => this.onLayoutDesc(e)}
                numberOfLines={showMoreDesc ? null : 3} 
                style={styles.descText}
                >
                {bookInfo.description}
              </Text>
              {!noMoreDesc && 
              <TouchableOpacity 
                style={{
                  flexDirection: 'row', 
                  justifyContent: 'center',
                   alignItems: 'center', 
                   height: 36,
                   marginTop: 10,
                   borderColor: AppColors.dividersColor,
                  borderTopWidth: StyleSheet.hairlineWidth,
                }}
                onPress={() => this.toggoleDesc()}
                >
                <Text style={[AppStyles.smallText, {marginRight: 5}]}>{showMoreDesc ? '点击收起' : '查看全部'}</Text>
                <Icon name={showMoreDesc ? IconName.topArrow : IconName.downArrow} color={AppColors.themeColor} size={16} />
              </TouchableOpacity>}
            </Animated.View>
          </View>
          {bookHotCommentList.length ?
          <View style={styles.bookHotCommentWrap}>
            <View style={styles.bookHotCommentHeader}>
              <Text>热门书评</Text>
            </View>
            <View style={styles.bookHotCommentList}>
              {bookHotCommentList.map((item) => <CommentItem onPress={() => this.nav.push('DetailComment', item)} key={item.bookCommentid} item={item} />)}
              <TouchableOpacity 
                style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 36}}
                onPress={() => this.nav.push('Comments', {id: bookInfo.bookid, title: bookInfo.bookname, total: bookInfo.commentcount})}
                >
                <Text style={[AppStyles.smallText, {marginRight: 5}]}>全部评论</Text>
                <Icon name={IconName.downArrow} color={AppColors.themeColor} size={16} />
              </TouchableOpacity>
            </View>
          </View> : null}
          {bookSimilarList.length ?
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
                      onPress={() => this.nav.push('BookDetail', {id: item.bookid})}
                      >
                      <Image style={{width: 60, height: 75, marginBottom: 10}} source={{uri: item.bookimage}} />
                      <Text style={{fontSize: 12}}>{item.bookname.substr(0, 5)}</Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View> :null}
        </ScrollView>
        <View 
          style={{
            width: '100%', 
            height: 46, 
            backgroundColor: 'white',
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            marginBottom: ifIphoneX(20, 0),
            flexDirection: 'row',
            borderColor: AppColors.dividersColor,
            borderTopWidth: StyleSheet.hairlineWidth
          }}
          >
          <TouchableOpacity 
            onPress={() => this.nav.push('BookDir', bookInfo)}
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: AppColors.dividersColor,
              borderRightWidth: StyleSheet.hairlineWidth,
              }}>
            <Icon name={IconName.list} size={24} textStyle={{fontSize: 14, color: AppColors.lightBlack}} text="目录" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.goToPages(bookInfo)}
            style={{
              flex: 1,
              backgroundColor: AppColors.themeColor, 
              alignItems: 'center',
              justifyContent: 'center',
              }}>
              <Text style={{color: 'white'}}>立即阅读</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: AppColors.dividersColor,
              borderRightWidth: StyleSheet.hairlineWidth,
              }}>
            <Icon name={IconName.add} size={24} textStyle={{fontSize: 14, color: AppColors.lightBlack}} text="加书架" />
          </TouchableOpacity>
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
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  mainInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  mainInfoText: {
    flex: 1,
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
    overflow: 'hidden',
  },
  desc: {
    marginTop: 10,
    // marginBottom: 5,
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