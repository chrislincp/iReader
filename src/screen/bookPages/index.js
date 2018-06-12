import React from 'react';

import {
  Header, BasePage, Icon,
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
} from 'react-native';
import { AppColors, AppSizes } from '../../themes';
import { getBookDirectory, getBookChapter } from './index.service';
import { ifIphoneX, ifAndroid } from '../../utils/utils';
import IconName from '../../constants/IconName';

export default class BookPages extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      screenState: 'loading',
      themeColors: ['#FFF', '#F4D9AA', '#DCDCDC', '#D1DFF1', '#DAF4EA', '#FED9E7'],
      showOptions: false,
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
      currentChapter: 1,
      currentChapterPage: 1,
      currentChapterTotalPages: 1,
      totalChapter: 1,
      dirList: [],
      chapterDetail: [],
    }
  }
  _renderHeader() {
    return null;
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    const {bookid, chapterid, from} = this.state.navProps;
    if (from == 'book') {
      getBookDirectory(bookid).then(res => {
        console.log(res);
        this.setState({
          dirList: res.chapterlist,
        });
        this.getDetailChapter(res.chapterlist[0].chapterid);
      }).catch(err => {
        this.setState({
          screenState: 'error',
        });
        console.log(err);
      })
    } else if (from =='chapter') {

    }
  }

  componentWillUnmount(){
    StatusBar.setHidden(false);
  }

  getDetailChapter(chapterid) {
    const {bookid} = this.state.navProps;
    getBookChapter(bookid, chapterid).then(res=> {
      this.setState({
        screenState: 'success',
        chapterDetail: this._formatChapter(res.chapterinfo.chaptercontent, 1, res.chapterinfo.chaptername),
      });
      console.log(this.state.chapterDetail)
    }).catch(err => {
      console.log(err);
    })
  }


  _formatChapter(content, num, title) {
    let _arr =[]
    let _content = content.replace(/\r\n/g, '@')
    let _arrTemp = this.contentFormat(_content)
    _arrTemp.forEach((content, index) => {
      let _chapterInfo = {
        title: title,
        num: index,
        content,
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
    let fontLines = parseInt((height - 20) / lineHeight);
    const length = content.length
    let array = []
    let x = 0, y, m = 0
    while (x < length) {
      let _array = []
      for (var i = 0; i <= fontLines; i++) {
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

  _renderChapter(item) {
    const {showOptions, options} = this.state;
    const {size} = options;
    const fontSize = 10 * size + 14;
    const lineHeight = fontSize * 2 - 4;
    return (
      <View>
        {showOptions && 
        <TouchableOpacity 
          activeOpacity={1}
          onPress={() => this.toggleModal()}
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
          onPress={() => this.toggleModal()}
          style={{
            width: AppSizes.screenWidth,
            height: AppSizes.screenHeight,
            paddingTop: ifIphoneX(40, 20),
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 10,
            overflow: 'hidden',
          }}
          >

          <Text style={{lineHeight: 20, color: AppColors.textGreyColor}}>{item.title}</Text>
          {(item.content && item.content.length) ? item.content.map((line, index) => {
            return (
            <Text style={{lineHeight, fontSize}} key={index}>{line}</Text>
          )}) : null}
          <Text style={{lineHeight: 20}}></Text>
        </TouchableOpacity>
      </View>
    )
  }

  toggleModal() {
    LayoutAnimation.easeInEaseOut();
    StatusBar.setHidden(this.state.showOptions)
    this.setState({
      showOptions: !this.state.showOptions
    })
  }

  onScrll(e) {
    // console.log(e);
  }

  _render() {
    const {showOptions, options, chapterDetail} = this.state;
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
          <Header />
        </Animated.View>
        <FlatList 
          data={chapterDetail}
          pagingEnabled={true}
          horizontal={options.scroll == 'x' ? true : false}
          scrollEnabled={!showOptions}
          onScroll={e => this.onScrll(e)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => this._renderChapter(item)}
          keyExtractor={(item, index) => (index).toString()}
          />
        <Animated.View
          style={[{
            width: '100%',
            backgroundColor: AppColors.themeColor,
            zIndex: 99,
            position: 'absolute',
            bottom: ifIphoneX(30, 0),
            left: 0,
            overflow: 'hidden',
          }, !showOptions && {height: 0}]}
          >

          <View 
            style={styles.bottom}
            >
            <TouchableOpacity
              style={styles.bottomItem}
              >
              <Icon name={IconName.infoCircle} color="white" size={20} />
              <Text style={styles.bottomText}>反馈</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomItem}
              >
              <Icon name={IconName.refreshCircle} color="white" size={20} />
              <Text style={styles.bottomText}>换源</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomItem}
              >
              <Icon name={IconName.list} color="white" size={20} />
              <Text style={styles.bottomText}>目录</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomItem}
              >
              <Icon name={IconName.chatbubbles} color="white" size={20} />
              <Text style={styles.bottomText}>评论</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomItem}
              >
              <Icon name={IconName.config} color="white" size={20} />
              <Text style={styles.bottomText}>设置</Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
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