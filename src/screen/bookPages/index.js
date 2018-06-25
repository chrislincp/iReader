import React from 'react';

import {
  Header, BasePage, Icon, AnimateModal,
} from '../../components';
import {
  View,
  Text,
  Animated,
  LayoutAnimation,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  Slider,
} from 'react-native';
import { AppColors, AppSizes } from '../../themes';
import { getBookDirectory, getBookChapter } from './index.service';
import { ifIphoneX, ifAndroid } from '../../utils/utils';
import IconName from '../../constants/IconName';

export default class BookPages extends BasePage {
  constructor(props) {
    super(props);
    StatusBar.setHidden(true);
    this.state = {
      screenState: 'loading',
      themeColors: ['#FFF', '#F4D9AA', '#DCDCDC', '#D1DFF1', '#DAF4EA', '#FED9E7'],
      showOptions: false,
      showOptsModal: false,
      showDirList: false,
      onPressOptsModal: '',
      options: {
        scroll: 'y',
        color: '#F4D9AA',
        size: 0.4,
        isDark: false,
        darkStyle: {
          color: '#B2B2B2',
          bgColor: '#1E1E1E',
        }
      },
      navProps: this.nav.state.params,
      chapterinfoList: [],
      currentDetail: {},
      currentChapter: {},
      currentChapterPage: 1,
      currentChapterTotalPages: 1,
      totalChapter: 1,
      dirList: [],
      chapterDetail: [],
      order: false,
      loading: false
    }
  }
  _renderHeader() {
    return null;
  }

  componentDidMount() {
    const {bookInfo, chapterid, dirList} = this.state.navProps;
    if (dirList) {
      this.setState({dirList});
      this.mountGetChapters(dirList, chapterid);
    } else {
      this.getDirList();
    }
  }

  /**
   * 退出阅读页显示statusbar
   */

  componentWillUnmount(){
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('dark-content');
  }


  mountGetChapters(dirList, chapterid){
    let chapters = [];
    if (chapterid) {
      dirList.forEach((item, index) => {
        if (item.chapterid == chapterid) {
          if (item.number == 1) {
            chapters = [
              dirList[index].chapterid,
              dirList[index + 1].chapterid,
            ]
          } else {
            chapters = [
              dirList[index - 1].chapterid,
              dirList[index].chapterid,
              dirList[index + 1].chapterid,
            ]
          }
        }
      });
    } else {
      chapters = [
        dirList[0].chapterid,
        dirList[1].chapterid,
      ]
    }
    this.getChapters(chapters, 'next', true);
  }


  /**
   * 获取章节列表
   * @param {*} bookid 
   * @param {*} from 
   */

   getDirList() {
     const {bookInfo, chapterid} = this.state.navProps;
    getBookDirectory(bookInfo.bookid).then(res => {
      console.log(res);
      const dirList = res.chapterlist;
      this.setState({
        dirList,
      });
      this.mountGetChapters(dirList, chapterid);
   }).catch(err => {
    this.setState({
      screenState: 'error',
    });
     console.log(err);
   })
  }

  /**
   * 获取章节内容
   * @param {*} ids 
   */

  getChapters(ids, type, mount) {
    const {bookInfo} = this.state.navProps;
    let serviceList = [];
    ids.forEach(id => {
      const service = getBookChapter(bookInfo.bookid, id);
      serviceList.push(service);
    })
    let contentsLen = [];
    Promise.all(serviceList).then(res => {
      let {chapterDetail, chapterinfoList} = this.state;
      res.forEach(val => {
        const content = val.chapterinfo.chaptercontent;
        const title = val.chapterinfo.chaptername;
        const chapterid = val.chapterinfo.chapterid;
        const number = this.getChapterNum(chapterid);
        contentsLen.push(this._formatChapter(content, number, title).length);
        if (type == 'next') {
          chapterDetail = chapterDetail.concat(this._formatChapter(content, number, title));
          chapterinfoList.push(val.chapterinfo);
        } else {
          chapterDetail = this._formatChapter(content, number, title).concat(chapterDetail);
          chapterinfoList = [val.chapterinfo].concat(chapterinfoList);
        }
      })

      
      console.log(chapterDetail, chapterinfoList, contentsLen);
      let currentDetail = {};
      if (mount) {
        if (contentsLen.length == 3) {
          currentDetail = chapterDetail[contentsLen[0]];
        } else {
          currentDetail = chapterDetail[0];
        }
      } else {
        currentDetail = this.state.currentDetail;
      }
      console.log(currentDetail);
      this.setState({
        currentDetail,
        chapterDetail,
        chapterinfoList,
        screenState: 'success',
      });
      if (mount) {
        if (contentsLen.length == 3) this.refs.contentList.scrollToIndex({index: contentsLen[0], animated: false});
      } else {
        chapterDetail.forEach((item, index) => {
          if (item.chapter.number == currentDetail.chapter.number && item.num == currentDetail.num) {
            this.refs.contentList.scrollToIndex({index, animated: false});
          }
        })
      }

      setTimeout(() => {
        this.setState({ loading: false });
      }, 3000);
    }).catch(err => {
      console.log(err);
    })
  }

