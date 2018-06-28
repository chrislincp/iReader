import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { DataList, Text, BookItem, BasePage, Icon, ScrollableTabView, TitleBar, CollectItem } from '../../components';
import {getClassic, getRecommend, getClassicList, getRecommendList, getNewRecommend, getBookSort, getBookList, getBookListBySort} from './index.service';
import IconName from '../../constants/IconName';
import { AppColors, AppSizes, AppStyles } from '../../themes';
import LoadingStatus from '../../components/LoadingStatus';
import { timeCompare } from '../../utils/utils';
export default class BookMall extends BasePage {
  static navigationOptions = {
    tabBarLabel: '书城',
    tabBarIcon: ({ focused }) => (
      <Icon name={focused ? IconName.ribbon : IconName.ribbonOutline} size={24} color={AppColors.themeColor} />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      recommendLoading: true,
      mostNewLoading: true,
      bookListLoading: true,
      bookSortLoading: true,
      bookListOpt: {
        good: 0,
        order: 0
      },
      hotList: [],
      commendList: [],
      mostNewList: [],
      newBookList: [],
      hotBookList: [],
      bookSortList: [],
    };
  }

  componentDidMount() {
    this.getRecommendPage();
    // this.getMostNewListPage();
    this.getBookListPage();
    this.getBookSortListPage();
  }

  // 获取推荐
  getRecommendPage() {
    Promise.all([
      getClassic({sex: 1}),
      getRecommend({sex: 1})
    ]).then(res => {
      console.log('recommend res', res);
      if (res[0].success == 1) {
        this.setState({
          hotList: res[0].booklist.splice(0, 3),
        })
      }
      if (res[1].success == 1) {
        this.setState({
          commendList: res[1].booklist.splice(0, 3),
        })
      }
      this.setState({
        recommendLoading: false,
      })
    }).catch(err => {
      this.setState({
        recommendLoading: false,
      })
    })
  }

  // 获取最新
  getMostNewListPage() {
    getNewRecommend({sex: 1}).then(res => {
      if (res.success == 1) {
        this.setState({
          mostNewLoading: false,
          mostNewList: res.booklist,
        })
      }
    }).catch(err => {
      this.setState({
        mostNewLoading: false,
      })
    })
  }

  // 获取书单
  getBookListPage() {
    Promise.all([
      getBookList({good: 0, order: 0}),
      getBookList({good: 0, order: 1}),
    ]).then(res => {
      if (res[0].success == 1) {
        this.setState({
          newBookList: res[0].booklistlist.splice(0, 3),
        })
      }
      if (res[1].success == 1) {
        this.setState({
          hotBookList: res[1].booklistlist.splice(0, 3),
        })
      }
      this.setState({
        bookListLoading: false,
      })
    }).catch(err => {
      this.setState({
        bookListLoading: false,
      })
    })
  }

  // 获取分类
  getBookSortListPage() {
    getBookSort({sex: 1}).then(res => {
      if (res.success == 1) {
        this.setState({
          bookSortList: res.sortlist,
          bookSortLoading: false,
        })
      }
    }).catch(err => {
      this.setState({
        bookSortLoading: false,
      })
    })
  }

  _headerProps() {
    return {
      title: '书城',
      left: <View />,
      right: (
      <Icon 
        onPress={() => this.nav.push('Search')}
        name={IconName.search} 
        size={28}
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }} 
        />
      )
    }
  }

  _renderItem = item => <BookItem key={item.bookid} item={item} onPress={() => this.goDetail(item.bookid)} />

  _renderSortItem = item => (
    <TouchableOpacity
      key={item.sortid}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        height: 46,
        borderBottomWidth: AppSizes.hairLineWidth,
        borderColor: AppColors.dividersColor,
      }}
      onPress={() => this.nav.push('BookSortList', {title: item.sortname, sort: item.sortid})}
      >
      <View style={{justifyContent: 'center'}}>
        <Text>{item.sortname}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[AppStyles.smallText, {marginRight: 5}]}>{item.bookcount}</Text>
        <Icon name={IconName.rightArrow} color={AppColors.textGreyColor} />
      </View>
    </TouchableOpacity>
  )

  _renderBookListItem(item) {
    return <CollectItem key={item.id} item={item} onPress={() => this.nav.push('CollectDetail', item)} />;
  }

  goDetail(id) {
    this.nav.push('BookDetail', {id});
  }


  _render() {
    const {
        hotList, commendList, mostNewList, hotBookList, newBookList, bookSortList, recommendLoading, mostNewLoading, bookListLoading, bookSortLoading, } = this.state;
    return (
      <View style={{backgroundColor: AppColors.backgroundColor, flex: 1}}>
          <ScrollableTabView
            style={{backgroundColor: 'white'}}
            contentStyle={{flex: 1}}
            >
          <View style={{ backgroundColor: 'white', flex: 1}} tabLabel="推荐">
            {recommendLoading ? <LoadingStatus /> :
            <ScrollView>
              <TitleBar 
                title="畅销精选"
                onPress={() => this.nav.push('BookList', {title: '畅销精选', options: {}, service: getClassicList})}
                />
              {hotList.map(item => this._renderItem(item))}
              <TitleBar 
                title="主编力荐"
                onPress={() => this.nav.push('BookList', {title: '主编力荐', options: {}, service: getRecommendList})}
                />
              {commendList.map(item => this._renderItem(item))}
            </ScrollView>}
          </View>
          <View tabLabel="最新">
            {/* {mostNewLoading ? <LoadingStatus /> :
            <ScrollView>
              {mostNewList.map(item => this._renderItem(item))}
            </ScrollView>} */}
            <DataList 
              noMoreLoading
              options={{sex: 1}}
              service={getNewRecommend}
              convertData={res => res.booklist}
              renderItem={(item) => this._renderItem(item)}
            />
          </View>
          <View tabLabel="书单">
          {bookListLoading ? <LoadingStatus /> :
            <ScrollView>
              <TitleBar title="最新发布" onPress={() => this.nav.push('CollectList', {title: '最新发布', options: {good: 0, order: 0}})} />
              {newBookList.map(item => this._renderBookListItem(item))}
              <TitleBar title="最多收藏" onPress={() => this.nav.push('CollectList', {title: '最多收藏', options: {good: 0, order: 1}})} />
              {hotBookList.map(item => this._renderBookListItem(item))}
            </ScrollView>}
          </View>
          <View tabLabel="分类">
            {bookSortLoading ? <LoadingStatus /> :
              <ScrollView>
                {bookSortList.map(item => this._renderSortItem(item))}
              </ScrollView>
            }
          </View>
        </ScrollableTabView>
      </View>
    )
  }
}
