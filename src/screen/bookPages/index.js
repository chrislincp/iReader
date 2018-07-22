import React from 'react';

import {
  Header, BasePage, Icon, AnimateModal, Toast, Text,
} from '../../components';
import {
  View,
  Animated,
  LayoutAnimation,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  Slider,
  Alert,
  Image,
  DeviceEventEmitter
} from 'react-native';
import { AppColors, AppSizes } from '../../themes';
import { getBookDirectory, getBookChapter } from './index.service';
import { ifIphoneX, checkBookRack, setTopRackBook } from '../../utils/utils';
import IconName from '../../constants/IconName';
import DeviceStorage from '../../utils/deviceStorage';

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
      dirList: [],
      chapterDetail: [],
      order: false,
      loading: false,
      initialIndex: 0,
      initialNum: Math.floor(((AppSizes.screenHeight - ifIphoneX(88, 64)) / 36)) + 1,
      initialDirIndex: 0,
    }
  }
  _renderHeader() {
    return null;
  }

  componentDidMount() {
    this.getLocalOptions();
    const {bookInfo, chapterid, dirList, newest, from} = this.state.navProps;
    console.log(from);
    checkBookRack(bookInfo.bookid).then(res => {
      console.log('book page check', res)
      if (res.exist) {  //  当书架存在  设置本书在书架最上方
        setTopRackBook(bookInfo.bookid).then(() => {
          if (from == 'rack') {
            this.renderFromRack(res.data);
          } else {
            if (dirList) {
              this.setState({dirList});
              let id = newest ? dirList[dirList.length -1].chapterid : chapterid;
              this.mountGetChapters(dirList, id);
            } else {
              this.getDirList();
            }
          }
        });
      } else {
        if (dirList) {
          this.setState({dirList});
          let id = newest ? dirList[dirList.length -1].chapterid : chapterid;
          this.mountGetChapters(dirList, id);
        } else {
          this.getDirList();
        }
      }
    })
  }

  renderFromRack(data) {
    //  有阅读内容数据
    console.log(data);
    if (data.currentDetail) {
      let i;
      data.chapterDetail.forEach((item, index) => {
        if (item.chapter.chapterid == data.currentDetail.chapter.chapterid && item.num == data.currentDetail.num) i = index;
      })
      this.setState({
        currentDetail: data.currentDetail,
        chapterDetail: data.chapterDetail,
        dirList: data.dirList,
        chapterinfoList: data.chapterinfoList,
        initialIndex: i,
        screenState: 'success',
      })
      console.log(i)
      // setTimeout(() => {
      //   this.refs.contentList.scrollToIndex({index: i, animated: false});
      // });
    } else {
      //  无阅读内容数据  来自于书籍详情
      this.getDirList();
    }
  }

  /**
   * 获取本地配置
   */
  getLocalOptions() {
    DeviceStorage.get('pageOptions').then(res => {
      if (res) {
        this.setState({
          options: res
        })
      }
    })
  }

  /**
   * 保存当前配置
   */
  saveLocalOptions() {
    DeviceStorage.save('pageOptions', this.state.options);
  }

  /**
   * 退出阅读页显示statusbar
   */

  componentWillUnmount(){
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('dark-content');
  }


  mountGetChapters(dirList, chapterid){
    this.setState({
      chapterDetail: [],
      chapterinfoList: [],
    })
    let chapters = [];
    let status;
    if (chapterid) {
      dirList.forEach((item, index) => {
        if (item.chapterid == chapterid) {
          if (item.number == 1) {
            chapters = [
              dirList[index].chapterid,
              dirList[index + 1].chapterid,
            ]
            status = 'first';
          } else if (item.number == dirList.length) {
            chapters = [
              dirList[index - 1].chapterid,
              dirList[index].chapterid,
            ]
            status = 'last';
          } else {
            chapters = [
              dirList[index - 1].chapterid,
              dirList[index].chapterid,
              dirList[index + 1].chapterid,
            ]
            status = 'center';
          }
        }
      });
    } else {
      chapters = [
        dirList[0].chapterid,
        dirList[1].chapterid,
      ]
      status = 'first';
    }
    this.getChapters(chapters, 'next', true, status);
  }


  /**
   * 获取章节列表
   * @param {*} bookid 
   * @param {*} from 
   */

   getDirList() {
     const {bookInfo, chapterid, newest} = this.state.navProps;
    getBookDirectory(bookInfo.bookid).then(res => {
      console.log(res);
      const dirList = res.chapterlist;
      this.setState({
        dirList,
      });
      let id = newest ? dirList[dirList.length -1].chapterid : chapterid;
      this.mountGetChapters(dirList, id);
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

  getChapters(ids, type, mount, status) {
    this.setState({
      loading: true,
    })
    const {bookInfo} = this.state.navProps;
    let serviceList = [];
    ids.forEach(id => {
      const service = getBookChapter(bookInfo.bookid, id);
      serviceList.push(service);
    })
    let contentsLen = [];
    Promise.all(serviceList).then(res => {
      let {chapterDetail, chapterinfoList} = this.state;
      console.log(res);
      res.forEach(val => {
        const content = val.chapterinfo.chaptercontent;
        const title = val.chapterinfo.chaptername;
        const chapterid = val.chapterinfo.chapterid;
        const index = this.getChapterIndex(chapterid);
        contentsLen.push(this._formatChapter(content, index, title).length);
        if (type == 'next') {
          chapterDetail = chapterDetail.concat(this._formatChapter(content, index, title));
          chapterinfoList.push(val.chapterinfo);
        } else {
          chapterDetail = this._formatChapter(content, index, title).concat(chapterDetail);
          chapterinfoList = [val.chapterinfo].concat(chapterinfoList);
        }
      })

      
      let currentDetail = {};
      let initialIndex = 0;
      if (mount) {
        switch (status) {
          case 'first':
            currentDetail = chapterDetail[0];
          break;
          case 'center':
            currentDetail = chapterDetail[contentsLen[0]];
            initialIndex = contentsLen[0];
          break;
          case 'last':
            currentDetail = chapterDetail[contentsLen[0]];
            initialIndex = contentsLen[0];
          break;
        }
        this.setState({ currentDetail });       
      }
      this.setState({
        loading: false,
        chapterDetail,
        chapterinfoList,
        initialIndex,
        screenState: 'success',
      });
      if (this.refs.contentList) {
        chapterDetail.forEach((item, index) => {
          if (item.chapter.chapterid == this.state.currentDetail.chapter.chapterid && item.num == this.state.currentDetail.num) {
            this.refs.contentList.scrollToIndex({index, animated: false});
          }
        })
      }
      Toast.hide();
    }).catch(err => {
      console.log(err);
    })
  }

  /**
   * 获取chapterid对应的number
   */

  getChapterIndex(id) {
    let i;
    const {dirList} = this.state;
    dirList.forEach((item, index) => {
      if (item.chapterid == id) i = index;
    });
    return i;
  }

  _formatChapter(content, i, title) {
    const {navProps, dirList} = this.state;
    const {bookid} = navProps.bookInfo;
    let _arr =[]
    let _content = content.replace(/\r\n/g, '@')
    let _arrTemp = this.contentFormat(_content)
    _arrTemp.forEach((content, index) => {
      let _chapterInfo = {
        title,
        num: index + 1,
        total: _arrTemp.length,
        content,
        bookid,
        chapter: dirList[i],
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
    let fontCount = parseInt(width / fontSize - 1);
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
          <Text style={{lineHeight: 20, textAlign: 'center'}}>{`${item.num} / ${item.total}`}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  toggleModal(bool) {
    LayoutAnimation.easeInEaseOut();
    StatusBar.setHidden(this.state.showOptions)
    if (bool) StatusBar.setBarStyle('light-content');
    this.setState({
      showOptions: bool,
      showOptsModal: false,
      onPressOptsModal: '',
    })
  }

  onChangeOptions(key, value) {
    let {options, currentDetail, chapterDetail, chapterinfoList, dirList} = this.state;
    //  值与原先相同时return
    if (options[key] == value) return;
    options[key] = value;
    this.setState({ options });
    this.saveLocalOptions();
    switch (key) {
      case 'scroll':
        //  当改变阅读模式  保持在当前页
        this.setState({
          chapterDetail: [],
        })
        chapterDetail.forEach((item, index) => {
          if (item.chapter.number == currentDetail.chapter.number && item.num == currentDetail.num) {
            const detail = chapterDetail;
            setTimeout(() => {
              this.setState({
                chapterDetail: detail,
              })
              this.refs.contentList.scrollToIndex({index, animated: false}); 
            });
          }
        })     
      break;
      case 'size':
        this.setContentsBySize();
      break;   
    }
  }

  /**
   * 改变文字大小 重新更新内容 
   */

  setContentsBySize() {
    const {currentDetail, chapterinfoList} = this.state;
    this.setState({
      chapterDetail: [],
      chapterinfoList: [],
    })
    let currentIndex;
    chapterinfoList.forEach((item, index) => {
      if (item.chapterid == currentDetail.chapter.chapterid) {
        currentIndex = index;
        return;
      }
    })
    let newInfoList = [];
    if (currentIndex == 0) {
      newInfoList = [
        chapterinfoList[0],
        chapterinfoList[1],
      ]
    } else if (currentIndex == chapterinfoList.length - 1) {
      newInfoList = [
        chapterinfoList[chapterinfoList.length - 2],
        chapterinfoList[chapterinfoList.length - 1],
      ]
    } else {
      newInfoList = [
        chapterinfoList[currentIndex - 1],
        chapterinfoList[currentIndex],
        chapterinfoList[currentIndex + 1],
      ]
    }
    let chapterDetail = [];
    let detailIndex;
    let newCurrentDetail;
    newInfoList.forEach(val => {
      const content = val.chaptercontent;
      const title = val.chaptername;
      const chapterid = val.chapterid;
      const index = this.getChapterIndex(chapterid);
      chapterDetail = chapterDetail.concat(this._formatChapter(content, index, title));
    })

    for (let i = 0; i < chapterDetail.length; i++) {
      const detail = chapterDetail[i];
      if (detail.chapter.chapterid == currentDetail.chapter.chapterid) {
        if (currentDetail.num <= detail.total) {
          if (detail.num == currentDetail.num) {
            detailIndex = i;
            newCurrentDetail = detail;
            break;
          }
        } else {
          if (detail.num == detail.total) {
            detailIndex = i;
            newCurrentDetail = detail;
            break;
          }
        }
      }
    }

    this.setState({
      currentDetail: newCurrentDetail,
      chapterDetail,
      chapterinfoList: newInfoList,
    });
    setTimeout(() => {
     this.refs.contentList.scrollToIndex({index: detailIndex, animated: false}); 
    });
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
            marginBottom: 10,
          }}
          >
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: AppColors.textGreyColor}}>字体</Text>
          </View>
          <Slider 
            style={{
              flex: 1, 
              justifyContent: 'center', 
              flexDirection: 'row',
              marginLeft: 10
            }} 
            minimumTrackTintColor={AppColors.themeColor}
            onValueChange={(val) => this.onChangeOptions('size', val.toFixed(1) - 0)}
            step={0.1}
            value={options.size}
            />
        </View>
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginBottom: 10,
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
        onPress={() => this.onPressDir(item)}
        >
        <Text style={{fontSize: 12}} numberOfLines={1}>{item.chaptername}</Text>
        {currentDetail.chapter.number == item.number && <Icon name={IconName.pin} size={20} color={AppColors.themeColor} style={{marginLeft: 15}} />}
      </TouchableOpacity>
    )
  }

  onPressDir(chapter) {
    this.setState({
      showDirList: false,
      showOptions: false,
    })
    if (chapter.chapterid == this.state.currentDetail.chapter.chapterid) return;
    Toast.showLoading('请稍后');
    this.mountGetChapters(this.state.dirList, chapter.chapterid);
  }


  /**
   * 章节排序
   */
  sort() {
    let {order, dirList} = this.state;
    if (order) {
      this.refs.flatlist.scrollToIndex({index: 0, animated: false});
      console.log(this.refs.flatlist);
    } else {
      this.refs.flatlist.scrollToEnd();
    }
    this.setState({ order: !order});
  }


  onScroll(e) {
    const {scroll} = this.state.options;
    const {chapterDetail, dirList, loading, currentDetail, chapterinfoList, navProps} = this.state;
    const pageSize = scroll == 'y' ? AppSizes.screenHeight : AppSizes.screenWidth;
    const scrollVal = e.nativeEvent.contentOffset[scroll] / pageSize;
    
    if (!chapterinfoList.length) return;
    // 设置当前内容
    if (Math.floor(scrollVal) == scrollVal) {
      const index = scrollVal;
      const currentDetail = chapterDetail[index];
      this.setState({
        currentDetail,
      })
      this.getChaptersByScroll(currentDetail);
      checkBookRack(navProps.bookInfo.bookid).then(res => {
        if (res.exist) this.coverRackData();
      })
    }
    
  }

  getChaptersByScroll(currentDetail) {
    const {loading, chapterinfoList, dirList} = this.state;
    if (loading) return; // 防止重复请求
    let currentIndex;
    chapterinfoList.forEach((item, index) => {
      if (item.chapterid == currentDetail.chapter.chapterid) currentIndex = index;
    });
    let chapters, type;
    if (currentIndex == 0) {
      if (chapterinfoList[0].chapterid == dirList[0].chapterid) {
        if (currentDetail.num == 1) Toast.show('已经是第一章了');
        return;
      }
      //  向前获取章节  prev
      let i;
      dirList.forEach((dir, index) => {
        if (dir.chapterid == chapterinfoList[currentIndex].chapterid) i = index;
      });
      if (i == 1) {
        chapters = [dirList[0].chapterid];
      } else {
        chapters = [
          dirList[i - 1].chapterid,
          dirList[i - 2].chapterid,
        ]
      }
      type = 'prev';
    } else if (currentIndex == chapterinfoList.length - 1) {
      if (chapterinfoList[currentIndex].chapterid == dirList[dirList.length - 1].chapterid) {
        if (currentDetail.num == currentDetail.total) Toast.show('已经是最后一章了');
        return;
      }
      //  向后获取章节  next
      let i;
      dirList.forEach((dir, index) => {
        if (dir.chapterid == chapterinfoList[currentIndex].chapterid) i = index;
      })
      if (i == dirList.length - 2) {
        chapters = [
          dirList[i + 1].chapterid,
        ]
      } else {
        chapters = [
          dirList[i + 1].chapterid,
          dirList[i + 2].chapterid,
        ]
      }
      type = 'next';
    } else {
      return;
    }
    this.getChapters(chapters, type);
  }


  leavePages() {
    checkBookRack(this.state.navProps.bookInfo.bookid).then(res => {
      if (res.exist) {
        this.nav.goBack();
      } else {
        Alert.alert('提示', '是否要加入书架', [
          {text: '取消', onPress: () => this.nav.goBack()},
          {text: '确定', onPress: () => this.joinRack()}
        ])
      }
    })
  }


  coverRackData() {
    console.log('convert rack data')
    return new Promise((resove, reject) => {
      const {currentDetail, dirList, chapterinfoList, navProps} = this.state;
      const {bookInfo} = navProps;
      let newChapterinfoList = [];
      let chapterDetail  = [];
  
      //  处理chapterinfoList
      chapterinfoList.forEach((item, index) => {
        if (item.chapterid == currentDetail.chapter.chapterid) {
          if (index == 0) {
            newChapterinfoList = [
              chapterinfoList[index],
              chapterinfoList[index + 1],
            ]
          } else if (index == chapterinfoList.length - 1) {
             newChapterinfoList = [
              chapterinfoList[index - 1],
              chapterinfoList[index],
             ]
          } else {
            newChapterinfoList = [
              chapterinfoList[index - 1],
              chapterinfoList[index],
              chapterinfoList[index + 1],
             ]
          }
        }
      })
  
      // 处理chapterdetail
      newChapterinfoList.forEach(val => {
        const content = val.chaptercontent;
        const title = val.chaptername;
        const chapterid = val.chapterid;
        const index = this.getChapterIndex(chapterid);
        chapterDetail = chapterDetail.concat(this._formatChapter(content, index, title));
      })
  
      const opts = {
        currentDetail,
        dirList,
        bookInfo,
        chapterinfoList: newChapterinfoList,
        chapterDetail,
      }
      let data;
      DeviceStorage.get('rackList').then(res => {
        data = res || [];
        let exist = false;
        data.forEach((item, index) => {
          if (item.bookInfo.bookid == bookInfo.bookid) {
            exist = true;
            data[index] = opts;
          }
        })
        if (!exist) data.push(opts);
        DeviceStorage.save('rackList', data);
        DeviceEventEmitter.emit('updateRack');
        resove();
      })
    })
  }

  joinRack() {
    this.coverRackData().then(() => {
      Toast.showSuccess('加入成功');
      DeviceEventEmitter.emit('joinRack');
      this.nav.goBack();
    });
  }

  onPressBottom(type) {
    const {navProps, dirList, currentDetail} = this.state;
    const {bookInfo} = navProps;
    if (type !== 'config' && this.state.showOptsModal) this.setState({ showOptsModal: false });
    switch (type) {
      case 'comment':
        this.nav.push('Comments', {id: bookInfo.bookid, title: bookInfo.bookname, total: bookInfo.commentcount})
      break;
      case 'config':
        LayoutAnimation.easeInEaseOut();
        this.setState({
          showOptsModal: !this.state.showOptsModal,
          onPressOptsModal: 'config',
        })
      break;
      case 'dir': 
        dirList.forEach((item, index) => {
          // if (item.chapterid == currentDetail.chapter.chapterid) this.refs.flatlist.scrollToIndex({index});
          if (item.chapterid == currentDetail.chapter.chapterid) this.setState({initialDirIndex: index});
        })
        this.setState({ showDirList: true });
        this.Dir = <FlatList
          style={{backgroundColor: 'white'}}
          ref="flatlist"
          data={dirList}
          initialNumToRender={this.state.initialNum}
          initialScrollIndex={this.state.initialDirIndex}
          getItemLayout={(data, index) => ({length: 36, offset: 36 * index, index})}
          keyExtractor={(item) => item.chapterid.toString()}
          renderItem={({item}) => this._renderDirItem(item)}
        />
        // setTimeout(() => {
        //   dirList.forEach((item, index) => {
        //     // if (item.chapterid == currentDetail.chapter.chapterid) this.refs.flatlist.scrollToIndex({index});
        //     if (item.chapterid == currentDetail.chapter.chapterid) this.setState({initialDirIndex: index});
        //   })
        // });
      break;
    }
  }

  _render() {
    const {showOptions, options, chapterDetail, showOptsModal, navProps, order, dirList, currentDetail, initialIndex, initialNum, initialDirIndex} = this.state;
    const {bookInfo} = navProps;
    const contentLenth = options.scroll == 'x' ? AppSizes.screenWidth : AppSizes.screenHeight;
    console.log('render currentdetail', currentDetail, initialIndex, initialDirIndex);
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
            leftPress={() => this.leavePages()}
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
          initialScrollIndex={initialIndex}
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
              onPress={() => this.onPressBottom('dir')}
              >
              <Icon name={IconName.list} color="white" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomItem}
              onPress={() => this.onPressBottom('comment')}
              >
              <Icon name={IconName.chatbubbles} color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomItem}
              onPress={() => this.onPressBottom('config')}              
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
                onPress={() => {
                  this.setState({showDirList: false})
                  this.Dir = null;
                }} 
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
              {this.Dir}
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