  /**
   * 获取chapterid对应的number
   */

  getChapterNum(id) {
    let number = 1;
    const {dirList} = this.state;
    dirList.forEach((item, index) => {
      if (item.chapterid == id) number = index + 1;
    });
    return number;
  }

  _formatChapter(content, num, title) {
    const {navProps, dirList} = this.state;
    const {bookid} = navProps.bookInfo;
    let _arr =[]
    let _content = content.replace(/\r\n/g, '@')
    let _arrTemp = this.contentFormat(_content)
    _arrTemp.forEach((content, index) => {
      let _chapterInfo = {
        title: title,
        num: index + 1,
        total: _arrTemp.length,
        content,
        bookid,
        chapter: dirList[num - 1],
      }
      _arr.push(_chapterInfo)
    });
    return _arr
  }

  contentFormat = (content) => {
    const {size} = this.state.options;
    const fontSize = 10 * size + 14;
    const lineHeight = fontSize * 2 - 4;
    const width = AppSizes.screenWidth - 30;
    const height = AppSizes.screenHeight - ifIphoneX(40, 20) - 50;
    let fontCount = parseInt(width / fontSize) == (width / fontSize) ? parseInt(width / fontSize) : parseInt(width / fontSize - 1)
    let fontLines = parseInt(height / lineHeight);
    const length = content.length
    let array = []
    let x = 0, y, m = 0
    while (x < length) {
      let _array = []
      for (var i = 0; i < fontLines; i++) {
        let str = content.substring(x, x + fontCount)
        if (str.indexOf('@') != -1) {
          y = x + str.indexOf('@') + 1
          _array[i] = content.substring(x, y - 1)
          x = y
          continue
        } else {
          y = x + fontCount
          _array[i] = content.substring(x, y)
          x = y
          continue
        }
      }
       array[m] = _array
      m++
    }
    return array
  }

  /**
   *  文章内容 render
   */

  _renderChapter(item) {
    const {showOptions, options, currentDetail} = this.state;
    const {size} = options;
    const fontSize = 10 * size + 14;
    const lineHeight = fontSize * 2 - 4;
    return (
      <View>
        {showOptions && 
        <TouchableOpacity 
          activeOpacity={1}
          onPress={() => this.toggleModal(false)}
          style={{
            width: AppSizes.screenWidth,
            height: AppSizes.screenHeight,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 90,
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }} 
          />}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.toggleModal(true)}
          style={{
            width: AppSizes.screenWidth,
            height: AppSizes.screenHeight,
            paddingTop: ifIphoneX(40, 20),
            paddingLeft: 15,
            paddingRight: 15,
            overflow: 'hidden',
            flexDirection: 'column',
          }}
          >

          <Text style={{lineHeight: 20, color: AppColors.textGreyColor}}>{item.title}</Text>
          <View style={{flex: 1}}>
          {item.content.map((line, index) => (
            <Text style={{lineHeight, fontSize}} key={index}>{line}</Text>
          ))}
          </View>
          <Text style={{lineHeight: 20, textAlign: 'center'}}>{`${currentDetail.num} / ${currentDetail.total}`}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  toggleModal(bool) {
    LayoutAnimation.easeInEaseOut();
    StatusBar.setHidden(this.state.showOptions)
    this.setState({
      showOptions: bool,
      showOptsModal: false,
      onPressOptsModal: '',
    })
  }

  onChangeOptions(key, value) {
    let {options} = this.state;
    options[key] = value;
    this.setState({ options });
  }

  configRender() {
    let {themeColors, options} = this.state;
    return (
      <View style={{padding: 10}}>
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
          >
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: AppColors.textGreyColor}}>颜色</Text>
          </View>
          {themeColors.map(item => (
            <View
              key={item}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              >
              {options.color == item ?
              <Icon 
                name={IconName.checkmark} 
                size={20}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: item
                }}
                /> :
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: item
                }}
                onPress={() => this.onChangeOptions('color', item)}
                />
              }
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginTop: 10,
            justifyContent: 'space-between',
          }}
          >
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: AppColors.textGreyColor}}>翻页</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: options.scroll == 'y' ? AppColors.themeColor : 'white',
                marginRight: 15,
                borderRadius: 6,
                padding: 10,
              }}
              onPress={() => this.onChangeOptions('scroll', 'y')}
              >
              <Text style={{color: options.scroll == 'y' ? AppColors.themeColor : 'white'}}>上下</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: options.scroll == 'x' ? AppColors.themeColor : 'white',
                borderRadius: 6,
                padding: 10,
              }}
              onPress={() => this.onChangeOptions('scroll', 'x')}
              >
              <Text style={{color: options.scroll == 'x' ? AppColors.themeColor : 'white'}}>左右</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  optsModal() {
    const {onPressOptsModal} = this.state;

    if (onPressOptsModal == 'config') {
      return this.configRender();
    }

  }

  _renderDirItem(item) {
    const {currentDetail} = this.state;
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
        {currentDetail.chapter.number == item.number && <Icon name={IconName.pin} size={20} color={AppColors.themeColor} style={{marginLeft: 15}} />}
      </TouchableOpacity>
    )
  }


  /**
   * 章节排序
   */
  sort() {
    let {order, dirList} = this.state;
    if (order) {
      this.refs.flatlist.scrollToIndex({index: 0});
      console.log(this.refs.flatlist);
    } else {
      this.refs.flatlist.scrollToEnd();
    }
    this.setState({ order: !order});
  }


  onScroll(e) {
    // console.log(e);
    // console.log('e.nativeEvent.contentOffset.y', e.nativeEvent.contentOffset[this.state.options.scroll], AppSizes.screenHeight, AppSizes.screenWidth)
    const {scroll} = this.state.options;
    const {chapterDetail, dirList, loading, currentDetail, chapterinfoList} = this.state;
    const pageSize = scroll == 'y' ? AppSizes.screenHeight : AppSizes.screenWidth;
    const scrollVal = e.nativeEvent.contentOffset[scroll] / pageSize;
    
    // 设置当前内容
    if (Math.floor(scrollVal) == scrollVal) {
      const index = scrollVal;
      const currentDetail = chapterDetail[index];
      this.setState({
        currentDetail,
      })
    }
    
    console.log(currentDetail, chapterinfoList);
    if (loading) return; // 防止重复请求
    let type;
    let currentIndex;
    chapterinfoList.every((item, index) => {
      if (item.chapterid == currentDetail.chapter.chapterid) {
        currentIndex = index;
        return;
      }
    });
    if (currentIndex == 1) {

    } else if (currentIndex == chapterinfoList.length - 2) {

    } else {
      return;
    }
  }

  _render() {
    const {showOptions, options, chapterDetail, showOptsModal, navProps, order, dirList, currentDetail} = this.state;
    const {bookInfo} = navProps;
    const contentLenth = options.scroll == 'x' ? AppSizes.screenWidth : AppSizes.screenHeight;
    return (
      <View style={{backgroundColor: options.color, flex: 1}}>
        <Animated.View
          style={[{
            position: 'absolute', 
            top: 0, 
            left: 0, 
            zIndex: 99,
            overflow: 'hidden',
          }, !showOptions && {height: 0}]}
          >
          <Header 
            statusBar="light-content" 
            fontColor="white" 
            style={{backgroundColor: 'rgba(0,0,0,0.8)'}}
            title={currentDetail.title}
            />
        </Animated.View>
        <FlatList 
          ref="contentList"
          data={chapterDetail}
          pagingEnabled={true}
          horizontal={options.scroll == 'x'}
          getItemLayout={(data, index) => ({length: contentLenth, offset: contentLenth * index, index})}
          scrollEnabled={!showOptions}
          onScroll={e => this.onScroll(e)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => this._renderChapter(item)}
          keyExtractor={(item, index) => (index).toString()}
          />
        <Animated.View
          style={[{
            width: '100%',
            zIndex: 99,
            backgroundColor: 'rgba(0,0,0,0.8)',
            position: 'absolute',
            bottom: ifIphoneX(30, 0),
            left: 0,
            overflow: 'hidden',
          }, !showOptions && {height: 0}]}
          >
          <Animated.View 
            style={[
              {overflow: 'hidden'},
              !showOptsModal && {height: 0}
            ]}
            >
            {this.optsModal()}
          </Animated.View>
          <View 
            style={styles.bottom}
            >
            <TouchableOpacity
              style={styles.bottomItem}
              >
              <Icon name={IconName.infoCircle} color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomItem}
              onPress={() => this.setState({ showDirList: true})}
              >
              <Icon name={IconName.list} color="white" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomItem}
              onPress={() => this.nav.push('Comments', {id: bookInfo.bookid, title: bookInfo.bookname, total: bookInfo.commentcount})}
              >
              <Icon name={IconName.chatbubbles} color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomItem}
              onPress={() => {
                LayoutAnimation.easeInEaseOut();
                this.setState({
                  showOptsModal: !this.state.showOptsModal,
                  onPressOptsModal: 'config',
                })
              }}
              >
              <Icon name={IconName.config} color="white" size={20} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <AnimateModal
          animationType="slide"
          visible={this.state.showDirList}
          springEffect
          >
          <View
              style={{
                flex: 1,
                width: AppSizes.screenWidth,
                backgroundColor: 'white',
              }}
            >
            <Header 
              left={<Icon 
                name={IconName.close} 
                size={40} 
                style={{paddingLeft: 20, paddingRight: 20}} 
                onPress={() => this.setState({showDirList: false})} 
                />}
              title={bookInfo.bookname}
              right={<TouchableOpacity
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
                </TouchableOpacity>}
              />
              <FlatList
                style={{backgroundColor: 'white'}}
                ref="flatlist"
                data={dirList}
                getItemLayout={(data, index) => ({length: 36, offset: 36 * index, index})}
                keyExtractor={(item) => item.chapterid.toString()}
                renderItem={({item}) => this._renderDirItem(item)}
              />
          </View>
        </AnimateModal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottom: {
    height: 50,
    flexDirection: 'row',
  },
  bottomItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: 'white',
    fontSize: 12,
  }
})